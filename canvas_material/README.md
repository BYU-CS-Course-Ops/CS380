# Canvas Material

Everything Canvas shows CS 301R students is generated from this directory by
[mdxcanvas](https://github.com/BYU-CS-Course-Ops/mdx-canvas).
`course_content.canvas.md.xml.jinja` is the top-level file; it declares course
settings and assignment groups, pulls in the pages, session pages, and
assignments around it, and lays out the modules.

**The dividing line for the repo:** everything under `canvas_material/` is
student-facing. Everything outside it — instructor outlines, `rubrics.md`, the
design doc, `development/` — is not.

## Layout

```
course_content.canvas.md.xml.jinja   top-level: settings, groups, includes, modules
canvas.css                           course palette, baked into inline styles at deploy
macros.jinja                         banner() and card(), shared by every template
deploy.sh                            ./canvas_material/deploy.sh <target>
validate_canvas_material.py          pre-deploy checks; never touches Canvas

course_info/
  cs301r_<target>.json               API url, course id, timezone, nav, course name
  global_args_<target>.json          every date in the course, and nothing else does

lectures/
  session-pages.canvas.md.xml.jinja  template: one Canvas page per class session
  session-pages-args.md.jinja        per-session metadata (27 blocks)
  session-pages/                     the prose body of each session page
  powerpoint/                        slide decks, linked from the session page

assignments/
  checkpoints.canvas.md.xml.jinja    template: CP1–CP12
  checkpoints-args.md.jinja          due dates, points, groups, submission types
  completion-items.canvas.*.jinja    template: the credit/no-credit deliverables
  completion-items-args.md.jinja
  handouts/                          the student handout for each assignment

pages/
  pages.canvas.md.xml.jinja          template: standalone content pages
  pages-args.md                      id, title, source file, publish state
  syllabus.md.jinja                  feeds the <syllabus> tag
  course-home.md.jinja               feeds the front page
  *.md / *.md.jinja                  readings, handouts, teaching samples

resources/
  *.pdf                              printable worksheets, uploaded as Canvas files
  *.html                             the print-CSS source each PDF is rendered from
  img/                               images used by decks and pages
```

**Page or resource?** If the source is Markdown prose, it is a page — students
link to it, search it, and read it in the browser. If it is a printable or a
binary (PDF, PPTX, image), it is a file in `resources/` and gets linked with
`<file>`. `cps_handbook.pdf` is neither: it is third-party copyrighted material,
gitignored, never uploaded, and always linked at its Berkeley URL through
`CPS_HANDBOOK_URL`.

## Deploying

```
export CANVAS_API_TOKEN=...
./canvas_material/deploy.sh sandbox      # rehearse
./canvas_material/deploy.sh fall26       # live (asks you to type the course id)
```

`deploy.sh` validates first and refuses to continue if validation fails.

**`--dryrun` is not a preview.** Despite the name it still deploys — mdxcanvas'
own notes say "dryrun reaches only deployment logging; deployment and cleanup
continue." To read what *would* go up, use the validator's `--dump` instead:

```
python3 canvas_material/validate_canvas_material.py --target fall26 --dump /tmp/rendered
```

`--cleanup` is always on, which is what makes this repo the source of truth: a
resource deleted here is deleted in Canvas. It is also what makes a mistake
expensive, so `deploy.sh` requires you to type the course id for any target that
is not `sandbox`.

> **Sandbox currently points at the live course (36756).** Until a real sandbox
> shell exists, "rehearsing" means deploying to students. Change
> `course_info/cs301r_sandbox.json` as soon as there is somewhere safe to aim it.

## Validating

```
python3 canvas_material/validate_canvas_material.py --target fall26
```

It renders the whole content tree the way mdxcanvas does — Jinja with the
target's global args, MarkdownData for the args files, recursing through every
`<include>` — and then checks for undefined variables, dangling `content_id`
references, duplicate ids, module items listed twice, missing file paths, and
assignment group weights that do not total 100. It needs the same environment
mdxcanvas runs in (bs4, jinja2, markdowndata) and never contacts Canvas.

## Dates

**Every date in the course lives in `course_info/global_args_<target>.json`, and
nowhere else.** Rolling to a new semester should be: copy that file, change the
dates, change nothing else.

The session schedule is the spine. Checkpoints are due *at a session*, so they
reference the session's key rather than repeating its date — CP1 is due at
Session 6, so its args row reads `{{ S06_DATE }}` and `{{ S06_DAY }}`. Move a
session and every deliverable on it moves too. Only dates that are genuinely not
a class meeting get their own key: the team-preference Sunday, Demo Day,
Thanksgiving, the peer-evaluation windows, add/drop.

Handouts and session prose are `.md.jinja` for the same reason. A file becomes
`.md.jinja` the moment it contains a `{{ }}`; a plain `.md` never gets rendered,
and its braces ship to students verbatim.

## Things that bite

**A missing args key does not raise at deploy time.** Jinja renders an undefined
variable as the empty string, so a typo'd date key produces
`due_at=", 2026, 9:00 AM"` and fails much later in date parsing. Behind a title
or a sentence it fails nothing at all and is simply wrong on Canvas. The
validator renders with `StrictUndefined` precisely for this.

**Keep the two global_args files' key sets identical.** `global_args_sandbox`
is a clone of the live file. A key added to one and not the other means CI
passes while your test deploy fails, or the reverse.

**The `===` block in an args file is parsed as YAML.** A value containing a
colon must be quoted, or the parse dies with a YAML error that does not mention
your file. `Title: "Git for Maintainers: The Workflow You'll Enforce"`.

**markdowndata flattens single-section blocks.** A session with only a `===`
block has its fields at the top level; a session that also has `## Due` or
`## Materials` has them nested under `content`. The session template handles
both — `info['content'] if 'content' in info else info` — and so must anything
new that reads those args.

**Write `&amp;`, not `&`, in any args value that lands in an XML attribute.**
Titles do.

**Ids are permanent.** `s01`, `cp1`, `pg-mom-test-summary`, `grp-discovery`.
Renaming one orphans the Canvas resource it names and every `content_id`
pointing at it starts referring to nothing. Change titles freely; never change
ids.

**Paths resolve against the file containing the tag, not the deploy root.** A
`<file path="...">` inside `lectures/session-pages.canvas.md.xml.jinja` resolves
from `lectures/`, which is why resource links there start `../resources/`. The
same tag inside an included prose page resolves from `lectures/session-pages/`.

**CSS is baked into inline styles with BeautifulSoup selectors.** No `:hover`,
no `@media`, no pseudo-elements — they are silently dropped. Every rule must
target an element the templates actually emit.

## Still open

- `CP12_DUE` is a placeholder within `DEMO_DAY_WINDOW`. BYU assigns the finals
  block by class meeting time — now known (M/W 9:30 AM) — so the slot can be
  confirmed with the registrar and pinned here.
- Room is still TBD in the syllabus.
- Session pages 10–27 deploy **unpublished** — they have no prose yet, only
  dates, due items, and module placement. Write the page, flip `Publish` to
  `"true"` in `session-pages-args.md.jinja`.
- Decks exist for Sessions 1–9. The slides card only renders when the file is
  actually on disk, so later sessions simply have no slides block.
