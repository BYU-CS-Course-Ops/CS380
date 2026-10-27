# Session 16 — Infrastructure Build Workshop: Ship the Front Door — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 16 of 27 · Wed, Oct 28, 2026 · 75-minute block**
**Prior prep:**
- **Bring:** Monday's **CP7 Checklist punch list**, your project's **license decision + rationale** (from Monday's clinic), your **git standards** doc (it becomes CONTRIBUTING.md today), Monday's template sketches, and your **review partner's repo link**.
- **Skim:** [*Best Practices for Maintainers*](https://opensource.guide/best-practices/) — the "Documenting your processes" section, once more, as a build spec.
**Maps to:** Design Week 8, Session B — *workshop: build repo scaffolding and templates; draft onboarding docs.*

> **Status: OUTLINE (v3).** A build workshop (Session B) with one taught block (*v3, Oct 27:* §2, issue and PR templates, 15 min, taken from the build blocks), reorganized for solo founders: every Fall 2026 project has one person. **CP7 Project Infrastructure Package is started today and due end of day Fri, Oct 30** — README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, issue/PR templates + labels, a setup placeholder, communication & maintainer norms, and 2–3 seed issues. Everything ships through the project's own PR workflow. **The setup guide and its cold test moved to Session 20**, when there's code to set up; CP7 carries an honest placeholder.

---

## Purpose of this session

Today the front door gets built, reviewed, and merged, using the workflow it documents: the infrastructure package travels through PRs like any other change, so the process demonstrates itself. One person can't finish eight artifacts in 75 minutes, so class time goes to what the room is uniquely good for. The one thing taught today is **issue and pull request templates**: where the files go, Markdown templates vs. issue forms, and real examples, because Session 15 assigned them without showing how they're made. The **adopt-a-standard** items (license, code of conduct, templates) get *finished* or nearly, because they're fast with help nearby. The **write-it-yourself** items (CONTRIBUTING, communication norms) get *started* far enough that nothing is blocked. And each founder's README and CONTRIBUTING get **read cold by their review partner**, the one test an author can't run on their own docs. The rest is finished outside class by Friday.

The bar for each artifact isn't "exists"; it's **works for a stranger**. In three weeks a classmate audits the repo cold, for a grade. Today's partner read is a preview.

---

## Learning objectives

By the end of this session, a student can:

1. **Adapt, not blindly copy, standard artifacts** (license text, Contributor Covenant, template examples) to their project, and ship them through PRs.
2. **Set up issue and pull request templates**: put them where GitHub reads them, choose between a Markdown template and an issue form, and build a PR template from their git standards.
3. **Grow a CONTRIBUTING guide from their git standards**, leading with welcome before policy.
4. **Read another project's front door as a stranger** and say, in writing, what it is and how they'd start helping, and act on that kind of read of their own.
5. **Write an honest status** for a project that doesn't run yet: a setup placeholder rather than a quickstart that fails.
6. **Seed their own issue tracker** with well-formed issues that follow their new templates.

---

## Instructor prep / materials

- **The CP7 Checklist** (`canvas_material/resources/CP7-Checklist.pdf`): students bring Monday's copy with its punch list; have spares.
- **The day's order on a slide** (§1), with the target state at each block's end. Solo founders need the sequence more than a team does; nobody else is watching the clock for them.
- **The model front door:** Prop Loft at tag [`session-16`](https://github.com/prop-loft/prop-loft/tree/session-16): CONTRIBUTING (welcome first, license rationale at the end), CODE_OF_CONDUCT (Covenant with the two blanks filled), issue forms + PR template, `docs/communication-norms.md`, and three seed issues. States and seeding: `demos/prop-loft-states/`.
- **For §2, open in tabs:** Prop Loft's **New issue** page (the chooser and its conduct-report link); Prop Loft's [`.github/` at `session-16`](https://github.com/prop-loft/prop-loft/tree/session-16/.github); Rich's [`.github/`](https://github.com/Textualize/rich/tree/main/.github) (Markdown templates; a PR template that says no to new features); mdx-canvas's [`ISSUE_TEMPLATE/`](https://github.com/BYU-CS-Course-Ops/mdx-canvas/tree/main/.github/ISSUE_TEMPLATE) (GitHub's generated starter, unedited); a branch on Prop Loft (or any repo) to start a pull request from, to show the PR template filling the box. Don't merge anything.
- **The reference page:** *Issue and Pull Request Templates* (`canvas_material/pages/Issue-PR-Templates.md`, `pg-issue-pr-templates`): where the files go, the two formats compared, copy-ready skeletons (Markdown bug, form bug, form feature request, `config.yml`, PR template), the three examples, and how to check they work. The build is copied from here, in class or after.
- Links ready: **Contributor Covenant 3.0** (and GitHub's *Add file → CODE_OF_CONDUCT.md* template), **choosealicense.com** (exact license text), GitHub docs for **issue forms / `.github/ISSUE_TEMPLATE/`**, the **PR template** location, and **managing labels**.
- **Stranger's Read Sheet** (`canvas_material/resources/Stranger-Read-Sheet.pdf`, §5): half-sheets, two per page, cut. One per student plus spares. Authors keep their sheet and submit a photo of it with CP7: it's the evidence for the *Newcomer usability* cap, and it lets remediation continue outside class.
- **Readers:** the reciprocal review pairs from Week 7. With four students, that's two pairs. With an odd count, make one triple that rotates (A reads B, B reads C, C reads A), so everyone reads one repo and is read by one. If someone's absent, the instructor reads their partner's repo.
- Rove aggressively in the build blocks. This is a heads-down day; unblock fast.

---

## Timed outline (≈75 min)

### 1. Punch-list check + the day's order — 3 min
- Each founder names, in one sentence, what they'll *finish* in class and what they'll *finish by Friday*. Write it on the punch list.
- The order, on the slide:
  0. **Learn:** issue and PR templates (§2).
  1. **Finish:** README status + setup placeholder, LICENSE, CODE_OF_CONDUCT, templates + labels.
  2. **Start:** CONTRIBUTING and communication norms, drafted far enough to be read.
  3. **Partner read:** README + CONTRIBUTING, cold.
  4. **Act on the read; file seed issues.**
- *On a team, the same list parallelizes: split the finish items, cross-review the PRs. The order and the partner read don't change.*
- Rule of the day: **adapt, don't invent** where standards exist (CoC, license text); **write, don't copy** where your project is the content (README, CONTRIBUTING, norms).

### 2. Templates, taught — 15 min *(new in v3)*
Session 15 assigned templates and sketched their fields; nobody showed how one is made. Five slides, three of them live in the browser.
- **Where the files go (2 min, slide 5).** `.github/ISSUE_TEMPLATE/` (each file is one choice under **New issue**), `.github/ISSUE_TEMPLATE/config.yml` (the chooser: blank issues allowed? contact links?), `.github/pull_request_template.md` (pre-fills every PR). **Live:** Prop Loft's New issue page. **Nothing takes effect until it's merged to the default branch.**
- **Markdown or form (4 min, slide 6).** The same bug template both ways. Markdown: front matter (`name`, `labels`) then text in one box, deletable. Form: `body:` fields, `required: true`. Both fine; mixing fine. Ask which they'd pick for bugs, and why.
- **A form in full (2 min, slide 7).** Prop Loft's bug and feature forms, each field mapped to Session 15's anatomy; labels created first.
- **Three real projects (3 min, slide 8, live).** mdx-canvas (GitHub's starter from *Settings → Features → Issues → Set up templates*, unedited: it asks a CLI tool's users for their smartphone, so *adapt the starter*); Rich (Markdown with search-first checkboxes, a diagnose command for the environment, and "not accepting new features" in a comment: *say no once, in writing*); Prop Loft (forms, `needs triage`, `config.yml`: *make the anatomy the default*).
- **The PR template (3 min, slide 9, live).** Prop Loft's: the top half is the Session 13 description (problem with `Closes #`, approach, where to look, how tested); the checklist is the git standards' definition of done. Markdown only; pre-fills once on main. **Live:** start a PR and watch the box fill. Rich's is the second example.
- Close by pointing at the reference page: the skeletons are there, so the build can finish after class.

### 3. Build block 1 — finish the fast items — 15 min
Each item goes through its own small PR, reviewed under the project's policy. On a solo project, that means a PR and a self-review against the checklist; the partner reviews later in §6 if time allows.
- **README:** first sentence (Monday's draft, rewritten), status line, how to contribute (link), license line. Instead of a quickstart, an honest line: *not runnable yet — see `docs/setup.md`*.
- **Setup placeholder** (`docs/setup.md`): the stack and prerequisites the design doc commits to; "setup instructions arrive with the first runnable build"; a link to the issue that tracks writing them. File that issue now. It's the first seed issue.
- **LICENSE:** exact text, with only the fields the license asks for: MIT and BSD have a year and holder; Apache-2.0 and the GPL have none (Apache's `[yyyy] [name of copyright owner]` line is the appendix's file-header template and stays as written). The rationale paragraph from Monday's clinic goes in CONTRIBUTING or a docs note.
- **CODE_OF_CONDUCT:** Contributor Covenant via GitHub's template; read the enforcement section. The reporting contact is public and has to work: an address they'll check and are willing to publish (BYU or project-specific is fine; it needn't be personal), how soon reports are read, and a route for a report *about the maintainer*. Solo, that's GitHub's reporting tools or another person who can act. Prop Loft's is the model.
- **Templates + labels:** create the labels first (`bug`, `enhancement`, `good first issue`, plus the project's own), then build Monday's sketches from the reference page's skeletons: bug, feature request, PR template (checklist from the git standards). If templates don't finish in the block, they finish by Friday. **Create a label before a form names it** — a form's `labels:` line skips any label that doesn't exist, silently. File one test issue per form and check the labels landed.
- Instructor circulates: spot-check license fields (MIT/BSD year and holder; an Apache appendix left as written is correct), reporting contacts, read README first sentences back to their authors ("would a stranger know what this *is*?").

### 4. Build block 2 — start the write-it-yourself items — 15 min
- **CONTRIBUTING.md**, grown from `docs/git-standards.md`. Lead with welcome and "what to do first," then how to pick work, the PR process, and review expectations; policy last. Push past process into *welcome*: "what should a newcomer do first?"
- **`docs/communication-norms.md`:** where discussion happens (issues? Discussions? a chat channel?), response times you can actually keep ("reviews within a week," not "24/7"), who maintains, and how decisions get made. The public parts of the charter, rewritten for a stranger. **Plus the intake question:** the norms promise a response time, so how will the project know which issues are still waiting? A label the forms apply (Prop Loft's `needs triage`), a *New* column on a board, or a person reading on a fixed day are all fine. The project picks one and says which. It's the general idea, not a particular label, that matters; Session 17 comes back to it as triage. *On a solo project, "how decisions get made" is still a real question: how does a contributor's proposal get decided, and where?*
- Target by the end of the block: both drafted far enough that a stranger can read them, merged or on an open PR.

### 5. Partner stranger's read — 15 min
- Swap with your review partner. Open their repo in a private, logged-out browser window. Read their **README** and **CONTRIBUTING** cold, about five minutes each.
- On the **Stranger's Read Sheet**, write one sentence each: *What is this project? How would I start helping?* Then *the one thing that most stopped me*, and tick what the docs alone told you (what it is, whether it runs yet, where it's headed, how to help, where to ask). Hand it back.
- Read your own sheet. **If your partner's "what is this?" doesn't match your intent, your first sentence isn't done.**
- *Why a partner and not yourself:* the author is the worst reader of their own docs; they already know everything the docs leave out. This is the same test the Week-11 repo audit runs, for a grade.

### 6. Act on the read + seed the tracker — 8 min
- Fix what the sheet found, or file it as an issue if it's bigger than ten minutes. Record the PR or issue number on the sheet and say "from the stranger's read" in its description, so the fix traces back. Whatever isn't done by the end of class gets finished by Friday; the author photographs the sheet for the CP7 submission.
- **Seed the tracker:** 2–3 real next-work issues, written through your own templates. The setup-guide issue from §3 counts as one; start the others here and finish by Friday if time runs out. Pre-code seeds are mostly features and tasks; a task uses the closest form, or the project adds a task form. These are the first items in Monday's backlog (CP8).
- If time remains, partners review each other's open PRs.

### 7. Wrap — 4 min
- **CP7 due end of day Fri, Oct 30.** By then: CONTRIBUTING and the norms finished, the partner's read acted on, everything merged to main. Repo state is the submission: tag `main` as `cp7`, push the tag, and submit its URL in Canvas with a photo of the Stranger's Read sheet. Show the three commands on the wrap slide.
- **CP9 reminder:** today generated portfolio artifacts (PR descriptions, review comments, seed issues). Save the links now.
- Preview Monday (Nov 2): **Phase 4 begins**, turning the proposal and design into epics, milestones, and a populated issue tracker. Today's seed issues are the first backlog items.

---

## Threads to carry forward

- **CP7 repo state** is the baseline the **Week-11 repo audit** measures against: same stranger's eye, plus install and run.
- **The setup guide** is written and partner-cold-tested in **Session 20** (Nov 11), once the build has produced something to set up; Session 21 rechecks it on main; the Session 22 audit follows it cold. The placeholder's tracking issue is the thread.
- Stranger's Read sheets and today's PRs and reviews → **CP9 portfolio** artifacts.
- Seeded issues → the **Week-9 backlog** (CP8); labels → contribution pathways (`good first issue` arrives Week 9).
- CONTRIBUTING and the norms grow into the **launch package** (`docs/onboarding.md`, Wks 12–13).

---

## Open questions / decisions before we flesh this out

- ~~**CP7 submission mechanics**~~ **resolved:** an annotated `cp7` tag on main; Canvas text entry with the tag URL plus a photo of the Stranger's Read sheet. Grade at the tag.
- ~~**Cold-test depth**~~ **moved:** the cold test now happens in Session 20 with the full setup guide; set the fresh-clone vs. clean-machine expectation there.
- ~~**Partner-read cap**~~ **resolved:** kept. A missing read caps *Newcomer usability* at Proficient; absences are covered by the instructor reading, odd counts by a rotating triple.
- ~~**Solo students**~~ **resolved:** the whole session is organized for solo founders; their review partner (the reciprocal pairing from Week 7) does the stranger's read.
- ~~**Due date**~~ **resolved:** Fri, Oct 30 (`CP7_DUE`), so a solo founder isn't asked to finish the whole front door in one class block. *Unchanged by v3:* the templates block moves about 10 minutes of building (mostly CONTRIBUTING and seed issues) to the Friday window that already existed for it.
- ~~**Templates taught, not just assigned**~~ **resolved (Tom, Oct 27):** §2, 15 min, from the build blocks (20 → 15 each), the punch-list check (5 → 3), act + seed (10 → 8), and the wrap (5 → 4). The stranger's read keeps its 15: it needs a partner in the room. Risk: a thinner CONTRIBUTING at the read; the reader reads what exists, which is still an honest read.

---

## Deliverable / after class

- **Due end of day Fri, Oct 30:** **CP7 Project Infrastructure Package**, all artifacts merged, setup placeholder in place, partner read acted on.
- Keep collecting **CP9** portfolio links (due Wed, Nov 18).

---

## Appendix — classroom handouts (Session 16)

- **CP7 Checklist** (Monday's copy, with the punch list): `canvas_material/resources/CP7-Checklist.pdf`
- **The deck:** `Session16-FrontDoorWorkshop.pptx` (16 slides): title (1), the order (2), punch-list check and rules of the day (3), Prop Loft model (4), **templates block (5–9, v3):** where the files go (5), Markdown vs. form (6), Prop Loft's two forms (7), three real projects (8), the PR template (9); build block 1 (10), honest status (11), build block 2 (12), stranger's read (13), act + seed (14), submitting CP7 (15), wrap (16)
- **Reference page:** *Issue and Pull Request Templates* (`canvas_material/pages/Issue-PR-Templates.md`)
- **Stranger's Read Sheet** (§5): `canvas_material/resources/Stranger-Read-Sheet.pdf` (half-sheet, two per page)
- **CP7 rubric:** the Assignment Rubrics page (instructor view: `rubrics.md`)
- Links: Contributor Covenant · choosealicense.com · GitHub issue-template, PR-template, and label docs

---

*Deck: `canvas_material/lectures/powerpoint/Session16-FrontDoorWorkshop.pptx` (16 slides; `tools/build-session16.js`). Student page: `canvas_material/lectures/session-pages/Session16-StudentPage.md.jinja` (published in args). Related: `Session15-Oct26-Outline.md`, `Session17-Nov02-Outline.md`, `Session20-Nov11-Outline.md` (setup guide + cold test), `rubrics.md` (CP7).*
