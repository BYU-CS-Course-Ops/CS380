# CS 428 Content vs. CS 380: Where It Would Land If CS 428 Is Dropped

*Analysis written Nov 2, 2026. The question is how to fold CS 428's material into the studio sequence (CS 380 → 480 → 481) or the other required courses (CS 240, 340, 329, 452) if CS 428 is dropped. Sources:*
- ***CS 428:** the course-materials folder, which holds the Sep 10, 2026 website capture (overview, calendar, coursework, readings and podcasts, extra credit), the 29 Winter 2024 lecture decks, and the weekly status-report template.*
- ***CS 380 today:** CS 301R as built for Fall 2026 (the 27 outlines and `canvas_material/`).*
- ***CS 380 v2:** the [CS 380 Course Design](https://leesjensen.com/sestudio/CS380-Course-Design.html) proposal: five 3-week blocks, Weeks 1A–15B.*
- ***Required courses:** the course repositories for CS 240 (`~/repos/softwareconstruction`), CS 340 (`~/repos/softwaredesign`), and CS 329 (`~/repos/devops`). CS 452 is described only from the program outline.*
- ***Full capstone:** the [SE Studio Program Outline](https://leesjensen.com/sestudio/SE%20Studio%20Program%20Outline.html): CS 380 → CS 480 → CS 481, the cross-cutting teams, and the parallel CS 329 / 452 / 348.*

*Companion to [`CS380-Proposal-Mapping.md`](CS380-Proposal-Mapping.md).*

**Legend:** ● taught as a topic · ◐ partial (practiced without being taught, or a narrower slice of it) · ○ absent

## What CS 428 is

CS 428 is a 3-credit course that meets once a week (Monday, 2:00–4:50). It has three strands:

1. **A reading canon, assessed by exam.**
   - The reading: *The Mythical Man-Month*, *Peopleware*, and Glass's *Facts and Fallacies*; Armour's "Five Orders of Ignorance"; Meier & Rechtin's "Heuristics for Systems Architecting"; and about 20 Webster essays.
   - Grading: readings 25%, Knutson podcasts 5%, and a 3-hour open-book, case-based midterm at 25%. The midterm answers must cite the readings, and a student must score at least 60% on it to pass the course.
2. **Teams run as small startup companies.**
   - Each team has an org chart with a PM and a chief architect, and keeps a public wiki.
   - Deliverables: requirements, PERT and Gantt charts, architecture and design, a test plan, and prototype, work-in-progress, and final demos (27%).
3. **Weekly status reports with billable hours** (10%), plus an individual code review and a post-mortem.

Its stated goals are the root causes of project success and failure, the SDLC, the sociology of software development, self-management in an "unfair and inherently ambiguous" environment, and managing orders of ignorance.

---

## Topic mapping

| CS 428 topic (source) | CS 380 today (301R) | CS 380 v2 proposal | Full capstone (380→480→481) | Required CS 240 / 340 / 329 | If CS 428 is dropped |
|---|---|---|---|---|---|
| **Foundations** | | | | | |
| Software as knowledge acquisition: the Five Orders of Ignorance (Armour) | ◐ The CPS diverge/converge spine, `[E]`/`[A]` evidence tagging, and spikes ("red is a win") all practice it. Armour isn't taught. | ◐ Outcome 2's "what is known and what remains uncertain"; 10A turns assumptions into hypotheses | ◐ The §1.1 Frame→Evaluate cycle | ○ | **The practice survives; the vocabulary is lost.** Armour's essay is a cheap reading to add to 301R S5 or v2 4A. |
| Why software is hard: the Tar Pit, No Silver Bullet (essence vs. accident), complexity (MMM 1, 16–17; F&F ch. 1) | ○ | ○ | ○ | ○ | **Lost** |
| Heuristics for systems architecting: scoping, partitioning, integrating, certifying (Meier & Rechtin) | ◐ S11 design-doc anatomy; S12 decisions and alternatives | ◐ 8B Explore Architecture; 13A Map Architecture | ● as practice: the Architecture & Integration team and the Technical Design Council | ◐ CS 340: design principles (the "Ten Design Commandments"), Clean Architecture layers, design patterns | **The practice is covered** (more fully than in 428). The heuristics themselves are lost. |
| **Project management** | | | | | |
| Brooks's law; the man-month; communication overhead; the Tower of Babel (MMM 2, 7) | ○ Teams of 1–4, so it never comes up | ◐ 13B Coordinate Teams (interfaces, dependencies, communication), taught as practice, not as the law | ◐ Lived at 50 people / 13 teams: council, escalation path, weekly rhythm | ○ | **The theory is lost**, and the capstone is exactly where students will run into it. |
| Conceptual integrity; aristocracy vs. democracy (MMM 4); Conway's law (Webster #2) | ◐ "You lead, others join"; the governance model (S15, CP7) | ◐ Faculty confirm architectural leads (15B); feature-team boundaries (13B) | ◐ The product steward; the Architecture team "intentionally small"; feature teams mapped to interfaces. That is Conway's law by design, but unnamed. | ○ | **Lost as concepts.** The 13-team org is built on both and never names either. |
| Second-system effect; plan to throw one away (MMM 5, 11) | ◐ Spikes; vertical slice vs. broad-shallow (S19); "boring stack" | ◐ 11A Probe Technology; throwaway prototypes | ○ | ○ | Partial (throwaway prototyping only) |
| Estimation, and estimation fallacies (F&F ch. 1 §3; Cost Estimation podcast; Parkinson's law) | ● Light: S18 t-shirt sizing, fit check, cut-to-fit; "the 10 × 14 = 140 hours" failure mode | ○ "Cost" appears only as a tradeoff in 9A | ○ Not mentioned | ○ | **Only today's 301R teaches it.** Lost under v2 + capstone unless 480's "plan iterations" picks it up. |
| Scheduling: PERT, Gantt, critical path | ◐ Milestones, sequencing, the board (S17–S18); no network scheduling | ○ | ◐ "Integration milestones" (Architecture team); bi-weekly integrated demos | ○ | **Formal scheduling and critical path are lost.** Critical-path thinking matters for 13-team integration. |
| Status reporting, billable hours; Thermocline of Truth; project metrics and metric gaming (Webster #2–3) | ◐ Contribution logs, board state, peer-eval multiplier; no status report | ◐ Team-meeting decisions and owners recorded in GitHub; block reflections | ◐ Mentoring log; release-readiness reports; "metrics" as Evaluate evidence | ◐ CS 329: system-health metrics and customer status pages; "gamification of testing" (gamed coverage targets). Nothing on reporting project status. | **Status-reporting discipline, and honest reporting upward, are lost.** |
| Risk management; runaway projects; "do not defer the difficult"; hatching a catastrophe (MMM 14; Webster #2, #5, #6) | ● S5 Feasibility & Risk worksheet; required spike graded in CP3; de-risk the top one or two | ● 9A, 10A, 12A | ● Risk statement, proofs of concept, escalation, release gates | ◐ CS 329: failure modes, chaos testing, recovery playbooks (operational risk only) | **Covered.** The failure-case literature (runaways, IT-litigation patterns) is lost. |
| Scope creep; specification drift (Webster #6) | ● Non-goals, cut-to-fit, scope narrowing (S8, S18) | ● 2B non-goals | ● MVP boundary; "smaller but safe" passes ahead | ○ | Covered |
| **Organization and people** | | | | | |
| Org charts and roles: PM, chief architect, test manager, etc. (Deliverable #2) | ◐ Roles in the Team Charter (small teams) | ● 13B leadership roles; 15B leads confirmed | ● §3–4 org chart; §7.3 leadership roles; §9 team roles | ○ | **Covered, and more fully than in 428.** |
| Productive environment: noise, flow, brain time vs. body time, the "furniture police" (Peopleware II) | ○ | ○ | ○ | ○ | **Lost** |
| Quality under pressure: "quality if time permits", overtime, Parkinson (Peopleware I) | ◐ Honest scope arithmetic | ○ | ◐ "Smaller but safe … should pass ahead" | ○ | Mostly lost |
| Hiring, retention, turnover; the Dead Sea Effect; goal alignment (Peopleware III; Webster #1, #5) | ◐ Recruiting contributors (the Pitch Day ask) | ○ | ○ Team placement only | ◐ CS 240: a job-interview lesson (being hired, not hiring) | **Lost** |
| Jelled teams, teamicide, team chemistry (Peopleware IV) | ◐ Team Charter; Working Agreements reading; peer evaluation | ◐ Team norms every block. Note that v2's team reshuffling every 3 weeks is itself a teamicide risk. | ◐ "Form balanced teams"; mentors coach retrospectives; belonging surveys | ○ | **The practice is partial; the theory is lost.** |
| Leadership; managing technical people (Peopleware 14–15; "Managing geeks") | ◐ The founder leads | ◐ Lead roles | ◐ Peer mentors "coach rather than manage" | ○ | Partial |
| Organizational politics and dysfunction: the politics of architecture, resistance, enlisting management, Westrum/*Accelerate* organization types, the Abilene paradox (Webster #6; last lecture) | ○ | ○ | ○ | ○ | **Lost** |
| **Lifecycle** | | | | | |
| Requirements (lecture; F&F ch. 2) | ● CP2; PRD-Reference | ● 8A, including quality goals | ● | ○ | Covered |
| Architecture and design document; quality goals that shape architecture | ● S11–S12; CP5 Design Document | ● 8B, 13A, 14B ADRs | ● | ● CS 340: Clean Architecture, layers, design patterns, UML modeling; CS 240: architectural phases of the Chess project | **Covered**, and more fully than in 428 (CS 340, CS 380 v2, the capstone) |
| SQA and the test plan (Inside-Out SQA lifecycle; Deliverable #6) | ◐ Testing floor (CP10 Exemplary, CP11 floor); definition of done. No test plan. | ● 14A Plan Quality; CP4 validation test plan | ● 480 Wk 1–3 test strategy and release criteria; QA team; CS 329 | ● CS 329: testing categories, TDD, coverage, CI, release evidence | **Covered downstream** |
| Testing fundamentals: V&V, white-box and black-box (Knutson podcasts I–V) | ○ Left to CS 240 (unit testing, code coverage) | ○ | ● CS 329 QA and DevOps (required): test automation and release evidence; feature teams own unit tests | ● CS 329: black-box and white-box, unit through penetration testing; CS 240: unit testing, coverage; CS 340: mocks and spies | **Covered** in CS 329, CS 240, and CS 340 |
| Reviews and inspections; the individual code-review deliverable (F&F ch. 2 §6) | ● PR review (S13–S14); Review Protocol; CP9 review comments | ● PRs from 1A; peer review every block | ● PR review; design reviews | ○ No inspection instruction | **Covered.** Formal (Fagan) inspection is lost, which is minor. |
| Maintenance, technical debt, septic code, maintenance architect, keeping technology lifecycles in sync (F&F ch. 2 §7; Webster #4, #5, #7) | ◐ Known-issues and tech-debt log (CP11); contributor-readiness | ○ A design-only course | ● CS 481 maintainership, monitoring, support, technical debt | ◐ CS 240: quality code and refactoring; CS 340: designing for change (open-closed, dependency inversion) | **Covered, two semesters later.** Lifecycle planning (platform obsolescence) is lost. |
| Process models and process improvement: XP, the Spotify culture videos (Knutson podcasts) | ◐ PR workflow, board, iterative build; models not surveyed | ◐ The iterative block template | ◐ Iterations, stage gates, bi-weekly cadence, "squad coaches" | ◐ CS 329: history from Agile to DevOps, SRE, and platform engineering; CS 240: TDD's origins in XP | **The comparison of process models is lost.** CS 329 tells the history, and students live one process, but they never weigh one model against another. |
| Configuration management | ● CP6 git workflow lab; branching; tags (S13–S14) | ◐ 1A repo, branches, PRs | ● 480 Wk 1–3 CI/CD; CS 329 | ● CS 240: git; CS 329: versioning, merge conflicts, GitHub Actions, releases | Covered |
| Coding style; refactoring (podcasts) | ○ Left to CS 240 | ○ | ◐ Implicit in 480 | ● CS 240: quality code, style checker, refactoring | **Covered in CS 240** (quality code, style checker, refactoring) |
| Safety-critical systems (podcast) | ○ | ◐ 5A constraints; 11B Protect Data | ◐ "Humanitarian safety takes priority"; Security/Privacy team | ◐ CS 329: failure, chaos testing, self-healing, recovery (reliability, not safety) | Partial |
| **Technology adoption** | | | | | |
| Hype and fallacies: adopting technology for the wrong reason, buzzwords vs. concepts, training vs. skill, betting the company, picking the wrong horse (Webster #6 III; F&F tools and techniques; "Windows Forever") | ◐ "Boring stack" (Feasibility worksheet); "AI is a tool, not the topic" | ◐ 8B compare platforms | ◐ "Evaluate tools"; "ambitious but honest" | ○ | **Critical judgment about technology hype is lost.** |
| **Legal and ethics** | | | | | |
| IP: copyright, patents, trade secrets, licensing (IT legal risks lecture) | ◐ OSS licensing only: S3 License Cheat Sheet (copyright and patent grants), CP7 | ◐ 5B "initial license considerations" | ◐ Compliance team tracks licenses | ○ CS 240 only says to include a license file | **Patents and trade secrets as such are lost.** |
| Employment agreements: NDAs, non-competes, ownership of "non-work" projects | ○ | ○ | ○ | ○ | **Lost.** This is directly relevant to student founders: who owns a side project. |
| Unauthorized access: the CFAA, *Van Buren* | ○ | ○ | ○ | ○ | **Lost** |
| Failed-project litigation; preserving files for discovery (Webster #7) | ○ | ○ | ○ | ○ | **Lost** |
| ACM Code of Ethics and Professional Conduct | ◐ BYU Aims; interview ethics (BYU IRB); the ACM Code isn't cited | ◐ Aims-based outcomes; consent | ◐ "Ethical design reflection"; "work with integrity" | ○ CS 240 and CS 329 open with BYU's "Thinking Celestial" framing; no professional code | **The ACM Code itself is lost.** The ethics coverage is real, but it isn't grounded in the professional code. |
| **Pedagogy and assessment** | | | | | |
| A team "startup" that ships an MVP in public, with prototype, work-in-progress, and final demos | ● Founding, a public repo, CP10 progress demo, CP12 Demo Day | ◐ Prototypes and probes only; no product | ● CS 480 MVP / beta; CS 481 releases | ◐ Instructor-provided course projects (CS 240 Chess, CS 340 Tweeter, CS 329 JWT Pizza); nothing founded by students | Covered |
| Post-mortem / lessons learned | ● CP11 retrospective (S24) | ◐ Block reflections | ● Retrospectives every course | ● CS 329: blameless incident reports | Covered (CS 380 today, CS 329 incident reports, the capstone) |
| A case-based exam that requires citations to the canon | ○ No exam | ○ | ○ | ○ | **Lost as an instrument.** Nothing else assesses whether students can apply the literature to a new case. |
| Extra-credit reading list (*Waltzing with Bears*, McConnell, *Death March*, Weinberg, etc.) | ○ | ○ | ○ | ○ | Lost; it could become an optional list |

---

## What would be lost

Ranked by how much it matters to the capstone:

1. **Large-team dynamics theory.** This covers Brooks's law, communication overhead, conceptual integrity, and Conway's law. The capstone puts 50 students on 13 teams. They will *experience* every one of these effects, but no course (including CS 240, 340, and 329) gives them names or a framework for them. This is the highest-value loss, and the cheapest to fix (a session in 480 Wk 1–3 or v2 13B).
2. **Estimation and scheduling.** Today's 301R has a light version (S18). v2 and the program outline have none: no estimation, no critical path, no schedule. CS 480 says "plan iterations" without teaching how.
3. **Honest status reporting and metrics.** This covers the Thermocline of Truth, metric gaming, and reporting upward. The capstone has mentoring logs and release reports, and CS 329 teaches system metrics and customer status pages, but nothing teaches students to report bad news upward early.
4. **Peopleware: the environment and the people.** This covers productivity conditions, hiring and retention, overtime and quality under pressure, jelled teams, and teamicide. No course in the new sequence covers it. Teamicide matters especially, because v2 reshuffles teams every block.
5. **Organizational politics and technology-adoption judgment.** This covers Webster's political and conceptual pitfalls, organization types, and resisting hype.
6. **Legal practice beyond OSS licensing.** This covers patents, trade secrets, NDAs, non-competes, ownership of side projects, the CFAA, and litigation and discovery. Privacy and compliance law are *gained* in v2 (5A, 11B), but the employment and IP material isn't.
7. **The ACM Code of Ethics** as the named professional standard.
8. **The failure-case literature as evidence:** runaway projects, IT litigation, and the "why projects fail" canon. This includes the case-based exam that makes students apply it.
9. **A comparison of process models.** CS 329 tells the history from Agile to DevOps and SRE, and the studio has students live one process, but nobody weighs one model against another.

**Covered as well or better elsewhere:** requirements, architecture and design, org roles, risk, scope control, code review, configuration management, test planning (480 and CS 329), maintenance (481), retrospectives, and the build-and-demo experience.

## Where the lost material could go

Losses 1–5 amount to roughly four or five reading-and-discussion sessions; 6–9 are one session or less each.

| Course | Natural fit | Topics |
|---|---|---|
| **CS 380 v2** | Weeks 4–5 (research and constraints), 8B Explore Architecture, 9A Weigh Tradeoffs, 11A Probe Technology | Armour's orders of ignorance; throwaway prototypes ("plan to throw one away"); estimation fallacies (9A); technology-hype judgment (8B); IP beyond licensing and employment agreements (5A Find Constraints, 5B license considerations); the ACM Code alongside the consent and ethics work in 2A |
| **CS 480** | Weeks 1–3, "establish the engineering system" | Brooks's law, communication overhead, Conway's law (just as 13 teams form); estimation and scheduling, critical path for integration milestones; status reporting |
| **CS 340** | Alongside Clean Architecture and the design principles | No Silver Bullet (essential vs. accidental complexity); conceptual integrity and the second-system effect; Meier & Rechtin's architecting heuristics next to the "Ten Design Commandments" |
| **CS 481** | Weeks 12–15, maintainership and stewardship | Peopleware (environment, retention, jelled teams, leadership); organizational politics; technology lifecycles and platform obsolescence |
| **CS 329** | Extending lessons it already has | Formal inspections (beside testing categories); project metrics and how they get gamed (extending its metrics unit from system health to project progress); the Thermocline of Truth (extending its status-reporting lesson from customers to managers); a comparison of process models (extending its history lesson) |
| **CS 452** | Database | Weak fit. Records preservation and discovery could sit with its data-retention material; nothing else from CS 428 maps naturally. |
| **CS 240** | Already covers coding style, refactoring, unit testing, code coverage, git | Nothing new needed |

Two things have no natural home in any required course: the **failure-case canon as a body of evidence** (and the case exam that tests it), and **the CFAA / unauthorized-access** material. The first could become a recurring reading thread across 380–481; the second fits a security unit if one is added.
