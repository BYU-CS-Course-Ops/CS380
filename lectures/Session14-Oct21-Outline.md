# Session 14 — Git Workflow Lab: Run the Loop, Set Your Standards — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 14 of 27 · Wed, Oct 21, 2026 · 75-minute block**
**Prior prep:**
- **Laptops + working repo access** for every project member (organization invite accepted, can push).
- **Come ready to decide** the six git standards from Monday (deck slide 27; written out with alternatives in Part 4 of the **Git Workflow Lab Guide**, `pg-git-lab-guide`, linked from the Session 13 page).
- **Solo founders: review partner added** to the repo as a collaborator (Write), so they can be requested as reviewer.
- **CP5 Design Document (revised) due end of today** — final revisions should be done or nearly done before class.
**Maps to:** Design Week 7, Session B — *hands-on branch/merge/PR lab on the team repo; set the team's git standards.*

> **Status: OUTLINE (v1).** A lab (Session B): every student runs the full maintainer loop on their project's real repo, including a staged merge conflict, and each project writes its git standards. **CP5 + CP6 both due end of today.**

---

## Purpose of this session

Monday you watched the loop; today **everyone drives it** — on your project's actual repo, with a real reviewer — a teammate, or on a solo project, your review partner. The lab is deliberately mechanical: branch, commit well, open a PR, review someone else's PR, respond to review, merge under policy, and survive one staged merge conflict. Mechanical is the point — this loop has to be muscle memory *before* the build phase starts, because from Week 9 on, every feature travels through it. You leave with **CP6 complete** and your project's **git standards written down** — the process governance your CONTRIBUTING.md will formalize next week.

---

## Learning objectives

By the end of this session, a student can:

1. **Execute the full loop unassisted** on a shared repo: branch → commits → PR → review → revise → merge.
2. **Resolve a merge conflict** calmly and correctly.
3. **Review another maintainer's PR** (a teammate's, or your review partner's) to the Google standard, in writing.
4. **Codify the project's git standards** — the policy checklist, decided and written.

---

## Instructor prep / materials

- **The lab guide** — the Canvas page **Git Workflow Lab Guide** (`canvas_material/pages/Git-Lab-Guide.md`, id `pg-git-lab-guide`), open on every laptop. A page rather than a printout because students copy commands from it. It carries everything below in student-facing detail: a before-you-start check with commands, the starter-task menu, every git command for Parts 1–3, the conflict recipe, the standards table and `docs/git-standards.md` skeleton, a collect-your-links checklist, and troubleshooting. **CP6 rubric** visible.
- **A prep-check slide, up as students walk in (~90 sec).** This is a lab: a student who arrives unequipped doesn't just lose their own session, they stall the reviewer — teammate or review partner — who needs their PR to review. Four hands-up items, each a yes/no a student can answer instantly:
  1. **Laptop, charged, dev environment runs.**
  2. **Repo access accepted — you can *push*, not just clone.** (Accepting the invite isn't the same as having pushed once.)
  3. **Leanings on the six standards** — branch naming, commit convention, PR size, review, merge strategy, "done" (lab guide Part 4).
  4. **CP5 revisions done or nearly** — it's due end of today, and lab time is not revision time.
  Fix item 2 in the first five minutes, not at minute 40. Anyone still blocked pairs with their reviewer for the solo legs and runs their own loop after class.
- **A starter task per member** — trivial by design, and grounded in what every repo holds by now (README with a status line and Maintainers line, LICENSE, `.gitignore`, `docs/design.md`, per *Starting Your Project Repository* and the design-doc draft). The guide's menu: **A** link the design doc from the README · **B** a README License section · **C** harden `.gitignore` (`.env*`, editor, OS files) · **D** fix what a stranger would find wrong in the README · **E** a `docs/README.md` index. Off-limits today: `docs/design.md` (CP5 revisions are in flight) and the README status line (reserved for the conflict). The *content* is trivial so the *process* is the work. The guide lists the options; **each student files their own issue for it before starting work** — no instructor seeding, no repo access needed. Issue writing isn't taught until Session 15, so students write it however they think an issue should look; those issues become Session 15's raw material.
- **Conflict recipe** ready (below, step 5) — two students editing the same line by instruction.
- TA/instructor rove for un-stick duty; a "help" queue on the board.

---

## Timed outline (≈75 min)

### 1. Setup + framing — 5 min
- Goal restated: everyone through the loop once; one conflict per project resolved; standards written. Trivial changes on purpose — today grades the *process*.
- Sanity check off the prep-check slide: everyone can pull **and push**. Fix access now, not at minute 40 — a blocked student blocks their reviewer too.

### 2. Lab part 1 — the loop, solo legs — 25 min *(guide Part 1)*
- Each member, on their starter task:
  0. **File an issue** for the task you picked from the lab guide — title and a short description, written however you think an issue for your project should read. No template yet; that's Monday's topic, and this issue is your first example.
  1. Pull main; **branch** (per a provisional naming convention — you'll ratify it today).
  2. Make the change in **1–2 logical commits**, messages passing the seven rules.
  3. Open a **PR** with a real description (problem · approach · what to look at), linked to the issue (`Closes #N`) so the merge closes it.
  4. **Request review** from a designated reviewer — round-robin within a team, so everyone reviews exactly one PR; on a solo project, your review partner (you review each other's).
- Instructor circulates; commit messages get spot-critiqued live.

### 3. Lab part 2 — review & merge legs — 15 min *(guide Part 2)*
- Everyone **reviews the PR assigned to them**: at least two written comments (one substantive, one may be a nit), using Monday's register.
- Authors **respond to every comment** (fix, or explain) and push the revision.
- **Merge** under the provisional policy (≥1 approval from a non-author). Watch the log build.

### 4. Lab part 3 — the staged conflict — 12 min *(guide Part 3)*
- Per project: two members branch from main and **edit the same line** of the same file (per the recipe), both open PRs; merge the first — the second now conflicts. **The recipe:** the README status line. A changes it to "Design complete; building the first version."; B keeps "Design in progress" and appends an issue-tracker link. Both branch from the same `main` before either merges. *(Solo: you open both branches yourself — the conflict and its resolution are the same; your review partner reviews the resolving PR.)*
- The second author resolves **on the command line, by merge** (`git fetch origin` · `git merge origin/main`) — not GitHub's web editor, and not rebase today: rebase needs a force-push and erases the merge commit that evidences the resolution. Resolve markers deliberately (read both sides; don't just pick "mine"), re-push, merge.
- Debrief by project (solo founders with their review partner): what made it easy? (Small change, clear intent, good messages.) That's the lesson — conflicts are cheap when changes are small and communication is good.

### 5. Write the standards — 12 min *(guide Part 4)*
- Each project decides and **writes down** (a `docs/git-standards.md` stub or PR into the repo — eat the dog food):
  - Branch naming · commit convention (seven rules adopted? prefix format?) · PR size norm · review requirement (who/how many) · merge strategy (and why) · **definition of "done"** for a change.
- Each choice gets one line of rationale — the alternatives-considered habit, applied to process.
- Instructor sign-off pass: skim each project's standards before they leave; flag anything unworkable.

### 6. Wrap — 6 min
- **CP6 complete** when: every member's PR is merged (reviewed, responded), the conflict is resolved in-history, and the standards doc is in the repo. Confirm submission mechanics.
- **CP5 (revised design doc) due end of today** via LMS.
- Preview Monday (Oct 26): **repo infrastructure** — README, CONTRIBUTING, licenses-in-practice, and the anatomy of a good issue. Your standards doc graduates into CONTRIBUTING.md. Reading on the Session 15 page.

---

## Threads to carry forward

- **Standards → CONTRIBUTING.md** (Week 8, CP7) — today's decisions get formalized for strangers.
- Today's PRs/reviews are the first **CP9 portfolio candidates** — tell students to keep links.
- The **loop is now law**: all build-phase work (Wks 9–13) travels through it; git history is individual-accountability evidence.
- **Student-filed starter issues** preview Week 8's issue anatomy: written cold today, critiqued against the anatomy in Session 15 §4.

---

## Open questions / decisions before we flesh this out

- ~~**Starter tasks**~~ **resolved (Tom's call):** the lab guide lists the options; each student files their own issue as step 0, then works it through the loop. Previews Session 15's issue anatomy without instructor seeding.
- ~~**Solo students**~~ **resolved (Session 13):** they run the same loop; their review partner — another solo founder — reviews their PR and they review the partner's. The pairing also seeds the Week-11 audit pairing.
- **CP6 grading mechanics:** graded from repo evidence (recommended — it's all in the history) vs. a submission artifact?

---

## Deliverable / after class

- **Due end of today:** **CP6 Git Workflow Lab** (evidenced in the project repo) and **CP5 Design Document (revised)**.
- The project's git standards live in the repo; the loop is in force from now on.

---

## Appendix — classroom handouts (Session 14)

- **Git Workflow Lab Guide** — Canvas page (`pg-git-lab-guide`), not a printout; linked from the Session 13 and 14 pages and Course Resources
- **Lab tracker + standards worksheet** — `canvas_material/resources/Git-Lab-Worksheet.{html,pdf}`, two pages, one per student (print double-sided). Page 1 is the step checklist with blanks for issue/branch/PR numbers and the key commands; page 2 is the six standards with defaults, alternatives, and *our choice / why* lines, plus an instructor sign-off line for the §5 pass.
- **CP5 + CP6 rubrics:** `rubrics.md`

---

*Next step: the deck is built (`tools/build-session14.js` → `Session14-GitWorkflowLab.pptx`, 15 slides: prep check, the four parts as signposts mirroring the lab guide, collect-your-links, wrap); student page written (`canvas_material/lectures/session-pages/Session14-StudentPage.md.jinja`) and `s14` published. Related: `Session13-Oct19-Outline.md`, `Session15-Oct26-Outline.md`, `rubrics.md` (CP5, CP6).*
