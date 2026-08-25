#!/usr/bin/env python3
"""Pre-deploy checks for the CS 301R Canvas material.

A deploy stops at the first error it hits, so without this you find problems one
push at a time. This never touches Canvas and needs no API token — it is always
safe to run.

    python3 canvas_material/validate_canvas_material.py --target fall26

What it does: renders the whole content tree exactly the way mdxcanvas does —
Jinja with the target's global args, MarkdownData for the args files, recursing
through every <include> — and then checks the result.

    undefined variables   A {{ VAR }} with no value. Jinja renders these as the
                          empty string, so a missing date key does not announce
                          itself: it produces due_at=", 2026, 9:00 AM" and blows
                          up much later in date parsing, or silently ships wrong
                          text. Rendering with StrictUndefined turns that into
                          an error here instead.
    dangling references   An <item content_id="X"> or <course-link id="X">
                          naming something nothing declares.
    duplicate ids         Two resources claiming the same id, or the same item
                          listed twice in one module. mdxcanvas keys module
                          items by module|content_id and each records a pointer
                          to the previous one, so a duplicate can close a loop
                          in the dependency graph that the deploy cannot order.
    missing files         An <include>, <file>, or <img> path that is not on
                          disk, resolved the way mdxcanvas resolves it: relative
                          to the directory of the file containing the tag.
    group weights         Assignment group weights that do not total 100.

Exit code is 0 on success, 1 if anything failed.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import sys

CM = pathlib.Path(__file__).resolve().parent

try:
    from bs4 import BeautifulSoup
    from jinja2 import Environment, FileSystemLoader, StrictUndefined, TemplateError
    import markdowndata
except ImportError as exc:  # pragma: no cover - environment problem, not content
    sys.exit(
        f"missing dependency: {exc.name}\n"
        "This needs the same environment mdxcanvas runs in — bs4, jinja2, and\n"
        "markdowndata. Try the interpreter you installed mdxcanvas with."
    )

# Resource tags that declare an id other things can point at.
DECLARING_TAGS = {"page", "md-page", "assignment", "quiz", "announcement", "discussion", "module", "group"}

# Tags whose path attribute must exist on disk.
PATH_TAGS = {"include", "file", "img", "md-page", "zip"}


class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    def summarize(self) -> int:
        for w in self.warnings:
            print(f"  warning: {w}")
        for e in self.errors:
            print(f"  ERROR:   {e}")
        print()
        if self.errors:
            print(f"{len(self.errors)} error(s), {len(self.warnings)} warning(s) — deploy would fail")
            return 1
        print(f"clean — {len(self.warnings)} warning(s)")
        return 0


def load_global_args(target: str) -> dict:
    """Merge GLOBAL_ARGS from course_info with the --global-args file.

    Same precedence mdxcanvas uses: the global-args file wins.
    """
    course_info = json.loads((CM / "course_info" / f"cs301r_{target}.json").read_text(encoding="utf-8"))
    args = dict(course_info.get("GLOBAL_ARGS", {}))
    args.update(json.loads((CM / "course_info" / f"global_args_{target}.json").read_text(encoding="utf-8")))
    return args


def render(path: pathlib.Path, global_args: dict, args, report: Report) -> str:
    """Render one file the way mdxcanvas would, with undefined variables fatal."""
    env = Environment(
        loader=FileSystemLoader([str(path.parent), str(CM)]),
        undefined=StrictUndefined,
    )
    # The handful of context helpers mdxcanvas injects that our templates use.
    ctx = dict(global_args)
    ctx.update(
        args=args,
        exists=lambda p: (path.parent / p).exists(),
        read_file=lambda p: (path.parent / p).read_text(encoding="utf-8"),
        glob=lambda pat: sorted(str(f.relative_to(path.parent)) for f in path.parent.glob(pat)),
        parent=lambda p: str(pathlib.Path(p).parent),
        get_arg=lambda *a: global_args.get(*a),
        split_list=lambda s: s.split(";"),
        zip=zip,
        enumerate=enumerate,
        debug=lambda *_: "",
    )
    try:
        return env.from_string(path.read_text(encoding="utf-8")).render(**ctx)
    except TemplateError as exc:
        report.error(f"{rel(path)}: {type(exc).__name__}: {exc}")
        return ""


def load_args_file(path: pathlib.Path, global_args: dict, report: Report):
    """Load an args file: render it first if it is a template, then parse."""
    text = path.read_text(encoding="utf-8")
    if path.suffix == ".jinja":
        text = render(path, global_args, None, report)
        path = path.with_suffix("")  # so the suffix check below sees .md / .json
    if path.suffix in (".md", ".mdd"):
        try:
            return markdowndata.loads(text)
        except Exception as exc:
            report.error(f"{rel(path)}: could not parse as MarkdownData: {exc}")
            return None
    if path.suffix == ".json":
        return json.loads(text)
    report.error(f"{rel(path)}: unsupported args file type")
    return None


def rel(path: pathlib.Path) -> str:
    try:
        return str(path.relative_to(CM.parent))
    except ValueError:
        return str(path)


class Walker:
    def __init__(self, global_args: dict, report: Report, dump: pathlib.Path | None = None) -> None:
        self.global_args = global_args
        self.report = report
        self.dump = dump
        self.declared: dict[str, str] = {}       # id -> "type in file"
        self.references: list[tuple[str, str, str]] = []  # (kind, id, where)
        self.groups: list[tuple[str, int]] = []
        self.module_items: dict[str, list[str]] = {}

    def walk_file(self, path: pathlib.Path, args=None) -> None:
        if not path.exists():
            self.report.error(f"missing file: {rel(path)}")
            return
        text = render(path, self.global_args, args, self.report) if ".jinja" in path.suffixes \
            else path.read_text(encoding="utf-8")
        if self.dump is not None:
            out = self.dump / (path.name + ".rendered")
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(text, encoding="utf-8")
        self.walk_xml(text, path)

    def walk_xml(self, text: str, origin: pathlib.Path) -> None:
        soup = BeautifulSoup(text, "html.parser")
        current_module: str | None = None

        for tag in soup.find_all(True):
            name = tag.name

            # --- declarations ---
            if name in DECLARING_TAGS:
                rid = tag.get("id")
                if rid:
                    if rid in self.declared:
                        self.report.error(
                            f"duplicate id '{rid}': declared in {self.declared[rid]} "
                            f"and again as <{name}> in {rel(origin)}"
                        )
                    else:
                        self.declared[rid] = f"<{name}> in {rel(origin)}"
                elif name not in ("group",):
                    self.report.error(f"<{name}> without an id in {rel(origin)}")
                if name == "module":
                    current_module = rid
                    self.module_items.setdefault(rid, [])
                if name == "group":
                    try:
                        self.groups.append((rid or tag.get("name", "?"), int(tag.get("weight", 0))))
                    except ValueError:
                        self.report.error(f"group '{rid}' has a non-numeric weight in {rel(origin)}")

            # --- references ---
            if name == "item":
                cid = tag.get("content_id") or tag.get("content_ID")
                itype = (tag.get("type") or "").lower()
                if cid:
                    self.references.append(("item", cid, rel(origin)))
                    if current_module is not None:
                        if cid in self.module_items[current_module]:
                            self.report.error(
                                f"module '{current_module}' lists '{cid}' twice — "
                                f"mdxcanvas cannot order a module with a duplicated item"
                            )
                        self.module_items[current_module].append(cid)
                elif itype not in ("subheader", "externalurl", "syllabus"):
                    self.report.error(f"<item type='{itype}'> without content_id in {rel(origin)}")

            if name == "course-link":
                lid = tag.get("id")
                if lid:
                    self.references.append(("course-link", lid, rel(origin)))

            if name == "assignment":
                grp = tag.get("assignment_group")
                if grp:
                    self.references.append(("assignment_group", grp, rel(origin)))

            # --- paths ---
            if name in PATH_TAGS:
                p = tag.get("path")
                if p:
                    resolved = (origin.parent / p).resolve()
                    if not resolved.exists():
                        self.report.error(f"<{name} path=\"{p}\"> not found, from {rel(origin)}")
                    elif name == "include":
                        args_attr = tag.get("args")
                        sub_args = None
                        if args_attr:
                            args_path = (origin.parent / args_attr).resolve()
                            if not args_path.exists():
                                self.report.error(f"args file not found: {args_attr}, from {rel(origin)}")
                            else:
                                sub_args = load_args_file(args_path, self.global_args, self.report)
                        if resolved.suffix in (".jinja", ".xml") or ".xml" in resolved.suffixes:
                            self.walk_file(resolved, sub_args)

    def check(self) -> None:
        for kind, rid, where in self.references:
            if rid not in self.declared:
                self.report.error(f"{kind} '{rid}' in {where} refers to nothing declared")

        total = sum(w for _, w in self.groups)
        if self.groups and total != 100:
            self.report.error(
                f"assignment group weights total {total}, not 100: "
                + ", ".join(f"{g}={w}" for g, w in self.groups)
            )

        for rid, origin in sorted(self.declared.items()):
            if rid.startswith("pg-") or rid.startswith("s") and rid[1:].isdigit():
                if not any(r[1] == rid for r in self.references):
                    self.report.warn(f"'{rid}' ({origin}) is declared but never placed in a module")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--target", default="fall26",
                    help="course_info target to validate against (default: fall26)")
    ap.add_argument("--dump", metavar="DIR", type=pathlib.Path,
                    help="also write each rendered template to DIR, to read what would deploy "
                         "(mdxcanvas' --dryrun is not a preview: it still deploys)")
    opts = ap.parse_args()

    report = Report()
    try:
        global_args = load_global_args(opts.target)
    except FileNotFoundError as exc:
        print(f"no such target '{opts.target}': {exc}")
        return 1

    print(f"validating canvas_material against target '{opts.target}'")
    walker = Walker(global_args, report, dump=opts.dump)
    walker.walk_file(CM / "course_content.canvas.md.xml.jinja")
    walker.check()
    return report.summarize()


if __name__ == "__main__":
    sys.exit(main())
