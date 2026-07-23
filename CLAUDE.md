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

- `lectures/` — 27 instructor outlines (`SessionNN-MonDD-Outline.md`, all complete) + finished decks (`Session01-CourseLaunch.pptx`, `Session02-Divergent.pptx`, `Session03-OpenSource.pptx`, `Session04-Discovery.pptx`). `Session04-Discovery-v2.pptx` is a byte-identical stray — safe to delete.
- `assignments/` — 17 student handouts, complete: CP1–CP12, Idea-Journal, Discovery-Notes, License-OSS-Short-Response, Team-Charter, MVP-Plan. All follow a fixed format (see Conventions).
- `resources/` — student handouts/templates: License-Cheat-Sheet, Mom-Test-Summary, Good-vs-Leading-Questions, Interview-Prompt-Cards, Interview-Ethics-for-Students (BYU IRB-grounded), Persona-Template, Persona-Examples (honest "Commuter Cara" vs. fabricated "Busy Ben"), CPS-Handbook-reading (points to local `cps_handbook.pdf`), Feasibility-Risk-Worksheet, Learning-Plan-Template, Idea-Scoring-Sheet, Pitch-Evaluation-Sheet, Peer-Evaluation-Form.
- `canvas_material/lectures/` — student-facing LMS pages, **Sessions 1–4 only so far**.
- `development/` — design docs, schedule, `V3_prompt.md`.
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
- **QA loop (required before delivering a deck):** convert via LibreOffice (`soffice --headless --convert-to pdf`), `pdftoppm -jpeg`, then visually inspect every slide image for overflow/overlap/contrast. Past defects: banner/table overlap, low-contrast footer on teal, table overflow.

**Framing rules (student-facing language, applied everywhere):**
- "**Built to last / lasting**" — never "multi-semester" (that's instructor-side framing).
- "**Contributor-ready**"; "**you lead, others join to build**" — never "inherit/handoff/pass off."
- Hook line (Session 1): "Nearly every big open-source project you rely on **started as one or two people deciding** a problem was worth solving. This semester, that's you."
- Contributor-vs-founder contrast is respectful of the contributor role.
- Real users are the ideal; an honest evidence-tagged persona (`[E]`/`[A]`) is the accepted supplement this iteration. No seeded users — students find their own.
- AI policy voice: "AI is a tool, not the topic" — allowed for learning/drafting; students must understand and defend everything submitted.

**Key structural facts:** Weeks 1–5 individual (CP1–CP4); teams form at Pitch Day (Session 10, Oct 7); the three final questions (need? built? where next & how can others join?) structure CP12; weights per v4 §8 with suggested bundle splits Discovery 5/5, Git+TechComm 6/6, Final 5/5 (marked ≈, not finalized). Grading philosophy: process + founding artifacts over code alone; pass conditions require every major artifact at Developing+.

## Pending decisions (Tom's calls, flagged in the files)

1. **License/OSS short response due date** — handout + Session 4 materials say Mon Sep 21; the Session 3 *deck* wrap slide still says "before Wed, Sep 16." Reconcile once decided (deck rebuild needed either way).
2. **Peer-eval ⚑ items** in `development/Peer-Evaluation-System.md`: platform, whether presenters see numeric averages, multiplier bounds (±10% proposed), midpoint weight, submission-required.
3. Policy floors proposed in outlines, not ratified: ≥1 non-author PR approval; MVP testing floor ("core slice logic has tests"); spike required vs. recommended; debug-log floor; demo-week main-freeze rule; recorded-clip fallback allowed as declared last resort; team-size/oversubscription handling.
4. **Pitch Day arithmetic** — fits ~8 pitches in 75 min; needs an enrollment-triggered plan (announced in Session 9).
5. CP1+CP2 same-day turn-in mechanics; CP7/CP8 submission = repo pointer (recommended).

## Work queue (rough priority)

1. **Syllabus** — biggest gap; Session 1 deck has a placeholder card for it. Consolidate grading table (finalize bundle splits), revision-window mechanics, late/attendance, AI policy language (v4 §11), Honor Code, accommodations.
2. **Decks + student pages for Sessions 5–27** (student pages exist only for 1–4; outlines specify all content).
3. **Classroom instruments** flagged *(to create)* in outlines: stranger's-eye audit checklist (triple-use: S15 teaching / S22 grading / S25 test script), demo + dry-run score sheets, claims-check worksheet (S24), git lab sheet + conflict recipe + starter tasks (S14), design-doc template (S11), Demo Day faculty scoring sheets.
4. **Sample artifacts** needing lead time: strong/weak sample proposals (S7), imperfect design doc to dissect (S11), demo repo with planted bug (S13/S19), example MVPs incl. a broad-shallow cautionary case (S19), infra comparison repos (S15).
5. **External logistics:** Demo Day slot + capstone faculty invitations (registrar); pre-term partner/alumni outreach before Sep 2 (drafts in `open-source-project-course/emails/`); catalog/number with Katie (v4 §14); decide whether the old mentor pipeline carries over.
6. **LMS build-out** — old course's `_canvas_material/` Jinja deploy system may be adaptable.

## Working preferences

Tom prefers concise, direct communication. Iterate on outlines via his margin-note style ("Here are my notes/thoughts on…") — he gives numbered reactions, expects each addressed. When he says "flesh out," expand in place preserving the format. He reviews decks in PowerPoint — don't overwrite a .pptx he may have open (write `-v2`, consolidate later on his confirmation). Readings must be free (no purchases, no sign-up-gated summaries — a Mom Test "free summary" behind a signup wall was rejected); verify links before citing; BYU-appropriate sources where relevant (e.g., BYU IRB for ethics). Winter 2027 comparison exists in the schedule if the course ever moves terms.
