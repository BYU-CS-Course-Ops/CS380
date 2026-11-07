# Session 26 — Demo Dry-Run: The Full Rehearsal — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 26 of 27 · Mon, Dec 7, 2026 · 75-minute block**
**Prior prep:**
- **Performance-ready pitch + demo:** slides done, demo driver assigned, fallback loaded, rehearsed at least once against the clock (**9 minutes**, hard).
- **Re-skim:** Kawasaki's [*10/20/30*](https://guykawasaki.com/the_102030_rule/) — the rules haven't changed; the stakes have.
**Maps to:** Design Week 14, Session A — *demo dry-run with peer feedback; tighten the three final questions.*

> **Status: OUTLINE (v2, Nov 6) · deck built** (`canvas_material/lectures/powerpoint/Session26-DryRun.pptx`, 9 slides, `tools/build-session26.js`: title · today · rehearse under the real conditions · two roles when watching · fifteen minutes per project · run order (type the draw in) · up next, the three questions (between runs) · debrief: the polish plan · wrap). *v2 (Tom's notes, Nov 6): the **Dry-Run Score Sheet** and the **question bank** are built; the polish plan has **no item limit** (the real constraint is rehearsal: anything on the demo path lands by the end of Wednesday's studio so it is run at least once before the tag); **opt-in recording** added; students are told what to expect at the end of Session 25. Synced Nov 2 with CP12: 9-min pitch + 5-min Q&A on Demo Day, `cp12-demo` tag by 11:59 pm Thu Dec 10, Demo Day Mon Dec 14 8:30–10:00, no peer evaluations this term, no capstone carry-forward language student-facing yet.* Full-dress rehearsal for Demo Day (Mon, Dec 14, 8:30–10:00 AM, capstone faculty invited). Every project runs the complete pitch + live demo under Demo-Day conditions; peers score against the three questions; the fixes between now and the tag get aimed.

---

## Purpose of this session

A dry-run only works if it's honest — full pitch, live demo, real clock, real questions, no "and then we'd show…". Today every project performs under Demo-Day conditions and gets scored feedback on the only rubric that matters now: **did the need land? did the demo prove the build? is the invitation to join credible?** The gap between today's performance and the `cp12-demo` tag (11:59 pm Thursday) is three days wide, with one studio in it — the feedback must be specific enough to spend those days well.

---

## Learning objectives

By the end of this session, a student can:

1. **Deliver the full final pitch + demo within time**, transitions and all.
2. **Field hard questions** — including the ones the retrospective invites ("what didn't the MVP prove?").
3. **Score a peer's final pitch** against the three questions, with usable specifics.
4. **Convert dry-run feedback into a polish plan** for the days before the tag (and nothing bigger).

---

## Instructor prep / materials

- **Demo-Day conditions replicated:** same screen/projector setup as the finals room if possible, visible countdown, the actual run order (draw it today).
- **Dry-Run Score Sheets** (`canvas_material/resources/Dry-Run-Score-Sheet.pdf`): half-sheet pairs, one half per run watched, so two pages per student (three runs each at four projects, one spare half). Each half: the three questions, each marked landed yes / partly / no with "the moment that sold it" and "the moment I doubted"; the time (ended at ___ min; inside / over / rushed the end); demo mechanics (logged in, data loaded, windows set up, readable from the back, fallback ready); whether the hardest question was answered straight, with a hedge, or in a way the demo or retrospective contradicts; one thing to keep and one to fix. Anonymous, not graded; handed to the presenter after the spoken feedback.
- **The Dry-Run Scoring Sheet** (`lectures/Session26-Dry-Run-Scoring-Sheet.pdf`, instructor-only, landscape, like Session 22's CP10 sheet): the CP12 criteria with per-level points, then one row per project in run order. Per row: time splits from your stopwatch (need / demo / next, and where it ended), a **practice level** for each of the six CP12 criteria, the demo mechanics that were ready, what happened in the demo (clean / fallback run / declared clip / restarted or narrated), the bank question you asked and how it was answered (straight / hedge / contradicts the retrospective or repo), and their top fix from the debrief. **Practice levels, not grades:** nothing goes into Canvas; the sheet tells you whom to visit first in Wednesday's studio, and you compare it with Demo Day.
- **The question bank** (`lectures/Session26-Question-Bank.md`, instructor-only): 24 questions under the three questions, integration and the retrospective, and a quiet-room fallback, each with what a strong answer sounds like. Ask one per project after the peers, chosen for what the pitch left open. Reusable on Demo Day; offer it to visiting faculty who ask what to probe.
- **Recording, opt-in:** a phone stand or small tripod at the back of the room, aimed at the screen and the presenter. Each presenter records on their own phone, or not, and keeps the file; nothing is posted or graded. Screen recording on the presenter's laptop also works and catches the demo itself.
- Timing plan at four projects: 4 × (9 perform + 3 Q&A + 2 feedback + 1 reset) = 60 min. Q&A is shortened from Demo Day's 5 to fit; the sheets carry the rest of the feedback.

---

## Timed outline (≈75 min, four projects)

### 1. Framing + run order — 4 min
- Conditions are real: clock, cold open, live demo, Q&A. The audience plays two roles — classmate *and* skeptical outside faculty.
- Scorers: one specific per question on the Dry-Run Score Sheet. "Good job" is banned; "the reservation-conflict moment sold question 2" is the register.
- **Recording (opt-in):** anyone who wants their run recorded sets their phone on the stand, or starts a screen recording, before they begin. Say once, for the room: recordings stay with the presenter and aren't posted, and anyone who'd rather not be heard in someone else's Q&A says so now. Why bother: watching yourself once shows more than any sheet, and a clean recording of the demo can become your declared fallback clip if nothing on the demo path changes before the tag (a declared clip still caps CP12's demo criterion at Proficient unless the room fails).

### 2. Dry-runs — ~60 min
- Per project (15 min): **perform**, 9 min (need ~2, demo ~5, invitation ~2) → **Q&A**, 3 min → **peer scores and spoken feedback**, 2 min (one keep and one fix, from the sheet) → **reset**, 1 min.
- Instructor asks one bank question per project if the room doesn't get there; notes demo mechanics (login pre-staged? seed data ready? window management?) — the unglamorous half of demo craft.
- Hard rule: **no restarts.** If the demo breaks, run the fallback — *that's the rehearsal too.* Recovering gracefully today is worth more than a clean run.

### 3. Debrief — the polish plan — 8 min
- Each project reads its sheets and writes the **polish plan**: every fix the sheets point to, **ranked** by how much it improves one of the three answers, each one polish-sized (tighten the open, pre-stage the login, cut a slide, fix the bug the demo hit) — *no new features, no re-architecture.* There's no item limit: there are four days until the tag, and a long list worked from the top is fine.
- **The constraint that matters is rehearsal.** A change you haven't run through since making it is a Demo Day risk. So anything on the **demo path** (code, data, setup) lands by the end of **Wednesday's studio**, where the full run happens once more; slides, speaking notes, and docs can change through Thursday night. Mark each item on the plan *demo path* or *not*.
- **What "on the demo path" means (for the instructor; say the test aloud).** The demo path is everything that decides what appears on screen between the presenter's first click and their last in the live walk-through. A change is on it if it touches:
  - **the code the walk-through runs:** the screens, routes, queries, and logic the demo script steps through, *and anything they call*, including shared modules and dependency upgrades, even when the file looks unrelated;
  - **the data it shows:** seed scripts, fixtures, the database or its state, uploaded sample files;
  - **what it runs on:** configuration and environment variables, the build or start command, the laptop, browser, and logged-in session, the network it needs.

  **Off the path:** slides, speaking notes, the README, roadmap, known-issues log and other docs, issues and labels, and code the walk-through never reaches. *Example:* fixing a typo in the roadmap is off the path; renaming a CSS class the search page uses is on it; bumping a library version is on it even if no demo file changes.
  - **The test to give students:** *would I have to run the demo again to know this didn't break it?* Yes, or not sure, means demo path.
  - **Why it matters:** a demo-path change made after the last full run is unrehearsed, and that's how a demo that worked Monday breaks on Demo Day. So demo-path changes land by the end of Wednesday's studio, where everyone does one more full run against `main`. After that, only off-path changes until the tag. If a demo-path fix can't wait (the demo is actually broken), the student makes it and then runs the whole demo once more before tagging. After the tag, a demo-breaking hotfix needs instructor approval, an issue, and a new tag (CP12).
- Round-the-room: each project names its top fix aloud (commitment device).

### 4. Wrap — logistics — 3 min
- **Wed Dec 9:** final studio — polish plan executed, repo/doc cleanup. **Thu Dec 10, 11:59 pm:** `cp12-demo` tag pushed (last day of classes).
- **Demo Day: Mon, Dec 14, 8:30–10:00 AM** — room, A/V, order, faculty attending. Arrive early; load early.

---

## Threads to carry forward

- Dry-run scores preview the **CP12 rubric**; the three questions are the grading spine.
- The fallback-under-fire rule is the last rep of the **honest-confidence** posture the course has trained since CP3.
- Polish-only discipline protects the **`cp12-demo` tag** — the artifact of record for faculty and successors.

---

## Open questions / decisions before we flesh this out

- ~~**Enrollment fit**~~ **resolved:** four projects fit in one session at 15 min each (§2).
- ~~**Demo Day format**~~ **mostly resolved (Nov 2, CP12):** 9 min pitch + demo, 5 min Q&A, 2 min swap. **Still open:** whether peers also score on the day itself (recommend: faculty + instructor score; peers attend).
- ~~**Recording**~~ **resolved (Nov 6): offered, opt-in.** The presenter's own phone on a stand, or a screen recording; the file stays with them (§1).
- ~~**Polish-plan size**~~ **resolved (Nov 6): no item limit.** Ranked, polish-sized, demo-path changes by the end of Wednesday's studio (§3).

---

## Deliverable / after class

- Polish plan written and ranked, demo-path items marked. **Wed Dec 9:** final studio; demo-path changes done and run once. **Thu Dec 10, 11:59 pm:** `cp12-demo` tag.
- **Mon, Dec 14, 8:30–10:00 AM:** **CP12 Final Pitch + Demo** — the mastery artifact, defended.

---

## Appendix — classroom handouts (Session 26)

- **Dry-Run Score Sheet** — `canvas_material/resources/Dry-Run-Score-Sheet.html` + `.pdf` (built Nov 6; half-sheet pair with a cut line, one half per run watched; no dates or CP numbers, so it's reusable)
- **Question bank** — `lectures/Session26-Question-Bank.md` (built Nov 6; instructor's copy, reusable on Demo Day)
- **Dry-Run Scoring Sheet** — `lectures/Session26-Dry-Run-Scoring-Sheet.html` + `.pdf` (built Nov 6; instructor-only, landscape; practice levels against CP12, not entered in Canvas)
- **CP12 rubric:** `rubrics.md` (Final Pitch + Demo)

---

*Next step: print the score sheets (two pages per student); bring a phone stand for recording; confirm Demo Day logistics; Student page written (`canvas_material/lectures/session-pages/Session26-StudentPage.md.jinja`, marked to publish; general-first; carries the run format, the score sheet, recording, and the demo-path test; Materials: Kawasaki, the Dry-Run Score Sheet, CP12). (Deck built; run a countdown timer separately, from a phone or a second window.) Related: `Session25-Dec02-Outline.md`, `Session27-Dec09-Outline.md`, `rubrics.md` (CP12).*
