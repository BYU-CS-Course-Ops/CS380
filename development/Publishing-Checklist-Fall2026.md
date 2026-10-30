# CS 301R — Publishing Checklist (Fall 2026, Sessions 15–20)

Instructor-only; not deployed. The outward-facing steps that finish work already built locally: Prop Loft states going to GitHub, screenshots, Canvas deploys. Each step has a **do-by date**, set from the first session that depends on it. Check items off here as they're done. Add new ones in date order.

Rehearse every Canvas deploy on the sandbox first (`./canvas_material/deploy.sh sandbox`), then `fall26`. Run the validator before either.

---

## Now — by Fri, Oct 16

- [x] **Commit the Session 17 work** (done Oct 17, 0bf8ab8) (course repo): the DoD propagation (v4 §10, course summary + docx, CP8 rubric, Sessions 15/17/18), *Setting Up Your Board*, the CP7/CP8/Session 16 edits, the CP7 Checklist PDF, `demos/prop-loft-states/` (seed stages, issue bodies, PR bodies), and the first commit of `CP8-Project-Plan-Roadmap.md.jinja`.
- [ ] **Don't touch the local Prop Loft branches** in `~/repos/prop-loft`: `chore/task-form` and `docs/roadmap` (session-17), then `docs/design-plain-forms` (session-18, merged live in class), sit between `docs/readme-front-door` and `docs/setup-guide`, and `publish.sh` replays them in that order. (`docs/roadmap` was amended Oct 21 to state the maintainer's ~10 h/week; `docs/setup-guide` was rebased onto the session-18 branch.)

## After Session 13 — Mon, Oct 19 (after class)

- [x] **Publish Prop Loft through `session-16`:** (done Oct 20: PRs #1–#7, seed issues #8–#10) `demos/prop-loft-states/publish.sh session-16`. Pushes the git standards and the front door, tags `session-14` and `session-16`, seeds the three seed issues.
- [x] **Check the tag exists:** (done Oct 20) `git ls-remote --tags https://github.com/prop-loft/prop-loft session-16`. The Session 16 deck and student page link it.

## Before Session 15 — by Fri, Oct 23

- [x] **Deploy `fall26`.** Picks up the CP7 handout's intake question + label note, the updated CP7 Checklist PDF, and the Session 16 student page. (CP7 and the Session 16 page are already published, so this is an update students will see.) Also publishes the **Session 17 student page** for the first time; its Prop Loft and board-page links stay dead until Oct 29–30.
- [x] **Print the CP7 Checklist** (`canvas_material/resources/CP7-Checklist.pdf`), one per student, for Session 15 (Mon, Oct 26).

## Before Session 16 — by Tue, Oct 27

- [ ] **Re-check the `session-16` tag**, then deploy `fall26` if anything changed since the last deploy.

## Before Session 17 — by Thu, Oct 29: Prop Loft `session-17`

- [x] **Give `gh` the project scope:** (done Oct 29; non-interactive shells need `-h github.com`) `gh auth refresh -s project`. Without it, stage 17 skips the board and says so.
- [x] **Publish:** (done Oct 29 with `SKIP_BOARD=1`, so Tom builds the board by hand as students will: PRs #12–#13, epics #14–#18, tasks #19–#28, seeds #8–#10 triaged; an outside contributor's PR #11 for #9 is left open on purpose) `demos/prop-loft-states/publish.sh session-17`. Merges the task form and the roadmap (two PRs, squash), tags `session-17`, then runs `seed.sh` stage 17: `epic` label, milestones M1 (Nov 18) and M2 (Dec 2), five epics, ten tasks as sub-issues, the three seeds triaged, and the board.
- [x] **Build the board by hand** (done Oct 29: views *Everything*, *Milestones*, *Epics* (swimlanes), and the Session 18 *Plan* table; workflows auto-add `is:issue is:open`, item added → Backlog, closed and merged → Done) from *Setting Up Your Board*: public project *Prop Loft*, linked to the repo; Status options renamed to the five columns; cards In progress #8, #14, #15 · Ready #9, #21, #10 · Backlog #19, #20, #22–#28, #16–#18.
- [x] **Verify what the script did.** (Oct 29: board built by hand instead, so the checks below were done in the UI) The board code has never run (the token lacked the scope when it was tested), so look at each:
  - the board is **public** and listed on the repo's **Projects** tab;
  - columns are **Backlog → Ready → In progress → In review → Done**, in that order;
  - cards: search *In progress*; item detail, checkout model, setup guide *Ready*; the rest *Backlog*; epics E1–E2 *In progress*, E3–E5 *Backlog*;
  - the search seed is retitled *Search items by name*, assigned to you, with its *Triaged* note; filters are their own M2 task;
  - each epic shows its sub-issues and progress bar;
  - the README links (board, roadmap, `session-17` tag row) all resolve.
- [x] **Finish the board by hand** (the API can't; the script prints these):
  - **Workflows → Auto-add to project:** repo `prop-loft`, filter `is:issue is:open` (issues only, decided Oct 29), enable; **Item added to project → Backlog** on; everything else but *Item closed* and *Pull request merged* off;
  - **New view → Board**, **View → Swimlanes: Milestone**, named *By milestone*, saved;
  - **New view → Board**, **View → Swimlanes: Parent issue**, named *By epic*, saved.

  This pass is also the rehearsal for Session 17 §4.
- [x] **Update the prop-loft-states README** if anything differed from the plan (it records stage 17 as tested "board excepted").

## Before Session 17 — by Fri, Oct 30: the board page and CP8

- [x] **Take the three screenshots** (done Oct 29) for *Setting Up Your Board* (`canvas_material/pages/Setting-Up-Your-Board.md`), into `canvas_material/resources/img/`:
  - `board-epic-subissues.png`: the *Find an item* epic, sub-issues and progress bar (§3);
  - `board-columns.png`: the board, five columns, cards in Backlog / Ready / In progress (§5);
  - `board-auto-add.png`: Workflows with *Auto-add to project* on (§5).
- [x] **Replace the three `📷 Screenshot to come` blockquotes** (done Oct 29; §5 also rewritten from Tom's walk-through: the list was broken on Canvas by 3-space nesting, and the Workflows, linking, views, and Size-field steps matched an older GitHub UI) with `![alt text](../resources/img/….png)`. Alt text should say what the image shows; see the Backstage diagrams on `Sample-Design-Doc-Backstage.md` for the house style. Run the validator; it checks the image paths.
- [x] **Publish the page:** `pg-setting-up-your-board` → `true` in `canvas_material/pages/pages-args.md`.
- [x] **Check the Session 17 student page's links.** (Oct 29: all GitHub links on it and the board page return 200) It's already marked to publish and goes live with the Oct 23 deploy, before the `session-17` tag, Prop Loft's `task.yml` at that tag, and the board page exist. Those links are dead until the steps above are done; once they are, confirm they resolve.
- [x] **Deploy sandbox, then `fall26`.** (done Oct 29) Goes live: the board page, its Course Resources link, the Session 17 page, and **CP8 with its Canvas rubric** (already marked to publish, and `deploy.sh` attaches the rubric). Deploy CP8 only once the page and the `session-17` tag exist: it links both.
- [x] **Spot-check in Canvas:** (Oct 29) CP8's rubric is attached and the *What it measures* table renders; the Assignment Rubrics page lists CP8; the board page's links to Prop Loft resolve.

## Before Session 18 — by Tue, Nov 3: the live PR and board

The Size field, sizes, `slice` label, and slice statement are made **live in class**, not before: don't pre-size the board. The steps are the run sheet in the Session 18 outline's appendix.

- [ ] **Replay the PR branch onto the published `main`** (run sheet, before class step 2): `publish/docs/design-plain-forms` with one commit; `git diff --stat origin/main` shows only `README.md` and `docs/design.md`. Don't push.
- [x] **Add the *Plan* table view** to Prop Loft's board, grouped by milestone, **Show hierarchy off** (run sheet, step 3). Done early, Oct 29, while testing the page; saved and confirmed.
- [ ] **Print the Fit Check Sheet** (`canvas_material/resources/Fit-Check-Sheet.pdf`), one per student.
- [ ] **Session 18 page live.** It's marked to publish and goes out with whichever deploy comes first; the Oct 30 one is fine. It carries the deck, the Fit Check Sheet PDF, and the Session 18 Course Resources entry. Two links are dead until later: Prop Loft's `session-18` tree (tagged after class, and labeled so on the page) and *Setting Up Your Board* if its screenshots aren't done. If you deploy after the Oct 30 one, deploy sandbox first, then `fall26`.

## After Session 18 — Wed, Nov 4 (after class)

- [ ] **Tag `session-18`** on the merge commit and push it; check with `git ls-remote --tags https://github.com/prop-loft/prop-loft session-18` (run sheet, *After class*).
- [ ] **Tidy the clone**, keeping the local `docs/design-plain-forms` branch (`publish.sh` reads it).

## Before Session 19 — by Fri, Nov 6: the reading, CP10, and the debugging demo

- [x] **Deploy sandbox, then `fall26`.** Goes live: *Debugging on Purpose* (`pg-debugging-reading`, assigned before class) and its Course Resources entry, the V1 Proof Sheet and Debugging Loop Card PDFs, the **MVP Plan**, **CP10 with its Canvas rubric** (`deploy.sh` attaches it), and the **Session 19 page** with its deck (marked to publish).
- [x] **Spot-check in Canvas:** CP10's rubric is attached and its *What it measures* table renders; the Assignment Rubrics page lists CP10; the MVP Plan links CP10 and the V1 Proof Sheet.
- [ ] **Rebuild the debugging demo on `session-18`:** `demos/session19-debugging/setup.sh` (it falls back to `docs/design-plain-forms` until the tag exists; rerun after Nov 4 so it builds on the tag). Expect `OK` from the tests. Rehearse the run sheet (`DEMO-SCRIPT.md`) once, then run `setup.sh` again to reset.
- [ ] **Print** the V1 Proof Sheet (`canvas_material/resources/V1-Proof-Sheet.pdf`), one per student, and the Debugging Loop Card (`Debugging-Loop-Card.pdf`), one half-sheet per student.

## Before Session 19 — by Fri, Nov 6: Prop Loft `session-20`

*Moved up from "before Session 20" (Oct 30): students now write their setup guides **before** Session 20, from Prop Loft's as the model, and the Session 19 and 20 pages link the tag.*

- [ ] **After the `session-18` tag is pushed**, publish the setup guide: `demos/prop-loft-states/publish.sh` (no argument runs the rest of the stack). It should report `docs/design-plain-forms` as already on main (merged in class) and skip it; if it tries to open a PR for it instead, the in-class title didn't match the commit subject: stop it. Merges `docs/setup-guide`, tags `session-20`. Its PR closes the setup-guide issue, and the board's *Item closed* workflow should move that card to Done. Check it did.
- [ ] **Check the tag:** `git ls-remote --tags https://github.com/prop-loft/prop-loft session-20`, and open the Session 20 page's link to `docs/setup.md` at the tag.

## Before Session 20 — by Tue, Nov 10

- [ ] **Print** the MVP Plan Review sheet (`canvas_material/resources/MVP-Plan-Review-Sheet.pdf`), one page per pairing (two half-sheets; cut).
- [ ] **Check which projects have a setup-guide PR open** (Session 20 outline, prep).

## Before Session 21 — by Fri, Nov 13

- [ ] **Deploy sandbox, then `fall26`** so the **Repo Audit Sheet** is on Canvas (linked from the CP10 handout) before Session 21 previews it. The Session 21 page goes with it if its prose is written by then (the deck is already wired to it).
- [ ] **Write and publish the Session 22 student page** before this deploy: the Session 21 page and deck (slide 11) tell students to read it ahead.
- [ ] **Print** a few Repo Audit Sheets (`canvas_material/resources/Repo-Audit-Sheet.pdf`) to pass around in Session 21.

## Before Session 22 — by Tue, Nov 17

- [ ] **Print** the Repo Audit Sheet, one per auditor (one per project at this enrollment).
- [ ] **Print** the Demo Feedback Sheet (`canvas_material/resources/Demo-Feedback-Sheet.pdf`), two pages per student (one half per demo watched; cut).
- [ ] **Print** the CP10 Scoring Sheet (`lectures/Session22-CP10-Scoring-Sheet.pdf`) for yourself.
- [ ] **Open each project's `cp10` tag URL** from its Canvas submission and confirm the tag exists, before the first demo.
