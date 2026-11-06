# Session 25 — Launch Studio: Assemble the Package, Test the On-Ramp — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 25 of 27 · Wed, Dec 2, 2026 · 75-minute block**
**Prior prep (no reading; this is what to arrive with):**
- **Every package file exists on `main`, at least as an honest draft:** `docs/setup.md`, `docs/onboarding.md`, `docs/architecture.md`, `docs/roadmap.md`, `docs/known-issues.md`, and a test on the core logic that the setup guide's command runs. Class time covers **two items and the onboarding test**; it can't cover a package that doesn't exist yet. (§0 has what each file must contain; it's the Launch Package Checklist, handed out at the door.)
- **The retrospective in prose** on a branch, from Monday's stubs and the Claims-Check Worksheet (`docs/retrospective.md`, four headings), and your **individual reflection** drafted wherever you keep private writing. Neither is worked on in class except for the §5 cross-check.
- **Your Session 22 Repo Audit Sheet** (or its photo) and the launch punch list in your tracker (Session 23).
- **A laptop that can clone** a classmate's repo and run their stack's prerequisites, or at least install them.

**Maps to:** Design Week 13, Session B — *studio: assemble the launch package; draft the retrospective* — **plus the absorbed Week-12 Session B: peer onboarding test round 2** (folded here when Thanksgiving took Nov 25).

> **Status: OUTLINE (v2, Nov 6) · deck built** (`canvas_material/lectures/powerpoint/Session25-LaunchStudio.pptx`, 13 slides, `tools/build-session25.js`: title · today · shipping is its own skill · two sheets today · standup · block 1 · the onboarding test · five questions, twenty-two minutes · in the last minute · block 2 · retrospective cross-check · before you tag · wrap; one shipping slide of talk, the rest are segment slides left up while each one runs). *v2 (Tom's notes, Nov 6): made explicit. Every segment now says what students are doing, against which document, and what "done" looks like; §0 maps each CP11 item to the repo file and the bar it must meet, printed as the **Launch Package Checklist** (Nov 6: no slide can stay up all period, and the Contributor-Readiness Checklist doesn't name files, the retrospective, or the submission, so it's a new one-page handout rather than a reprint). **One item per assembly block:** at this enrollment every project is solo, and one person does one thing well in 20 minutes, so each block has a rule for choosing the item. The onboarding test runs **both directions at once, in class**, like the Session 22 audit (Oct 30 decision); the v1 "host silent, reverse test by end of day" plan is gone.* A shipping studio. Three things leave today: a **package on `main`** that a stranger has tested, a **signed Contributor-Readiness Checklist**, and a **retrospective that agrees with it**. **CP11 is due the next day, Thu Dec 3, by 11:59 pm** (moved Nov 6, so the test's findings get a day of fixing and Friday stays free for grading): tag `v0.1-launch`, then each student's Canvas text entry.

---

## Purpose of this session

Shipping is its own skill, separate from building: the last pass where everything already drafted is made *true*, checked by someone who didn't write it, and released on purpose. Teams at work run it as a release checklist and a final acceptance test; open-source projects run it as a release candidate a few outside people try before the tag. Today is that pass. The package already exists in draft; class adds the one thing a student can't do alone, which is **a stranger's test**, and spends the rest on the items that test is most likely to break.

The rule for the day is the one from Session 23, now operational: **fix it or log it. Silence is the only failure.** A stall the tester hit is either fixed or written into `docs/known-issues.md` before the tag, and the tag is due tomorrow night, so there is a day to fix what today turns up. Nothing ships undocumented; nothing documented is untrue.

---

## Learning objectives

By the end of this session, a student can:

1. **Check a launch package item by item** against an explicit bar, and say which item matters most to a newcomer.
2. **Run an onboarding test on someone else's project** from the repository alone, and record what happened faithfully.
3. **Triage test findings:** fix what fits the time; log the rest honestly, as a known issue or a starter issue.
4. **Cross-check a retrospective against fresh evidence**, and change it where the evidence disagrees, in either direction.

---

## §0. What must be in the repository at `v0.1-launch` — the Launch Package Checklist

Printed as the **Launch Package Checklist** (`canvas_material/resources/Launch-Package-Checklist.pdf`, one page, one per student, handed out at the door), and on the student page. Each student marks every row twice: *today* (done / draft / missing) in §1, and *tagged* before the release. The sheet also carries both block rules (§1, §4) with a line to write each block's item, and the before-you-tag order (§6). Each row is a CP11 item, the file it lives in, and the bar it must meet at the tag. The bars come from the CP11 handout, the Contributor-Readiness Checklist, and CP7/CP8; nothing here is new.

| CP11 item | Where it lives | What it must contain at the tag | Checklist need it serves |
|---|---|---|---|
| **README first screen** | `README.md` | What it does, for whom, and a **status line that matches what runs**; links to setup, onboarding, contributing, and known issues | 1 What is this? |
| **Welcome** | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` (CP7) | A warm first line and what a newcomer should do first; a **real, working** reporting contact; past outside issues and PRs (the Session 22 audit ones) answered kindly | 2 Am I welcome? |
| **Setup guide** | `docs/setup.md` | Prerequisites with versions → install → configure (settings, secrets, database) → **the test command** → run it and see it work. The Repo Audit Sheet's six steps, each written down. | 3 How do I start? |
| **A test a newcomer can run** | the test suite | At least one automated test on the slice's **core logic**, run by the command `docs/setup.md` names, **passing**. One that asserts something real. *Missing → Contributor-readiness caps at Developing.* | 3 + under the hood |
| **Onboarding guide** | `docs/onboarding.md` | The five needs answered in order, linking (not repeating) setup; a short **tour of the code**: where the core logic lives, where a new feature would go | 1–5 |
| **Starter work** | issues labeled `good first issue` (CP8) | 2–3, each with enough context to attempt **without asking**, including a where-to-start line (file or function) | 4 Where do I start? |
| **Response** | `docs/communication-norms.md` (CP7) | A response time **you'll keep after the term ends**, how you'll know an issue is waiting, and a named place to ask | 5 Will anyone respond? |
| **Known issues + tech debt** | `docs/known-issues.md`, linked from the README | Every throwaway corner (V1 Proof Sheet), every deliberate cut (MVP Plan, Session 21), every unfixed audit finding (Session 22), and every stall from today, **each with its issue** | under the hood |
| **Architecture, as built** | `docs/architecture.md` | The design-doc diagrams refreshed to what exists; **anything not built is deleted**, not left as aspiration | under the hood |
| **Roadmap** | `docs/roadmap.md` | Sequenced next steps; **what a newcomer would do first**; claims only what the code supports | 4 + under the hood |
| **Retrospective** | `docs/retrospective.md` | Four headings (what held and what didn't · what the first version proved and didn't · what we'd do differently · where it goes next); each verdict backed by evidence; agrees with today's checklist | — |
| **On Canvas, per student** | CP11 text entry | The `v0.1-launch` tag URL · the individual reflection (private, not committed) · a photo of the signed checklist | — |

---

## Instructor prep / materials

- **Launch Package Checklist** (`canvas_material/resources/Launch-Package-Checklist.pdf`), one per student, handed out at the door. The student's own sheet for the day; it stays with them.
- **Contributor-Readiness Checklist** (`canvas_material/resources/Contributor-Readiness-Checklist.pdf`), one per student plus spares. It's the test script; the signed copy is CP11's *Setup verification* evidence.
- **Pairings for the onboarding test, set from attendance at the start of class:** a classmate who **didn't audit this repo in Session 22**. With four projects, rotate the Session 22 pairs (A↔B, C↔D become A↔C, B↔D). Odd attendance: the instructor tests the leftover repo, and that student tests the absent student's repo if it's public, or rejoins block 2 early.
- **Repo URLs on the board** next to each pairing (from the CP10 submissions; students can't see each other's).
- **The status board:** a grid on the whiteboard, projects down the side, the §0 items across the top (setup · test · onboarding · starter issues · norms · known issues · architecture · roadmap · retro). Each student copies the *Today* column of their Launch Package Checklist onto their row: ✓ done / D draft / ✗ missing. It tells you in two minutes who is in trouble and what each block will be spent on.
- During the test, the instructor is the only observer: move between the four, and spend the time on need 3 (setup), where a stall might be the tester's rather than the repo's.
- If a student arrives with most of the package missing (several ✗ on the board), say so privately in §1: today's two items go to the test and the setup guide, the rest is Thursday's work, and CP11's revision window is the backstop. Don't let it eat the test.

---

## Timed outline (≈75 min)

*Timings are for this term's enrollment: four solo projects, both test directions at once. With teams, each block takes one item per person, and the test pairs project-to-project.*

### 1. Standup — status board + block-1 pick — 8 min
- **Walk in, mark the sheet, then the board (as students arrive):** each student marks the *Today* column of the Launch Package Checklist, then copies it onto their row of the whiteboard grid. Draft means it exists on `main` and is honest; missing means it isn't on `main`.
- **Fill in "Since the audit"** on your checklist now (2 min): the two Session 22 audit stalls that most stopped your auditor, copied from your Repo Audit Sheet. Your tester checks each one.
- **Round the room, 60 seconds each:** your row, and **the one item you'll do in block 1**, chosen by the rule below (it's on the sheet) and written on its *My block-1 item* line. Instructor confirms or redirects.
- **The block-1 rule: fix what your tester is about to hit.** Take the first of these that applies:
  1. **The test floor isn't met:** no test on the core logic, or the setup guide's command doesn't run it, or it fails. *It's a cap on CP11, and it's need 3 on the tester's sheet.*
  2. **A file the tester reads is missing or false:** `docs/setup.md`, `docs/onboarding.md`, the README's first screen, or the starter issues. *Needs 1–4 run on these in 20 minutes.*
  3. **A "Since the audit" stall is still there.** *The tester checks both by name.*
  4. **None of the above:** the item the tester *won't* touch that is furthest from its bar, usually `docs/architecture.md` (as-built) or `docs/roadmap.md`.
- The retrospective is **never** the block-1 item: it doesn't change what the tester sees, and it has to wait for the test anyway (§5).

### 2. Assembly block 1 — one item — 20 min
- **One item, the one you named.** Work on a branch; open the PR; merge it. *Everything via PR, solo included.* Done means the §0 bar for that row is met, not "improved."
- **If it's done early,** take the next item on the rule. If it won't finish, cut it to what's true and merge that. A short, accurate setup guide beats a long, half-edited one.
- **Pencils down at minute 28.** Merge or leave it on the branch: the tester tests `main`, nothing else. Push, then write the **commit hash** in the checklist's *Tag or commit* box and hand the checklist to your tester.
- Instructor rove question: *"When your tester opens this in five minutes, what's the first thing they'll trip on?"* If the answer isn't the item being worked on, switch.

### 3. Onboarding test round 2 — both directions at once — 22 min
- **Every student is a tester for the whole block,** working through a partner's repo while the partner works through theirs. Nobody watches their own repo being tested, so nobody can rescue it: the repository is the only help. Clone **fresh, into a new folder**, at the commit on the sheet. Think out loud, write facts, not a grade.
- **What the tester does for each need, with a time box** (on the slide):

  | Need | Do this | Pass / stall / fail looks like | ~min |
  |---|---|---|---|
  | **1 What is this?** | Read the README's first screen for 60 seconds, then look away and write one sentence: what it does, for whom. After setup (need 3), check the status line against what ran. | **Pass:** your sentence matches the project, and the status is true. **Stall:** you had to read past the first screen. **Fail:** you can't say what it is, or the status claims what doesn't run. | 2 |
  | **2 Am I welcome?** | Read the first lines of CONTRIBUTING and the code of conduct's reporting contact. Open two or three closed issues or PRs from outside (the audit ones count). | **Pass:** warm first line, a real contact, outside questions answered kindly. **Stall:** present but cold, or a placeholder contact. **Fail:** missing, or outsiders ignored. | 3 |
  | **3 How do I start?** | Follow `docs/setup.md` exactly: prerequisites, install, configure, **run the test command**, run the app. Guess at nothing. **At 10 minutes, stop:** mark where you are and move on. | **Pass:** running, tests passing, docs alone. **Stall:** you got there by guessing, searching, or a workaround (write which). **Fail:** stopped, or tests failing. | 10 |
  | **4 Where do I start?** | Pick a `good first issue`. Find the file and function you'd change, from the issue and docs first, code search last. Write the path. | **Pass:** found it from the issue or docs. **Stall:** found it by searching the code. **Fail:** couldn't find it, or no starter issues. | 4 |
  | **5 Will anyone respond?** | Find the stated response time and where to ask. Check how long recent issues and PRs waited. | **Pass:** stated, and the record keeps it. **Stall:** stated, but the record doesn't show it kept. **Fail:** not stated. | 2 |

- **Then, in the last minute:** tick any *Under the hood* item you confirmed along the way (the test ran in need 3; known issues linked from the README); mark each **Since the audit** stall *fixed / logged / still there*; answer the closing question (*what would stop someone first, with no one to ask?*); **sign**. Hand it back; the authors initial it and **photograph it now** (it goes in the Canvas submission).
- A tester who finishes early doesn't help: they reread the onboarding guide and add a line to *Why* wherever the docs and the repo disagreed.

### 4. Assembly block 2 — fix or log — 15 min
- Read your signed checklist (1 min). Every **stall** or **fail** is now on your list.
- **The block-2 rule: one fix, the worst one that fits** (on the sheet; write it on the *My block-2 item* line). Take the earliest-numbered *fail* (the needs are in the order a newcomer meets them, so an early fail blocks everything after it); if there is none, the earliest *stall*. If it fits in 12 minutes, fix it, PR, merge. If it doesn't, **log it properly** instead, and that counts as the block's item: a `docs/known-issues.md` entry saying what breaks and the workaround, with its issue; if a newcomer could fix it, label the issue `good first issue` with a where-to-start line. *A newcomer-facing gap that becomes a starter issue is the system working.*
- **Everything else on the sheet is fixed or logged by Thursday night.** Thursday is for the test's findings and the remaining drafts, **not new features**: fix what fits, and log the rest, one known-issues line plus an issue each. Write the list on the back of the sheet before you leave, marked *fix* or *log*.
- Instructor roves with *Setup verification* in mind: the Exemplary level reads "anything they hit is fixed or logged." Confirm each student knows which items they're fixing and which they're logging.

### 5. Retrospective cross-check — 5 min
- Open the `docs/retrospective.md` draft beside the signed checklist. Three checks, marked on the draft:
  1. **Contradiction:** does any sentence claim something the sheet shows false ("setup is straightforward" over a need-3 stall)? Mark it to rewrite.
  2. **New evidence:** does a claim about newcomers, setup, or the docs now have evidence it didn't have? A *pass* is evidence too. If a claim held, cite the test; don't go looking for a setback to report. *CP11 grades the evidence, not the verdict.*
  3. **Next steps:** does "where it goes next" agree with `docs/roadmap.md` and with what the tester found? A roadmap that starts with a feature when the tester couldn't install it is out of order.

### 6. Ship it + wrap — 5 min
- **Before you tag, in this order** (the bottom-right box on the Launch Package Checklist; it ends in the CP11 submission):
  1. Fix or log every remaining stall and fail (§4).
  2. Bring every *draft* or *missing* row on the checklist up to its bar, and tick the *Tagged* column as each one gets there.
  3. Finish `docs/retrospective.md` (with the §5 marks) and merge it.
  4. Check the test still passes on `main` with the setup guide's command.
  5. Tag and push: `git tag -a v0.1-launch -m "CP11: launch"` then `git push origin v0.1-launch`.
  6. On Canvas, one text entry: the tag URL, your reflection, the checklist photo.
- **Name the moment:** after the tag, the project is launched. What remains is telling its story well.
- **Say the trade-off out loud:** the extra day comes out of pitch time. Thursday is the package; the pitch gets the weekend, and Monday's dry run needs it performance-ready.
- **Coming up:** **Mon Dec 7, dry run:** the full 9-minute pitch and live demo, then questions, performance-ready, not draft-ready. **Wed Dec 9:** final studio, polish only. **Thu Dec 10, 11:59 pm:** `cp12-demo` tag pushed (last day of classes); Demo Day runs from it. **Demo Day: Mon, Dec 14, 8:30–10:00 AM.**

---

## Threads to carry forward

- **CP11 is tested today and ships Thursday night;** Demo Day (CP12) presents it. The package is the "where does it go next, and how can others join?" answer made tangible.
- The signed checklist joins the Session 22 audit sheet as the **contributor-readiness evidence trail**: round 1 tested mechanics, round 2 the whole front door, and "Since the audit" connects them.
- **Fix it or log it** is the habit the course wants to outlast the semester: a release where every known problem is written down.
- The tagged repo is what faculty (and future employers) browse; the retrospective is the first thing in it that argues for the author's judgment.

---

## Open questions / decisions before we flesh this out

- ~~**CP11 deadline**~~ **moved (Nov 6): Thu Dec 3, 11:59 pm** (`CP11_DUE`), the day after this studio: two one-item blocks can't also finish what the test turns up, and Friday stays free for grading before the dry run.
- ~~**Repo tag convention**~~ **resolved:** `v0.1-launch` for CP11 (in the handout); `cp12-demo` for Demo Day (CP12, by 11:59 pm Thu Dec 10).
- ~~**Reverse-test logistics**~~ **resolved (Nov 6):** both directions at once, in class, same as the Session 22 audit (Oct 30). No end-of-day tests: a home test can't be kept to the repo alone.
- ~~**Session 24's wrap sets the prep**~~ **done (Nov 6):** the Session 24 wrap slide, student page, and outline now say every package file on `main` as a draft, the test passing, and the retrospective in prose, before Wednesday.
- **Late-package policy:** CP11 has a downstream dependent (the dry run Monday). Confirm the syllabus revision window applies here in compressed form.

---

## Deliverable / after class

- **Due Thu, Dec 3, 11:59 pm:** **CP11 Launch Package + Retrospective.** Remaining stalls logged; every §0 row at its bar; `docs/retrospective.md` merged; `v0.1-launch` tagged and pushed; each student's Canvas text entry (tag URL, reflection, checklist photo).
- **Mon, Dec 7:** dry run, the full pitch and demo, performance-ready.

---

## Appendix — classroom handouts (Session 25)

- **Contributor-Readiness Checklist** — `canvas_material/resources/Contributor-Readiness-Checklist.html` + `.pdf` (Session 23). Today's test script; the signed copy is the CP11 evidence. One per student.
- **Launch Package Checklist** — `canvas_material/resources/Launch-Package-Checklist.html` + `.pdf` (built Nov 6; one page, one per student). The §0 table with *Today* (done / draft / missing) and *Tagged* columns; the two block rules with a line for each block's item; the before-you-tag order ending in the submission. No dates or CP numbers, so it survives a semester roll; the tag name `v0.1-launch` is on it.
- **The status board** — whiteboard grid (§1), copied from each sheet's *Today* column
- **The tester's moves per need** (§3 table) — slide, up only during the test
- **CP11 rubric:** `rubrics.md`

---

*Next step: Tom reviews v2. Then: print the Launch Package Checklist. Student page written (`canvas_material/lectures/session-pages/Session25-StudentPage.md.jinja`, marked to publish; general-first; carries the block rules, the tester's table, and the before-you-tag order; Materials: both checklists and CP11). Related: `Session23-Nov23-Outline.md`, `Session24-Nov30-Outline.md`, `Session26-Dec07-Outline.md`, `rubrics.md` (CP11).*
