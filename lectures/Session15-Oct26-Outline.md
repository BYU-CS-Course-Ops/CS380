# Session 15 — Repo Infrastructure: The Front Door of Your Project — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 15 of 27 · Mon, Oct 26, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Open Source Guides — [*Best Practices for Maintainers*](https://opensource.guide/best-practices/)** — documenting processes, communicating expectations, learning to say no; the maintainer's survival kit.
- **Mozilla — [*Bug Writing Guidelines*](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html)** — the canonical anatomy of a reproducible bug report. *(Reused from the prior course's Bug Reporting & Triage module.)*
- **Skim:** your own project's repo *as if you were a stranger seeing it for the first time.* Note what would stop you.
**Maps to:** Design Week 8, Session A — *compare repos with strong vs. weak project infrastructure; license selection clinic; anatomy of a good issue/bug report (defect/fault/failure, reproduction, expected vs. actual).*

> **Status: OUTLINE (v1).** First half of Week 8 — the founding governance from Session 3 becomes concrete files in your repo. **CP7 Project Infrastructure Package due Fri, Oct 30** (started in Wednesday's workshop). The **Technical Communication Portfolio (CP9)** officially starts this week.

---

## Purpose of this session

In Session 3 you learned *why* governance matters and *which* license fits; in Week 7 you set your project's workflow. This week it all becomes **files in the repo** — the front door a stranger walks through: README that onboards, LICENSE that permits, CONTRIBUTING that explains how to help, CODE_OF_CONDUCT that sets the tone, and the issue/PR templates that shape every report you'll ever receive. Today we compare strong and weak front doors, finalize each project's license choice, and learn the **anatomy of a good issue** — because as founders you're not just *writing* bug reports, you're **designing the norms** every future report will follow. Wednesday you build it all.

---

## Learning objectives

By the end of this session, a student can:

1. **Audit a repo's front door** — what a stranger needs, in what order, and what's missing.
2. **Write a README that onboards** — what it is, why it exists, how to run it, how to help.
3. **Finalize the project license** — the Session-3 decision, made real for their actual project.
4. **Distinguish defect / fault / failure** and write a bug report with reproduction, expected vs. actual.
5. **Design issue/PR templates** that make good reports the path of least resistance.

---

## Instructor prep / materials

- **Two live repos to compare** (strong vs. weak front door), open in tabs: **[Textualize/rich](https://github.com/Textualize/rich)** (strong) and **[dagorym/SSW](https://github.com/dagorym/SSW)** (weak — the instructor's own repo, so nobody else's work is on the screen). Walk-through notes are in §2. *Why not the Session 3 set:* Session 3 demoed Homebrew, Prettier, and Astro for **governance**, with a hypothetical bare personal repo standing in for the weak side. Those projects are too big to walk as a stranger in fifteen minutes, and the weak side was never a real repo. Rich is a Python library students can actually read, and SSW is a real weak front door that costs nobody anything to show.
- *Optional third tab:* **[prop-loft/prop-loft](https://github.com/prop-loft/prop-loft)** — README and LICENSE, nothing else yet. That's where most student repos are after Session 11, so it's the "you are here" between the other two.
- **Slides:** the stranger's-eye walkthrough; README anatomy; defect/fault/failure chain; good-vs-bad bug report pair; template examples.
- **License clinic prep:** each project's Session-3-era license lean (from the short response) at hand; `canvas_material/pages/License-Cheat-Sheet.md` posted.
- **Print the CP7 Checklist** — `canvas_material/resources/CP7-Checklist.pdf`, one per student. It walks the eight CP7 items with the checks a grader (and the Week-11 auditor) will apply. Those eight are the front-door part of the design doc's required repository artifacts (`CS301R-ProjectCreation_v4.md` §10); the rest of that list arrives with other checkpoints — `docs/architecture.md` with CP5, `docs/roadmap.md` with CP8 (which also revisits the definition of done already in `docs/git-standards.md` from CP6), `docs/known-issues.md` with CP11.
- **Bug-report examples** for §4, open in tabs — the bank is in the Appendix (real issues from the instructor's own repos, weak to strong).

---

## Timed outline (≈75 min)

### 1. Framing — the stranger at the door — 5 min
- The contributor's-eye view from Session 3, now with stakes: your repo audit is in **three weeks** (Wk 11) — a classmate will try to clone, build, run, and find their way. Today decides what they'll experience.
- The maintainer's insight from the reading: **writing things down is how you scale yourself** — docs answer questions before they're asked, and make "no" less personal.

### 2. Strong vs. weak front doors — live comparison — 15 min
- Walk both repos as a stranger, narrating the experience: What is this? (README first paragraph) Can I run it? (setup steps — do they work?) May I use it? (LICENSE) How do I help? (CONTRIBUTING) What's it like here? (CODE_OF_CONDUCT, issue tone) Where's it going? (roadmap).
- **README anatomy** distilled: one-line what + why → screenshot/demo if visual → quickstart that actually works → how to contribute (link) → license line. The README is an *onboarding document*, not a spec.
- **Before there's code:** an honest status beats a broken quickstart. Student repos have nothing to run until the build starts (Week 9), so CP7 asks for a **setup placeholder** (`docs/setup.md`: the stack the design commits to, "instructions arrive with the first runnable build," a link to the issue tracking it) and a README that points to it. The full setup guide is written and partner-cold-tested in **Session 20**, and followed by a stranger in the Session 22 audit. Rich's CONTRIBUTING dev-setup steps are the model to point at now, for later.
- Note what the strong repo does that costs almost nothing: templates, labels, a roadmap file — process capital, cheap to build early, expensive to retrofit.
- **Rich — what to point at:**
  - **README:** the one-line what ("a Python library for *rich* text and beautiful formatting in the terminal") followed by a screenshot. But it sits under about twenty lines of badges and translation links. Ask the room how far they scrolled before learning what the project is. Even a strong front door has a weak spot.
  - **CONTRIBUTING.md** opens with a welcome and a decision rule — a typo fix goes straight to a PR; a feature or an unclear fix gets an issue first — then gives setup step by step.
  - **AI_POLICY.md:** three rules for AI-generated PRs (fill in the template, name the agent, link an issue a maintainer approved). It's a policy written down so the maintainer never has to argue it case by case — "writing things down makes no less personal," straight from the reading.
  - **Bug template:** checkboxes for "searched closed issues / read the FAQ" (deduplication), a request for a minimal runnable example, and one command (`python -m rich.diagnose`) that captures the environment. The template makes the hard part of a report cheap. New issues are auto-labelled `Needs triage`.
  - **Saying no in writing:** the template states that Rich isn't accepting new features. That's the reading's "learning to say no," done once instead of in every thread.
  - **Labels** built for triage: `Needs triage`, `more information needed`, `Can't reproduce`, `good first issue`.
- **SSW — what to point at:**
  - **No README.** GitHub shows a file list as the front page; a stranger can't tell what this is.
  - **No LICENSE**, so legally it's all rights reserved — "May I use it?" gets *no*, whatever the author intended.
  - No CONTRIBUTING, code of conduct, or templates.
  - Meanwhile the repo *does* commit `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and an `.idea/` folder, and a real user's guide and roadmap sit in `doc/` where no stranger will find them. **The AI agents get a better front door than the humans do. The content exists; the front door doesn't.** That's the cheapest gap to close, and the one CP7 asks for.
  - Its issue tracker supplies some of §4's weak examples.
- *Optional one-minute aside:* [lazygit's CONTRIBUTING](https://github.com/jesseduffield/lazygit/blob/master/CONTRIBUTING.md) opens with "This project does not accept pull requests," then explains why and lists the contributions it does want. It's an unusual choice, but an honest, keepable promise — exactly the CP7 requirement that promises be keepable.

### 3. License clinic — decide for real — 12 min
- Each project confirms its license **now** (the Session-3 short response was individual and provisional; this is the project's real call).
- Fast recap of the decision axes (permissive vs. copyleft; patent grant — the Apache-2.0 consideration from the cheat sheet), then each project decides and records the rationale (one paragraph — it goes in CP7).
- Instructor circulates for edge cases (dependencies with copyleft licenses; datasets; app-store realities).

### 4. Anatomy of a good issue — 18 min
- **The vocabulary (IEEE 1044, from the prior course):** *error* (human mistake) → *defect* (flaw in the artifact) → *fault* (what goes wrong internally at runtime) → *failure* (the observable misbehavior). Reports describe **failures**; investigation walks the chain backward. The precision isn't pedantry — it's what makes reports actionable.
- **The Mozilla-grade report:** one failure per report · a title that summarizes the failure · steps to reproduce (numbered, minimal) · **expected vs. actual** · environment/version · evidence (screenshot, log). Show three or four real reports from the **bank in the Appendix**, weak to strong, then have pairs rewrite a weak one (jetbrains-recorder #3) to the anatomy. For the vocabulary, SSW #14 walks the whole chain: failure (crash with a run-time check error), fault (the defenses object reads as garbage in memory), defect (the closing comment suspects a bad save file). Then pull up one or two of the **starter issues students filed in Wednesday's lab** (Session 14, written before any of this was taught) and hold them against the anatomy; each project rereads its own.
- **The founder's move:** you *design* the reporting norms. Not every issue is a bug: SSW #6 is a placeholder for an unbuilt feature, filed in bug language — the fix is the right type and label, not reproduction steps. Issue templates make the anatomy the default; labels (`bug`, `enhancement`, `good first issue`) make triage possible. Feature requests get the same discipline: the need, the user, the current workaround — CP2 thinking in miniature.

### 5. Template workshop preview + self-audit — 18 min
- Each project audits **its own repo** with the **CP7 Checklist**: mark each item done/weak/missing, and write the punch list in the order you'll fix it. This produces Wednesday's punch list. *(Two days before CP7 is due, the CP7 items are the right lens for an author checking their own repo. The stranger's-eye audit checklist — whether someone else can actually find out what it is, run it, and find a way in — is built with the Session 22 materials, where a classmate grades the result.)*
- Then sketch: your issue template's fields, your PR template's checklist (pull from your git standards), the 3–5 labels you'll start with.
- Instructor circulates; push every project to write the *first sentence* of their README right now — it's harder than it sounds.

### 6. Wrap + before next class — 7 min
- Recap: governance became files; issues have an anatomy; the front door is designable.
- **Wednesday (Oct 28):** build workshop — the full **CP7 Infrastructure Package** (README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, templates, setup placeholder, communication norms), started in class and due end of day Fri, Oct 30. Bring the punch list and your review partner's repo link: the first thing Wednesday after the fast items is a cold read of each other's README and CONTRIBUTING.
- **CP9 portfolio opens:** from now on, save links to your best bug reports, feature requests, PR descriptions, review comments, and feedback responses — 8 artifacts due Week 11, graded on quality.

---

## Threads to carry forward

- Today's audit punch list → Wednesday's build → **CP7** → the Week-11 **repo audit** grades the result through a stranger's eyes.
- Issue anatomy feeds **Week 9's** contribution pathways (good-first-issues on your own roadmap) and the **CP9 portfolio** artifacts.
- The license rationale and communication norms land in the repo per the design doc's **required repository artifacts** (v4 §10).
- "Write things down to scale yourself" is the launch-package philosophy (Wks 12–13) in miniature.

---

## Open questions / decisions before we flesh this out

- ~~**Comparison repos**~~ **resolved:** Textualize/rich (strong) vs. dagorym/SSW (weak, the instructor's own), with Prop Loft as an optional middle — see Instructor prep and §2.
- ~~**CODE_OF_CONDUCT source**~~ **resolved:** yes — **[Contributor Covenant](https://www.contributor-covenant.org/)** is the default adopt-don't-write choice. It's the most widely adopted open-source code of conduct, started in 2014 and now maintained by the Organization for Ethical Source; current version **[3.0](https://www.contributor-covenant.org/version/3/0/code_of_conduct/)**. The one thing a project must fill in is how to report a problem (the text leaves a `[NOTE: describe your means of reporting here.]` placeholder), plus reviewing the enforcement section. GitHub's *Add file → CODE_OF_CONDUCT.md* offers it as a template.
- **CP7 assignment handout:** created — `canvas_material/assignments/handouts/CP7-Infrastructure-Package.md.jinja` (checklist + rubric included).

---

## Deliverable / after class

- No new checkpoint today; bring the **audit punch list** Wednesday.
- **Due Fri, Oct 30:** **CP7 Project Infrastructure Package** (started in Wednesday's workshop). **CP9 portfolio collection begins now.**

---

## Appendix — classroom handouts (Session 15)

- **Stranger's-eye audit checklist** — *not used today; built with the Session 22 materials* (graded repo audit; also the Session 25 test script). §5 uses the CP7 Checklist instead.
- **License Cheat Sheet:** `canvas_material/pages/License-Cheat-Sheet.md`
- **Bug-report anatomy** (§4) — half-sheet
- **CP7 Checklist:** `canvas_material/resources/CP7-Checklist.html` / `.pdf` — one per student · **CP7 rubric:** `rubrics.md`

### Bug-report bank (§4) — real issues, weak to strong

From the instructor's own repos (SSW, and the instructor's own reports in mdx-canvas) and BYU course-tools repos the instructor works in — shown for the report, not the person. Pick three or four for class; the rest are back-pocket. *The deck uses #11 + #16 (weak), #93, #139, #74, jetbrains-recorder #3 (rewrite), and SSW #6 (not a bug).*

**Weak — the failure never makes it onto the page**
- [SSW #11](https://github.com/dagorym/SSW/issues/11) — *"Map occasionally vanished from frame on Windows"*: a title and an empty body. It got fixed only because the reporter was also the fixer. A report that works only for its author isn't a report.
- [jetbrains-recorder #3](https://github.com/BYU-CS-Course-Ops/jetbrains-recorder/issues/3) — *"No recording generated when file is nested in subdirectories"*: a secondhand report with no IDE or plugin version, no steps, and no expected location — but its last clause is real narrowing. **The pairs rewrite (deck slide 19)**: a genuine failure anyone who's used an IDE can reason about.
- [byu_pytest_utils #16](https://github.com/BYU-CS-Course-Ops/byu_pytest_utils/issues/16) — *"See dialog.py line 216"*: points at code and never states the failure. The reporter jumped straight to the defect and skipped what a user sees.

**Middle — the template is filled in; the report still isn't written**
- [mdx-canvas #93](https://github.com/BYU-CS-Course-Ops/mdx-canvas/issues/93) — *"Cannot link to syllabus"*: the headings are all there, but "the latest update" isn't a version, and "cannot" doesn't say what happened (an error? a broken link?). Filling in a template isn't the same as writing a report.
- [mdx-canvas #139](https://github.com/BYU-CS-Course-Ops/mdx-canvas/issues/139) — *"deploy fails when answer contains a URL with an IP address"*: the full input and the verbatim error (good), but the title asserts a guessed cause ("apparently … tries to follow the link?"). The observable failure is a 403 from CloudFront during deploy. **The title names the failure; a hypothesis goes in the body, labelled as one.** This is the cleanest example for the defect/fault/failure point.

**Strong**
- [mdx-canvas #74](https://github.com/BYU-CS-Course-Ops/mdx-canvas/issues/74) — *"Tables including `<br/>` tags fail to render properly"*: minimal input, screenshots of actual vs. expected, environment, and a suspected fix line placed under *Additional context*, kept apart from the failure. The model report.
- [SSW #1](https://github.com/dagorym/SSW/issues/1) — *"Attempting to load a saved game results in an infinite loop"*: two sentences plus an attached save file. Short is fine when it's reproducible.
- [SSW #14](https://github.com/dagorym/SSW/issues/14) — *"Data corruption when conducting battle in strategic game"*: the verbatim error, a platform difference, narrowing ("starting the tactical game directly has no issue"), and an observed fault. The closing comment walks the chain backward to a suspected bad save file. Use it for the IEEE vocabulary.

**Not a bug at all**
- [SSW #6](https://github.com/dagorym/SSW/issues/6) — *"Can't move off the map"*: reads like a weak bug report, but it's a placeholder reminding the author that a feature isn't implemented yet. Adding reproduction steps would be the wrong fix; filing it as an enhancement that says what the rules call for at the map edge is the right one. Used on the founder's-move slide (deck slide 21) to show that issue type and labels are part of the norms.

**Feature request**
- [SSW #16](https://github.com/dagorym/SSW/issues/16) — *"Startup provides no user guidance"*: states the need and proposes a fix. Ask what's missing (who hits this, and what they do today) — the CP2 discipline in miniature.

**Advanced (for strong students)**
- [mdx-canvas #150](https://github.com/BYU-CS-Course-Ops/mdx-canvas/issues/150) — *"Attributes that are accepted, documented, and silently discarded"*: an outside user's audit. It bundles four findings and says why, separates what was confirmed from what wasn't, and cites the API docs and line numbers. It shows how far a report can go.

---

*Next step: pick the comparison repos; create the audit checklist (dual-use for Week 11); build the Session 15 deck and student page. Related: `Session03-Sep14-Outline.md`, `Session16-Oct28-Outline.md`, `rubrics.md` (CP7, CP9).*
