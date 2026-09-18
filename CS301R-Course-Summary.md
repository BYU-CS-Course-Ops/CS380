---
title: "Software Engineering Studio I: Founding an Open-Source Project"
subtitle: "CS 301R · Course Summary"
---

**Brigham Young University · Department of Computer Science · Fall 2026 · Dr. Tom Stephens (tstephen@cs.byu.edu)**

*This summary describes what the course encompasses — its purpose, structure, deliverables, and outcomes — for faculty evaluating it and for students deciding whether to take it. It is maintained alongside the course design documents and updated as the course evolves. Last updated: August 2026.*


## At a glance

| | |
|---|---|
| **Course** | CS 301R — Software Engineering Studio I *(special topics; eventual CS 380)* |
| **Credit / length** | 3 credit hours · 14 weeks + a finals-week Demo Day |
| **Term** | Fall 2026 — Wed, Sep 2 through Wed, Dec 9 |
| **Meetings** | Monday / Wednesday, 75 minutes (27 sessions) |
| **Expected workload** | ~10 hours/week total — ≈2.5 hrs in class, ≈7.5 hrs outside |
| **Format** | Studio + workshop: Monday teaches, Wednesday builds, reviews, or demos |
| **Course focus** | Finding a real need, proposing and pitching it, founding an open-source project around it, and launching an MVP others can join |
| **Work structure** | Weeks 1–5 individual; teams form at Pitch Day (Oct 7); Weeks 6–14 team (~2–4) or solo |
| **Culminating experience** | A launched, contributor-ready open-source project defended at a 3-hour finals-week Demo Day |
| **Materials** | No textbook purchase; all readings free and linked. GitHub account and a development machine required. |


## What this course is

> Nearly every big open-source project you rely on **started as one or two people deciding** a problem was worth solving. This semester, that's you.

Most coursework hands students a problem to solve. This course asks them to **find a problem worth solving, prove it is worth solving, and lay a foundation other people can build on.** Students do not join an existing open-source project — they **found** one: discover a real user need, propose and pitch it, form a team around it (solo is supported), design it, build an MVP in the open, and launch it **contributor-ready** so others can join and keep building while the founder leads.

**Catalog description.** Introduces the practices required to conceive, justify, and found a lasting, open-source software project. Working individually and then in small teams, students discover a real user need, scope a product, write proposal and design documentation, set up an open-source-ready repository with the governance and processes future contributors need, and build an initial MVP/prototype. Topics include product discovery and needfinding, feasibility and scope analysis, software design documents, git-based collaboration, technical communication, open-source licensing and governance, issue and pull-request workflows, and early-stage project management. Emphasizes engineering judgment, technical communication, and building software that serves a real need and that others can join and build on.

**What the course deliberately does not do.** It does not attempt to cover all of software engineering. It covers the subset required to found a project that serves real users and that others can continue: discovery and needfinding, feasibility and MVP scoping, idea evaluation, maintainer-centered git workflows, open-source setup and governance, issue tracking and planning, technical communication, and initial architecture and documentation.

**The core lens.** BYU's 2025–26 open-source course was built around *joining* an existing project. This course inverts that perspective — from contributor to founder/maintainer; from learning a project's norms to writing them; from finding contribution opportunities to creating contribution pathways for others. The contributor role is treated with respect; this is a different job, not a superior one.


## Role in the program, and who it serves

**Prototype first semester of the Software Engineering Studio sequence** (380 → 480 → 481). For this first iteration it is taught as a **standalone course**, not yet formally wired into the sequence.

**Dual audience.** The course stands on its own for the general CS student who wants to learn how to create and run an open-source software project, *and* serves as an on-ramp to the capstone for students who want to take a project further. Every student finishes with a real, launched project; the strongest projects become capstone seeds.

**The sponsor model.** Projects coming out of this course may feed the following semester's capstone, and the course is designed so that the **student who founds a project here can carry it forward as that project's sponsor / product owner** — replacing today's model in which faculty recruit external sponsors who "hire" a capstone team. Understanding a real user need deeply enough to own that role is therefore a central job of the course.

**Alignment with the Aims of a BYU Education and the SE five C's.** Founding a project that serves real people is an unusually complete vehicle for a BYU education. It is *intellectually enlarging* (discovery, feasibility, design, and building demand rigorous, creative thinking and clear communication), *character building* (honest needfinding, candid retrospectives, integrity about AI use, and respectful peer review are exactly the small decisions the Aims describe), and it *leads to lifelong learning and service* (self-directed learning of unfamiliar technologies; software that meets a genuine need and that others can continue). These map onto the Software Engineering emphasis's five C's — **Christlike** (serving a real need; welcoming future contributors), **Creative** (the divergent→convergent problem-solving spine), **Collaborative** (teams, charters, review workflows), **Capable** (breadth across the founding skill set), and **Curious** (self-directed exploration of problems, users, and tools). The full outcome-by-outcome crosswalk lives in the course design document, §4.


## Learning outcomes

By the end of the course, a student can:

1. **Discover and define a real opportunity** — identify a target userbase, investigate their needs (real interviews where possible, or documented persona/proxy needfinding), and articulate the problem, goals, non-goals, and success criteria.
2. **Evaluate feasibility and scope** — analyze technical risk, breadth, dependencies, and maintainability, and reduce an ambitious vision to an MVP achievable in one semester while preserving a path to grow.
3. **Propose and pitch persuasively** — produce a written proposal and defend it in an oral pitch that is clear, persuasive, and responsive to critique.
4. **Design a system and a project** — write a design document (architecture, components, data, interfaces, technology choices, rationale, risks) and revise it in response to feedback.
5. **Found an open-source-ready project** — select and justify a license; establish repository structure, contribution guidelines, code of conduct, issue/PR templates, onboarding docs, and governance norms.
6. **Use core git and collaboration workflows** — branch, commit, review, and merge with a maintainer-centered workflow; write reviewable PRs and useful commit messages.
7. **Communicate professionally in engineering contexts** — write and respond to issues, bug reports, feature requests, code reviews, and PRs with precision and professionalism.
8. **Plan, build, and open for contribution** — break work into milestones and issues, build an MVP that proves viability, and produce a Launch & Onboarding Package (with retrospective) that lets new contributors join and the project keep growing.

**A ninth capacity, kept as a throughline rather than an outcome: evaluation and engineering judgment.** Appraising ideas — one's own and others' — against explicit criteria, then deciding, is practiced at rising stakes all semester: self-scoring candidate ideas at convergence (Week 3), scoring peers' pitches at selection (Week 5), auditing repos and demos (Weeks 11–12), and defending choices at the final demo. Because the method transfers to any context — a feature proposal at work, a startup, a side project — idea evaluation and constructive critique are themselves graded, not merely inputs to a decision.


## How the course works

**Studio + workshop, not lecture-heavy.** Each week pairs a teaching session with a working session. **Monday (Session A)** is a short lecture with worked examples and guided critique; **Wednesday (Session B)** is a workshop, lab, peer review, demo, or studio block, often released early so students work with the instructor available as a coach. This supports the cycle the whole course depends on: **draft → review → revise → implement → reflect.**

**The Creative Problem Solving spine.** Following the Osborn–Parnes model (divergent, then convergent, at each stage), the semester runs in five phases:

| Phase | Weeks | What students do | Result |
|---|---|---|---|
| 1 · Clarify & Explore | 1–3 | Understand the problem space; do discovery; frame needs and users | Idea Briefs + Product Definition Brief |
| 2 · Ideate & Pitch → Teams | 4–5 | Diverge on ideas, converge, persuade, and select | Proposal, Pitch #1, **teams form** |
| 3 · Develop & Design | 6–8 | Design the system and the project's foundation | Design Doc + Infrastructure Package |
| 4 · Implement & Build | 9–12 | Plan and build a vertical slice; manage the work | Project Plan + MVP + Repo Audit |
| 5 · Launch & Reflect | 13–14 (+ finals) | Harden for launch, reflect, present | Launch Package + Final Demo |

**Individual → team, with a solo option.** Weeks 1–5 are individual: everyone explores problems, does discovery, writes a proposal, and pitches an idea. **Pitch Day (Wed, Oct 7) is the hinge of the course** — each student delivers a persuasive pitch that both defends the idea and recruits classmates. Selection is a blend: peers evaluate and signal interest, authors recruit, and the instructor gives input and has final say on which ideas are rich and feasible enough to anchor a team. Evaluation happens live; **commitment does not.** Pitch Day ends with the anchor ideas announced and a private ranked preference from every student; the anchor projects' written proposals go up for the weekend; **teams are announced Mon, Oct 12**, and charters are written that day in class. A student may instead continue **solo** on a necessarily smaller-scope project. No student's idea is killed out from under them. Weeks 6–14 are team-based or solo, carrying the project through design, repo foundation, MVP, and launch.

**Real users — the ideal, with an honest substitute.** Because the project lead can become the capstone sponsor, understanding real users is the goal: identify users → understand their needs → involve them in shaping the design. Students are strongly encouraged to talk to real people, and any real-user engagement follows consent and ethics norms taught in Week 2 (grounded in BYU IRB guidance for student projects). For this first iteration, a **documented persona/proxy is an accepted substitute** where real access isn't available, provided the student is honest about the method and its limits — evidence is explicitly tagged as observed or assumed.

**Scope, stated honestly.** The ~10 hrs/week is the *total* course load — class, reading, discovery, writing, and reviews all come out of it — and real building runs for **roughly five weeks** (Weeks 9–13). The course says this plainly rather than implying a semester of full-time building; scope realism is a graded dimension on multiple rubrics.

**AI tooling — available, not central.** AI assistants are permitted for brainstorming, learning new technologies, drafting, and code assistance. Students must be able to explain and defend anything they submit; unexplained AI-generated work is treated like any other unverified contribution, and substantial AI use is disclosed where it materially shaped an artifact. AI is a tool here, not a topic.


## The kind of project students found

The course steers toward a *shape* of project, not a technology. The target is a **product that serves a real need for a real userbase, with enough surface area across engineering disciplines** — design, architecture, data handling, interfaces, infrastructure, operations — that a multi-disciplinary team could grow into it. Web and service applications are the common vehicle and the recommended default, but what is selected for is real-world relevance and richness, not the architecture. Smaller-scope and solo projects are fully supported this iteration; the large, multi-faceted product is the north star, not a hard floor.

**Selection criteria — the shared yardstick.** Students use these to weigh their own ideas, peers use them to score each other's at Pitch Day, and the instructor uses them for final selection. A strong project:

- **Serves a real need for a real, reachable userbase** — not a toy or a purely self-serving tool.
- **Is rich / broad** — meaningfully exercises multiple engineering dimensions.
- **Is open-source-worthy** — appropriate to develop and release in the open.
- **Has a one-semester MVP** — a coherent vertical slice that fits the *real* build window of roughly five weeks.
- **Is extensible** — others can credibly keep building on it as the team grows.
- **Has a tractable stack** — technologies the team can justify and support; complexity only where it earns its keep.
- **Has room to grow** — others can join and build on it with the founder still leading, potentially into the capstone as its sponsor.

Proposals are scored on **value · feasibility · richness/breadth · scope realism · extensibility · maintainability · preparedness.** The criteria are one instance of the course's evaluation method: a different goal would use a different list, but the same move — decide what "good" means, score candidates deliberately, weigh value against effort, pressure-test with feedback, and commit with a defensible rationale.


## Semester map

Fall 2026 runs **27 sessions**. The term opens on two isolated Wednesdays (Sep 2 and Sep 9, with Labor Day intervening), and there is no class Wed, Nov 25 (Thanksgiving); the design's 14 weeks are remapped onto the real calendar with no checkpoint lost.

| Wk | Dates | Focus | Due |
|:--|:--------|:--------------------------------------------------------------|:-----------------------|
| 1 | Sep 2, 9 | What makes a project worth founding: studio model, CPS arc, founder mindset, selection criteria; divergent **problem-space** workshop — needs and users, not solutions | Idea journal started |
| 2 | Sep 14, 16 | Open source, licensing, and governance basics; discovery workshop — interviewing, good vs. leading questions, honest personas, consent/ethics | — |
| 3 | Sep 21, 23 | Feasibility and risk categories; self-directed learning and the learning plan; convergence workshop — score ideas against the criteria and pick 1–2 | Discovery Notes and License/OSS response (Sep 21); **CP1 Idea Briefs** (Sep 23) |
| 4 | Sep 28, 30 | Proposal anatomy; arguing feasibility without overpromising; strong vs. weak proposals dissected; peer review of scope and risk; scope-narrowing clinic | **CP2 Product Definition Brief** (Sep 28); proposal draft marked up in class (Sep 30) |
| 5 | Oct 5, 7 | Pitch craft and slide design; the proposal-evaluation rubric and constructive critique; **Pitch Day** — persuade, recruit, peer scoring, selection, ranked preferences | **CP3 Written Proposal** (Oct 5); **CP4 Pitch #1** (Oct 7) |
| 6 | Oct 12, 14 | **Teams announced**; design documents in software engineering; appropriate detail vs. over-specification; architecture and data-flow diagram workshop on the team's project | Team Charter written in class (Oct 12); design doc draft (Oct 14) |
| 7 | Oct 19, 21 | Core git and a **maintainer-centered** workflow (branch → logical commits → PR → review → merge); commit-message critique; hands-on branch/merge/PR lab on the team repo | **CP5 Design Document** + **CP6 Git Workflow Lab** (Oct 21) |
| 8 | Oct 26, 28 | Strong vs. weak repo infrastructure; license clinic; anatomy of a good issue and bug report; workshop to build repo scaffolding, templates, and onboarding docs | **CP7 Infrastructure Package** (Oct 28); CP9 portfolio opens |
| 9 | Nov 2, 4 | Turning proposal and design into epics, milestones, and issues; estimation, sequencing, definition of done; contribution pathways for newcomers; planning the vertical slice | **CP8 Project Plan & Roadmap** (Nov 4) |
| 10 | Nov 9, 11 | Prototypes and MVPs: vertical slice vs. broad-shallow, what v1 must *prove*, systematic debugging; prototype-plan review and studio build time | MVP Plan (Nov 11) |
| 11 | Nov 16, 18 | Studio: scope and direction troubleshooting; progress demos in small groups; **instructor + peer repo audit / onboarding test** | **CP9 Tech-Comm Portfolio** + **CP10 Progress Demo & Repo Audit** (Nov 18) |
| 12 | Nov 23 | Contributor-readiness checklist; what a new contributor actually needs; known-issues and technical-debt logs *(Nov 25 — no class)* | — |
| 13 | Nov 30, Dec 2 | Honest retrospective writing; framing future work without overselling; studio to assemble the launch package | **CP11 Launch Package + Retrospective** (Dec 2) |
| 14 | Dec 7, 9 | Demo dry-run with peer feedback; tightening the three final questions; final studio and repo cleanup | Launch package submitted (Dec 9) |
| Finals | Mon, Dec 14 | **Final Pitch + Demo Day** — 7:00–10:00 AM, capstone faculty invited | **CP12 Final Pitch + Demo** |

*A full session-by-session schedule with dates, in-class activities, and readings is maintained separately.*


## Checkpoints and deliverables

Twelve graded checkpoints build toward the culminating artifact. CP1–CP4 are individual; CP5 onward are team (or solo), with CP9 assessed individually. Three smaller completion-graded deliverables support them.

| # | Deliverable | Ind./Team | What it contains |
|---|---|---|---|
| 1 | **Idea Briefs** | Individual | Three one-page candidate concepts — problem, user, value, likely risks, possible MVP direction |
| 2 | **Product Definition Brief** | Individual | Target users, how they were reached or modeled, prioritized needs, success criteria — a light PRD that maps onto the capstone's |
| 3 | **Written Proposal** | Individual | Problem and users, solution, core features, non-goals, technical approach, risks and mitigation, MVP, success criteria; drafted and revised through in-class review |
| 4 | **Pitch Presentation #1** | Individual | A 6–8 minute persuasive pitch that defends the idea and recruits teammates, plus structured evaluation of peers' pitches |
| 5 | **Design Document** | Team | System context, architecture, major components, data model, interface sketch, technology choices with rationale, risks and open questions, implementation plan |
| 6 | **Git Workflow Lab** | Team | Demonstrated branch / commit / PR / review / merge workflow on the team repo, with the team's own git standards set |
| 7 | **Project Infrastructure Package** | Team | README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, issue and PR templates, setup and onboarding guide, communication and maintainer norms |
| 8 | **Project Plan & Roadmap** | Team | Milestones, prioritized backlog, feature breakdown, labels, definition of done, roadmap beyond this semester, tagged starter tasks |
| 9 | **Technical Communication Portfolio** | Individual | Two bug reports, a feature request, a PR description, two review comments, two responses to feedback — graded on quality, not completion |
| 10 | **MVP → Progress Demo + Repo Audit** | Team | A working vertical slice demoed live, plus a peer/instructor onboarding test: can a stranger clone, build, run, and find where a new feature would go? |
| 11 | **Launch & Onboarding Package + Retrospective** | Team | Architecture overview, setup verification, roadmap, known issues, technical-debt log, contributor onboarding guide, honest retrospective |
| 12 | **Final Pitch + Demo** | Team | The mastery artifact, defended at Demo Day |
| — | *Discovery Notes · License/OSS short response · Team Charter (started in class Oct 12, due Oct 14) · MVP Plan* | Mixed | Completion-graded supports feeding CP2, CP5, and CP10 |

**The culminating experience.** A **launched open-source project, defended at Demo Day**: a working MVP that proves core viability, an open-source-ready repository with full governance and onboarding documentation, a Launch & Onboarding Package, and a final pitch and live demo before an audience that includes capstone faculty. The demo answers the three questions the whole semester builds toward — **What need does this serve? What has been built? Where does it go next, and how can others join you in building it?**

**Required repository artifacts.** Every project repo carries, at minimum: `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`, and `docs/` files for product definition, architecture, onboarding, roadmap, known issues, communication norms, and definition of done. Every project uses git with pull requests (even solo), maintains an issue backlog and milestone plan, and produces a working demo, however narrow.


## Assessment

Grading emphasizes **process and founding artifacts, not the prototype alone.** A project with strong code but missing discovery, documentation, or governance should not earn top marks.

| Component | Weight |
|---|---|
| **Discovery** — CP1 Idea Briefs + CP2 Product Definition Brief | 10% |
| CP3 Written Proposal | 12% |
| CP4 Pitch Presentation #1 | 8% |
| CP5 Design Document | 12% |
| CP7 Project Infrastructure Package | 12% |
| **Git + Technical Communication** — CP6 Git Workflow Lab + CP9 Portfolio | 12% |
| CP8 Project Plan & Roadmap | 8% |
| CP10 MVP / Prototype (MVP Plan, Progress Demo, Repo Audit) | 16% |
| **Final** — CP11 Launch Package + Retrospective + CP12 Final Pitch & Demo | 10% |
| **Total** | **100%** |

Each checkpoint is scored on a published **100-point analytic rubric** — four levels (Exemplary / Proficient / Developing / Beginning) across weighted criteria — handed out with the assignment, so students know the criteria before they write. Completion-graded deliverables are credit/no-credit and can cap the related checkpoint if missing.

**Pass conditions.** To pass, a student must complete — at least at the *Developing* level on every rubric criterion — the discovery brief, written proposal, pitch, design document, infrastructure package, MVP, and final presentation. Strong code cannot compensate for a missing founding artifact.

**Team and individual accountability.** From Week 6, shared team artifacts receive a **team grade adjusted by individual-contribution evidence** from three streams: git/PR/issue-tracker history, each student's contribution log, and confidential peer evaluations at midpoint and end of term. The individual multiplier **defaults to 1.00** and moves only within a narrow band, in documented cases of sustained non-contribution or exceptional carry — never on peer numbers alone. Peer evaluation is taught and graded as a skill, is confidential, and is governed by a no-retaliation norm. Solo students are graded on the same artifacts at one-person scope.

**Revision.** Engineering iteration is the point, so the major artifacts — proposal, design document, infrastructure package — may be revised after feedback within a defined window, and several rubrics reward visible evidence of revision directly.


## What a student leaves with

- A **defensible written and oral case** for a project: evidence of a real need, a scoped product, and an argued feasibility position.
- A **working MVP** — a vertical slice that proves the project's core claim, honestly documented as to what it does and does not yet do.
- An **open-source-ready repository**: license, governance, contribution guidelines, templates, onboarding docs, and an issue backlog with starter tasks for newcomers.
- A **roadmap and launch package** that lets others join and keep building — with the founder still leading.
- A portfolio of **professional technical communication** — proposals, a design document, issues, reviews, and PRs — plus a public repository to show employers.
- A transferable habit of **evaluating ideas against explicit criteria and committing with a rationale**, exercised at rising stakes all semester.


## Course materials and supports

All readings are free and linked; there is no textbook purchase. Beyond the lecture sessions, the course provides a developed set of student-facing materials, including:

- **Discovery and ethics** — a needfinding summary, good-vs-leading question guidance, interview prompt cards, an interview-ethics guide grounded in BYU IRB guidance, and persona templates with honest and fabricated worked examples.
- **Evaluation and feasibility** — an idea-scoring sheet against the selection criteria, a feasibility and risk worksheet, a learning-plan template, a pitch-evaluation sheet, and a peer-evaluation form.
- **Writing and proposals** — a proposal-anatomy reading, a printable proposal-outline worksheet, a PRD reference, a spikes reading, and paired strong/weak sample proposals of the *same* project for in-class dissection.
- **Open source** — a license cheat sheet and repository-infrastructure exemplars.
- **Creative Problem Solving** — an assigned handbook excerpt (linked, freely hosted) supporting the divergent/convergent spine.

Each of the seventeen assignments is distributed as a full handout: why the assignment exists, what to produce, requirements and constraints, the complete grading rubric, common pitfalls, and submission instructions.


## Notes for faculty

- **First iteration, taught standalone.** The course is designed to feed the capstone but does not depend on it. Projects that prove out become capstone seeds; the founder can carry the project forward as its sponsor.
- **Demo Day is the evaluation point.** The 3-hour finals-week block (**Mon, Dec 14, 7:00–10:00 AM**) is where capstone faculty are invited to observe and judge which projects to carry forward.
- **Enrollment-sensitive elements.** Team count is emergent, and both Pitch Day and Demo Day are the tightest time-boxed sessions — pitch length and format scale with class size.
- **Anchor sessions.** Pitch Day (Oct 7), Progress Demo + Repo Audit (Nov 18), and Demo Day (Dec 14) are attendance-required; the rest of the studio runs on regular participation.
- **Companion documents.** The full course design document (outcomes, weekly plan, assessment, selection criteria, policies), the session-by-session schedule, the syllabus, and the complete rubric set are maintained alongside this summary.


*CS 301R — Software Engineering Studio I: Founding an Open-Source Project · BYU Department of Computer Science · Dr. Tom Stephens*
