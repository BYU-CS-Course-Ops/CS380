<!-- GENERATED from canvas_material/assignments/rubrics.yaml.jinja by
     `python3 canvas_material/rubrics.py instructor-md`. Do not edit here. -->

# CS 301R — Assignment Rubrics (instructor view)

*Software Engineering Studio I: Founding an Open-Source Project.* Companion to `CS301R-ProjectCreation_v4.md` (design) and `development/CS301R-Schedule-Fall2026.md` (dates).

One analytic grid per graded checkpoint (CP1–CP12, design §6): weighted criteria scored across four performance levels. Derived from the rubric dimensions in design §12, the selection criteria in §9, and the assessment weights in §8.

**The source of truth is `canvas_material/assignments/rubrics.yaml.jinja`.** It generates this file, the student-facing Assignment Rubrics page, the "What it measures" table in each handout, and the Canvas rubric attached to each checkpoint (`canvas_material/rubrics.py deploy`). Dates below are rendered for the fall26 target.

**Status.** *Published* rubrics carry reviewed, student-facing wording and are live on the rubrics page and in Canvas. *Draft* rubrics still carry the first-cut instructor wording.

---

## How to read these rubrics

| Level | Points | Meaning |
|---|---|---|
| **Exemplary** | 4 | Professional quality. Could serve as a model for the class. |
| **Proficient** | 3 | Solid and complete; meets the founder-grade bar. |
| **Developing** | 2 | Present but thin, uneven, or partly missing. Needs another pass. |
| **Beginning** | 1 | Missing, superficial, or seriously flawed. |
| **Absent** | 0 | Not submitted; no evidence. |

**Scoring.** Each rubric's weights sum to **100 points**. A criterion's contribution = (level points ÷ 4) × criterion weight. In Canvas each criterion carries five ratings, e.g. 25 / 18.75 / 12.5 / 6.25 / 0 for a weight-25 criterion. The 100-point score counts toward the course weight on the assignment group.

**Individual vs. team (design §8).** CP1–CP4 are individually graded. From CP5 on, shared artifacts get a **team grade adjusted by individual-contribution evidence** — per-student git history/PRs, a contribution log, and confidential peer evaluations at midpoint and end. Solo students are graded on the same criteria at one-person scope. *In Canvas: score the rubric, then override the total for any individual adjustment; the rubric scores stay on record.*

**Revision policy.** Major artifacts (proposal, design doc, infrastructure package) may be revised within a defined window after feedback; rubrics reward **evidence of revision** explicitly — iteration is the point.

**Pass conditions.** To pass, a student must reach at least **Developing** on every criterion of the discovery brief, written proposal, pitch, design doc, infrastructure package, MVP, and final presentation. Strong code cannot compensate for a missing founding artifact. *Canvas does not enforce this or the CP3 draft cap; apply them when scoring.*

---


# Phase 1 — Clarify & Explore

## CP1 — Idea Briefs
*Three one-page candidate concepts · Individual · Part of the 10% Discovery bundle, with CP2* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Divergence & breadth | 25 | Three genuinely distinct problem spaces spanning different users/domains | Three distinct ideas, some overlap | Ideas are minor variants of one another | Effectively one idea, or fewer than three |
| Real-need orientation | 25 | Each names a plausible real user and a felt need, with a hint of evidence | Each names a user and need | Needs asserted but vague or self-serving | Toy/hypothetical needs only |
| Richness potential | 20 | At least one idea visibly could grow into a multi-dimensional, lasting project | One idea shows some breadth | Breadth unclear for all three | All ideas trivial in scope |
| Clarity & concision | 15 | Crisp, one-page discipline; easy to grasp fast | Readable, mostly to length | Padded or hard to follow | Disorganized or incomplete |
| Reflection | 15 | Thoughtful take on what makes a project worth building to last | Reasonable reflection | Generic reflection | Missing or perfunctory |

**What it measures** (handout table, Canvas criterion description).
- **Divergence & breadth** — Three genuinely distinct problem spaces spanning different users/domains — evidence of real divergent exploration, not one idea in three costumes.
- **Real-need orientation** — Each idea names a plausible real user and a felt need, with at least a hint of evidence. Keeps the focus on serving someone.
- **Richness potential** — At least one idea visibly could grow into a multi-dimensional, lasting project.
- **Clarity & concision** — Crisp, one-page discipline; ideas are easy to grasp quickly.
- **Reflection** — A thoughtful, personal take on what makes a project worth building to last — not a generic summary.

**What each criterion is looking for** (student-facing, rubrics page).
- **Divergence & breadth** rewards the divergent-thinking discipline the whole first phase depends on: explore *across* the problem space rather than refining one pet idea.
- **Real-need orientation** keeps the focus on real users from day one. The course is selecting for projects that serve someone, not clever toys.
- **Richness potential** asks whether a team could grow into this — the "is it worth founding on?" question, applied gently at the idea stage.
- **Clarity & concision** enforces the one-page constraint. Founders have to communicate an idea fast.
- **Reflection** assesses whether you have internalized the founding mindset, not just produced ideas.

**Instructor notes.**
- **Divergence & breadth** rewards the divergent-thinking discipline the CPS spine depends on early: students should explore *across* the problem space, not refine one pet idea.
- **Richness potential** is the "could a multi-disciplinary team grow into this?" north star (§9), applied gently at the idea stage.

## CP2 — Product Definition Brief
*Users, needs, success criteria · Individual · Completes the 10% Discovery bundle* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Target user clarity | 20 | Userbase sharply defined and bounded; who's in and out is clear | User defined | User vague or overbroad | "Everyone" / undefined |
| Needfinding quality & honesty | 30 | Real interviews/observation **and/or** a rigorously documented persona or proxy — ideally interviews informing a persona — with honest reasoning about its limits | Credible needfinding with some evidence | Thin evidence; reasoning gaps | Asserted needs, no method |
| Prioritized needs | 20 | Needs prioritized with a defensible rationale | Needs listed and ranked | Needs listed, not prioritized | Needs unclear |
| Success criteria | 20 | Specific, defensible, observable criteria for "this works" | Reasonable criteria | Vague criteria | Missing |
| PRD mapping | 10 | Cleanly reads as a real PRD — problem and user, not solution | Mostly reads as a PRD | Partial | Not recognizable as a PRD |

**What it measures** (handout table, Canvas criterion description).
- **Target user clarity** — Userbase sharply defined and bounded — who's in and out is clear. Not "everyone."
- **Needfinding quality & honesty** — Real interviews/observation **and/or** a rigorously documented persona — ideally interviews *informing* a persona — each with honest reasoning about its limits. **Honesty about method is graded as heavily as the findings.**
- **Prioritized needs** — Needs prioritized (must-have vs. nice-to-have) with a defensible rationale.
- **Success criteria** — Specific, observable, defensible criteria for "this works."
- **PRD mapping** — Reads like a lightweight product-requirements doc (see the <course-link type="page" id="pg-prd-reference">PRD reference</course-link>) — a clear definition of problem and user, not a solution.

**What each criterion is looking for** (student-facing, rubrics page).
- **Target user clarity** — a founder has to know exactly whose problem they own. Fuzziness here undermines everything downstream: you cannot scope an MVP, argue feasibility, or judge whether you succeeded.
- **Needfinding quality & honesty** is the heart of the discovery grade. Because an evidence-tagged persona is an accepted substitute when you genuinely cannot reach a user, *honesty about your method and its limits* is graded as heavily as the findings themselves. A brief built largely on assumptions can still score well if it is straight about that and clear about what it would verify.
- **Prioritized needs** checks that you can tell must-haves from nice-to-haves. That distinction is the basis of every later scoping decision.
- **Success criteria** force a falsifiable definition of success — the one your final demo gets judged against.
- **PRD mapping** ties this to the shape the document takes in industry. See the <course-link type="page" id="pg-prd-reference">PRD reference</course-link>.

**Instructor notes.**
- **Target user clarity** — a founder/sponsor must know exactly whose problem they own; fuzziness here undermines everything downstream.
- **Needfinding quality & honesty** — persona/proxy work is an allowed substitute this iteration, so honesty about method and its limits is graded as heavily as the findings.
- **PRD mapping** ties this artifact to the sponsor role the lead may carry into the capstone.


# Phase 2 — Ideate & Pitch → Form Teams

## CP3 — Written Proposal
*Individual · Course weight: 12%* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Problem & user clarity | 15 | Problem and users compelling and evidence-backed | Clear problem and users | Somewhat vague | Unclear |
| Solution & core features (+ non-goals) | 15 | Coherent solution; sharp feature set; explicit non-goals | Solution and features defined | Features fuzzy; no non-goals | Solution unclear |
| Feasibility & technical approach | 20 | Stack and dependencies researched; approach credible and justified | Reasonable, mostly justified | Approach asserted, thin | Infeasible or absent |
| Scope realism (MVP for this term) | 15 | Clear, achievable vertical slice, sized against the *real* build window — roughly five weeks — with the arithmetic shown | Plausible scope | Over- or under-scoped | Wildly unrealistic (e.g. "10 hrs × 14 weeks = 140 hours") |
| Richness & extensibility | 15 | Exercises multiple engineering dimensions; clear path for a larger team | Some breadth and extensibility | Narrow | Toy-scale |
| Risks & mitigation | 10 | Real risks named with credible mitigations | Risks identified | Generic risks | None |
| Argument & revision | 10 | Persuasive, well-written; visible response to peer feedback | Clear writing; some revision | Rough; little revision | Poor or no revision |

**What it measures** (handout table, Canvas criterion description).
- **Problem & user clarity** — Problem and users compelling and evidence-backed — the discovery trail shows.
- **Solution & core features (+ non-goals)** — Coherent solution; sharp, prioritized feature set; explicit non-goals. Scoping *out* is as persuasive as scoping in.
- **Feasibility & technical approach** — Stack and dependencies actually researched; **at least one spike run on the scariest unknown, with its result honestly reported**; approach credible and justified — real homework, not hand-waving.
- **Scope realism (MVP for this term)** — A clear, achievable vertical slice, sized against the *real* build window — roughly five weeks, with the ~10 hrs/week total already spent on class, reading, writing, and reviews — with the arithmetic shown.
- **Richness & extensibility** — Exercises multiple engineering dimensions; a path for others to join and build.
- **Risks & mitigation** — Real, specific risks with credible mitigations — engineering judgment about what could go wrong.
- **Argument & revision** — Persuasive, well-written, and visibly improved in response to peer feedback — measured against your Sep 30 draft and the annotated copies you submit with it. **No draft on file caps this criterion at Developing.**

**What each criterion is looking for** (student-facing, rubrics page).
- **Problem & user clarity** and **Solution & core features** carry the product case. **Non-goals** are graded because scoping something *out* is as persuasive as scoping it in.
- **Feasibility & technical approach** is the heaviest criterion here, deliberately. It rewards real homework on stack and dependencies — arguing feasibility without overpromising is the skill this genre lives or dies on.
- **Scope realism** is checked against the honest budget: **~10 hrs/week is the total course load** — class, reading, discovery, writing, and reviews all come out of it — so the build time left is a fraction of ten, spread over roughly **five weeks** of real building. A proposal that sizes its MVP by multiplying 10 × 14 has already failed this criterion.
- **Richness & extensibility** applies the same "worth founding on?" test your pitch will be judged on.
- **Risks & mitigation** assesses engineering judgment about what can go wrong, and whether your mitigations are real.
- **Argument & revision** grades the proposal as technical communication, and rewards iteration. **It requires a draft on file.** The <course-link type="assignment" id="cp3-draft">required draft</course-link> — uploaded, plus two printed copies marked up in class and submitted as images with the final — is what revision is measured against. **With no draft on file this criterion caps at Developing**, because there is nothing to measure improvement against.

**Instructor notes.**
- **Scope realism** — the build window is roughly five weeks (Weeks 9–13), not the nominal ~10 hrs/week × 14.
- **Argument & revision** requires a draft on file: the Sep 30 workshop draft (uploaded, two printed copies marked up in class, scans submitted with the final). **With no draft on file this criterion caps at Developing** — Canvas will not enforce the cap; apply it when scoring.
- **Richness & extensibility** applies the §9 selection criteria the proposal will be judged on at pitch time.

## CP4 — Pitch Presentation
*Persuade and recruit · Individual · Course weight: 8%* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Problem/solution clarity | 20 | Audience grasps the need and idea immediately | Clear | Somewhat muddled | Confusing |
| Persuasiveness & recruiting | 25 | Compelling enough to attract teammates; clear call to join | Persuasive | Flat | Unconvincing |
| Feasibility defense | 15 | Defends scope and tradeoffs convincingly | Defends adequately | Shaky | Cannot defend |
| Handling of questions | 15 | Direct, composed, honest under questioning | Handles most questions | Struggles | Deflects or unable |
| Slide & visual quality | 10 | Clean, purposeful visuals | Serviceable | Cluttered | Poor or absent |
| Delivery & professionalism | 15 | Confident, well-paced, within time | Solid delivery | Uneven or over time | Unprofessional |

**What it measures** (handout table, Canvas criterion description).
- **Problem/solution clarity** — The audience grasps the need and the idea immediately — no rewinding.
- **Persuasiveness & recruiting** — Compelling enough to attract teammates, with a clear call to join. Weighted highest because the pitch's *job* is to recruit — audience effect is part of the grade.
- **Feasibility defense** — Scope and tradeoffs defended convincingly — the <course-link type="assignment" id="cp3">CP3</course-link> honest-confidence move, spoken.
- **Handling of questions** — Direct, composed, honest under questioning — including honest "I don't know yet"s.
- **Slide & visual quality** — Few, clean, purposeful visuals that help rather than compete.
- **Delivery & professionalism** — Confident, well-paced, within time.

**What each criterion is looking for** (student-facing, rubrics page).
- **Persuasiveness & recruiting** is weighted highest because of what Pitch Day is for: a pitch *succeeds* if it convinces classmates to spend their semester on your project. This is the one rubric in the course where the effect on your audience is part of the grade.
- **Feasibility defense** and **Handling of questions** test whether you can think on your feet about your own project's risks. Honest answers score better than confident ones.
- **Slide & visual quality** and **Delivery** assess pitch craft as a professional communication skill.
- Peer scores from the <course-link type="page" id="pg-pitch-evaluation-sheet">pitch evaluation sheet</course-link> inform the instructor's judgment here, but the grade is the instructor's.

**Instructor notes.**
- **Persuasiveness & recruiting** is weighted highest because Week 5 is the course hinge.


# Phase 3 — Develop & Design

## CP5 — Design Document
*How it gets built, and why this way · Team (or solo, at solo scope) · Course weight: 12%* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Architecture clarity | 20 | Components, interfaces, data, and external services clearly modeled — the system's shape is visible | Architecture clear | Partial or ambiguous | Missing or incoherent |
| Appropriate detail | 15 | Right altitude — neither hand-wavy nor over-specified | Mostly right | Too shallow or too deep | Unusable |
| Tech choices & rationale | 15 | Each significant choice argued against a real alternative | Choices justified | Asserted, little rationale | Unjustified |
| Data & interface design | 15 | Sound data model and interface sketch that the traced flow exercises | Present and reasonable | Incomplete | Missing |
| Risk & open questions | 10 | Honest risks and open questions surfaced, including failure cases | Some risks noted | Token | None |
| Implementability | 15 | Plan clearly buildable in the semester that remains, by this team | Buildable | Doubtful | Not actionable |
| Readability & revision | 10 | A future contributor could navigate it; visible improvement from draft to final | Readable; some revision | Rough | Poor or no revision |

**What it measures** (handout table, Canvas criterion description).
- **Architecture clarity** — Components, interfaces, data, and external services clearly modeled — the system's shape is visible.
- **Appropriate detail** — The right altitude: neither hand-wavy nor over-specified. A 300-level judgment skill in its own right.
- **Tech choices & rationale** — Choices justified against real alternatives — the alternatives-considered discipline.
- **Data & interface design** — A sound data model and interface sketch that the traced flow actually exercises.
- **Risk & open questions** — Honest unknowns surfaced — including failure cases — rather than hidden.
- **Implementability** — The plan is clearly buildable in the semester that remains, by this team.
- **Readability & revision** — A future contributor could navigate it; visible improvement from draft to final.

**What each criterion is looking for** (student-facing, rubrics page).
- **Architecture clarity**, **Data & interface design**, and **Tech choices & rationale** are the engineering core: can your team show the shape of the system and defend the decisions that produced it. A straw-man alternative fools no one — the alternative has to be something a reasonable team might actually pick.
- **Appropriate detail** is a judgment skill in its own right, and the one this assignment is really teaching. Decisions and trade-offs belong in the document; mechanics belong in the code. Copied schemas, pseudo-code for routine work, and pinned library versions cost you here.
- **Implementability** ties the design to the reality of the build: roughly five weeks of real building, not a nominal semester.
- **Readability & revision** is graded through the future-contributor lens the whole course runs on — plus visible improvement between the draft and the final. Revision is graded, so keep the draft.
- Use the <course-link type="page" id="pg-design-doc-template">design document template</course-link>: its sections map onto these criteria one for one.

**Instructor notes.**
- **Appropriate detail** is a 300-level judgment skill: documenting enough without over-specifying.
- **Readability** is graded through the *future-contributor* lens central to the course — the doc must serve a stranger who joins the project.
- Team grade, adjusted by individual-contribution evidence (design §8).

## CP6 — Git Workflow Lab
*Team (or solo) · Part of the 12% Git + Tech-Comm bundle, with CP9* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Commit hygiene | 25 | Logical, atomic commits; clear, conventional messages | Mostly clean | Noisy/uneven | Dumps; poor messages |
| Branch & PR workflow | 25 | Correct maintainer-centered branch→PR→review→merge flow | Workflow followed | Inconsistent | Not followed |
| PR quality | 20 | Reviewable, scoped PRs using the template | Reasonable PRs | Large/unclear PRs | Unreviewable |
| Review participation | 20 | Substantive, constructive review comments on peers' PRs | Some real review | Rubber-stamp | None |
| Project git standards | 10 | Standards documented and actually followed | Documented | Vague | Absent |

**What it measures** (handout table, Canvas criterion description).
- **Commit hygiene** — Logical, atomic commits; clear, conventional messages in the imperative that explain why.
- **Branch & PR workflow** — The maintainer-centered flow followed correctly: branch → PR → review → merge under policy.
- **PR quality** — Scoped, reviewable PRs with descriptions that orient the reviewer.
- **Review participation** — Substantive, constructive written review of a peer's PR — a graded skill, not a formality.
- **Project git standards** — Standards documented, reasoned, and actually followed in the lab itself.

**Instructor notes.**
- This lab grades *mechanics under a real workflow*, not git trivia. The emphasis is the **maintainer-centered** model (branch → logical commits → draft PR → review → merge under policy), not fork-and-upstream.
- **Review participation** is weighted because reviewing others' code well is a graded skill in its own right, not a formality.
- **Project git standards** rewards setting and honoring the project's own conventions — founders write the norms.

## CP7 — Project Infrastructure Package
*Team (or solo) · Course weight: 12%* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Completeness | 25 | All required files present and substantive (README, LICENSE, CONTRIBUTING, COC, issue/PR templates, onboarding) | Nearly all present | Several gaps | Skeletal |
| Newcomer usability | 25 | A stranger can install, run, and start contributing from the docs alone | Mostly self-serve | Needs hand-holding | Unusable |
| License appropriateness | 15 | License chosen and justified for the project's goals | Appropriate license | License present, unjustified | Wrong/missing |
| Governance & comms norms | 15 | Clear maintainer expectations, channels, decision norms | Present | Vague | Absent |
| Professionalism & consistency | 10 | Polished, consistent, credible as a real OSS project | Solid | Uneven | Sloppy |
| Contributor-readiness | 10 | Clearly built for others to join and build on | Mostly | Partial | Not considered |

**What it measures** (handout table, Canvas criterion description).
- **Completeness** — All required artifacts present and substantive — the required-artifacts checklist above, honored.
- **Newcomer usability** — A stranger can install, run, and start contributing from the docs alone. Verified again, for a grade, in the Week-11 audit.
- **License appropriateness** — A *justified* choice matched to the project's goals — not MIT by reflex.
- **Governance & comms norms** — Clear maintainer expectations, channels, and decision norms a contributor can rely on.
- **Professionalism & consistency** — Polished and consistent — credible as a real OSS project.
- **Contributor-readiness** — Genuinely built for others to join and build on — the course's defining thread.

**Instructor notes.**
- **Completeness** maps directly to the required repository artifacts in design §10.
- **Newcomer usability** is the package's real test — can someone who's never seen the repo get started? This is verified again in the Week-11 repo audit.
- **License appropriateness** rewards a *justified* choice, not just dropping in MIT by reflex.
- **Governance & comms norms** capture the founder-defining-the-rules emphasis.
- **Contributor-readiness** asks whether the project is genuinely ready for others to join and build on — a defining founder responsibility.


# Phase 4 — Implement & Build

## CP8 — Project Plan & Roadmap
*Team (or solo) · Course weight: 8%* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Work breakdown | 25 | Coherent epics → milestones → issues; right granularity | Reasonable breakdown | Coarse/uneven | Vague list |
| Prioritization & estimation | 20 | Prioritized backlog with credible estimates | Prioritized | Some prioritization | None |
| Definition of done | 15 | Clear, testable DoD | Present | Vague | Absent |
| Contribution pathways | 20 | Good-first-issues and labels invite future contributors | Some starter tasks/labels | Minimal | None |
| Roadmap into the future | 20 | Credible roadmap into a future semester/team | Roadmap present | Thin | Missing |

**What it measures** (handout table, Canvas criterion description).
- **Work breakdown** — Coherent epics → milestones → issues at the right granularity — vision turned into finishable work.
- **Prioritization & estimation** — An ordered backlog with credible estimates, checked against real capacity.
- **Definition of done** — A clear, testable, project-wide bar for "done."
- **Contribution pathways** — Good-first-issues and labels that genuinely invite future contributors — weighted heavily on purpose.
- **Roadmap into the future** — A credible path into a future semester/team — the project's tomorrow, written down.

**Instructor notes.**
- **Work breakdown** and **Prioritization & estimation** assess turning vision into manageable, sequenced work.
- **Definition of done** grades whether the project has a shared, checkable bar for completion.
- **Contribution pathways** and **Roadmap into the future** are weighted heavily because *creating on-ramps for future contributors* is a defining course goal, not an afterthought.

## CP9 — Technical Communication Portfolio
*Individual evidence within the team · Completes the 12% Git + Tech-Comm bundle* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Precision & clarity | 25 | Exact, unambiguous; reader knows precisely what's meant | Clear | Some ambiguity | Vague/confusing |
| Completeness | 25 | Bug reports include reproduction, expected vs. actual; requests fully framed | Mostly complete | Missing elements | Incomplete |
| Actionability | 20 | A maintainer could act immediately | Actionable | Needs follow-up | Not actionable |
| Tone & professionalism | 15 | Respectful, collaborative, on-brand for OSS | Professional | Uneven | Unprofessional |
| Responsiveness to feedback | 15 | Engages critique thoughtfully; updates accordingly | Responds adequately | Defensive/thin | Ignores |

**What it measures** (handout table, Canvas criterion description).
- **Precision & clarity** — Exact and unambiguous — the reader knows precisely what's meant, first pass.
- **Completeness** — Bug reports carry reproduction and expected-vs-actual; requests are fully framed. Anchored to the defect/fault/failure discipline.
- **Actionability** — A maintainer could act immediately — no follow-up interrogation required.
- **Tone & professionalism** — Respectful, collaborative, on-brand for open source — even (especially) when critical.
- **Responsiveness to feedback** — Critique engaged thoughtfully; updates made or disagreement reasoned — the two-way half of the skill.

**Instructor notes.**
- Contents: 2 bug reports, 1 feature request, 1 PR description, 2 review comments, 2 responses to feedback — graded on **quality, not quantity**. The counts are a floor; a thoughtful bug report beats six rote ones.
- **Completeness** is anchored to the defect/fault/failure framing taught in Week 8 (reproduction, expected vs. actual).
- **Responsiveness to feedback** assesses the two-way nature of technical communication — how the student receives and acts on review, not just how they write.

## CP10 — Progress Demo + Repo Audit
*Team (or solo), with individual-contribution adjustment · Course weight: 16% (largest)* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| MVP plan quality | 15 | Sharp: what's in, what's deferred, what risk v1 addresses | Clear plan | Vague plan | Missing |
| Proves key claims (vertical slice) | 25 | Working vertical slice clearly proves project viability | Slice mostly proves it | Partial/broad-shallow | Doesn't prove the point |
| Technical coherence | 15 | Clean, coherent implementation aligned to the design | Mostly coherent | Patchy | Incoherent |
| Demo readiness | 15 | Smooth, well-framed live demo | Works with minor hiccups | Rough | Fails to demo |
| Repo audit (peer onboarding) | 15 | A peer clones, builds, runs, and finds entry points unaided | Minor friction | Significant friction | Cannot build/run |
| Documentation & honesty | 10 | Limitations and known issues documented candidly | Documented | Thin | Absent/overclaims |
| Individual contribution | 5 | Git history/PRs show real, balanced contribution | Evident contribution | Uneven | Little/none |

**What it measures** (handout table, Canvas criterion description).
- **MVP plan quality** — The one-pager: what's in / deferred / risk addressed / demo plan. (Graded from the Nov 11 revision.)
- **Proves key claims (vertical slice)** — The working slice clearly proves the project's core viability — the heaviest single criterion in the course.
- **Technical coherence** — Implementation clean and aligned with the design doc — the built thing matches the argued thing.
- **Demo readiness** — A smooth, well-framed live demo (or a gracefully run fallback).
- **Repo audit (peer onboarding)** — A stranger clones, builds, runs, and finds entry points from your docs alone.
- **Documentation & honesty** — Limitations and known issues documented candidly — candor over oversell.
- **Individual contribution** — Git history and PRs show real, reasonably balanced contribution.

**Instructor notes.**
- **Proves key claims** is the heaviest single criterion in the course: an MVP's job is to *prove the project's core viability* via a vertical slice, not to be broad and shallow.
- **Repo audit** operationalizes contributor-readiness — a classmate must clone, build, run, and locate where a new feature would go. This is the buildability gate.
- **Documentation & honesty** rewards candor about limitations over polish that oversells.
- **Individual contribution** is where the team grade is adjusted by per-student git/PR evidence and peer evaluation (design §8).


# Phase 5 — Launch & Reflect

## CP11 — Launch Package + Retrospective
*Team (or solo) · Part of the 10% Final bundle, with CP12* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Launch-package completeness | 30 | Architecture overview, roadmap, known-issues, tech-debt log, onboarding all present and useful | Mostly complete | Gaps | Skeletal |
| Setup verification | 15 | Setup independently reproducible from docs | Reproducible with minor friction | Unclear | Fails |
| Retrospective honesty & insight | 25 | Candid about what held, what the MVP validated, what's next | Honest reflection | Surface-level | Missing/spin |
| Future-work framing | 20 | Compelling, realistic next steps without overselling | Reasonable | Vague | Absent or inflated |
| Contributor-readiness | 10 | A new contributor could get up to speed and start building | Mostly | Partial | No |

**What it measures** (handout table, Canvas criterion description).
- **Launch-package completeness** — Architecture, roadmap, known-issues, tech-debt log, and onboarding all present and genuinely useful.
- **Setup verification** — Setup independently reproducible from the docs — evidenced by the round-2 test sheet.
- **Retrospective honesty & insight** — Candid about what held, what the MVP validated, what's next — evidence over narrative, weighted heavily on purpose.
- **Future-work framing** — Compelling, realistic next steps without overselling — a roadmap a serious outside reader could believe (a potential contributor, a maintainer, a capstone faculty member).
- **Contributor-readiness** — A new contributor could get up to speed and start building — the course's through-line, at the finish.

**Instructor notes.**
- **Launch-package completeness** and **Setup verification** assess whether a new contributor can actually get the project running and start building — the central deliverable of the course.
- **Retrospective honesty & insight** is weighted heavily because honest reflection (what assumptions held, what the MVP truly validated) is graded over a rosy narrative.
- **Future-work framing** rewards a credible roadmap that doesn't oversell — the lead may pitch this to capstone faculty.

## CP12 — Final Pitch + Demo
*Team (or solo) · Completes the 10% Final bundle · Defended at Demo Day (capstone faculty invited)* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| "What need does this serve?" | 20 | Need is vivid, real, and evidence-backed | Clear need | Vague | Unconvincing |
| "What has been built?" (live demo) | 25 | Confident live demo of a working slice | Working demo | Shaky/partial | Fails |
| "Where does it go next, and how can others join?" | 20 | Compelling, concrete case for how others can join and keep building | Clear | Thin | Missing |
| Integration | 15 | Ties discovery → proposal → design → build into one coherent story | Mostly coherent | Disjointed | No through-line |
| Persuasiveness & delivery | 10 | Polished, persuasive, well-paced | Solid | Uneven | Poor |
| Q&A handling | 10 | Direct, honest, composed with faculty | Handles most | Struggles | Cannot |

**What it measures** (handout table, Canvas criterion description).
- **"What need does this serve?"** — The need is vivid, real, and evidence-backed — the discovery arc, landed.
- **"What has been built?" (live demo)** — A confident live demo of a working slice — the heaviest criterion; slides can't earn it.
- **"Where does it go next, and how can others join?"** — A concrete, credible case for continuation — artifacts, not aspirations.
- **Integration** — Discovery → proposal → design → build → launch told as one coherent story.
- **Persuasiveness & delivery** — Polished, well-paced, professional.
- **Q&A handling** — Direct, honest, composed — with faculty asking real questions.

**Instructor notes.**
- The first three criteria are the **three questions the final must answer** (design §7, Week 14) — the spine of the mastery artifact, together carrying most of the weight.
- **Integration** rewards showing the whole founding arc as one story, which is what distinguishes a *founded, defensible, contributor-ready project* from strong code alone.
- **Q&A handling** matters because capstone faculty are in the room making carry-forward judgments.


---

## Course-weight reconciliation (design §8)

| Graded bundle | Rubrics | Course weight |
|---|---|---|
| Discovery | CP1 + CP2 | 10% |
| Written Proposal | CP3 | 12% |
| Pitch #1 | CP4 | 8% |
| Design Document | CP5 | 12% |
| Project Infrastructure Package | CP7 | 12% |
| Git Lab + Tech-Comm Portfolio | CP6 + CP9 | 12% |
| Project Plan & Roadmap | CP8 | 8% |
| MVP / Prototype | CP10 | 16% |
| Final + Launch + Retro | CP11 + CP12 | 10% |
| **Total** | | **100%** |

*Within a bundle, split the bundle weight across its rubrics (suggested even split unless noted): Discovery 5%/5%; Git Lab + Portfolio 6%/6%; Final bundle 5%/5%. Adjust to taste.*

---

## Notes for the next revision

- **Calibrate point weights** against a couple of real student artifacts once the first cohort submits — the within-rubric weights are first estimates.
- **Decide bundle splits** explicitly (Discovery, Git+Tech-Comm, Final) rather than the suggested even splits if some artifacts deserve more.
- **Peer-evaluation system:** drafted — see `development/Peer-Evaluation-System.md` (design + grade-flow mechanics), the Pitch Evaluation Sheet (Pitch Day instrument), and the Peer Evaluation Form (midpoint/end confidential evals).
- **Revision-window mechanics** (how regrades after revision are averaged or replaced) should be pinned down before the term.
