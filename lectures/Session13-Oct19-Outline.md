# Session 13 — Git for Maintainers: The Workflow You'll Enforce — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 13 of 27 · Mon, Oct 19, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **cbeams — [*How to Write a Git Commit Message*](https://cbea.ms/git-commit/)** — the seven rules, and why a cared-for log is a maintainer's power tool.
- **Google — [*Code Review Developer Guide*](https://google.github.io/eng-practices/)** — read the **reviewer** guide ("The Standard of Code Review" + "What to look for") and skim the **author** guide (small CLs, good descriptions). *(Reused from the prior course's Managing Code & Code Review module.)*
**Maps to:** Design Week 7, Session A — *live git workflow walkthrough; commit-message critique.*

> **Status: OUTLINE (v1).** First half of Week 7. Students know basic git; today re-aims it: **you're the maintainer now**, and the workflow you set is governance. **CP5 Design Document (revised) + CP6 Git Workflow Lab both due Wed, Oct 21.**

---

## Purpose of this session

You've all *used* git. But using git as a solo student and **running a repository as its maintainer** are different jobs. This course's workflow is **maintainer-centered** — not the fork-and-upstream dance of contributing to strangers' projects, but the branch → logical commits → PR → review → merge loop of a project whose maintainers own the repo and set its policy. Today is a live walkthrough of that loop plus the craft that makes it work: commit messages that explain *why*, PRs sized to be reviewable, and review comments that make the code (and the colleague) better. Wednesday you'll run the whole loop hands-on and **write your project's git standards** — your first act of process governance.

---

## Learning objectives

By the end of this session, a student can:

1. **Run the maintainer-centered loop:** branch → logical commits → draft PR → request review → revise → merge under project policy.
2. **Write a commit message** that passes the seven rules and explains *what/why*, not *how*.
3. **Size and describe a PR** so a reviewer can actually review it.
4. **Review a change** using the Google guide's standard — does it improve the codebase's health?
5. **Name the policy decisions** their project must make Wednesday (merge strategy, review requirements, branch naming, "done").

---

## Instructor prep / materials

- **The demo repo: *Prop Loft*** — the Backstage costume catalog from the Session 7 proposals, Session 11 sample design doc, and Session 12 diagrams, built for real as a small Django + htmx + Postgres skeleton (the stack its design doc argues for), in a public GitHub organization `prop-loft`, set up exactly the way *Starting Your Project Repository* tells students to. **Built:** https://github.com/prop-loft/prop-loft (Apache-2.0; local clone `~/repos/prop-loft`) — README with the rename story, env-based settings (no committed secret), `Bin` and `Item` models, a plain item list with tests. **Search is deliberately missing** from `main`: it's the change the walkthrough ships.
- **The demo kit: [`demos/session13-git-workflow/`](../demos/session13-git-workflow/README.md)** in this repo — scripts, patches, commit messages, prepared text. **The full step-by-step script is [`DEMO-SCRIPT.md`](../demos/session13-git-workflow/DEMO-SCRIPT.md)** (commands, talking points, contingencies). It drives the teaching clone `~/repos/prop-loft-class`, whose `.demo` links back to the kit; `setup.sh` rebuilds that clone on a new machine. No live coding: the search feature is already written and waits *uncommitted* on `main`; branching, the logical commits, push, draft PR, review, the review fix, the issue, the optional conflict, and the merge all happen live. **The demo runs against a disposable upstream, `prop-loft/prop-loft-demo`**, created from a fixed commit of the real repo (`.demo/demo.conf`), so the practice PR, review, and issue never land in `prop-loft/prop-loft`. `.demo/demo-upstream.sh reset` deletes and recreates it (rehearse as often as you like); `local` resets just the clone the morning of class; `delete` removes it at the end of the semester. Next semester: `create` again, or move the baseline to demo a later point in the project.
- **The reviewer is a student volunteer.** By the class before, *after* the final `reset` (a reset deletes the repo and their access with it): add them as a collaborator on `prop-loft-demo` with write access (command in the script) and **make sure they accept the invite**. During class, send them the prepared review text by Canvas message (`.demo/text/canvas-message-to-reviewer.md`): a real bug (stray spaces in the query) you fix with a new commit, and a scope question (category search) you answer with reasons and an issue. *(Why not "Backstage": see §2 — the rename is the opening teaching moment.)*
- **Real commit messages to critique — curated (§3).** Eight real messages from public repos: three from Tom's own (`dagorym/*`, attributed — *"this one's mine"* is a good moment), the rest from the public BYU-CS-Course-Ops repos, **shown without author names** (colleagues and former TAs; the point is the message, not the person). Plus one AI-disclosure example on its own slide.
- **Slides: built**, `canvas_material/lectures/powerpoint/Session13-GitForMaintainers.pptx` (28 slides; script `tools/build-session13.js`). Map · governance framing · the six-step loop · Prop Loft and the rename · the live-demo slide (stays up in the terminal) · merge strategies with history diagrams · the seven rules · the eight critique messages (one per slide, "what to notice" on click) · AI in the log · the two rewrites, one slide each with the full original message and the facts from its diff · why maintainers care · logical commits vs. squash (answers the question the demo's merge step leaves open) · author side · reviewer's standard · human side · the review exercise and its debrief · Wednesday's six decisions · wrap. Every slide has presenter notes.
- **Repos already exist** — created at the first team meeting (Session 11 §6c) with the URL in each Team Charter's §1, due Oct 14. Before class, open each one: confirm every project member is in the organization and **has pushed at least once** (each member's *Maintainers* line in the README, and the `docs/design.md` commits, are the natural evidence). Prod anyone who hasn't — Wednesday's lab needs push access, not just an accepted invite.

---

## Timed outline (≈75 min)

### 1. Framing — the workflow is governance — 6 min
- The reframe: in most tutorials you're the *contributor* asking to get code in; here you're the **maintainer deciding how code gets in.** Every choice today (branch rules, review requirements, merge strategy) is a governance choice — Session 3's themes, now enforced in tooling.
- Why it matters beyond the people building it today: the workflow you set is what a future contributor will experience. Baseline course rule (§10): **every project uses PRs — even solo.**

### 2. Live walkthrough — the whole loop, once — 22 min
- **Open on the name (≈1 min).** The design doc they dissected called the project *Backstage*. When it came time to create the repository, we checked the name the way *Starting Your Project Repository* says to — and found **Spotify's Backstage**, a widely used open-source developer portal. A near-perfect name, taken. So the repo is ***Prop Loft***: available, and deliberately broader than v1 — the design doc scopes costumes first, but the vision is every item a production stores (props, set pieces, costumes). **Name for where the project is going; scope for where it starts.** And the best name is often taken; a founder picks the best *available* one and moves on. The README's first lines say exactly this.
- Drive it live in the demo repo, narrating decisions (script: `demos/session13-git-workflow/DEMO-SCRIPT.md`). **The change: search the catalog by item name** — the first feature the design doc's traced flow needs. The code is pre-written; every git and GitHub step is live:
  1. **Branch** — from main, named by convention (`feat/…`, `fix/…` — here, `feat/item-search`) — show why naming conventions pay off in a busy repo.
  2. **Logical commits** — two or three commits that each do *one nameable thing* (e.g. `Filter the item list by a name query` → `Add a search box to the catalog page` → `Test search by partial and mixed-case names`); show a `git log --oneline` that reads like a story — the repo's existing log is the model.
  3. **Draft PR** — open early; the description states the problem, the approach, and what to look at first.
  4. **Request review** — from the student volunteer: a reviewer who didn't write the change (in their projects, a teammate, or on a solo project, their review partner); show what reviewers see.
  5. **Revise** — respond to a comment with a new commit; disagree-and-discuss on another (respectfully, with reasons).
  6. **Merge under policy** — show the strategies (merge / squash / rebase) in the GitHub UI and what each does to history; note that *each project picks one* Wednesday. Squash, and show the message GitHub prefills from the PR's title and description (the demo repo is set that way); trim it to problem + approach. Then raise the question squash begs and **leave it open**: *why write four careful commits if squash turns them into one?* It's answered at the end of §3, once the room knows the rules.
- Sidebar (from v4): conflict basics live if time — create a tiny conflict and resolve it; worktrees/rebase flagged as optional depth, not required.

### 3. Commit-message critique — 15 min
- The seven rules in one slide (separate subject/body · ~50-char subject · capitalize · no period · **imperative mood** · wrap body · **what/why not how**). The imperative test: *"if applied, this commit will ___."*
- Critique round: put up the eight, one at a time; the room grades each against the seven rules (and the imperative test), then rewrites the worst two. **The set, weakest to strongest:**

  | # | Message (subject, body where it matters) | Source | What the room should find |
  |---|---|---|---|
  | 1 | `WIP` … later followed by `Revert "WIP"` | mdxcanvas (BYU-CS-Course-Ops) | Says nothing; and the revert of a WIP tells a future reader nothing about what was undone or why. Show both in `log --oneline` together. |
  | 2 | `Updates` | mdxcanvas | A subject that would fit every commit ever made fits none. |
  | 3 | `FIxed exception error` | `dagorym/StarshipConstruction` *(Tom's)* | Past tense, a typo, and *which* exception? It reads like a bug fix; the diff shows it only updated a stale error message (`class 1-4` → `class 1-5`) after the previous commit added class 5. The message hid what actually happened. |
  | 4 | `Fixed Test Suite. Fixed --auto-open flag. Fixed attempting to run on file that doesn't exist making an html anyway.` | code-recording-analysis | Three commits' worth in one subject — the message is telling you to split the commit. |
  | 5 | `Minor Updates` — body: four bullets (jinja args, a quiz-deploy return fix, error reporting, quiz tag fields) | mdxcanvas | The body refutes the subject: four unrelated changes, not minor, not one. Pairs with #4: *one commit, one nameable thing.* |
  | 6 | `test(forums): add ST2 resolveTopicLastActivity primitive coverage - isReply flag, opening-post fallback, soft-delete fallback, mixed topics - 174/174 tests pass, lint and typecheck clean` | `dagorym/sfus` *(Tom's; written by an AI agent)* | ~200-char subject: the body crammed into line one. Good conventional-commit prefix, wasted. Say who wrote it — the log still has to serve humans, whoever types it. |
  | 7 | `Update main to call Integrator::integrate()` — body: *"Add in some constants for number of steps and step size and the loop to call the integrate() function. Also add a final print statement…"* | `dagorym/StarSystemChecker` *(Tom's)* | Fine subject; the body narrates the diff (*how*), which git already shows, and never says *why*. |
  | 8 | `Use buffered GZip Writer` — body: *"I've observed instances where a recording has been corrupted and have even implemented a raw zlib decoder in the processor for this case when gzip headers are faulty. The goal is that using a buffered writer will help prevent this from happening."* | jetbrains-recorder | **The model.** Imperative, short subject; the body gives the failure that motivated it, the fix, and honest confidence ("the goal is"). A reader in two years knows why this line exists. |

- **Then one slide on its own — AI disclosure in the log:** `Fix cross reference algorithm` (mdxcanvas). The body explains the bug (only the cycle breaker removed intra-SCC edges, so the graph wasn't truly acyclic) and ends: *"This was written primarily by Copilot, however I have tested and verified the results."* That is the course's AI policy — use it, understand it, stand behind it — written where a maintainer will find it. Ask: what does that sentence tell a reviewer to do differently?
- Rewrites, in pairs, for #3 and #4 (deck slides 18–19; each shows the full original message plus what the diff actually contains, and the model rewrite appears on click):
  - **#3** → `Include class 5 in unknown-SCC-class error message` (body: *the previous commit added class 5; the message still said 1–4*). The slide shows the one-line diff and the commit before it.
  - **#4** → **five** commits. The real commit touches 23 files: the three fixes the message names (`--auto-open` could never be turned off; a pattern matching no files still wrote an HTML report; old tests replaced with regression tests), **plus two it never mentions** — HTML escaping in the report viewer, with a security test, and a check that edits arrive in time order. The lesson: a message that lists fixes separated by periods is several commits, and what it leaves out may be exactly what a reviewer needed to see.
- Why maintainers care: `log`, `blame`, `revert`, release notes, and the future contributor doing archaeology — the log is documentation you get almost for free, *if* it's kept.
- **Close the demo's open question** (deck slide 21): if we squash-merge, which commits end up in that log? The branch commits served the reviewer and stay in the PR (the squash commit links to it by number); the squash commit is what lands on `main`, so the seven rules apply to *it* — the PR title as subject, the why as body. Projects that want every commit on `main` rebase-merge and pay for it by making every branch commit clean (git itself, the Linux kernel). *If a PR needs more than one line of history on main, it's more than one change* — which leads straight into §4's small-PR point.

### 4. PRs and review, the Google standard — 18 min
- **Author side:** small PRs (one logical change), a description that orients the reviewer, self-review before requesting.
- **Reviewer side:** the guide's one-line standard — approve when the change **improves the overall code health**, even if not perfect. Look at: design, functionality, complexity, tests (when we have them), naming, comments — *in that order of importance.*
- **The human side:** comment on the code, not the coder; prefix nitpicks ("nit:"); ask questions rather than issue verdicts; author responds to every comment. (Same review register as Sessions 8's protocol — this is the same skill, new artifact.)
- Quick exercise (deck slides 25–26): a Prop Loft diff, "Show only the items in one bin," with three planted issues — **design** (loads every item and filters in Python, one bin lookup per item, instead of `Item.objects.filter(bin__label=…)`), **naming** (`get`, `l`, `i`, `result`), and a **nit** (a comment restating the next line). Pairs write two review comments each; the debrief reveals model comments in the register: what I see, why it matters, a question or suggestion.

### 5. Wednesday preview — the policy checklist — 8 min
- Wednesday is a hands-on lab on **your project's repo**, ending with your **git standards** written down. Decisions to come ready to make — each with a **suggested default** on the slide. They are suggestions: **every policy is the project's call**, and a project that picks differently just writes down why.

  | Decision | Suggested default | Why |
  |---|---|---|
  | Branch naming | `type/short-description` (`feat/…`, `fix/…`, `docs/…`) | Scannable branch lists; the type prefix matches the PR's intent |
  | Commit messages | The seven rules | Readable `log`, and a free changelog |
  | PR size | One logical change; small enough to review in one sitting | Large PRs get rubber-stamped, not reviewed |
  | Review | At least one approval from someone who didn't write the change | The second reader is the whole point; on a solo project, that's your review partner |
  | Merge strategy | Squash merge | One commit per change keeps `main` linear and easy to revert at this project size; merge commits are the reasonable alternative if you want every branch commit kept |
  | "Done" | Reviewed, merged, runs on `main`, docs updated if behavior changed | A shared bar prevents "done on my machine" |
- These standards go in `CONTRIBUTING.md` (Week 8) — write them Wednesday, formalize them next week.

### 6. Wrap — 6 min
- Recap: the loop, the log, the review standard — and that all of it is governance you own.
- **Due Wednesday (start of class):** nothing new — but **CP5 (revised design doc)** and **CP6 (git lab, done in class)** are both due **end of Wednesday.** Bring laptops; push access to your project's repo working.

---

## Threads to carry forward

- Project git standards → **CONTRIBUTING.md** in the Week-8 infrastructure package.
- Review comments and PR descriptions are **Technical Communication Portfolio** artifacts (CP9 — collect from now on).
- Per-student git history/PRs are the **individual-accountability evidence** for grades on shared project work.
- The review standard returns at the **repo audit** (Wk 11): can a stranger follow your log and PRs?

---

## Open questions / decisions before we flesh this out

- ~~**Demo repo**~~ **resolved (Tom's call):** build *Prop Loft* — the Backstage sample project, renamed because Spotify's Backstage holds the name — as a purpose-made public demo repo in a `prop-loft` organization. Reusable later: the Session 15 strong front door, the Session 19 planted-bug demo.
- ~~**Commit examples**~~ **resolved:** the eight-message set plus the AI-disclosure slide, in §3. Non-Tom examples shown without author names.
- ~~**Baseline policy floor**~~ **resolved (Tom's call):** no course-mandated minimums. The outline and deck *suggest* defaults (§5 table — including one non-author approval per PR); each project decides and records its rationale. The only fixed rule stays §10's "every project uses PRs — even solo." *(Wednesday's lab still requires a non-author review on each lab PR, because the review is what CP6 grades — that's the exercise, not project policy.)*

---

## Deliverable / after class

- No new deliverable today. **Wed, Oct 21:** **CP6 Git Workflow Lab** (in class, on the project repo) and **CP5 Design Document (revised)** — both due end of day.

---

## Appendix — classroom handouts (Session 13)

- **The loop + policy checklist** — slide + half-sheet
- **The seven rules** — half-sheet (from the reading)
- **Google review guide** — link (reviewer + author guides)
- **CP6 rubric:** `rubrics.md` (Git Workflow Lab)

---

*Next step: write the Session 13 student page and publish `s13`. (Demo kit, critique set, and deck are built.) Related: `Session12-Oct14-Outline.md`, `Session14-Oct21-Outline.md`, `rubrics.md` (CP5, CP6).*
