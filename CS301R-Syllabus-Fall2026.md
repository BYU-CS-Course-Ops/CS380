# CS 301R — Software Engineering Studio I: Founding an Open-Source Project

**Syllabus · Fall 2026 · Brigham Young University · Department of Computer Science**

*Draft v1 for instructor review. Student-facing sections are ready to publish; items still awaiting an instructor decision are written with a sensible default and gathered at the end under "Instructor decisions to confirm."*

---

## Course at a glance

| | |
|---|---|
| **Course** | CS 301R — Software Engineering Studio I: Founding an Open-Source Project *(special topics; eventual CS 380)* |
| **Credit** | 3 credit hours · 14 weeks |
| **Term** | Fall 2026 — Wed, Sep 2 through Wed, Dec 9, plus a finals-week Demo Day |
| **Meetings** | Monday / Wednesday, 75 minutes · *[room & time TBD]* |
| **Demo Day** | A 3-hour finals-week block, Dec 12–17 *(slot TBD; capstone faculty invited)* |
| **Instructor** | Dr. Tom Stephens · tstephen@cs.byu.edu · *[office & hours TBD]* |
| **Expected workload** | ~10 hours/week (≈2.5 hrs in class + ≈7.5 hrs outside) |
| **Prerequisites** | *[confirm — foundational CS coursework; ability to build a small software project]* |

---

## Course description

Introduces the practices required to conceive, justify, and found a lasting, open-source software project. Working individually and then in small teams, students discover a real user need, scope a product, write proposal and design documentation, set up an open-source-ready repository with the governance and processes future contributors need, and build an initial MVP/prototype. Topics include product discovery and needfinding, feasibility and scope analysis, software design documents, git-based collaboration, technical communication, open-source licensing and governance, issue and pull-request workflows, and early-stage project management. Emphasizes engineering judgment, technical communication, and building software that serves a real need and that others can join and build on.

### What makes this course different

> Nearly every big open-source project you rely on **started as one or two people deciding** a problem was worth solving. This semester, that's you.

Most of your coursework hands you a problem to solve. This one asks you to **find a problem worth solving, prove it is worth solving, and lay a foundation other people can build on.** You will not join an existing project — you will **found** one: discover a real need, propose and pitch it, form a team around it (solo is allowed), design it, build an MVP in the open, and launch it **contributor-ready** so others can join and keep building while you lead.

That founder's posture — *you lead, others join to build* — runs through every assignment. The strongest projects from this course may be carried forward into the capstone, with the student who founded the project serving as its sponsor/product owner. Understanding a real user's need deeply enough to own that role is a central job of this course.

### How this course serves the aims of a BYU education

Founding a real project that serves real people is an unusually complete vehicle for a BYU education. It is **intellectually enlarging** (discovery, feasibility, design, and building exercise rigorous, creative thinking and clear communication); **character building** (honest needfinding, candid retrospectives, integrity about AI use, and respectful peer review are small decisions that build character); and it **leads to lifelong learning and service** — you will learn unfamiliar technologies on your own, and you will build software that meets a genuine need and that others can continue. These connect directly to the Software Engineering emphasis's five C's: **Christlike** (serving a real need; welcoming future contributors), **Creative** (the divergent→convergent problem-solving spine), **Collaborative** (teams, charters, review workflows), **Capable** (breadth across the founding skill set), and **Curious** (self-directed exploration of problems, users, and tools).

---

## Learning outcomes

By the end of the course, you will be able to:

1. **Discover and define a real opportunity** — identify a target userbase, investigate their needs (real interviews where possible, or documented persona/proxy needfinding), and articulate the problem, goals, non-goals, and success criteria.
2. **Evaluate feasibility and scope** — analyze technical risk, breadth, dependencies, and maintainability, and reduce an ambitious vision to an MVP achievable in one semester while preserving a path to grow.
3. **Propose and pitch persuasively** — produce a written proposal and defend it in an oral pitch that is clear, persuasive, and responsive to critique.
4. **Design a system and a project** — write a design document (architecture, components, data, interfaces, technology choices, rationale, risks) and revise it in response to feedback.
5. **Found an open-source-ready project** — select and justify a license; establish repository structure, contribution guidelines, code of conduct, issue/PR templates, onboarding docs, and governance norms.
6. **Use core git and collaboration workflows** — branch, commit, review, and merge with a maintainer-centered workflow; write reviewable PRs and useful commit messages.
7. **Communicate professionally in engineering contexts** — write and respond to issues, bug reports, feature requests, code reviews, and PRs with precision and professionalism.
8. **Plan, build, and open for contribution** — break work into milestones/issues, build an MVP that proves viability, and produce a Launch & Onboarding Package (with retrospective) that lets new contributors join and the project keep growing.

---

## How the course works

**Studio + workshop, not lecture-heavy.** Each week pairs a teaching session with a working session:

- **Monday (Session A):** short lecture, worked examples, guided discussion and critique.
- **Wednesday (Session B):** workshop, lab, peer review, demo, or studio work — often released early so you work with the instructor available as a coach.

This supports the cycle the course depends on: **draft → review → revise → implement → reflect.**

**The Creative Problem Solving spine.** Following the Osborn–Parnes model (divergent, then convergent, at each stage), the semester runs in five phases:

| Phase | Weeks | What you do | Result |
|---|---|---|---|
| 1 · Clarify & Explore | 1–3 | Understand the problem space; do discovery; frame needs and users | Idea Briefs + Product Definition Brief |
| 2 · Ideate & Pitch → Teams | 4–5 | Diverge on ideas, converge, persuade, and select | Proposal, Pitch #1, **teams form** |
| 3 · Develop & Design | 6–8 | Design the system and the project's foundation | Design Doc + Infrastructure Package |
| 4 · Implement & Build | 9–12 | Plan and build a vertical slice; manage the work | Project Plan + MVP + Repo Audit |
| 5 · Launch & Reflect | 13–14 (+ finals) | Harden for launch, reflect, present | Launch Package + Final Demo |

**Individual → team, with a solo option.**

- **Weeks 1–5 are individual.** Everyone explores problems, does discovery, writes a proposal, and pitches an idea. The pitch is persuasive — you are recruiting classmates.
- **Pitch Day (Wed, Oct 7) is the hinge.** Each student pitches; peers evaluate and signal interest; the instructor gives input and has final say on which ideas are rich and feasible enough to anchor a team. Selection blends **peer scores + author recruiting + instructor judgment.**
- **Teams form around the surviving ideas** (~2–4 people; the count is emergent). **You may instead continue solo** on a necessarily smaller-scope project. No student's idea is killed out from under them.
- **Weeks 6–14 are team-based (or solo):** the team carries the project through design, repo foundation, MVP, and launch.

**Real users — the ideal, with an honest substitute.** Because the project lead can become the capstone sponsor, understanding real users is the goal: identify users → understand their needs → involve them in shaping the design. You are strongly encouraged to talk to real people. For this first iteration, **a documented persona/proxy is an accepted substitute** where real access isn't available — as long as you are honest about your method and its limits. Any real-user engagement follows the basic consent/ethics norms covered in Week 2.

---

## The kind of project you'll found

Not every idea is a good fit for this course. We steer toward a particular *shape* of project — not a particular technology. The target is a **product that serves a real need for a real userbase, with enough surface area across engineering disciplines** — design, architecture, data, interfaces, infrastructure, operations — that others could join and keep building on it. Web and service applications are the common vehicle and the recommended default, but what's being selected for is *real-world relevance and richness*, not the architecture. **Smaller-scope and solo projects are fully supported** this first iteration — the large, multi-faceted product is the north star, not a hard floor.

**The selection criteria — our shared yardstick.** You'll use these to weigh your own ideas; peers use them to score each other's at Pitch Day; and the instructor uses them for the final selection. A strong project:

- **Serves a real need for a real, reachable userbase** — not a toy or a purely self-serving tool.
- **Is rich / broad** — meaningfully exercises multiple engineering dimensions (design, architecture, data, UI, infrastructure, ops). *Could a multi-disciplinary team grow into this?*
- **Is open-source-worthy** — appropriate to develop and release in the open.
- **Has a one-semester MVP** — a coherent vertical slice is achievable at ~10 hrs/week over 14 weeks.
- **Is extensible** — others can credibly keep building on it as the team grows.
- **Has a tractable stack** — technologies you can justify and support; complexity only where it earns its keep.
- **Has room to grow** — others can join and build on it with you still leading (and, if it's selected, potentially into the capstone as its sponsor).

These criteria drive the whole first phase of the course: you diverge to find candidates, then **converge** by scoring them against this list. A project that's fun to build but serves no one — or is too thin for anyone else to build on — scores low here on purpose.

**The habit is what transfers.** Evaluating *any* idea — a proposal at work, a startup, a side project — is the same method: decide what "good" means, score candidates against those criteria, weigh value against effort, get feedback, and commit with a rationale. What changes between contexts is the *criteria*; the seven above are ours because we're founding lasting open-source projects. Learn the method here and you can run it anywhere.

---

## Checkpoints and schedule at a glance

Twelve graded checkpoints (CP1–CP12) build toward the culminating artifact. CP1–CP4 are individual; CP5 onward are team (or solo). A handful of smaller **completion-graded** deliverables (Team Charter, License/OSS short response, MVP Plan) support the checkpoints.

| CP | Checkpoint | Ind./Team | Due |
|---|---|---|---|
| — | *License/OSS short response* (completion) | Individual | Mon, Sep 21 *(S5)* |
| 1 | Idea Briefs (3 candidate concepts) | Individual | Wed, Sep 23 *(S6)* |
| 2 | Product Definition Brief | Individual | Mon, Sep 28 *(S7)* |
| 3 | Written Proposal | Individual | Mon, Oct 5 *(S9)* |
| 4 | Pitch Presentation #1 + team formation | Individual | Wed, Oct 7 *(S10)* |
| — | *Team Charter* (completion) | Team | Mon, Oct 12 *(S11)* |
| 5 | Design Document (revised) | Team | Wed, Oct 21 *(S14)* |
| 6 | Git Workflow Lab | Team | Wed, Oct 21 *(S14)* |
| 7 | Project Infrastructure Package | Team | Wed, Oct 28 *(S16)* |
| 8 | Project Plan & Roadmap | Team | Wed, Nov 4 *(S18)* |
| — | *MVP Plan* (completion) | Team | Wed, Nov 11 *(S20)* |
| 9 | Technical Communication Portfolio | Individual | Wed, Nov 18 *(S22)* |
| 10 | MVP → Progress Demo + Repo Audit | Team | Wed, Nov 18 *(S22)* |
| 11 | Launch & Onboarding Package + Retrospective | Team | Wed, Dec 2 *(S25)* |
| 12 | Final Pitch + Demo (mastery artifact) | Team | Demo Day (Dec 12–17) |

*A full session-by-session schedule is distributed separately (see `CS301R-Schedule-Fall2026.md`). Note the two schedule quirks: the term opens on two isolated Wednesdays (Sep 2 & Sep 9, Labor Day intervening), and there is no class Wed, Nov 25 (Thanksgiving).*

### The culminating experience

The mastery artifact is a **launched open-source project, defended at Demo Day.** Each team (or solo student) finishes with a working MVP that proves core viability, an open-source-ready repository with full governance and onboarding docs, a Launch & Onboarding Package (roadmap, known issues, tech-debt notes, architecture overview, retrospective), and a final pitch + live demo. The demo answers the three questions the whole semester builds toward: **What need does this serve? What has been built? Where does it go next, and how can others join you in building it?**

---

## Materials

- **No textbook purchase is required.** All assigned readings are free and linked from the course pages (LMS). A Creative Problem Solving handbook excerpt and a set of course handouts (discovery, licensing, interview ethics, persona templates, feasibility and learning-plan worksheets, evaluation sheets) are provided.
- **A computer capable of software development** and a **GitHub account** (used for all project work). Repositories are public/open-source by default.
- **AI assistants (e.g., Claude Code) are permitted tools** — see the AI policy below.

---

## Assessment

Grading emphasizes **process and founding artifacts, not the prototype alone.** A project with strong code but missing discovery, documentation, or governance should not earn top marks.

### Grade weights

| Checkpoint / bundle | Weight |
|---|---|
| **Discovery** — CP1 Idea Briefs (5%) + CP2 Product Definition Brief (5%) | 10% |
| CP3 Written Proposal | 12% |
| CP4 Pitch Presentation #1 | 8% |
| CP5 Design Document | 12% |
| CP7 Project Infrastructure Package | 12% |
| **Git + Tech-Comm** — CP6 Git Workflow Lab (6%) + CP9 Tech-Comm Portfolio (6%) | 12% |
| CP8 Project Plan & Roadmap | 8% |
| CP10 MVP / Prototype (MVP Plan + Progress Demo + Repo Audit) | 16% |
| **Final** — CP11 Launch Package + Retrospective (5%) + CP12 Final Pitch + Demo (5%) | 10% |
| **Total** | **100%** |

Each checkpoint is scored on a published **100-point analytic rubric** (four levels — Exemplary / Proficient / Developing / Beginning — with weighted criteria). Rubrics are handed out with each assignment. The completion-graded deliverables (Team Charter, License/OSS short response, MVP Plan) are **credit/no-credit**: they are required, feed directly into their related checkpoints, and non-submission is noted under professionalism (and can cap the related checkpoint).

### Grade scale

Standard BYU letter grades. *[Confirm the department's preferred cutoffs; a common scale:]*

| A | A– | B+ | B | B– | C+ | C | C– | D+ | D | D– | E |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 93–100 | 90–92 | 87–89 | 83–86 | 80–82 | 77–79 | 73–76 | 70–72 | 67–69 | 63–66 | 60–62 | <60 |

### Pass conditions

To pass, you must complete — at least at the **Developing** level on every rubric criterion — the **discovery brief, written proposal, pitch, design document, infrastructure package, MVP, and final presentation.** Strong code cannot compensate for a missing founding artifact.

---

## Team and individual accountability

Weeks 1–5 are graded individually. From Week 6 on, shared team artifacts (CP5–CP12) receive a **team grade adjusted by individual-contribution evidence** drawn from three streams:

1. **Git / PR / issue-tracker history** — objective volume and quality signals,
2. your **contribution log**, and
3. **confidential peer evaluations** at the midpoint (opens Nov 18) and end of term (opens Nov 30).

Each student's grade on team artifacts is set by an **individual multiplier** the instructor determines from that evidence. The multiplier **defaults to 1.00** — a functioning team where everyone meets the charter needs no adjustment, and most students will land there. It moves outside a narrow band (proposed **±10%**) only in documented cases of sustained non-contribution or exceptional carry, and **never on peer numbers alone** — the instructor corroborates against git/tracker evidence and a conversation before any downward adjustment. **Solo students** are graded on the same artifacts at one-person scope; their multiplier defaults to 1.00.

**Peer evaluation is a taught, graded skill, not a survey.** You will score against the same published criteria you have used all semester, and against your own team charter's definition of "pulling your weight." Evaluations are **confidential** (teammates never see who said what) and governed by a **no-retaliation norm**: retaliatory scoring is weighed accordingly. Submitting your evaluations is required; an unsubmitted eval forfeits your own input into your multiplier and is noted under professionalism.

---

## Course policies

### Revision policy

Engineering iteration is the point of this course, so the **major artifacts — Written Proposal (CP3), Design Document (CP5), and Infrastructure Package (CP7)** — may be revised after feedback. **Default mechanics:** submit a revision within **one week** of receiving graded feedback; the revised score **replaces** the original for the criteria you improved. Revisions must show a genuine response to the feedback given, not cosmetic edits. *(Several rubrics also reward visible evidence of revision directly.)* Checkpoints not on this list are single-submission unless the instructor notes otherwise.

### Late work

Checkpoints are due at the **start of class** on the due date. **Default policy:** late work is accepted for **three calendar days** at **−10% per day**, after which it is not accepted without prior arrangement. Each student has **one 48-hour "grace" extension** to use on any individual checkpoint (CP1–CP4) without penalty, requested before the deadline. **Team artifacts and time-boxed events cannot be made up after the fact** (see attendance) — a team that misses a demo forfeits that live component. If a genuine emergency arises, contact the instructor as early as possible; documented emergencies are handled case by case.

### Attendance

This is a studio: much of the learning happens in the room, in workshops, reviews, and demos. Regular attendance is expected, and consistent participation shows up in peer evaluation and professionalism. Three sessions are **anchor sessions** you must attend:

- **Pitch Day** — Wed, Oct 7 (S10)
- **Progress Demo + Repo Audit** — Wed, Nov 18 (S22)
- **Final Demo Day** — finals week

If you must miss an anchor session for a serious, documented reason, arrange it with the instructor **in advance**; a **recorded-clip fallback** is allowed only as a declared last resort, not a routine substitute for presenting live.

### AI and tooling

AI assistants (e.g., Claude Code) are **permitted** for brainstorming, learning new technologies, drafting, and code assistance. **The goal of the course, however, is for you to develop and demonstrate your own understanding.** You must be able to explain and defend anything you submit — unexplained AI-generated work is treated like any other unverified contribution. **Disclose substantial AI use** where it materially shaped an artifact. AI is a tool here, not a topic of the course.

### Collaboration and real-user ethics

Weeks 1–5 are individual work. From Week 6, work is by team (or approved solo), and peer review is required throughout even when implementation is divided. Talking to real users is strongly encouraged; any real-user engagement must follow the basic **consent and ethics norms** covered in Week 2 (grounded in BYU's IRB guidance for student projects). Documented persona/proxy needfinding is an acceptable substitute this iteration when the reasoning is honest.

### Process over code

Founding artifacts — discovery, proposal, design, governance, launch — are weighted so that a "great prototype, no foundation" outcome cannot earn top marks. What distinguishes a passing student is not strong code alone but a **founded, defensible, contributor-ready project.**

---

## University-required statements

*The statements below reflect BYU's standard required syllabus language. Confirm the current official wording from the CTL/university before publishing — these are updated periodically.*

**Honor Code.** In keeping with the principles of the BYU Honor Code, students are expected to be honest in all of their academic work. Academic honesty means, most fundamentally, that any work you present as your own is in fact your own work and not that of another. Violations include (but are not limited to) plagiarism, fabrication or falsification, and cheating. Students are also expected to comply with the Church Educational System Honor Code and the Dress and Grooming Standards. See [honorcode.byu.edu](https://honorcode.byu.edu).

**Academic integrity in this course.** All submitted work must be your own (or, for team artifacts, your team's), with sources and substantial AI assistance disclosed as described in the AI policy above. Presenting others' work — human or machine — as your own without disclosure is a Honor Code violation.

**Preventing and responding to sexual misconduct.** BYU prohibits sex discrimination against any participant in its education programs or activities, including sexual harassment, dating and domestic violence, sexual assault, and stalking. The university requires all faculty to report incidents of sexual misconduct that come to their attention. If you encounter sexual misconduct, contact the Title IX Coordinator at t9coordinator@byu.edu or 801-422-8692, or see [titleix.byu.edu](https://titleix.byu.edu). Confidential support is available through the Sexual Assault Survivor Advocate and BYU Counseling and Psychological Services.

**Student disability / accessibility.** BYU is committed to providing a working and learning atmosphere that reasonably accommodates qualified persons with disabilities. If you have a disability that may affect your performance in this course, contact the University Accessibility Center (2170 WSC, 801-422-2767, [uac.byu.edu](https://uac.byu.edu)) to arrange reasonable accommodations. Notify the instructor of an approved accommodation as early as possible.

**Deliberate fostering of belonging / nondiscrimination.** BYU is committed to a community in which all students feel welcome and can succeed. Behavior that demeans or excludes on any prohibited basis is inconsistent with the university's mission and the standards of this course.

**Mental health.** Mental health concerns and stressful life events can affect your academic performance and wellbeing. BYU Counseling and Psychological Services (CAPS, 1500 WSC, 801-422-3035, [caps.byu.edu](https://caps.byu.edu)) provides free, confidential support. If you or someone you know is in crisis, help is available.

---

*This is a founding studio. Your discovery becomes your proposal, your proposal becomes your pitch, your pitch becomes your team, and your team's work becomes a launched project others can join and build on. Everything connects — that is the point.*

---
---

## Instructor decisions to confirm *(not part of the student-facing syllabus)*

These are the places where the syllabus fills a gap the design docs left open. Each has a proposed default above; flagged here so they can be ratified or changed before publishing.

1. **Logistics TBD** — room, meeting time (which also pins the finals-week Demo Day slot per the schedule doc), office location/hours, and the prerequisite line. Fill in once registration and rooming are set.
2. **Grade-scale cutoffs** — I used a common A–E scale; confirm the department's preferred cutoffs (and whether +/– is used).
3. **Bundle splits (rubrics.md).** I applied the suggested even splits — Discovery 5/5, Git+Tech-Comm 6/6, Final 5/5. Confirm, or reweight (e.g., the Final bundle could favor CP12).
4. **Revision-window mechanics.** Proposed: 1-week window on CP3/CP5/CP7; revised score *replaces* the original. Alternatives you flagged in rubrics.md: average original and revised, or cap the maximum bump. Pick one.
5. **Late policy + grace extension.** Proposed: −10%/day for 3 days, one 48-hr grace token on CP1–CP4. Entirely a proposal — adjust the numbers or scope to your preference.
6. **Attendance / anchor sessions + recorded-clip fallback.** Ratifies the "recorded-clip fallback as declared last resort" floor (pending decision #3) and names Pitch Day, Repo Audit, and Demo Day as mandatory. Confirm this is the policy you want, and whether any other sessions (e.g., peer-review workshops) should be mandatory.
7. **Completion-graded items with no independent weight.** Team Charter, License/OSS short response, and MVP Plan are credit/no-credit and feed related CPs rather than carrying their own percentage (keeps the §8 weights summing to 100%). Confirm that's how you want them to count, or carve out a small participation/professionalism percentage for them.
8. **Peer-eval ⚑ items** still open in `development/Peer-Evaluation-System.md` (multiplier bounds shown as ±10%, midpoint weight, submission-required). The syllabus language matches the current recommendations there; reconcile once those are settled.
9. **University statements** — paste the current official BYU wording for the Honor Code, Title IX/sexual-misconduct, accessibility, belonging, and mental-health statements (they change year to year); the versions above are faithful but should be verified.
10. **License/OSS short-response due date** — set to **Mon, Sep 21** to match the handout (`assignments/License-OSS-Short-Response.md`). The two lagging references are now fixed: the schedule doc's Session-4 row moved the deliverable to Session 5 (Sep 21), and the Session 3 deck was rebuilt (`lectures/Session03-OpenSource-v2.pptx`). All materials now agree; just confirm Sep 21 is your intended date and consolidate the deck v2 over the original after a PowerPoint look.
