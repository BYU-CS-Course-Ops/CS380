# Session 17 — From Design to Work: Epics, Milestones & Issues — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 17 of 27 · Mon, Nov 2, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **GitHub Docs — [*About issues*](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)**, **[*About milestones*](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones)**, and **[*Adding sub-issues*](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues)** — the mechanics you'll use (short; skim all three).
- **Course page — *Setting Up Your Board*** (`canvas_material/pages/Setting-Up-Your-Board.md`) — the task form, epics, milestones, and the board, step by step on Prop Loft. Read before class; §4 and the workshop assume it. *(Unpublished until its three screenshots are taken from Prop Loft's live board.)*
- **GitHub Docs — [*Best practices for Projects*](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects)** — the reasoning behind the board (break work down, one source of truth, let automation move status). Short.
- **Atlassian Agile Coach — [*Epics, stories, themes*](https://www.atlassian.com/agile/project-management/epics-stories-themes)** — the decomposition vocabulary: epics break into stories/issues; keep it lightweight.
- **Re-read:** your design doc's implementation plan and your MVP definition (CP3) — today they become the backlog.
**Maps to:** Design Week 9, Session A — *turn the proposal/design into epics, milestones, and issues; build board categories.*

> **Status: OUTLINE (v2).** Phase 4 begins — the build. This week turns paper into a plan: **CP8 Project Plan & Roadmap due Wed, Nov 4.** From here to Thanksgiving, class time tilts toward studio. *v2 (Tom's notes): the worked example is Prop Loft; requests vs. work items disambiguated (a Task form joins the issue forms); issue size flexes with the work; GitHub Projects is the standard tracker, with setup steps in §4; epics are parent issues with sub-issues (§2, §5); the definition of done stays in the git standards — no separate file (§4).*

---

## Purpose of this session

You have a design and a tracker with a few seed issues in it. The founder's next job is **decomposition**: breaking the MVP into work items small enough to build, estimate, and review — and organizing them so that *anyone* (a teammate or your future self today, a stranger in April) can see what matters, what's next, and where to start. Today you'll turn the design doc into **epics → issues**, group them into **milestones** with dates, and set up the **board** that makes state visible. This isn't project-management theater: a populated, prioritized tracker is a founding artifact — it's how a project shows it has a future.

---

## Learning objectives

By the end of this session, a student can:

1. **Decompose an MVP into epics and issues** — each issue one coherent, reviewable unit of work.
2. **Tell a request from a work item**, and turn one into the other: a work item states its goal, its context, and its **acceptance criteria**.
3. **Group issues into milestones** with honest dates tied to the remaining calendar.
4. **Set up a GitHub Projects board** whose columns reflect the project's actual workflow states.
5. **Tag contribution pathways** — label the issues a newcomer could start on.

---

## Instructor prep / materials

- **The worked example is Prop Loft at tag [`session-17`](https://github.com/prop-loft/prop-loft/tree/session-17)** — built locally (branches `chore/task-form`, `docs/roadmap`); it ships with `demos/prop-loft-states/publish.sh session-17`, after the session-16 publish. **Run `gh auth refresh -s project` first**, or the board is skipped.
  - *In the repo:* `.github/ISSUE_TEMPLATE/task.yml` (goal · context · acceptance criteria, all required; optional *Where to start*) and `docs/roadmap.md` (Now: M1/M2 and the cut, said out loud · Next: design slices 4–5 · Later: props and set pieces · Not planned: the non-goals).
  - *On GitHub (`seed.sh` stage 17):* the `epic` label; milestones **M1 · Demo-able core** (Nov 18) and **M2 · MVP complete** (Dec 2); five epics with ten tasks as sub-issues; the three seed issues triaged into tasks (a *Triaged* note appended under the request as filed, so the before/after is one issue); a **public project board** linked to the repo, Backlog → Ready → In progress → In review → Done, cards placed. Two things the API can't do, done by hand after the publish (the script prints them): the **auto-add workflow** and the **By milestone / By epic views** — that pass is the §4 rehearsal.
  - Issue numbers on the canonical repo follow the pull requests', so slides and the student page name issues by title, never by number.
- **The decomposition, ready on slides** (from Prop Loft's `docs/design.md` §2 goals, §4 components, §8 plan):

  | Epic (user value) | Issues | Milestone |
  |---|---|---|
  | **E1 Find an item** | *Search items by name* (seed) · *Show an item's detail page* (seed, good first issue) · filter by category and size (split from the search seed) · say so when a search finds nothing *(good first issue)* | search + detail → M1; filters, empty state → M2 |
  | **E2 Check out and return** | checkout model with *at most one open checkout per item* · check-out form on the item page (actor, show, due date) · "out to whom, due when" on list and detail · returns · overdue list for the wardrobe lead | first three → M1; returns, overdue → M2 |
  | **E3 Add an item** | add-item form, co-designed with the wardrobe lead · photo upload, downscaled in the browser · HEIC test on a borrowed iPhone | M2 |
  | **E4 Roles and phone layout** | volunteer vs. wardrobe-lead permissions · phone-friendly layout | roadmap |
  | **E5 Run it at the theater** | *Write a setup guide* (seed) · deploy to the theater's server · seed 60 items · strike-night trial | setup guide → M1; the rest → roadmap |

  The teaching points it carries: **epics are *what*, milestones are *when*, and they cut across each other** (M1 takes slices of E1, E2, and E5); Prop Loft's design plans five slices, the calendar holds two, and **slices 4–5 go to the roadmap — an honest cut, said out loud**.
- **One request → work-item rewrite** on a slide, before/after: the search seed as filed through the feature form (problem · who · workaround · idea), then triaged: retitled *Search items by name*, filters split into their own M2 task so it stays one PR, and:
  > **Goal:** a volunteer finds an item by typing part of its name.
  > **Context:** design §2 goal 1, §4 Catalog; parent: E1 Find an item; the request above it is the why.
  > **Acceptance criteria:**
  > - [ ] A search box at the top of the item list filters it to items whose name contains the text, ignoring case.
  > - [ ] An empty search shows the full list.
  > - [ ] The search text stays in the box after searching.
  > - [ ] Tests cover a match, mixed case, and an empty search.
- **Slides:** the decomposition ladder (MVP → epic → issue); requests vs. work items; issue size; the milestone arithmetic; the board and its built-in workflows.
- **The calendar math** ready: build weeks remaining (Nov 2 → Dec 2 launch package ≈ 4½ weeks, with CP10 demo Nov 18 as the midpoint) — this drives milestone honesty.
- Students need laptops. **Tracker: GitHub Projects**, standard for every project (decided) — issues, milestones, sub-issues, PRs, and the board in one place, and one place for the Week-11 auditor to look.

---

## Timed outline (≈75 min)

### 1. Framing — the tracker is the project's memory — 5 min
- The shift: Weeks 1–8 produced *documents*; Weeks 9–13 produce *working software* — and the tracker is where the two meet.
- Founder lens: a good backlog isn't for you — it's how a team coordinates (and how a solo founder remembers), how the instructor audits progress (Wk 11), and how a future contributor finds a way in (today's labels). Also the plain truth: **unwritten work doesn't get done.**

### 2. The decomposition ladder — 14 min
- **MVP → epics → issues**, walked on Prop Loft's design:
  - An **epic** = a slice of user-visible value ("find an item", "check out and return", "add an item") — 3–5 per MVP is typical at our scale. Read them off the design doc's **goals**, not its components: an epic cuts across components (E2 touches the Web UI, Checkout, and Auth), and that's normal.
  - An **issue** = one coherent, reviewable unit of work — usually one PR: "enforce one open checkout per item," not "do the backend."
- **On GitHub, an epic is a parent issue with sub-issues.** Open the epic as an ordinary issue labeled `epic` (its body: the user value, a link to the design section, what's *in* and *out*); then **Create sub-issue** at the bottom of its body, or link existing issues (the search and detail seeds become sub-issues of E1). The parent shows a progress bar as sub-issues close, and the board can group by parent. *(The label is the default. An "Epic" issue type, or one milestone per epic when each epic is also a release, does the same job; sub-issues are the part worth keeping either way.)*
- **Two kinds of issues — the same tracker, different jobs.** Week 8's anatomy was for **requests**: a bug report or feature request, written by *anyone*, saying what's wrong or what's needed — your issue forms ask for exactly that (steps · expected vs. actual · environment; or problem · who has it · workaround). Today's issues are **work items**, written by a *maintainer* while planning, saying what will be built and how you'll know it's done:
  - **Goal** (one sentence) · **context** (design-doc section, parent epic, the request it came from) · **acceptance criteria** — a checklist that's true or false when the PR merges. The per-issue definition of done.
  - **Triage is the bridge.** Accepting a request means turning it into a work item: add acceptance criteria and a goal, link the epic, set the milestone. Show the search seed before/after (prep) — and note that triage *split* it: the filters became their own task.
  - **A Task form** (`.github/ISSUE_TEMPLATE/task.yml`) makes the work-item shape the default the way the bug form did for reports. Session 16 left room for it ("a task uses the closest form, or the project adds a task form"). It's the **default**, and most projects will take it; a Markdown template, the *Task* issue type, or a reviewer who insists on acceptance criteria also do the job. Established projects make the same split by form, label, or issue type; the mechanism varies, the distinction doesn't.
- **Issue size — the shape of the work, not the clock.** The tests: *Is it one coherent change? Can one person carry it? Can it be reviewed as a unit? Does it show progress before it's finished?*
  - Real projects have issues that take **weeks** — a database migration, a hard concurrency bug, a performance investigation — because the work is one indivisible thing, and splitting it would just produce pieces that mean nothing alone. That's fine. What a long issue owes everyone is *visible progress*: a draft PR, a checklist in the body, comments as it moves.
  - The real rule: **if it can be split into pieces that are each useful and reviewable on their own, split it.** "Implement the frontend" fails that test — it's an epic wearing an issue's costume. "Investigate why checkouts double-post on slow networks" passes it even if it takes a week.
  - *At this course's scale* — about five build weeks, a handful of outside hours each — most work items should land in **a few focused hours to a couple of days**, because a two-week issue is 40% of the runway with no checkpoint in it. Bigger is allowed when the work is genuinely one thing; say so in the issue.
- Anti-patterns: the iceberg issue ("implement frontend"), the mystery issue (title only, no acceptance criteria), the stale-by-design issue (specifies implementation details the design doc already owns).

### 3. Milestones & the honest calendar — 10 min
- **On GitHub:** Issues → **Milestones** → **New milestone** (title, due date, a one-line description of what's true when it closes). Each issue joins one milestone; the milestone page shows percent complete.
- Work backward from fixed dates: **Nov 18** progress demo (CP10) and **Dec 2** launch-package assembly (CP11). That's roughly **two two-week milestones**: *M1 "demo-able core" (by Nov 18)* and *M2 "MVP complete" (by ~Dec 2)*.
- Prop Loft's version: its design plans five vertical slices; M1 = slice 1 (find it, open it, check it out, see it marked out), M2 = slices 2–3 (returns + overdue, add an item with a photo), and slices 4–5 go to `docs/roadmap.md` with no December date on them.
- Milestone honesty: capacity ≈ number of maintainers × ~7 outside hours × 2 weeks, minus review overhead. Count it, then cut. (The Session-8 arithmetic, now with real numbers.)
- The roadmap beyond December is part of CP8: where the project goes **as others join** — epics you're *not* doing this semester, written down (`docs/roadmap.md`, §10).

### 4. Boards, labels, and pathways — 10 min
- **Framing for the whole section: the job, then the default.** The tracker has jobs (describe work, notice what's new, group by value, group by date, show state); the columns, labels, and forms below are **suggested defaults, changeable with a reason written in CONTRIBUTING** — the same rule as the git policies in Session 13. Most students take the defaults; the instruction should still be about the jobs.
- **Noticing what's new.** Session 16 asked each project how it will know which issues are still waiting (CP7's norms). Revisit the answer as triage: the default is a `needs triage` label the request forms apply (create it first: forms skip missing labels silently); a *New* column on the board or a fixed weekly read also work.
- **A board isn't automatic** — a GitHub Project is a separate object that *holds* issues and PRs. Demo live on Prop Loft (or show the one built in prep):
  1. **Create it at the organization:** org page → **Projects** → **New project** → start from **Board** (blank). Check **Import items from repository** and pick the project repo: that pulls in every existing issue and makes it the project's default repo.
  2. **Set the columns:** the board's columns are the **Status** field's options. A blank board starts with Todo / In Progress / Done; edit the field (column menu, or the project's ⋯ → **Settings** → Status) to the default **Backlog → Ready → In progress → In review → Done**, or the project's own states. Keep a review state whatever else changes: every project works through PRs, and that column is where the review policy lives.
  3. **Turn on the workflows** (⋯ → **Workflows**): *item closed → Done* and *PR merged → Done* are on by default; turn on **Auto-add to project** with the filter `is:issue,pr is:open` so new issues arrive on their own. (Free orgs get one auto-add workflow, and it only catches *new* items — which is why step 1 imports the existing ones.)
  4. **Make it public and findable:** a new project is **private** by default, even in an org whose repo is public — a stranger (or the Week-11 auditor) sees nothing. ⋯ → **Settings** → **Visibility: Public**. Then in the repo, **Projects** tab → **Link a project**. Now it's one click from the repo, and the issue sidebar shows each issue's status.
  5. **Views worth adding:** a second view grouped by **Milestone** (what's left in M1?) or by **Parent issue** (how's each epic doing?). Views are free; the board stays the default.
- **Labels that work** (defaults again): type (`bug`/`enhancement`/`documentation`; plus `epic`), priority (`P1`/`P2`), and the founder's special: **`good first issue`** — tag 2–3 genuinely approachable items with a *Where to start* section (Prop Loft's item-detail issue is the model: which file, which function to imitate, which test to copy), because contribution pathways are graded in CP8 and tested at launch.
- **Two layers of "done":** each issue's **acceptance criteria** say what *this* change must do; the project's **definition of done** (already a section in your git standards from CP6 — reviewed, merged, tests pass on `main`, docs updated, issue closed) says what *every* change must pass. Revisit it today: now that there's code, does it name your test command? **It stays there** — one home, linked from CONTRIBUTING, so it can't drift from a copy; CP8 grades the revisited version.

### 5. Workshop — decompose your own MVP — 28 min
- Each project, live in its own tracker:
  1. **Setup** (~5 min): create the Project (§4 steps 1–4); add the `epic` label and the Task form, or the project's alternative, with its reason in CONTRIBUTING (Prop Loft's `task.yml` is a copy-and-edit start — it goes in through a PR like everything else; it can be the first card on the new board).
  2. **Epics first** (~6 min): 3–5 parent issues, named as user value, each linked to its design-doc section; sanity-check against the design doc's goals.
  3. **Issues for M1** (~12 min): decompose the *first* milestone fully as sub-issues of their epics, through the Task form; triage your CP7 seed issues into work items; write real acceptance criteria on each; assign owners to the first few.
  4. **Milestones + board + labels** (~5 min): dates on M1/M2; issues into milestones; Status set on each card; `good first issue` × 2–3 tagged with a *Where to start*.
- Instructor circulates with three questions: *"which issue is secretly an epic?"*, *"what must be true on Nov 18 — is that M1?"*, and *"what did you change from the defaults, and why?"*

### 6. Wrap + before next class — 8 min
- Recap: decomposition is a founder skill — the tracker is the project's public memory and its welcome mat.
- **Wednesday (Nov 4):** estimation & sequencing — sizing M1's issues with **t-shirt sizes** and checking that M1 fits, finding the dependency chains, and locking the **vertical slice**. **CP8 Project Plan & Roadmap due end of Wednesday.**
- Between now and then: finish decomposing M2 at epic/coarse-issue level (M1 fine-grained, M2 coarse is the right shape).

---

## Threads to carry forward

- Acceptance criteria per issue + the project's definition of done = the **"done" discipline** that CP10's demo and the final demo are judged against.
- `good first issue` labels + roadmap = the **contribution pathways** graded in CP8 and showcased in the launch package.
- Milestone M1 *is* the **Nov 18 progress-demo scope** — the plan and the demo are the same commitment.
- The tracker becomes primary evidence for **individual accountability** (issues/PRs per student).
- Requests keep arriving through the forms all semester; **triage** (request → work item) is the maintainer habit the launch package should show.

---

## Open questions / decisions before we flesh this out

- ~~**Tooling**~~ **resolved: GitHub Projects**, standard for every project (§4).
- ~~**Estimation method for Wednesday**~~ **resolved: t-shirt sizes + a "does M1 fit?" check** (Session 18).
- ~~**Where the definition of done lives**~~ **resolved: in `docs/git-standards.md`** (the CP6 section), not a separate file. CP8 grades it revisited and testable now that there's code. Propagated to v4 §10, the CP8 handout + rubric, the course summary, and Sessions 15 and 18.
- ~~**CP8 handout follow-ons**~~ **done:** *What to produce* names the defaults (task form, epics as parent issues with sub-issues, GitHub Projects) as changeable with a reason; §2's flexible issue-size test; Prop Loft examples.
- **Defaults, not mandates (decided):** the task form, `epic` label, board columns, auto-add filter, and intake label are suggested defaults a project may change with a written reason. Only a review state on the board is kept, because PRs are fixed.

---

## Deliverable / after class

- No new checkpoint today; M1 decomposed by end of class, M2 coarse-decomposed before Wednesday.
- **Due Wed, Nov 4:** **CP8 Project Plan & Roadmap** (milestones, prioritized backlog, feature breakdown, labels, definition-of-done, roadmap into a future semester).

---

## Appendix — classroom handouts (Session 17)

- **Decomposition ladder + request vs. work item + issue-size tests** (§2) — half-sheet
- **Setting up the board** (§4, the five steps) — the *Setting Up Your Board* course page, not printed; students follow it at their laptops
- **The calendar math** (§3) — slide
- **CP8 rubric:** the Assignment Rubrics page (Project Plan & Roadmap)

---

*Next step: publish Prop Loft's `session-17` state (after session-16), finish the board by hand, and screenshot it into `canvas_material/resources/img/` for the Setting Up Your Board page (three placeholders), then flip its `Publish`. The Session 17 student page is written and published (its Prop Loft and board-page links resolve once those exist). **Deck built:** `canvas_material/lectures/powerpoint/Session17-DesignToWork.pptx` (22 slides, `tools/build-session17.js`). Related: `Session16-Oct28-Outline.md`, `Session18-Nov04-Outline.md`, `rubrics.md` (CP8), `demos/prop-loft-states/`.*
