# CS 301R — Software Engineering Studio I: Founding an Open-Source Project

*Project Conception, Discovery, Proposal, and Project Foundation*

**Draft v3 — synthesized course plan.** This version merges the original ChatGPT/Codex draft
(v1), the module crosswalk from the 2025–2026 open-source-project-course (v2), the summary
document, the three-semester *Software Engineering Studio* program spec (`product.md`), and the
faculty email thread (Sillito/Jensen/Wilkerson/Stephens, Apr–May 2026). It is framed in the CTL
course-development terminology requested by Lee Jensen: **course description → learning outcomes →
culminating experience (mastery artifact) → checkpoints → weekly actions.**

---

## 1. Course Identity and Positioning

**Working title:** Software Engineering Studio I — Founding an Open-Source Project
**Current number:** CS 301R (special topics, Fall 2026). **Eventual number:** CS 380, first course of
the three-semester Software Engineering Studio sequence (380 → 480 → 481).

**Role in the program.** This is the *prototype* first semester of the planned three-semester
Software Engineering Studio. **For this first iteration it is taught as a standalone course**, not yet
formally wired into the sequence. Projects that come out of it *may* feed the following semester's
capstone (currently 4–5 person teams, not the eventual ~50-person cohort), and the course is designed
so that the **student who leads a project here can carry it forward as the project's "sponsor"/product
owner in the capstone** — replacing today's model where faculty recruit external sponsors who "hire" a
capstone team. Understanding a real user need deeply enough to own that sponsor role is therefore a
central job of this course.

**Dual audience.** The course must stand on its own for the **general CS student** who simply wants to
learn how to create and run an open-source software project, *and* serve as the **on-ramp to the
capstone** for students who want to take a project further. The design below serves both: every student
finishes with a real, launched project; the strongest become capstone seeds.

**Credit and load.**
- 3 credit hours, 14 weeks.
- Two 75-minute sessions per week (Monday/Wednesday). We are not obligated to use the full block every
  session — many Wednesdays release early into studio/team work.
- Expected total student time: **~10 hours/week** (≈2.5 hrs in class + ≈7.5 hrs outside).
- A **final presentation / demo day** is held in a separate **3-hour finals-week block** (outside the
  14 weeks).

**Catalog description (draft, CTL/AIMs-aligned).**
> Introduces the practices required to conceive, justify, and found a multi-semester, open-source
> software project. Working individually and then in small teams, students discover a real user need,
> scope a product, write proposal and design documentation, set up an open-source-ready repository with
> the governance and processes future contributors need, and build an initial MVP/prototype. Topics
> include product discovery and needfinding, feasibility and scope analysis, software design documents,
> git-based collaboration, technical communication, open-source licensing and governance, issue and
> pull-request workflows, and early-stage project management. Emphasizes engineering judgment, technical
> communication, and building software that serves a real need and that others can inherit and extend.

---

## 2. Course Purpose

This course moves students from *"building assignments"* to *"founding a software project."* Most prior
coursework hands students a problem; here they must **find a problem worth solving, prove it is worth
solving, and lay a foundation other people can build on.**

The product we are steering toward is not a particular technology stack but a particular *shape*: a
**product that serves a real need for a real userbase, with enough surface area across many disciplines
— design, architecture, data handling, user interface, infrastructure, operations — that it could
eventually occupy a large, multi-disciplinary team.** Web/service applications are the common vehicle and
the recommended default, but the thing being selected for is *richness and real-world relevance*, not the
architecture. For this first iteration, **smaller-scope and solo projects are explicitly supported** as
well; the large multi-faceted product is the north-star exemplar, not a hard floor.

The course deliberately does **not** try to cover all of software engineering. It focuses on the subset
most necessary for **founding a project that serves real users and that others can continue**:

- product discovery, needfinding, and proposal writing
- feasibility and scope analysis; MVP thinking
- git and maintainer-centered collaboration workflows
- open-source setup, licensing, and governance
- issue tracking, triage, and project planning
- technical communication and review etiquette
- initial architecture, documentation, and handoff readiness

**The core lens.** The 2025–2026 course was built around *joining* an existing open-source project. This
course **inverts that perspective** — from *contributor* to *founder/maintainer*; from *learning a
project's norms* to *writing them*; from *finding contribution opportunities* to *creating contribution
pathways for future teams.* Every borrowed module is re-aimed through that lens.

---

## 3. Pedagogical Model

**Studio + workshop, not lecture-heavy.** Each week pairs a teaching session with a working session:

- **Monday (Session A):** short lecture + worked examples + guided discussion/critique.
- **Wednesday (Session B):** workshop, lab, peer review, demo, or studio work — often released early so
  teams work with the instructor available as a coach.

This supports the repeated cycle the course depends on: **draft → review → revise → implement → reflect.**

**The Creative Problem Solving (CPS) spine.** Following the Osborn–Parnes Creative Problem Solving model
(divergent then convergent thinking at each stage), the semester is organized into five phases. This
gives the course a coherent arc and directly implements the "consider many problems, explore solutions,
evaluate options, then select a small number to carry forward" process the faculty discussed.

| Phase | Weeks | CPS emphasis | Result |
|---|---|---|---|
| 1. Clarify & Explore | 1–3 | Understand the mess; gather data; frame problems & users | Defined opportunity + Product Definition Brief |
| 2. Ideate & Pitch → Teams | 4–5 | Diverge on ideas, then converge; persuade & select | Proposal, Pitch #1, **teams form** |
| 3. Develop & Design | 6–8 | Strengthen the chosen solution; design the system & the project | Design Doc + Infrastructure Package |
| 4. Implement & Build | 9–12 | Plan and build a vertical slice; manage the work | Project Plan + MVP + Repo Audit |
| 5. Launch & Reflect | 13–14 (+ finals) | Integrate, harden for handoff, reflect, present | Launch Package + Final Demo |

**The project model (individual → team, with a solo option).**
- **Weeks 1–5 are individual.** Every student explores problems, does discovery, writes a proposal, and
  pitches an idea. The pitch is persuasive: students are recruiting classmates.
- **A selection checkpoint (Week 5)** winnows the field. Selection is a **blend**: peers evaluate and give
  feedback on each other's ideas (idea evaluation and constructive critique are themselves graded skills),
  authors pitch to attract teammates, and the **instructor provides input and has final say** on which
  ideas are rich and feasible enough to anchor a team.
- **Teams form around the surviving ideas.** Team count is **emergent** (depends on enrollment and which
  ideas attract people); typical teams are ~2–4. **A student may instead continue solo** as a "team of
  one" on a necessarily smaller-scope project. No student's idea is killed out from under them.
- **Weeks 6–14 are team-based** (or solo): the team carries the project through design, repo foundation,
  MVP, and handoff.

**Real users — ideal, with a first-iteration substitute.** Because the project lead becomes the capstone
sponsor/customer-voice, **understanding real users is the goal**: identify users → understand their needs →
involve them in shaping the design. Students are strongly encouraged to talk to real people, and faculty
will seed candidate partners (e.g., via alumni outreach before the term). **For this first iteration,
persona/proxy-based needfinding is an acceptable substitute** where real access isn't available, as long
as the reasoning is documented honestly.

**AI tooling — available, not central.** AI assistants (e.g., Claude Code) are permitted as tools for
prototyping, learning new technologies, and drafting. **The course's emphasis, however, is on students
reasoning and building the understanding themselves.** AI is not a topic of the course and not a
centerpiece; see the AI policy in §11.

---

## 4. Learning Outcomes (Mastery Targets)

By the end of the course, a student can:

1. **Discover and define a real opportunity** — identify a target user/userbase, investigate their needs
   (through real interviews where possible, or documented persona/proxy needfinding), and articulate the
   problem, goals, non-goals, and success criteria.
2. **Evaluate feasibility and scope** — analyze technical risk, breadth, dependencies, and
   maintainability, and reduce an ambitious vision to an MVP achievable in one semester while preserving a
   path for a larger future team.
3. **Propose and pitch persuasively** — produce a written proposal and defend it in an oral pitch that is
   clear, persuasive, and responsive to critique.
4. **Design a system and a project** — write a design document (architecture, components, data, interfaces,
   technology choices, rationale, risks) and revise it in response to feedback.
5. **Found an open-source-ready project** — select and justify a license; establish repository structure,
   contribution guidelines, code of conduct, issue/PR templates, onboarding docs, and governance norms.
6. **Use core git and collaboration workflows** — branch, commit, review, and merge with a
   maintainer-centered workflow; write reviewable PRs and useful commit messages.
7. **Communicate professionally in engineering contexts** — write and respond to issues, bug reports,
   feature requests, code reviews, and PRs with precision and professionalism.
8. **Plan, build, and hand off** — break work into milestones/issues, build an MVP that proves project
   viability, and produce a handoff package (with retrospective) that a future team can inherit.

*(Eight outcomes, within the CTL-recommended 5–8 range. If the sequence later requires shared outcomes
across 380/480/481, these can be aligned to the common set.)*

---

## 5. Culminating Experience (Mastery Artifact)

**The culminating experience is a launched open-source project, defended at a public demo day.** Each team
(or solo student) finishes with:

- a **working MVP / initial prototype** that proves the project's core viability,
- an **open-source-ready repository** with full governance and onboarding documentation,
- a **handoff/launch package** (roadmap, known issues, technical-debt notes, architecture overview,
  retrospective), and
- a **final pitch + demo** delivered during a **3-hour finals-week block, with capstone faculty invited**
  so they can judge which projects to carry forward.

This single artifact integrates every outcome and is what distinguishes a passing student: not strong code
alone, but a *founded, defensible, inheritable project.*

---

## 6. Checkpoints (Deliverable Sequence)

Each checkpoint is a graded milestone that builds toward the culminating artifact. Checkpoints 1–4 are
**individual**; 5 onward are **team** (or solo).

| # | Checkpoint | Phase / Week | Builds toward |
|---|---|---|---|
| 1 | **Idea Briefs** (3 candidate ideas) | Clarify · Wk 1–3 | Divergent exploration |
| 2 | **Product Definition Brief** (users, needs, success criteria) | Clarify · Wk 3 | Discovery / sponsor knowledge |
| 3 | **Written Proposal** | Ideate · Wk 4 | Feasibility + product case |
| 4 | **Pitch Presentation #1** (persuade + recruit) | Ideate · Wk 5 | Selection + team formation |
| 5 | **Design Document** | Develop · Wk 6–7 | Architecture & plan |
| 6 | **Git Workflow Lab** | Develop · Wk 7 | Collaboration mechanics |
| 7 | **Project Infrastructure Package** | Develop · Wk 8 | Open-source foundation |
| 8 | **Project Plan & Roadmap** | Implement · Wk 9 | Work breakdown & future pathways |
| 9 | **Technical Communication Portfolio** | Implement · Wk 8–11 | Issues, reviews, PRs |
| 10 | **MVP Plan → Progress Demo + Repo Audit** | Implement · Wk 10–11 | Vertical slice & buildability |
| 11 | **Handoff/Launch Package + Retrospective** | Launch · Wk 12–14 | Inheritability |
| 12 | **Final Pitch + Demo (Mastery Artifact)** | Finals week | Culminating defense |

---

## 7. Weekly Plan (Weekly Actions)

Each week lists topics, in-class actions (Session A = Monday, Session B = Wednesday), outside-of-class work
(~7.5 hrs), and the deliverable. Modules adapted from the 2025–2026 course are noted in *[brackets]*.

### Phase 1 — Clarify & Explore (Weeks 1–3)

#### Week 1 — What makes a project worth founding?
**Topics:** course structure, the studio model, and the CPS arc; the founder/maintainer mindset (vs. the
contributor mindset); what makes a *rich, real-need, inheritable* project; the project "shape" we steer
toward; project selection criteria; how the sponsor-for-the-capstone idea works. *[adapts: Creative
Problem Solving]*
- **Session A:** course overview; examples of good vs. weak project ideas; introduce the selection
  criteria (§9); introduce CPS (divergent/convergent).
- **Session B:** divergent **problem-space** workshop — brainstorm *needs and users*, not solutions yet;
  practice deferring judgment; start an idea journal.
- **Outside:** explore problem areas; talk to or observe potential users; draft notes on 4–6 candidate
  problem spaces.
- **Deliverable:** start **Idea Briefs** (problem journal); short reflection on "what makes a project
  worth a multi-semester life."

#### Week 2 — Open source, licensing, and discovery
**Topics:** the open-source model and why we build in the open; licenses and their practical implications;
governance basics; the lead-as-sponsor model; **needfinding/discovery methods** — interviews, observation,
and (where real access is limited) disciplined persona/proxy construction. *[adapts: Introduction to Open
Source; Creative Problem Solving]*
- **Session A:** OSS model + license comparison; what governance choices a founder must make (visibility,
  code of conduct, maintainer expectations, communication channels).
- **Session B:** discovery workshop — how to interview a user, write good questions, avoid leading;
  how to build an honest persona when you can't reach a real user; consent/ethics basics.
- **Outside:** conduct 1–3 discovery conversations *or* build documented personas/proxies; capture needs.
- **Deliverable:** discovery notes; a **license/OSS-literacy short response** (which license fits the kind
  of project you're imagining, and why).

#### Week 3 — Feasibility, self-directed learning, and the Product Definition Brief
**Topics:** technical feasibility and risk categories (technical, schedule, dependency, skill, adoption,
maintenance); breadth/richness assessment; self-directed learning and tech-stack discipline; using AI
responsibly as a *learning* aid while building your own understanding. Convergent step: narrow to defined
opportunities. *[adapts: Learning to Learn; Investigating Code]*
- **Session A:** feasibility analysis; "what must I already know vs. learn vs. avoid"; a learning-plan
  template; richness check (does this exercise multiple engineering dimensions?).
- **Session B:** convergence workshop — score candidate ideas against the selection criteria; instructor
  and peer feedback; pick the 1–2 to carry into proposals.
- **Outside:** finalize the discovery synthesis; write the brief.
- **Deliverable:** **Checkpoint 1 — Idea Briefs** (three 1-page concepts) and **Checkpoint 2 — Product
  Definition Brief** (target users, how you reached/modeled them, prioritized needs, success criteria; a
  light, general-student-friendly PRD that maps onto the capstone's PRD).

### Phase 2 — Ideate & Pitch → Form Teams (Weeks 4–5)

#### Week 4 — Proposal writing and technical communication
**Topics:** what belongs in a software proposal; arguing feasibility without overpromising; technical
communication as project infrastructure (audience, clarity, revision); proposal anatomy. *[adapts:
Technical Communication]*
- **Session A:** proposal structure (executive summary, problem & users, solution, core features,
  non-goals, technical approach, risks & mitigation, MVP, success criteria); dissect strong vs. weak
  examples.
- **Session B:** peer review of proposal scope and risk sections; scope-narrowing clinic.
- **Outside:** research stack/dependencies; write the proposal.
- **Deliverable:** **Checkpoint 3 — Written Proposal** (individual).

#### Week 5 — Pitch, evaluate, select, and form teams
**Topics:** oral pitch craft and persuasion; slide design for technical pitches; defending tradeoffs and
answering questions; **evaluating others' proposals** for feasibility, richness, and completeness; how
selection and team formation will work. *[adapts: Technical Communication → oral]*
- **Session A:** pitch workshop; rubric for evaluating proposals; how to give constructive critique.
- **Session B (the hinge of the course):** **Pitch Presentation #1** — each student delivers a 6–8 minute
  persuasive pitch (defend the idea *and* recruit teammates); structured peer evaluation + scoring;
  instructor input.
- **Selection checkpoint:** blended decision (peer scores + author recruiting + instructor final say)
  surfaces the ideas that will anchor teams. Students coalesce into small teams (emergent count, ~2–4) or
  elect a solo path.
- **Outside:** revise proposal into a **team** proposal (or solo) based on feedback; agree on team norms.
- **Deliverable:** **Checkpoint 4 — Pitch Presentation #1**; team formation + a one-page team charter
  (roles, communication norms, decision-making).

### Phase 3 — Develop & Design (Weeks 6–8)

#### Week 6 — Designing the system
**Topics:** design documents in software engineering; architecture at a 300-level (components, interfaces,
data, dependencies, external services); design tradeoffs and rationale; documenting assumptions; designing
a codebase *so a future team can investigate it.* *[adapts: Technical Communication; Investigating Code]*
- **Session A:** read and dissect a sample design doc; appropriate detail vs. over-specification.
- **Session B:** architecture & data-flow diagram workshop on the team's project.
- **Outside:** draft the design doc and diagrams; revisit feasibility with the team's combined skills.
- **Deliverable:** **Design Document Draft** (system context, architecture overview, major components,
  data model/entities, interface sketch, technology choices + rationale, risks/open questions,
  implementation plan).

#### Week 7 — Git and maintainer-centered collaboration
**Topics:** core git (clone, branch, commit, merge, conflict basics; optional worktrees/rebase); a
**maintainer-centered** workflow (not fork-and-upstream): create branch → logical commits → draft PR →
request review → revise → merge under project policy; commit-message and branch-naming conventions; PR
templates and review checklists; "ready for review" and "done." *[adapts: Managing Code & Code Review]*
- **Session A:** live git workflow walkthrough; commit-message critique.
- **Session B:** hands-on branch/merge/PR lab on the team repo; set the team's git standards.
- **Outside:** finalize the Design Document; begin enforcing the workflow on the project repo.
- **Deliverable:** **Checkpoint 5 — Design Document** (revised); **Checkpoint 6 — Git Workflow Lab.**

#### Week 8 — Open-source setup and governance
**Topics:** structuring a repo for contribution; README as onboarding document; LICENSE, CONTRIBUTING,
CODE_OF_CONDUCT; issue/PR templates; communication channels and maintainer expectations. Also: **writing
good issues, bug reports, and feature requests** as a founder defining the project's reporting norms.
*[adapts: Introduction to Open Source; Bug Reporting & Triage]*
- **Session A:** compare repos with strong vs. weak project infrastructure; license selection clinic;
  anatomy of a good issue/bug report (defect/fault/failure, reproduction, expected vs. actual).
- **Session B:** workshop — build repo scaffolding and templates; draft onboarding docs.
- **Outside:** complete the infrastructure package; file 2–3 sample/seed issues on your own repo.
- **Deliverable:** **Checkpoint 7 — Project Infrastructure Package** (README, LICENSE, CONTRIBUTING,
  CODE_OF_CONDUCT, issue + PR templates, setup/onboarding guide, communication/maintainer norms).
  *Start the Technical Communication Portfolio here.*

### Phase 4 — Implement & Build (Weeks 9–12)

#### Week 9 — Project management and roadmap
**Topics:** work breakdown and feature decomposition; estimation and prioritization; milestones and
project boards; definition of "done"; managing dependencies/blockers; **creating contribution pathways for
future teams** (good-first-issues, labels, roadmap). *[adapts: Bug Reporting; Managing Code; Technical
Communication]*
- **Session A:** turn the proposal/design into epics, milestones, and issues; build board categories.
- **Session B:** estimation & sequencing practice; plan the vertical slice for the MVP.
- **Outside:** populate the issue tracker and roadmap; tag starter tasks for future contributors.
- **Deliverable:** **Checkpoint 8 — Project Plan & Roadmap** (milestones, prioritized backlog, feature
  breakdown, labels, definition-of-done, roadmap into a future semester).

#### Week 10 — Prototyping and the MVP
**Topics:** purpose of prototypes (throwaway vs. evolutionary); vertical slice vs. broad-shallow; choosing
what v1 must *prove*; instrumenting learning; systematic debugging (hypothesis → evidence → isolate → fix)
tied to the team's own prototype; capturing known limitations. *[adapts: Debugging Tools & Techniques —
supporting module]*
- **Session A:** evaluate example MVPs; "what must v1 prove?" workshop; debugging reasoning model.
- **Session B:** prototype-plan review; studio build time.
- **Outside:** begin/intensify implementation; define acceptance criteria for v1.
- **Deliverable:** **MVP Plan** (what's in, what's deferred, what technical risk it addresses, demo plan).

#### Week 11 — Studio: build, demo, and repo audit
**Topics:** minimal lecture; studio critique; **peer onboarding/repo audit** (can a classmate clone, build,
run, find entry points, and locate where a new feature would go?). *[adapts: Investigating Code]*
- **Session A:** short check-in; troubleshooting scope and technical direction.
- **Session B:** progress demos in small groups; **instructor + peer repo audit / onboarding test.**
- **Outside:** continue implementation; fix process/documentation gaps surfaced in the audit; advance the
  communication portfolio (file issues on peer repos, respond to review).
- **Deliverable:** **Checkpoint 10 — Progress Demo + Repo Audit**; **Checkpoint 9 — Technical
  Communication Portfolio** (2 bug reports, 1 feature request, 1 PR description, 2 review comments, 2
  responses to feedback — graded on quality, not completion).

#### Week 12 — Quality, maintainability, and handoff readiness
**Topics:** making a project understandable to strangers; light testing expectations for an MVP;
documentation quality; known-issues and technical-debt logs; planning continuity for a future team.
*[adapts: Investigating Code; Technical Communication]*
- **Session A:** handoff-readiness checklist; future-team needs.
- **Session B:** peer onboarding test round 2; studio time.
- **Outside:** improve docs; add basic tests where reasonable; write known-issues / future-work notes.
- **Deliverable:** **Handoff Readiness Package** draft (architecture overview, setup verification, roadmap,
  known issues, technical-debt log, onboarding guide for a future team).

### Phase 5 — Launch & Reflect (Weeks 13–14) + Finals Week

#### Week 13 — Integration and retrospective
**Topics:** finalizing the MVP and docs; honest retrospective writing; framing future work without
overselling; preparing the final pitch for an audience that includes capstone faculty. *[adapts: Technical
Communication; Learning to Learn]*
- **Session A:** retrospective prompts (what assumptions held, what the MVP validated, what a future team
  should tackle next); presentation framing.
- **Session B:** studio — assemble the launch package; draft the retrospective.
- **Outside:** finalize MVP; write the retrospective; draft final slides/demo.
- **Deliverable:** **Checkpoint 11 — Launch Package + Retrospective** (assembled).

#### Week 14 — Final studio and rehearsal
**Topics:** demo rehearsal and coaching; capstone-seed polish (extra handoff rigor for projects that want
to be carried forward). *[adapts: Technical Communication]*
- **Session A:** demo dry-run with peer feedback; tighten the three questions the final must answer
  (What need does this serve? What has been built? What can the next team credibly inherit?).
- **Session B:** final studio; repo/document cleanup; submit launch package.
- **Outside:** final polish.
- **Deliverable:** final launch package submitted; final presentation ready.

#### Finals Week — Final Pitch + Demo Day (Culminating Experience)
**3-hour block, capstone faculty invited.**
- Each team/solo delivers a final pitch + live demo (suggested ~8–10 min + Q&A, scaled to enrollment).
- Capstone faculty observe to make their own judgments about which projects to carry forward.
- **Deliverable:** **Checkpoint 12 — Final Pitch + Demo** (the mastery artifact, defended).

---

## 8. Assessment

Grading emphasizes **process and founding artifacts**, not the prototype alone — a project with strong code
but missing discovery, documentation, or governance should not earn top marks.

| Component | Weight |
|---|---|
| Idea Briefs + Product Definition Brief (discovery) | 10% |
| Written Proposal | 12% |
| Pitch Presentation #1 (defend + recruit) | 8% |
| Design Document | 12% |
| Project Infrastructure Package (OSS setup & governance) | 12% |
| Git Workflow Lab + Technical Communication Portfolio | 12% |
| Project Plan & Roadmap | 8% |
| MVP / Prototype (incl. MVP Plan, Progress Demo, Repo Audit) | 16% |
| Final Pitch + Demo + Launch Package + Retrospective | 10% |
| **Total** | **100%** |

**Pass conditions.** To pass, a student must complete, at a minimally competent level: the discovery
brief, the written proposal, the pitch, the design doc, the project infrastructure package, the MVP, and
the final presentation. This prevents compensating for missing founding artifacts with code alone.

**Team vs. individual accountability.** Weeks 1–5 are individually graded. For team work (Weeks 6–14),
shared artifacts receive a team grade adjusted by **individual contribution** evidence: per-student git
history/PRs, a contribution log, and confidential peer evaluations at midpoint and end. Solo students are
graded on the same artifacts at scope appropriate to one person.

**Revision policy.** Major artifacts (proposal, design doc, infrastructure package) may be revised after
feedback within a defined window — engineering iteration is the point.

---

## 9. Project Selection Criteria

Used by students for self-evaluation, by peers during Week-5 evaluation, and by the instructor for the
final-say selection. A strong project:

- **Serves a real need for a real (reachable) userbase** — not a toy or a purely self-serving tool.
- **Is rich / broad** — meaningfully exercises multiple engineering dimensions (design, architecture, data,
  UI, infrastructure, ops); *"could a multi-disciplinary team grow into this?"* (Smaller-scope solo
  projects are allowed this iteration, but richness is the north star.)
- **Is open-source-worthy** — appropriate to develop and release in the open.
- **Has a one-semester MVP** — a coherent vertical slice is achievable at ~10 hrs/week over 14 weeks.
- **Is extensible** — a future or larger team can credibly keep building it.
- **Has a tractable stack** — technologies the team can justify and support; complexity only where it earns
  its keep. *Web/service applications are the recommended default; other types allowed case-by-case.*
- **Has a handoff path** — could be inherited by a capstone team with the project's lead as sponsor.

Score proposals on: **value · feasibility · richness/breadth · scope realism · extensibility ·
maintainability · team/student preparedness.**

---

## 10. Required Repository Artifacts

Every project repo should contain, at minimum:

- `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`
- `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`
- `docs/product-definition.md` (users, needs, success criteria — the lead's sponsor knowledge)
- `docs/architecture.md`, `docs/onboarding.md`, `docs/roadmap.md`, `docs/known-issues.md`
- `docs/communication-norms.md`, `docs/definition-of-done.md`

Optional but encouraged: `docs/decision-log.md`, `docs/testing.md`, `docs/release-process.md`.

**Baseline process rules.** Every project uses git with pull requests (even solo); maintains an issue
backlog and milestone plan; documents setup/onboarding; includes a license and contribution process; uses
review workflows for at least some changes; and produces a working demo, however narrow.

---

## 11. Policies

**AI / tooling.** AI assistants (e.g., Claude Code) are permitted for brainstorming, learning new
technologies, drafting, and code assistance, **but the course's goal is for students to develop and
demonstrate their own understanding.** Students must be able to explain and defend anything they submit;
unexplained AI-generated work is treated like any other unverified contribution. Disclose substantial AI
use where it materially shaped an artifact. AI is a tool here, not a topic.

**Collaboration.** Weeks 1–5 are individual work. From Week 6, work is by team (or approved solo). Peer
review is required throughout even when implementation is divided. Team charters define internal roles and
norms.

**Process over code.** Founding artifacts (discovery, proposal, design, governance, handoff) are weighted
to prevent a "great prototype, no foundation" outcome from earning top marks.

**Use of real users.** Talking to real users is strongly encouraged and supported; persona/proxy
needfinding is acceptable this iteration when documented honestly. Any real-user engagement must follow
basic consent/ethics norms covered in Week 2.

---

## 12. Rubric Dimensions (summary)

- **Discovery / Product Definition:** clarity of users & needs; quality/honesty of needfinding; defensible
  success criteria.
- **Proposal:** problem clarity; user understanding; feasibility; scope realism; richness; quality of
  argument; evidence of revision.
- **Pitch:** clarity of problem/solution; persuasiveness; feasibility defense; handling of questions; slide
  quality; professional delivery — *plus* whether it successfully communicated the idea well enough to
  recruit.
- **Design Document:** architecture clarity; appropriate detail; rationale; risk awareness;
  implementability; readability for a future contributor.
- **Infrastructure Package:** completeness; newcomer usability; license appropriateness; professionalism;
  workflow consistency; future-team readiness.
- **Technical Communication:** tone; precision; actionability; completeness; responsiveness to feedback.
- **MVP / Prototype:** proves key claims; aligns with stated MVP; technical coherence; demo readiness;
  documentation; honesty about limitations.
- **Final / Handoff:** answers the three questions (need / built / inheritable); retrospective honesty;
  launch-package completeness.

---

## 13. Module Crosswalk (from the 2025–2026 open-source-project-course)

The prior course's strands (*creative, collaborative, curious, capable*, plus *introduction*) are reused
and re-aimed from a contributor lens to a founder lens:

| Prior module | Re-aimed as | Lands in |
|---|---|---|
| Creative Problem Solving | Project ideation, problem framing, MVP scoping (CPS spine) | Wks 1–5 |
| Introduction to Open Source & Licensing | Founding & governing your own OSS project | Wks 2, 8 |
| Learning to Learn | Self-directed learning + feasibility/stack discipline (AI as learning aid) | Wk 3 |
| Technical Communication | Proposals, design docs, oral pitches, onboarding, handoff (writing-revision loops) | Throughout |
| Managing Code & Code Review | Maintainer-centered git/PR/review workflow (not fork-and-upstream) | Wk 7 |
| Bug Reporting & Triage | Designing issue/reporting norms; contributor pathways | Wks 8–9 |
| Investigating Code | Designing a codebase others can investigate; repo/onboarding audit | Wks 6, 11–12 |
| Debugging Tools & Techniques *(supporting)* | Debugging your own MVP; known-issues capture | Wk 10 |

---

## 14. Open Questions / Notes for Next Revision

- **Outcome alignment:** if the program adopts shared outcomes across 380/480/481 (per Jensen/Sillito),
  reconcile §4 with that common set and add per-course focus statements.
- **Partner pipeline:** decide on the pre-term alumni/organization outreach to seed real users for the
  discovery strand.
- **Enrollment-dependent details:** final-presentation timing, number of teams, and demo length scale with
  class size (left emergent here).
- **Catalog logistics:** confirm the number/title for the catalog (301R now; CS 380 target) with Katie.
- **Possible future move:** as the sequence formalizes (2027/2028+), revisit whether to standardize on
  enterprise web applications and involve additional faculty (e.g., Mike Jones) for that emphasis.

---

*End of draft v3.*
