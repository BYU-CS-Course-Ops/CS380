# Session 27 — Final Studio: Polish, Freeze & Close the Loop — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 27 of 27 · Wed, Dec 9, 2026 · 75-minute block — last class session**
**Prior prep:**
- **Bring:** Monday's polish plan, ranked, with the demo-path items done or nearly done.
**Maps to:** Design Week 14, Session B — *final studio; repo/document cleanup; submit launch package (final).*

> **Status: OUTLINE (v3, Nov 16: Tom's slide notes applied — what freezes when, kept branches, room and run order) · deck built** (`canvas_material/lectures/powerpoint/Session27-FinalStudio.pptx`, 10 slides, `tools/build-session27.js`: title · today · standup · polish and verify · final cleanup (the Launch Package Checklist re-run + three hygiene checks) · freeze (tag commands, when, hotfix rule) · Demo Day logistics · the Week-1 hook, with the one-sentence prompt · contributor vs. founder revisited, with what they built · last word). *v2 (Tom's notes, Nov 16): the freeze checklist is a **slide, not a handout**, because it re-runs the Session 25 Launch Package Checklist plus three repo-hygiene checks. The Demo Day logistics "sheet" is a slide in §4. The **Demo Day sheets are built**: `lectures/DemoDay-CP12-Scoring-Sheet.*` (instructor, landscape, the CP12 rubric with per-level points and a row per project) and `lectures/DemoDay-Faculty-Sheet.*` (for invited capstone faculty: four capstone-fit questions per project, not a grade). The **course-evaluation reminder moved to the end of Session 26**. The capstone instructors have been consulted (see Threads). Synced Nov 2 with CP12: the `cp12-demo` tag is due 11:59 pm Thu Dec 10, the last day of classes; Demo Day is Mon Dec 14, 8:30–10:00; no peer evaluations this term.* The last session before Demo Day. Pure studio: execute the polish plan, final repo/document cleanup, **tag `cp12-demo` — in class if ready, by 11:59 pm Thursday at the latest**, and a short deliberate close to fourteen weeks of work. No new anything — today is the discipline of *finishing*.

---

## Purpose of this session

Every project ends twice: once when the work stops, and once when the work is *presentable*. Today is the second ending. The polish plan gets executed and verified, the repo gets its final cleanup pass (the one a stranger in January will silently thank you for), the presentation gets its last check against the frozen build, and then — deliberately — you stop. Freezing is a founder's act too: knowing when the artifact is done enough to stand behind, and letting it stand. We close with ten minutes that look back at Week 1 on purpose.

---

## Learning objectives

By the end of this session, a student can:

1. **Execute a polish plan without scope creep** — and verify each fix against the live demo path.
2. **Run a final-cleanup pass** on a repo and its documents — consistency, truthfulness, no loose ends.
3. **Freeze deliberately** — `cp12-demo` tagged, declared done, presentation locked against it.
4. **Articulate what they founded** — the Week-1 promise, checked against the December reality.

---

## Instructor prep / materials

- **The freeze checklist** (§3) on a slide. Students bring their **Launch Package Checklist** from Session 25 (spares on hand); the tag is `cp12-demo` (CP12 handout, with the commands).
- **Demo Day logistics** (§4) on a slide: room (**TMCB 1149**, the regular classroom), arrival time, A/V, run order (**drawn at random the morning of**, as always, so everyone prepares to go first), who's attending. At four projects that's a slide, not a per-project sheet; repeat it in a Canvas announcement Thursday.
- **For Demo Day itself** (prepare now, print before Monday): the **CP12 Scoring Sheet** (`lectures/DemoDay-CP12-Scoring-Sheet.pdf`, one for you) and the **Faculty Sheet** (`lectures/DemoDay-Faculty-Sheet.pdf`, one per invited faculty member). Send faculty the four repository links ahead of time, since CP12 says faculty may browse the tags beforehand.
- Any dry-run overflow (if enrollment split Monday's runs) scheduled into the first block.
- The closing beat (§5) prepared — this is the instructor's moment; have your own Week-1 slide ready.

---

## Timed outline (≈75 min)

### 1. Standup — polish-plan status — 5 min
- Each project, 60 seconds: the polish plan from the top — done / in flight / at risk; anything at risk gets a decision now, finish it or drop it.
- **What freezes when (Tom's notes, Nov 16).** The **repository** (code, data, setup, docs) freezes with the `cp12-demo` tag, 11:59 pm Thu Dec 10. Students should **freeze as much of the demo path as they can today**, so their own run-through in §2 covers it; a little demo-path work after today is fine, provided they run the whole demo again before tagging. **Slides, speaking notes, and rehearsal aren't in the tag**: they're preparation for the final and can continue right up to Demo Day. (The final is held to the university's three-hour guideline; students spend about 15 minutes of the 90-minute block presenting, so preparing for it beforehand is expected.)

### 2. Polish + verify — 25 min
- Execute what remains; every fix verified **against the actual demo path on main** (what the tag will capture), not on a branch, not from memory.
- Solo run-through (not a class run; nobody presents): each student runs their whole demo once, at their desk, against frozen-candidate main; fallback re-tested (seed data present? clip loads?). Slides needn't be final today.

### 3. Final cleanup + freeze — 25 min
- The cleanup pass is truthfulness and loose ends, not new writing. **Re-run the Launch Package Checklist against `main` as it stands today.** Its rows already cover the README status, known issues (anything found since Dec 2, including at the dry run), the `good first issue` set, the roadmap, and a read for anything now false. Any row that slipped since the launch tag gets fixed or logged. Then **three repo-hygiene checks** the launch checklist doesn't have, on the slide:
  - **Branches:** stale branches deleted. A branch kept on purpose (work moved to the roadmap, an experiment worth keeping) links to an issue or a draft PR that says what it's for, so a stranger knows why it exists.
  - **Pull requests:** every open PR merged, or closed with a comment. Nothing left hanging.
  - **Board:** it matches reality. Done is done; leftovers moved to the roadmap or labeled for newcomers.
  - *Why a slide, not a handout:* students already hold the launch checklist, and the three new checks fit on one screen. A second printable for the same job would compete with the first.
- **Freeze:** `cp12-demo` pushed — in class if the project is ready (recommended: declare done aloud, per project, to the instructor), otherwise by **11:59 pm Thu Dec 10**, the last day of classes; university policy allows nothing but the final to be due after it. The tag doesn't move after the deadline; work on `main` can continue but isn't what's demoed or graded. The tagged repo is what faculty browse and what CP12's "what has been built" points at.

### 4. Admin sweep — 8 min
- No peer evaluations this term (no teams; decided at Session 22). Contribution history current in the repo.
- Demo Day logistics slide walked once: **Mon Dec 14, 8:30 AM start** (the registrar's block opens at 7:00; we don't), room (TMCB 1149), arrival, run order (random, drawn that morning; be ready to go first), 9 + 5 min per project, and who's coming (capstone faculty). Questions killed now, not by email Thursday night.

### 5. Close the loop — 12 min
- Put the Week-1 hook back up: *"Nearly every big open-source project you rely on started as one or two people deciding a problem was worth solving. This semester, that's you."* — and let each project answer it in one sentence: **what did you found, and who is it for?**
- Name what they're walking out with, concretely: a discovery trail, a defended proposal, a design, a governed repo, a working MVP, a launch package, and a public demo on Monday, Dec 14 — the founder's portfolio, end to end. The contributor-vs-founder table from Session 1: they now live in the right column.
- Last word points forward, not back: the repo is public, the on-ramps are built, the roadmap is an invitation — *what happens to it next is a decision, and it's yours.* See you at Demo Day.

---

## Threads to carry forward

- **Demo Day (Mon Dec 14, 8:30–10:00, CP12):** final pitch + live demo + Q&A, capstone faculty invited — the mastery artifact, defended. The `cp12-demo` tag is its evidence.
- The **capstone-seed path** *(instructor-side; update Nov 16)*: Tom met with the capstone instructors the week of Nov 9. **All four Fall 2026 projects are possibilities. No decision yet**; the faculty will look at them more closely, and Demo Day is part of that (hence the Faculty Sheet). **Sponsorship is undecided.** Two of the four founders are in capstone, and if their project is chosen they'll likely want to work on it directly. The other two (one already took capstone, one doesn't need it) were told in class that if their project is chosen, they should expect to be asked to stay involved as **sponsor, at least an hour a week**. The students know their projects are being considered, so Demo Day needs no new announcement. Don't promise carry-forward in §5: the closing line already leaves the project's next step as the founder's decision. A project going forward hands faculty a tagged, launch-packaged, honest repo, exactly the artifact set the course built.
- For the instructor's course retro: today's one-sentence answers are good material for next year's Session 1.

---

## Open questions / decisions before we flesh this out

- ~~**Post-freeze exception policy**~~ **resolved (Nov 2, CP12):** a demo-breaking hotfix after the tag needs instructor approval, an issue describing it, and a new tag.
- ~~**Demo Day scoring sheets**~~ **resolved (Nov 16):** two sheets, built. The **CP12 Scoring Sheet** is the instructor's grading instrument. The **Faculty Sheet** is a capstone-fit read for invited faculty (real need · right size · solid foundation · an owner who knows the users · worth a closer look), and it doesn't enter the grade.
- ~~**Course-evaluation beat**~~ **resolved (Nov 16):** moved to the end of Session 26. One slide, about a minute, nothing done in class: BYU's course evaluation, plus the feedback Tom wants in it.
- ~~**Freeze checklist as a handout?**~~ **resolved (Nov 16):** slide only (see §3).

---

## Deliverable / after class

- **Today:** polish done; presentation locked; `cp12-demo` tagged if ready. **By 11:59 pm Thu, Dec 10:** `cp12-demo` pushed.
- **Mon, Dec 14, 8:30–10:00 AM:** **CP12 Final Pitch + Demo** — Demo Day. Arrive early; load early; answer the three questions.

---

## Appendix — classroom handouts (Session 27)

- **Freeze checklist** (§3): slide only. Students re-use their Session 25 **Launch Package Checklist** (`canvas_material/resources/Launch-Package-Checklist.pdf`; spares on hand).
- **Demo Day logistics** (§4): slide only.
- **For Demo Day (Dec 14), not handed out today:** `lectures/DemoDay-CP12-Scoring-Sheet.*` (instructor) and `lectures/DemoDay-Faculty-Sheet.*` (invited faculty).
- **CP12 rubric:** `rubrics.md` (Final Pitch + Demo)

---

*Student page written (`canvas_material/lectures/session-pages/Session27-StudentPage.md.jinja`, published flag on, Nov 16). Next step: the finals-week run of show. Related: `Session26-Dec07-Outline.md`, `CS301R-Schedule-Fall2026.md` (finals-week note), `rubrics.md` (CP12).*
