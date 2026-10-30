# Session 20 — MVP-Plan Review & Setup-Guide Cold Test — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 20 of 27 · Wed, Nov 11, 2026 · 75-minute block**
**Prior prep:**
- **MVP Plan draft** (one page: what's in / what's deferred / what technical risk it addresses / demo plan) — bring it printed or shareable. The revision is due end of day.
- **Write your setup guide before class** (`docs/setup.md`, on a PR that links the placeholder's issue): redo your own setup in a fresh clone in a new folder and write down every command as you run it. The anatomy (five parts) and the model, Prop Loft's [`docs/setup.md` at `session-20`](https://github.com/prop-loft/prop-loft/blob/session-20/docs/setup.md), are on the student page.
- **Bring a laptop.** Your partner follows your guide **from your PR's branch**, so send them the repo URL and the branch name.
**Maps to:** Design Week 10, Session B — *prototype-plan review; studio build time.*

> **Status: OUTLINE (v3) · deck built** (`canvas_material/lectures/powerpoint/Session20-ReviewAndColdTest.pptx`, 15 slides, `tools/build-session20.js`). A hybrid session: a structured peer pass on the MVP Plan (~24 min), then the **setup guide's cold test** (~40 min with its self-check and read-back). *v3 (Tom's notes, Oct 30): writing the guide in a 10-minute block wasn't realistic, so it's **written before class** (anatomy on the student page, Prop Loft as the model) and class time goes to what needs the room: the cold test, now 30 min, because installs are slow. The plan revision (§3 in v2) moved to after class; it's still due end of day.* The setup guide moved here from CP7 (Session 16), where there was nothing yet to set up; CP7 carried a placeholder `docs/setup.md` and an issue tracking it, which today closes. This replaces the studio block; Session 21 is all studio. One week to the **Nov 18 progress demo + repo audit (CP10)**, where a stranger follows the same guide for a grade.

---

## Purpose of this session

The MVP Plan is a one-page promise: *this* is in, *that* is deferred, *this risk* is retired, and *here's* the demo. Before the heaviest build week, that promise gets one round of outside eyes — the review discipline, now fast and light because everyone's fluent in it. Then the second front-door artifact that couldn't exist in Week 8 gets tested: the **setup guide**. Two weeks into the build, every project finally has something to set up, and its author has just set it up, so the steps are fresh. The guide is written before class, alone, because writing needs only the author's machine; class is for the part that needs another person: it's followed, cold, by someone who didn't write it, because the author is the worst possible tester of their own instructions: their machine hides state (the env var set weeks ago, the tool installed and forgotten) that only a cold reader trips over. The session's exit condition: **every project knows exactly what it's building for the next seven days, and its setup guide has survived one stranger.**

---

## Learning objectives

By the end of this session, a student can:

1. **Review an MVP plan fast** — in-scope honesty, deferral wisdom, demo realism.
2. **Answer the reviewer's three questions** about their own plan without flinching.
3. **Write a setup guide a stranger can follow**: prerequisites with versions, numbered copy-pasteable steps, "you should see…" checkpoints, how to run the tests, and what to do when a step fails.
4. **Run and act on a cold test**: follow someone else's guide exactly, file an issue for every failure or confusion, and fix your own guide from the issues filed against it.

---

## Instructor prep / materials

- **The MVP Plan Review sheet** printed (`canvas_material/resources/MVP-Plan-Review-Sheet.pdf`): two identical half-sheets per page, one half per reviewing project, so one page per pairing. Each half carries the three questions with writing lines, a *what I'd cut first* line, check boxes for which claims the demo proves and which fallback the plan has, and an authors' box for what changes tonight. Authors keep it; it isn't turned in.
- **Project pairings** for the review (project↔project swaps; solo founders with their review partners).
- Review the MVP Plans as submitted (skim before class) so coaching is targeted.
- **Setup-guide model**, open in tabs: Rich's CONTRIBUTING dev-setup section (seen in Session 15) and the Prop Loft setup guide ([`docs/setup.md` at tag `session-20`](https://github.com/prop-loft/prop-loft/blob/session-20/docs/setup.md); see `demos/prop-loft-states/`). **The tag must be published before Session 19 (Nov 9)**, because students write their guides from it before today (Publishing Checklist).
- **Check the night before** which projects have a setup-guide PR open. A project without one does its cold test on whatever its README says (usually nothing), which is a finding too, and writes the guide tonight.
- **Cold-test protocol** (§4) on a slide.

---

## Timed outline (≈75 min)

### 1. Framing — 4 min
- The plan is a promise you review before you're bound by it. Today: one fast outside pass on the plan, then a stranger runs your setup guide.
- Nov 18 arithmetic on the board: what's demoed next Wednesday is what exists **by Tuesday night.**

### 2. MVP-plan peer review — project↔project — 24 min
- Paired projects swap plans. Protocol (tight, familiar):
  - **Read** (~5 min), then each reviewing project answers **three questions in writing:**
    1. **The scope question:** does the "in" list actually fit seven days — and what would *you* cut first?
    2. **The proof question:** does the demo plan prove the plan's stated claims (need / tech / usability), or just show screens?
    3. **The risk question:** what's most likely to go wrong in the demo itself — and is there a fallback (seed data, local mode; a recorded clip only as a declared last resort, which costs a level)?
  - **Exchange** (~7 min per direction): discuss, authors capture on the sheet. Same register as always — specific, criteria-anchored, kind.
- Instructor floats between pairings; flags any plan whose "in" list is still a milestone-sized wish.
- **No revision block in class.** Authors keep the sheet and revise after class: move one thing to deferred, tighten the demo script, add the fallback. The revision is due end of day (it's the CP10 demo's contract, and the version scored).

### 3. Setup-guide anatomy — a self-check — 7 min
- Why now: in Week 8 there was nothing to set up, so CP7 carried a placeholder. Today the placeholder's issue closes.
- **The anatomy**, on one slide, shown on Prop Loft's guide (and Rich's dev setup for comparison). Students already read it on the student page; class doesn't re-teach it, it checks against it:
  1. **Prerequisites with versions** ("Python 3.12+", not "Python"), with a link to install each, and a command to check each.
  2. **Numbered steps, one command each, copy-pasteable.** No "set up the database as usual."
  3. **"You should see…" checkpoints** after the steps that can silently fail, so a reader knows they're still on track.
  4. **How to run the tests**, and what passing looks like.
  5. **When a step fails:** the two or three failures you already hit, and their fixes.
- **Self-check (~4 min):** each author marks their own guide against the five parts and fixes the one missing part they can fix in two minutes (most often a version or a *you should see*). The README's quickstart becomes the short version, linking here.

### 4. Partner cold test — 30 min
- **Both partners test at once:** each follows the other's guide on their own laptop, **exactly as written**, from a fresh clone of the guide's PR branch. The author is busy running their partner's guide, so the rule runs the other way: **don't ask the author** — a question you'd ask goes in an issue, except under the 5-minute rule below. *(Fresh clone is the bar, not a clean machine: tools already installed for other courses don't have to be removed, but nothing gets installed that the guide didn't say to install.)*
- Every step that fails or confuses → **an issue on the author's repo**, through their bug template, naming the step. This is CP9 material for both of you.
- **Stuck for 5 minutes on one step:** file the issue, then ask the author for just enough to get past it, and note in the issue that you needed help. A guide that can't be finished in the block is a finding, not a failure of the reader.
- Instructor floats; the most common failure is a prerequisite the author forgot they had.

### 5. Read it back + wrap — 10 min
- Read the issues filed against your guide (~5 min): all of them first, then group them by cause (several usually share one) and put them at the top of Ready. **No fixing in class** — five minutes isn't enough to read and fix, and a rushed fix adds a bug. Everything is fixed before Monday, when Session 21 reruns the fresh-clone check on main.
- Exit check, aloud, per project: *review sheet in hand? setup guide on a PR? cold-test issues filed?*
- **Tonight:** revise and submit the MVP Plan (end of day).
- **Before Monday:** close the cold-test issues and merge the guide (fix it, leave the closed issues visible as evidence), and **rehearse the demo path**: walk the slice end-to-end *as it exists on main*, filing an issue for every break with the debug-log format.
- **Next Wednesday (Nov 18): CP10 Progress Demo + Repo Audit** — demo the slice to a small group **and** a classmate audits your repo cold (clone, follow the setup guide you tested today, run, find their way, for a grade). **CP9 Technical Communication Portfolio also due Nov 18** — 8 artifacts, quality-graded; assemble it *this weekend*, not Tuesday night.
- Monday (Nov 16) is a light check-in + troubleshooting session — bring problems, not polish.

---

## Threads to carry forward

- The revised **MVP Plan = the CP10 demo contract**; the fallback plan is demo-craft that returns at the final (Wk 14 dry-run).
- Demo-path issues (filed before Monday) and cold-test issues are the week's priority queue — and more CP9 candidates.
- The **blocker board** starts in **Session 21**, the first full studio session (moved there from this session, which no longer has a studio block), and runs through the Weeks 11–13 studio sessions.
- The cold-tested setup guide is what the **Session 22 auditor** follows, and it grows into `docs/onboarding.md` in the **launch package** (CP11), which a fresh classmate tests again in Session 25.
- "Prove, don't show" (the proof question) is the standard the final demo is graded on.

---

## Open questions / decisions before we flesh this out

- **Lost studio time:** the setup-guide block replaces the 32-min studio. Demo-path rehearsal moves to homework before Monday and Session 21's studio. If MVP Plans arrive in rough shape, shorten §2 rather than §4 — the cold test needs both partners in the room.
- ~~**Setup-guide writing time**~~ **resolved (Tom, Oct 30):** 10 minutes in class wasn't enough to produce a guide anyone could follow. The guide is written **before class** (Sessions 18–19 already had it in Ready, "draft it in week one"); class keeps the cold test, at 30 min, plus a 7-min self-check. The in-class plan revision became after-class work.

- **Review pairings:** same pairs as Week 11's audit (continuity: reviewers see the plan, then the result) or fresh eyes each time? *(Recommend same pairs — it makes the audit richer.)*
- ~~**MVP Plan re-submission**~~ **resolved (Tom, Oct 24): end of day today.** Canvas now matches (due end of day, the URL of `docs/mvp-plan.md` on main); students bring a draft to class for the review.
- ~~**Recorded-clip fallback policy**~~ **resolved (Tom, Oct 24):** a declared last resort; using it caps CP10 *Demo readiness* at Proficient, unless the failure was the room's.

---

## Deliverable / after class

- **Due today:** **MVP Plan** (reviewed in class, revised after, submitted end of day).
- **Before Monday:** setup guide merged, cold-test issues closed; demo path rehearsed on main.
- **Due Wed, Nov 18:** **CP10 Progress Demo + Repo Audit** and **CP9 Technical Communication Portfolio.**

---

## Appendix — classroom handouts (Session 20)

- **MVP Plan Review sheet** (§2) — half-sheet pair, `canvas_material/resources/MVP-Plan-Review-Sheet.html` + `.pdf`
- **Setup-guide anatomy** (§3) and **cold-test protocol** (§4) — slides; the anatomy also on the student page, since it's needed before class
- **Demo fallback patterns** (seed data · local mode · recorded clip) — slide
- **CP9 + CP10 rubrics:** `rubrics.md`

---

*Next step: set review/audit pairings; print the MVP Plan Review sheet. Deck built (15 slides: title · today · why today · review protocol · the three questions · fallbacks · revise tonight · why a cold test · the five parts · Prop Loft excerpt · self-check · cold-test rules · filing an issue · read it back · wrap). Student page drafted (v3) at `canvas_material/lectures/session-pages/Session20-StudentPage.md.jinja`. Related: `Session19-Nov09-Outline.md`, `Session21-Nov16-Outline.md`, `rubrics.md` (CP9, CP10).*
