# Session 22 — Progress Demos & the Repo Audit — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 22 of 27 · Wed, Nov 18, 2026 · 75-minute block**
**Prior prep:**
- **Demo ready:** the slice rehearsed, the `cp10` tag pushed by 11:59 pm Tuesday (and its URL in Canvas), fallback in pocket.
- **Audit ready:** your repo *is* the artifact — no last-minute pushes.
- **CP9 portfolio submitted** via LMS before class (8 artifacts: 2 bug reports · 1 feature request · 1 PR description · 2 review comments · 2 responses to feedback — quality-graded).
- **Re-skim (auditors):** Amber Wilson — [*How to approach a new codebase*](https://amberwilson.co.uk/blog/how-to-approach-a-new-codebase/) — you're about to do exactly this, on a classmate's project, for their grade. *(Reused from the prior course's Investigating Code module.)*
**Maps to:** Design Week 11, Session B — *progress demos in small groups; instructor + peer repo audit / onboarding test.*

> **Status: OUTLINE (v2) · deck built** (`canvas_material/lectures/powerpoint/Session22-DemosAndAudit.pptx`, 10 slides, `tools/build-session22.js`; slide 2 is the prep check). Assessment day, two instruments: the **progress demo** (does the slice prove the claims?) and the **repo audit / onboarding test** (can a stranger clone, build, run, and find their way?). **CP10 due today (live); CP9 due today (LMS).** *v2 (Tom's notes, Oct 30): a peer **Demo Feedback Sheet** and an instructor **CP10 Scoring Sheet** built; no peer evaluation this term (no teams); audits run both directions at once (Oct 30); v1 leftovers from the parallel-groups plan removed.*

---

## Purpose of this session

Two questions get real answers today. **Does it work?** — the progress demo: your slice, walked live, judged against the claims your MVP Plan staked. And **could someone join?** — the repo audit: a classmate who's never seen your project clones it cold and tries to build, run, orient, and locate where a new feature would go, recording what happened on the audit sheet you saw on Monday. Together they measure the two things this course says a founded project must be: **working** and **joinable.** Both are graded, and both generate the most useful feedback you'll get before launch — a list, written by a real stranger, of exactly what to fix in the two weeks that remain.

---

## Learning objectives

By the end of this session, a student can:

1. **Demo working software** to peers — claims-first, honest about edges, inside the time box.
2. **Audit an unfamiliar repo** methodically and record what happened faithfully on a shared sheet.
3. **Read a stranger's record of their project's front door** — the stall log from an audit run with no one to ask — and learn from it.
4. **Convert demo + audit feedback into a prioritized fix list** for the launch push.

---

## Instructor prep / materials

- **Run of show:** demo order and timing announced Monday; **audit pairings set at the start of class from attendance** (the Session 20 review partners where both are present), written on the board with each project's repo URL from its CP10 submission — students can't see each other's submissions.
- **A prep-check slide, up as students walk in (~90 sec).** Assessment day has no slack: a project that isn't demo-ready burns a graded slot, and an unprepared auditor costs *another* project its audit. Four hands-up items:
  1. **Slice rehearsed, and `cp10` tagged last night** — the demo runs from the tag, the auditor clones it, and grading reads it; pushes to main this morning don't count.
  2. **Fallback in pocket** — seed data or a local mode; a recorded clip only as a declared last resort (it caps *Demo readiness* at Proficient unless the room is what failed).
  3. **Auditors: you can clone right now** — laptop on the network, credentials working. (Clone at the start of class if wi-fi is slow.)
  4. **CP9 portfolio submitted to the LMS** — it's due before class, not during it.
  Nothing here is fixable at minute 30, which is the whole reason to ask at minute 1. Note who isn't ready and adjust the run of show immediately rather than discovering it mid-rotation.
- **Repo Audit Sheets** printed (`canvas_material/resources/Repo-Audit-Sheet.pdf`), one per auditor: six setup steps each marked *as written · guess / workaround · step wrong or missing · couldn't*, with minutes · the project in one sentence and a `good first issue` located in the code · six history checks (log, PRs, board, known issues, README status, where to ask) · a numbered stall log · the one thing that most stopped them · signatures. Facts, not a score; the instructor photographs it and hands it to the authors.
- **Demo Feedback Sheets** printed (`canvas_material/resources/Demo-Feedback-Sheet.pdf`): half-sheet pairs, one half per demo a student watches (three each at four projects, so two pages per student). Anonymous: no name line (the instructor doesn't need it; the sheets aren't graded). Each half: the claim the demo set out to prove · proven live / shown, not proven / not attempted, with the proven-or-shown test printed under it, and what convinced them · the slice walked (yes / with a gap / no), an honest edge named, in time · the question they'd still ask. Feedback for the presenter, not a grade; handed over after the questions, used in the §4 debrief.
- **The CP10 Scoring Sheet** (`lectures/Session22-CP10-Scoring-Sheet.pdf`, instructor-only, landscape, like Session 10's CP4 sheet): the seven criteria with per-level points, then one row per project. Three columns are scored live (*Proves key claims*, *Demo readiness*, *Repo audit*); *MVP plan quality* is carried over from the Nov 11 revision; *Technical coherence*, *Documentation & honesty*, and *Individual contribution* are read from the `cp10` tag after class. A notes column for a declared clip (and whether the room failed) and the audit's hardest step.
- During the audits the instructor is the only observer: move between the four, and repeat the hardest step where a stall might be the auditor's rather than the repo's. Wi-fi/clone-time contingency: auditors clone at the start of class.

---

## Timed outline (≈75 min)

*Timings below are for this term's enrollment (four projects, likely all solo): demos for the whole room, then both directions of both audit pairs in class. With more than about six projects, split the demos into small groups of 2–3 running in parallel and keep the audits paired.*

### 1. Setup — 3 min
- Pairings and repo URLs go on the board; auditors start cloning their partner's `cp10` tag in the background *now* (`git clone --branch cp10 …`).
- Ground rules: demos are time-boxed hard; the audit runs **from the docs alone** — auditors ask no one, and since every project audits its partner at the same time, no author is free to help anyway.

### 2. Progress demos — whole room — 36 min
- Per project, 9 min: **demo the slice (6)** — open with the claim ("v1 proves a commuter can reserve a spot end-to-end"), walk it live, name one honest edge ("conflict handling is M2") — then **questions (2)** and **1 minute to change presenters** (Tom, Oct 30).
- **Before the first demo, the proven-or-shown test (~2 min, deck slide 6).** Everyone scores "proof" on the feedback sheet, so everyone needs the same test: *if the claim were false, would the demo have looked different?* Yes → **proven**: real code and real data, live, end to end, in a way that could visibly have failed (Prop Loft: the search finds the item, the checkout saves, the list shows who has it, and a second checkout of the same item is refused). No → **only shown**: a screen with hardcoded data, screenshots, a narrated "and this would save to the database," or many screens with nothing connected. A claim the presenter says plainly isn't proven yet is *honest*, not a failure — the rubric's Exemplary wording is "visibly proven or honestly reported as not." It's Session 19's falsifier turned around, and the same test the instructor uses for *Proves key claims*.
- The register for questioners: the proof question from Week 10 — *did that prove it, or show it?* — asked kindly.
- Instructor scores every demo live on the CP10 Scoring Sheet; peers fill a Demo Feedback Sheet for each demo (feedback for the project, not its grade) and hand it to the presenter after the questions. A declared clip is noted on the scoring sheet, with whether the failure was the room's.

### 3. Repo audit / onboarding test — everyone at once — 30 min
- Each project audits its partner's repo while the partner audits theirs, working the sheet **out loud**: clone → follow the setup guide *exactly* → run → "where would I add [the good-first-issue]?" → skim log/PRs/board for legibility.
- Every stall, ambiguity, or workaround gets written down — that's the product. The sheet records **facts, not a score** (cloned? built and ran from the guide as written? found the code? where it stalled); signed and handed to the audited project **and** the instructor. **The instructor assigns the CP10 level**, watching each audit and repeating its hardest step where a stall might be the auditor's rather than the repo's.
- ~30 min, both directions at once: every student is an auditor for the whole block, so nobody watches their own repo being audited. The instructor is the only observer. Both directions happen in class; no homework audits (a home audit can't be kept to the docs alone).

### 4. Debrief + the fix list — 4 min
- Each project regroups with its audit sheet and the Demo Feedback Sheets from its demo; write the **top-five fix list** (audit findings + demo feedback, ranked by launch impact). This list is next week's studio agenda — bring it Monday.
- One round-the-room prompt: *the most surprising thing a stranger tripped on.* (It's never what the authors expect — say so.)

### 5. Wrap — the road to launch — 2 min
- What remains: **Mon Nov 23** contributor-readiness (last teaching session before launch work) · *no class Wed Nov 25 (Thanksgiving)* · **Wk 13** retrospective + launch-package assembly (CP11 due Dec 2) · **Wk 14** dry-run + final studio · **finals week: Demo Day.**
- The audit sheet is a gift; the fix list is the plan. Happy Thanksgiving.

---

## Threads to carry forward

- **The fix list** drives Week 12–13 studio work and feeds the **known-issues log** (whatever isn't fixed gets *documented* — CP11).
- Audit findings are the empirical base for the **contributor-readiness checklist** session (Monday).
- Demo scores + the claims register feed the **retrospective** ("what did the MVP validate?") and the final demo script.
- Auditing a stranger's repo = the **Curious** strand (investigating code), graded from the maintainer's side.

---

## Open questions / decisions before we flesh this out

- ~~**Reverse-audit completion**~~ **resolved (Tom, Oct 24): in class.** Four projects fit. Homework audits dropped. **Changed (Tom, Oct 30):** both directions run at the same time, not one then a swap; authors are auditing, not watching, so the "silent author" rule is gone (Repo Audit Sheet, Session 21 deck, CP10 handout and rubric notes updated).
- ~~**Audit sheet as grading instrument**~~ **resolved (Tom, Oct 24): the instructor scores.** The sheet is factual evidence (what happened, where it stalled), not a score.
- **Decided for CP10 (Oct 24):** freeze by `cp10` tag by 11:59 pm the night before; recorded clip = declared last resort, caps *Demo readiness* at Proficient, cap waived if the room failed; testing is Exemplary-only on *Technical coherence*; solo *Individual contribution* = steady, reviewable PRs across the fortnight.
- ~~**Peer-eval touchpoint**~~ **resolved (Tom, Oct 30): not run this term.** Every project is solo, so there's no team to evaluate. v4's midpoint peer evaluation returns if a later term has teams.

---

## Deliverable / after class

- **Due today:** **CP10 Progress Demo + Repo Audit** (live + sheets) and **CP9 Technical Communication Portfolio** (LMS, before class).
- **Before Monday:** top-five fix list written.

---

## Appendix — classroom handouts (Session 22)

- **Repo Audit Sheet** — `canvas_material/resources/Repo-Audit-Sheet.html` + `.pdf` (built Oct 30, previewed in Session 21; no dates or CP numbers on it, so it's reusable as the Session 25 test script)
- **Demo Feedback Sheet** — `canvas_material/resources/Demo-Feedback-Sheet.html` + `.pdf` (half-sheet pair; one half per demo watched)
- **CP10 Scoring Sheet** (instructor) — `lectures/Session22-CP10-Scoring-Sheet.html` + `.pdf`
- **CP9 + CP10 rubrics:** `rubrics.md`

---

*Next step: print the sheets (Publishing Checklist). Student page written (`canvas_material/lectures/session-pages/Session22-StudentPage.md.jinja`, marked to publish; teaches the proven-or-shown test; Materials: the Repo Audit Sheet, the Demo Feedback Sheet, Amber Wilson's reading — the Peer Evaluation Form entry was removed). Deck built (10 slides: title · prep check · today · setup and cloning · the demo · proven or shown? · the Demo Feedback Sheet · the audit · debrief and fix list · the road to launch). Related: `Session21-Nov16-Outline.md`, `Session23-Nov23-Outline.md`, `rubrics.md` (CP9, CP10).*
