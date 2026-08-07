# CLAUDE.md — CS 301R Course Development (Fall 2026)

Context for continuing development of **CS 301R — Software Engineering Studio I: Founding an Open-Source Project** (BYU, Fall 2026, M/W 75-min sessions, Sep 2 – Dec 9 + finals-week Demo Day). The instructor is Dr. Tom Stephens (tstephen@cs.byu.edu). Work so far was done in Claude Cowork; this file is the handoff.

## What this course is

Students **found** an open-source project (vs. contributing to one): find and validate a real need, propose and pitch it, form teams (~2–4, solo allowed), design, build an MVP in the open, and launch it contributor-ready. Grounded in the Osborn–Parnes CPS spine (divergent→convergent), the BYU Mission / Aims of a BYU Education, and the SE emphasis's 5 C's (Christlike, Creative, Collaborative, Capable, Curious). Prior-year contributor-focused course lives in `open-source-project-course/` (reference/reusable material only — mention it organically, don't build against it).

## Source of truth documents

- `CS301R-ProjectCreation_v4.md` — **the course design doc** (outcomes, week-by-week §7, assessment §8, selection criteria §9, required repo artifacts §10, policies §11, open questions §14). Ground everything here.
- `development/CS301R-Schedule-Fall2026.md` — real dates: 27 sessions (Labor Day + Thanksgiving absorb 2), checkpoint due-date table, finals-week Demo Day note.
- `rubrics.md` — all 12 CP rubrics (100-pt analytic grids, 4 levels, weighted criteria) + bundle-weight reconciliation.
- `development/Peer-Evaluation-System.md` — peer-eval design (v1 draft, has ⚑ decision points awaiting Tom's review).

## Directory map

- `lectures/` — 27 instructor outlines (`SessionNN-MonDD-Outline.md`, all complete) + finished decks for **Sessions 1–7** (`Session01-CourseLaunch.pptx`, `Session02-Divergent.pptx`, `Session03-OpenSource.pptx`, `Session04-Discovery.pptx`, `Session05-Feasibility.pptx`, `Session06-Convergence.pptx`, `Session07-ProposalAnatomy.pptx`). Session 8 onward have outlines only. `SessionNN-*-png/` dirs are render-pass output from `tools/render-deck.sh`, regenerable and safe to delete.
- `assignments/` — 17 student handouts, complete: CP1–CP12, Idea-Journal, Discovery-Notes, License-OSS-Short-Response, Team-Charter, MVP-Plan. All follow a fixed format (see Conventions).
- `resources/` — student handouts/templates: License-Cheat-Sheet, Mom-Test-Summary, Good-vs-Leading-Questions, Interview-Prompt-Cards, Interview-Ethics-for-Students (BYU IRB-grounded), Persona-Template, Persona-Examples (honest "Commuter Cara" vs. fabricated "Busy Ben"), the CPS handbook (**linked, not committed** — third-party copyright; student-facing references point to the [Berkeley-hosted PDF](https://brdo.berkeley.edu/sites/default/files/cps_handbook.pdf) with page numbers, and a local working copy at `resources/cps_handbook.pdf` is gitignored), Feasibility-Risk-Worksheet, Learning-Plan-Template, Idea-Scoring-Sheet, Pitch-Evaluation-Sheet, Peer-Evaluation-Form, Spikes-Reading, PRD-Reference, Proposal-Anatomy-Reading (Session 7's primary reading; nine sections + the four checks + the order to write them in), and the paired teaching samples Sample-Proposal-Strong / Sample-Proposal-Weak (*same* project — a community-theater costume catalog — written well and badly; invented evidence, labeled as such; dissected in Session 7 §4).
- `canvas_material/lectures/` — student-facing LMS pages, **Sessions 1–6 only so far**.
- `development/` — design docs, schedule, `V3_prompt.md`, `CPS-Handbook-source-evaluation.md` (instructor-only: why the Knowinnovation handbook was chosen, alternatives considered, and the assigned page subset — *not* a student handout).
- `tools/` — the pptx deck build scripts (`build-sessionNN.js`).
- `open-source-project-course/` — the 2025–26 course (readings bank in `modules/`; Canvas Jinja deploy infra in `_canvas_material/`; outreach email drafts in `emails/`).

## Conventions (follow these exactly)

**Lecture outlines** (`lectures/SessionNN-MonDD-Outline.md`): title header block (course, session N of 27, date, 75-min block) → Prior reading (all free, linked; workshops get "Prior prep" instead) → "Maps to: Design Week N, Session A/B — *quoted v4 text*" → status blockquote → Purpose → Learning objectives (numbered) → Instructor prep / materials → Timed outline (≈75 min, numbered sections with minute counts) → Threads to carry forward → Open questions / decisions → Deliverable / after class → Appendix (handouts) → next-step footer. Sessions build on each other explicitly (recurring threads: review protocol, vertical slice, stranger's-eye checklist, three final questions).

**Assignments** (`assignments/`): header (checkpoint #, individual/team, assigned/due dates, weight) → "The short version" → **"Why this assignment exists"** (required: the skill, the course arc, and life beyond) → What to produce → Requirements & constraints → Grading (full rubric table: Criterion / Weight / What it measures, + levels line) → Tips and common pitfalls → Submission → italic footer linking the arc. Non-CP deliverables (Team Charter, License/OSS, MVP Plan) are completion-graded with check tables instead.

**Slide decks:** built with Node + `pptxgenjs`, icons via `react-icons/fa` rasterized through `sharp`. Scripts in `tools/` (`build-sessionNN.js`); each is self-contained. To run: `npm install pptxgenjs react react-dom react-icons sharp` (in `tools/`), then `node build-sessionNN.js` (writes the .pptx to cwd; copy into `lectures/`).
- Shared helpers in every script: `mk()` (auto-increments PAGE — footers self-number, safe to insert slides), `footer(slide, colorOverride)`, `header(slide, kicker, title)`, `card()`, `iconCircle()`, `mkShadow()`; layout "W" = 13.3×7.5.
- Palette: navy `14233A`, navy2 `1E3352`, teal `12908F`, tealDk `0E6E6D`, amber `E8A33D`, coral `D9614C`, green `3E9C6B`, ink `1E2A36`, slate `5F7284`, cardBg `F2F6F8`. Fonts: Cambria (headings) / Calibri (body).
- **Big-font standard (75″ classroom screen):** body 15–17pt, card titles 18–20pt, section titles ~30–31pt, kicker 14pt, footer 10–11pt. Nothing smaller. **US units** everywhere (inches/oz/ft).
- **Presenter notes standard:** every slide gets a full note (~400 chars) — delivery guidance, what to emphasize, timing per slide, pitfalls (Sessions 1–4 are the model).
- **QA loop (required before delivering a deck).** Two lighter-weight checks replace the old LibreOffice→PDF→image loop (LibreOffice is **not** installed on the WSL/Ubuntu setup and isn't needed):
  1. **`node tools/verify-deck.js <deck.pptx>`** — render-free linter (default gate; run after every build). Parses the .pptx and measures text with the real Windows fonts to flag **text overflow** and **low-contrast text** (resolves z-order, so text on a card/band/circle is compared against *that* fill, not the slide bg). Non-zero exit on issues. Deps: `opentype.js`, `fast-xml-parser`, `jszip` (all in root `node_modules`). *Does not* check tables (`p:graphicFrame`), grouped shapes, or free-form overlap — height overflow is a ±10% estimate.
  2. **`tools/render-deck.sh <deck.pptx> [out_dir]`** — faithful pixels via the installed **Windows PowerPoint** (COM automation over WSL interop; `tools/export-pptx-png.ps1` does the export). Writes one PNG per slide for the occasional visual pass (overlap, tables, polish) the linter skips. **Run with PowerPoint closed** (the helper refuses otherwise, to avoid closing an open review session); `--dry-run` shows resolved paths without launching. Deck must live under `/mnt/<drive>/…`.
  - Past defects to keep watching for: banner/table overlap, low-contrast footer on teal, table overflow. *(The linter now catches the contrast + text-overflow classes automatically; overlap/tables still want the visual pass.)*

**Entry checks (use sparingly — three placements total).** Two distinct slide types, both ~2 min at the top of a session:
- **Reading check** — one question of the form *"name one X and what it is **for**"* (not the label, the job it does). Earned **only where class doesn't re-teach the reading**, i.e. where the session's timing is a bet on it: **Session 7** (built, slide 2) and **Session 11** (design-doc anatomy, noted in the outline; add when that deck is built). Everywhere else the session re-teaches its reading, so a check is theater — and at ten placements students learn the shape of the answer and it stops telling you anything.
- **Prep check** — a hands-up checklist of *materials*, not knowledge, for labs and assessment days where one unprepared student costs a classmate their session: **Session 14** (laptop · push access · policy checklist · CP5 nearly done) and **Session 22** (main frozen · fallback · auditors can clone · CP9 submitted), both noted in their outlines. Session 8's version is already the strongest, enforced by the CP3 *Argument & revision* cap rather than a slide.
- **Session 4** carries a related but different instrument — an **ethics gate** (deck slide 8) closing the consent section: four hands-up confirmations plus the two points the norms slide doesn't cover (the IRB boundary, power imbalance). It runs every time; it's the last gate before students interview real people.

**Printable classroom worksheets** (`resources/*-Worksheet.html` + matching `.pdf`): authored as a single self-contained HTML file with print CSS (`@page { size: letter; margin: ~0.42in 0.5in }`), Cambria headings / Calibri body, the deck palette (navy `14233A`, teal `12908F`, slate `5F7284`, cardBg `F2F6F8`), and rules/blanks sized for handwriting. Render with headless Chrome — LibreOffice isn't installed and isn't needed:
```
"/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer --print-to-pdf="C:\<win-path>\Name.pdf" "file:///C:/<win-path>/Name.html"
```
Both paths must be Windows-style. **Verify before delivering:** confirm one page (`/Count 1` and a single `/MediaBox [0 0 612 792]` in the PDF), and screenshot the HTML (`--screenshot --window-size=720,1010`) to eyeball wrapping — Chrome silently paginates overflow onto page 2, and long fill-in lines wrap ugly. Commit the `.html` source alongside the `.pdf`. First example: `resources/Proposal-Outline-Worksheet.*` (Session 7 §6).

**Framing rules (student-facing language, applied everywhere):**
- **General principle first; the course is the example.** This is the one most easily violated, and it applies to every student-facing artifact — readings above all, but also handouts, slides, and assignment prose. Teach the concept as it exists *in the world* (at work, on an open-source project, in a startup, on any timeline), then illustrate it with the course's concrete version. Write "the person you're recruiting — a coworker, a potential contributor, a co-founder *(in this course, a classmate at Pitch Day)*," **not** "a classmate deciding on Oct 7." Same for deadlines, checkpoints, rubrics, and the ~10 hrs/week budget: state the underlying move (know the criteria before you write; estimate against the hours that actually exist), then give the CS 301R instance as an italicized or parenthetical example. Students should leave with something that transfers; the course specifics are scaffolding, not the lesson. *(`resources/Proposal-Anatomy-Reading.md` and `resources/Spikes-Reading.md` are the models.)*
- "**Built to last / lasting**" — never "multi-semester" (that's instructor-side framing).
- "**Contributor-ready**"; "**you lead, others join to build**" — never "inherit/handoff/pass off."
- Hook line (Session 1): "Nearly every big open-source project you rely on **started as one or two people deciding** a problem was worth solving. This semester, that's you."
- Contributor-vs-founder contrast is respectful of the contributor role.
- Real users are the ideal; an honest evidence-tagged persona (`[E]`/`[A]`) is the accepted supplement this iteration. No seeded users — students find their own.
- AI policy voice: "AI is a tool, not the topic" — allowed for learning/drafting; students must understand and defend everything submitted.

**Key structural facts:** Weeks 1–5 individual (CP1–CP4); teams form at Pitch Day (Session 10, Oct 7); the three final questions (need? built? where next & how can others join?) structure CP12; weights per v4 §8 with suggested bundle splits Discovery 5/5, Git+TechComm 6/6, Final 5/5 (marked ≈, not finalized). Grading philosophy: process + founding artifacts over code alone; pass conditions require every major artifact at Developing+.

## Pending decisions (Tom's calls, flagged in the files)

1. ~~**License/OSS short response due date**~~ **resolved: Mon, Sep 21.** All materials now agree — handout, Session 4 materials, syllabus, schedule, and the Session 3 deck (rebuilt as `lectures/Session03-OpenSource-v2.pptx`; wrap slide now reads "before next class — Wed, Sep 16" for readings/journal and "License/OSS short response — due Mon, Sep 21" separately). *Consolidate v2 over the original once reviewed in PowerPoint.*
2. **Peer-eval ⚑ items** in `development/Peer-Evaluation-System.md`: platform, whether presenters see numeric averages, multiplier bounds (±10% proposed), midpoint weight, submission-required.
3. Policy floors proposed in outlines, not ratified: ≥1 non-author PR approval; MVP testing floor ("core slice logic has tests"); debug-log floor; demo-week main-freeze rule; recorded-clip fallback allowed as declared last resort; team-size/oversubscription handling. *(**Spike: ratified** — at least one spike required, graded in CP3 Feasibility.)*
4. **Pitch Day arithmetic** — fits ~8 pitches in 75 min; needs an enrollment-triggered plan (announced in Session 9).
5. ~~CP1+CP2 same-day turn-in mechanics~~ **resolved:** CP2 moved to Mon, Sep 28 (Session 7) so students converge at the Sep 23 workshop *then* write CP2; CP1 still due at the workshop. Only the CP1 in-class turn-in time is left to confirm (start-of-class recommended). CP7/CP8 submission = repo pointer (recommended).
6. ~~CP3 draft turn-in~~ **resolved:** the Sep 30 workshop draft is a required turn-in — LMS upload (completion-checked) **plus two printed copies** marked up on paper in class; scans/photos of both go in with the final on Oct 5. **No draft on file caps *Argument & revision* at Developing.** Reflected in CP3, `rubrics.md`, and the Session 7 + 8 outlines.
7. **Scope language, standardized:** ~10 hrs/week is the *total* course load (class, reading, discovery, writing, reviews included) and real building runs **roughly five weeks** (Weeks 9–13). Never gloss the one-semester MVP as "achievable at ~10 hrs/week"; the "10 × 14 = 140 hours" arithmetic is explicitly the failure mode. Swept through CP1, CP3, `rubrics.md` (CP3 + CP5), Idea-Scoring-Sheet, Pitch-Evaluation-Sheet, the syllabus, and v4 §9.

## Work queue (rough priority)

1. **Syllabus** — biggest gap; Session 1 deck has a placeholder card for it. Consolidate grading table (finalize bundle splits), revision-window mechanics, late/attendance, AI policy language (v4 §11), Honor Code, accommodations.
2. **Decks + student pages for Sessions 5–27** (student pages exist only for 1–4; outlines specify all content).
3. **Classroom instruments** flagged *(to create)* in outlines: stranger's-eye audit checklist (triple-use: S15 teaching / S22 grading / S25 test script), demo + dry-run score sheets, claims-check worksheet (S24), git lab sheet + conflict recipe + starter tasks (S14), design-doc template (S11), Demo Day faculty scoring sheets.
4. **Sample artifacts** needing lead time: strong/weak sample proposals (S7), imperfect design doc to dissect (S11), demo repo with planted bug (S13/S19), example MVPs incl. a broad-shallow cautionary case (S19), infra comparison repos (S15).
5. **External logistics:** Demo Day slot + capstone faculty invitations (registrar); pre-term partner/alumni outreach before Sep 2 (drafts in `open-source-project-course/emails/`); catalog/number with Katie (v4 §14); decide whether the old mentor pipeline carries over.
6. **LMS build-out** — old course's `_canvas_material/` Jinja deploy system may be adaptable.

## Working preferences

Tom prefers concise, direct communication. Iterate on outlines via his margin-note style ("Here are my notes/thoughts on…") — he gives numbered reactions, expects each addressed. When he says "flesh out," expand in place preserving the format. He reviews decks in PowerPoint — don't overwrite a .pptx he may have open (write `-v2`, consolidate later on his confirmation). Readings must be free (no purchases, no sign-up-gated summaries — a Mom Test "free summary" behind a signup wall was rejected); verify links before citing; BYU-appropriate sources where relevant (e.g., BYU IRB for ethics). Winter 2027 comparison exists in the schedule if the course ever moves terms.
