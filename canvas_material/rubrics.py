#!/usr/bin/env python3
"""Canvas rubrics for the CS 301R checkpoints, from assignments/rubrics.yaml.jinja.

mdxcanvas has no rubric resource, so this runs after deploy.sh and attaches a
Canvas rubric to each checkpoint whose rubric is marked `publish: true`. The
rubric is set to grade the assignment: scoring it in SpeedGrader fills in the
score.

    python3 canvas_material/rubrics.py check    [--target fall26]
    python3 canvas_material/rubrics.py deploy   <target> [--dry-run] [--only cp1,cp3] [--force]
    python3 canvas_material/rubrics.py instructor-md

check          Validate the YAML: weights total 100, every level filled in,
               ids match checkpoints-args, and no assignment is published with
               an unpublished rubric. No network. The validator runs this too.
deploy         Create or update the Canvas rubric on each published checkpoint.
               Unchanged rubrics are left alone. A rubric that already has
               scores on it is never changed unless --force is given, because
               editing a rubric mid-grading changes what earlier scores mean.
               Needs CANVAS_API_TOKEN, and the assignments must already exist
               (run deploy.sh first).
instructor-md  Regenerate the instructor view, rubrics.md at the repo root.

Scoring: a criterion's ratings are (level ÷ 4) × weight, plus an explicit
Absent = 0 rating, so a weight-25 criterion rates 25 / 18.75 / 12.5 / 6.25 / 0.
Canvas shows plain text, so <course-link> tags and Markdown emphasis are
stripped from everything sent to it.
"""
from __future__ import annotations

import argparse
import html
import json
import os
import pathlib
import re
import sys

import markdowndata
import yaml
from jinja2 import Environment, FileSystemLoader, StrictUndefined

CM = pathlib.Path(__file__).resolve().parent
ROOT = CM.parent
RUBRICS = CM / "assignments" / "rubrics.yaml.jinja"
CHECKPOINT_ARGS = CM / "assignments" / "checkpoints-args.md.jinja"
INSTRUCTOR_MD = ROOT / "rubrics.md"

LEVELS = ("exemplary", "proficient", "developing", "beginning")


# --------------------------------------------------------------------- loading

def load_global_args(target: str) -> dict:
    """GLOBAL_ARGS from course_info, overlaid by global_args (mdxcanvas' precedence)."""
    info = json.loads((CM / "course_info" / f"cs301r_{target}.json").read_text(encoding="utf-8"))
    args = dict(info.get("GLOBAL_ARGS", {}))
    args.update(json.loads((CM / "course_info" / f"global_args_{target}.json").read_text(encoding="utf-8")))
    return args


def _render(path: pathlib.Path, global_args: dict) -> str:
    env = Environment(loader=FileSystemLoader([str(path.parent), str(CM)]), undefined=StrictUndefined)
    return env.from_string(path.read_text(encoding="utf-8")).render(**global_args)


def load_rubrics(global_args: dict) -> dict:
    return yaml.safe_load(_render(RUBRICS, global_args))


def load_checkpoints(global_args: dict) -> list[dict]:
    return markdowndata.loads(_render(CHECKPOINT_ARGS, global_args))


# ----------------------------------------------------------------------- check

def check(data: dict, checkpoints: list[dict]) -> list[str]:
    """Every problem found, as a message. Empty means clean."""
    errors = []
    rubrics = data.get("rubrics") or {}
    cps = {cp["Id"]: cp for cp in checkpoints}

    for rid, r in rubrics.items():
        where = f"rubrics.yaml: {rid}"
        if rid not in cps:
            errors.append(f"{where}: no checkpoint with that id in checkpoints-args")
        for field in ("title", "subtitle", "phase", "publish", "criteria"):
            if field not in r:
                errors.append(f"{where}: missing '{field}'")
        if r.get("phase") not in (data.get("phases") or {}):
            errors.append(f"{where}: phase {r.get('phase')!r} is not in phases")
        criteria = r.get("criteria") or []
        total = 0
        names = set()
        for i, c in enumerate(criteria):
            cwhere = f"{where}, criterion {i + 1} ({c.get('name', '?')})"
            if not c.get("name"):
                errors.append(f"{cwhere}: no name")
            if c.get("name") in names:
                errors.append(f"{cwhere}: duplicate name")
            names.add(c.get("name"))
            if not isinstance(c.get("weight"), int) or c["weight"] <= 0:
                errors.append(f"{cwhere}: weight must be a positive integer")
            else:
                total += c["weight"]
            if not c.get("measures"):
                errors.append(f"{cwhere}: no 'measures' line")
            levels = c.get("levels") or {}
            for lv in LEVELS:
                if not levels.get(lv):
                    errors.append(f"{cwhere}: level '{lv}' is empty")
            for extra in set(levels) - set(LEVELS):
                errors.append(f"{cwhere}: unknown level '{extra}'")
        if total != 100:
            errors.append(f"{where}: weights total {total}, not 100")
        if r.get("publish") and not r.get("looking_for"):
            errors.append(f"{where}: published, but has no student-facing 'looking_for' notes")

        cp = cps.get(rid)
        if cp and str(cp.get("Publish")).lower() == "true" and not r.get("publish"):
            errors.append(f"{where}: the assignment is published but its rubric is not — "
                          f"students would see an assignment with no grid")
        if cp and str(cp.get("Points")) != "100":
            errors.append(f"{where}: checkpoint is worth {cp.get('Points')} points; rubrics total 100")

    for cid in cps:
        if cid not in rubrics:
            errors.append(f"rubrics.yaml: checkpoint {cid} has no rubric")
    return errors


# ------------------------------------------------------------ Canvas rendering

def plain(text: str) -> str:
    """Markdown/HTML field → the plain text Canvas rubric fields display."""
    text = re.sub(r"<[^>]+>", "", str(text))
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"\1", text)
    return re.sub(r"\s+", " ", text).strip()


def points(weight: int, level_points: int) -> float:
    p = weight * level_points / 4
    return int(p) if p == int(p) else p


def desired_criteria(r: dict, scale: list[dict]) -> list[dict]:
    """The Canvas criteria for one rubric, highest rating first."""
    level_points = {s["level"].lower(): s["points"] for s in scale}
    absent = next(s for s in scale if s["points"] == 0)
    out = []
    for c in r["criteria"]:
        ratings = [{
            "description": lv.capitalize(),
            "long_description": plain(c["levels"][lv]),
            "points": points(c["weight"], level_points[lv]),
        } for lv in LEVELS]
        ratings.append({
            "description": absent["level"],
            "long_description": plain(absent["meaning"]),
            "points": 0,
        })
        out.append({
            "description": plain(c["name"]),
            "long_description": plain(c["measures"]),
            "points": c["weight"],
            "ratings": ratings,
        })
    return out


def _normalize(criteria: list[dict]) -> list:
    """Comparable form of a criteria list, from YAML or from the Canvas API.

    Canvas hands a criterion's long_description back HTML-escaped (&#39;, &quot;)
    though it stores what was sent, so text is unescaped before comparing.
    """
    def num(x):
        return round(float(x or 0), 4)

    def txt(x):
        return html.unescape(x or "")
    return [(
        txt(c.get("description")), txt(c.get("long_description")), num(c.get("points")),
        [(txt(rt.get("description")), txt(rt.get("long_description")), num(rt.get("points")))
         for rt in sorted(c.get("ratings") or [], key=lambda rt: -float(rt.get("points") or 0))],
    ) for c in criteria]


def form_payload(title: str, criteria: list[dict], assignment_id: int) -> dict:
    """Canvas' rubric endpoints take nested form fields, not JSON."""
    data = {
        "rubric[title]": title,
        "rubric[free_form_criterion_comments]": "0",
        "rubric_association[association_type]": "Assignment",
        "rubric_association[association_id]": str(assignment_id),
        "rubric_association[use_for_grading]": "1",
        "rubric_association[hide_score_total]": "0",
        "rubric_association[purpose]": "grading",
    }
    for i, c in enumerate(criteria):
        base = f"rubric[criteria][{i}]"
        data[f"{base}[description]"] = c["description"]
        data[f"{base}[long_description]"] = c["long_description"]
        data[f"{base}[points]"] = str(c["points"])
        data[f"{base}[criterion_use_range]"] = "false"
        for j, rt in enumerate(c["ratings"]):
            data[f"{base}[ratings][{j}][description]"] = rt["description"]
            data[f"{base}[ratings][{j}][long_description]"] = rt["long_description"]
            data[f"{base}[ratings][{j}][points]"] = str(rt["points"])
    return data


# ---------------------------------------------------------------------- deploy

class CanvasClient:
    def __init__(self, api_url: str, course_id: int, token: str):
        import requests
        self.base = api_url.rstrip("/") + "/api/v1"
        self.course_id = course_id
        self.s = requests.Session()
        self.s.headers["Authorization"] = f"Bearer {token}"

    def _req(self, method: str, path: str, **kw):
        resp = self.s.request(method, f"{self.base}{path}", **kw)
        if not resp.ok:
            raise RuntimeError(f"{method} {path} → {resp.status_code}: {resp.text[:500]}")
        return resp.json() if resp.content else None

    def course(self, path: str = "") -> str:
        return f"/courses/{self.course_id}{path}"

    def assignment_ids(self) -> dict[str, int]:
        """mdxcanvas id → Canvas assignment id, from the _md5sums.json mdxcanvas keeps in the course."""
        files = self._req("GET", self.course("/files"), params={"search_term": "_md5sums", "per_page": 50})
        match = [f for f in files if f.get("display_name") == "_md5sums.json"]
        if not match:
            raise RuntimeError("no _md5sums.json in the course — has deploy.sh run against this target?")
        import requests
        data = requests.get(match[0]["url"]).json()
        resources = data.get("resources", data)
        out = {}
        for key, entry in resources.items():
            rtype, _, rid = key.partition("|")
            if rtype == "assignment" and entry.get("canvas_info"):
                out[rid] = int(entry["canvas_info"]["id"])
        return out

    def assignment(self, aid: int) -> dict:
        return self._req("GET", self.course(f"/assignments/{aid}"))

    def assessment_count(self, rubric_id: int) -> int:
        r = self._req("GET", self.course(f"/rubrics/{rubric_id}"),
                      params={"include[]": "assessments", "style": "comments_only"})
        return len(r.get("assessments") or [])

    def create(self, payload: dict) -> dict:
        return self._req("POST", self.course("/rubrics"), data=payload)

    def update(self, rubric_id: int, payload: dict) -> dict:
        return self._req("PUT", self.course(f"/rubrics/{rubric_id}"), data=payload)


def deploy(target: str, dry_run: bool, only: set[str] | None, force: bool) -> int:
    global_args = load_global_args(target)
    data = load_rubrics(global_args)
    errors = check(data, load_checkpoints(global_args))
    if errors:
        print("rubrics.yaml has problems; fix them before deploying:")
        for e in errors:
            print(f"  ✗ {e}")
        return 1

    info = json.loads((CM / "course_info" / f"cs301r_{target}.json").read_text(encoding="utf-8"))
    token = os.environ.get("CANVAS_API_TOKEN")
    if not token:
        print("CANVAS_API_TOKEN is not set")
        return 1
    client = CanvasClient(info["CANVAS_API_URL"], info["CANVAS_COURSE_ID"], token)
    print(f"==> rubrics for course {info['CANVAS_COURSE_ID']} ({target}){'  [dry run]' if dry_run else ''}")

    ids = client.assignment_ids()
    failed = 0
    for rid, r in data["rubrics"].items():
        if only and rid not in only:
            continue
        if not r.get("publish"):
            print(f"  -  {rid}: rubric not published yet (publish: false) — skipped")
            continue
        if rid not in ids:
            print(f"  ✗  {rid}: assignment not found in Canvas — run deploy.sh first")
            failed += 1
            continue

        aid = ids[rid]
        title = plain(r["title"])
        criteria = desired_criteria(r, data["scale"])
        payload = form_payload(title, criteria, aid)
        a = client.assignment(aid)
        settings = a.get("rubric_settings") or {}
        existing_id = settings.get("id")

        if existing_id is None:
            if dry_run:
                print(f"  +  {rid}: would create “{title}” ({len(criteria)} criteria)")
            else:
                client.create(payload)
                print(f"  +  {rid}: created “{title}”")
            continue

        same = (_normalize(a.get("rubric") or []) == _normalize(criteria)
                and settings.get("title") == title
                and a.get("use_rubric_for_grading"))
        if same:
            print(f"  =  {rid}: up to date")
            continue

        scored = client.assessment_count(existing_id)
        if scored and not force:
            print(f"  !  {rid}: changed, but {scored} submission(s) are already scored with it — "
                  f"not updating (rerun with --force to change it anyway)")
            failed += 1
            continue
        if dry_run:
            print(f"  ~  {rid}: would update “{title}”" + (f" (overwriting {scored} scored)" if scored else ""))
        else:
            client.update(existing_id, payload)
            print(f"  ~  {rid}: updated “{title}”")

    return 1 if failed else 0


# --------------------------------------------------------------- instructor md

INSTRUCTOR_HEADER = """\
<!-- GENERATED from canvas_material/assignments/rubrics.yaml.jinja by
     `python3 canvas_material/rubrics.py instructor-md`. Do not edit here. -->

# CS 301R — Assignment Rubrics (instructor view)

*Software Engineering Studio I: Founding an Open-Source Project.* Companion to `CS301R-ProjectCreation_v4.md` (design) and `development/CS301R-Schedule-Fall2026.md` (dates).

One analytic grid per graded checkpoint (CP1–CP12, design §6): weighted criteria scored across four performance levels. Derived from the rubric dimensions in design §12, the selection criteria in §9, and the assessment weights in §8.

**The source of truth is `canvas_material/assignments/rubrics.yaml.jinja`.** It generates this file, the student-facing Assignment Rubrics page, the "What it measures" table in each handout, and the Canvas rubric attached to each checkpoint (`canvas_material/rubrics.py deploy`). Dates below are rendered for the fall26 target.

**Status.** *Published* rubrics carry reviewed, student-facing wording and are live on the rubrics page and in Canvas. *Draft* rubrics still carry the first-cut instructor wording.

---

## How to read these rubrics

| Level | Points | Meaning |
|---|---|---|
{scale_rows}

**Scoring.** Each rubric's weights sum to **100 points**. A criterion's contribution = (level points ÷ 4) × criterion weight. In Canvas each criterion carries five ratings, e.g. 25 / 18.75 / 12.5 / 6.25 / 0 for a weight-25 criterion. The 100-point score counts toward the course weight on the assignment group.

**Individual vs. team (design §8).** CP1–CP4 are individually graded. From CP5 on, shared artifacts get a **team grade adjusted by individual-contribution evidence** — per-student git history/PRs, a contribution log, and confidential peer evaluations at midpoint and end. Solo students are graded on the same criteria at one-person scope. *In Canvas: score the rubric, then override the total for any individual adjustment; the rubric scores stay on record.*

**Revision policy.** Major artifacts (proposal, design doc, infrastructure package) may be revised within a defined window after feedback; rubrics reward **evidence of revision** explicitly — iteration is the point.

**Pass conditions.** To pass, a student must reach at least **Developing** on every criterion of the discovery brief, written proposal, pitch, design doc, infrastructure package, MVP, and final presentation. Strong code cannot compensate for a missing founding artifact. *Canvas does not enforce this or the CP3 draft cap; apply them when scoring.*

---
"""

INSTRUCTOR_FOOTER = """
---

## Course-weight reconciliation (design §8)

| Graded bundle | Rubrics | Course weight |
|---|---|---|
| Discovery | CP1 + CP2 | 10% |
| Written Proposal | CP3 | 12% |
| Pitch #1 | CP4 | 8% |
| Design Document | CP5 | 12% |
| Project Infrastructure Package | CP7 | 12% |
| Git Lab + Tech-Comm Portfolio | CP6 + CP9 | 12% |
| Project Plan & Roadmap | CP8 | 8% |
| MVP / Prototype | CP10 | 16% |
| Final + Launch + Retro | CP11 + CP12 | 10% |
| **Total** | | **100%** |

*Within a bundle, split the bundle weight across its rubrics (suggested even split unless noted): Discovery 5%/5%; Git Lab + Portfolio 6%/6%; Final bundle 5%/5%. Adjust to taste.*

---

## Notes for the next revision

- **Calibrate point weights** against a couple of real student artifacts once the first cohort submits — the within-rubric weights are first estimates.
- **Decide bundle splits** explicitly (Discovery, Git+Tech-Comm, Final) rather than the suggested even splits if some artifacts deserve more.
- **Peer-evaluation system:** drafted — see `development/Peer-Evaluation-System.md` (design + grade-flow mechanics), the Pitch Evaluation Sheet (Pitch Day instrument), and the Peer Evaluation Form (midpoint/end confidential evals).
- **Revision-window mechanics** (how regrades after revision are averaged or replaced) should be pinned down before the term.
"""


def instructor_md() -> int:
    data = load_rubrics(load_global_args("fall26"))
    scale_rows = "\n".join(f"| **{s['level']}** | {s['points']} | {s['meaning']} |" for s in data["scale"])
    out = [INSTRUCTOR_HEADER.format(scale_rows=scale_rows)]
    phase = None
    for rid, r in data["rubrics"].items():
        if r["phase"] != phase:
            phase = r["phase"]
            out.append(f"\n# {data['phases'][phase]}\n")
        status = "published" if r["publish"] else "draft — not yet in student-facing wording"
        out.append(f"## {r['title']}\n*{r['subtitle']}* · **{status}**\n")
        out.append("| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |")
        out.append("|---|---|---|---|---|---|")
        for c in r["criteria"]:
            lv = c["levels"]
            out.append(f"| {c['name']} | {c['weight']} | " + " | ".join(lv[k] for k in LEVELS) + " |")
        out.append("\n**What it measures** (handout table, Canvas criterion description).")
        out += [f"- **{c['name']}** — {c['measures']}" for c in r["criteria"]]
        if r.get("looking_for"):
            out.append("\n**What each criterion is looking for** (student-facing, rubrics page).")
            out += [f"- {b}" for b in r["looking_for"]]
        if r.get("instructor_notes"):
            out.append("\n**Instructor notes.**")
            out += [f"- {b}" for b in r["instructor_notes"]]
        out.append("")
    out.append(INSTRUCTOR_FOOTER)
    INSTRUCTOR_MD.write_text("\n".join(out), encoding="utf-8")
    print(f"wrote {INSTRUCTOR_MD.relative_to(ROOT)}")
    return 0


# ------------------------------------------------------------------------ main

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("check", help="validate rubrics.yaml (no network)")
    c.add_argument("--target", default="fall26")
    d = sub.add_parser("deploy", help="create/update Canvas rubrics")
    d.add_argument("target")
    d.add_argument("--dry-run", action="store_true", help="report what would change; write nothing")
    d.add_argument("--only", help="comma-separated rubric ids, e.g. cp1,cp3")
    d.add_argument("--force", action="store_true", help="update rubrics that already have scores")
    sub.add_parser("instructor-md", help="regenerate rubrics.md")
    opts = ap.parse_args()

    if opts.cmd == "check":
        ga = load_global_args(opts.target)
        errors = check(load_rubrics(ga), load_checkpoints(ga))
        for e in errors:
            print(f"✗ {e}")
        print("rubrics: OK" if not errors else f"rubrics: {len(errors)} problem(s)")
        return 1 if errors else 0
    if opts.cmd == "deploy":
        only = set(opts.only.split(",")) if opts.only else None
        return deploy(opts.target, opts.dry_run, only, opts.force)
    return instructor_md()


if __name__ == "__main__":
    sys.exit(main())
