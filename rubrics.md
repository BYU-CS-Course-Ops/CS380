# CS 301R — Assignment Rubrics (Initial Cut)

*Software Engineering Studio I: Founding an Open-Source Project.* Companion to `CS301R-ProjectCreation_v3.md` (design) and `CS301R-Schedule-Fall2026.md` (dates).

This is a **first-draft set of rubrics** — one per graded assignment (checkpoints CP1–CP12 in design §6). Each rubric is an **analytic grid**: weighted criteria scored across four performance levels, followed by a short explanation of what each criterion is really measuring and why it's here. They are derived from the rubric dimensions in design §12, the selection criteria in §9, and the assessment weights in §8.

---

## How to read these rubrics

**Performance levels.** Every criterion is scored on the same four-level scale:

| Level | Points | Meaning |
|---|---|---|
| **Exemplary** | 4 | Professional quality; could serve as a model for the class. |
| **Proficient** | 3 | Solid, complete, meets the founder-grade bar. The target for most students. |
| **Developing** | 2 | Present but thin, uneven, or partially missing; needs another pass. |
| **Beginning** | 1 | Missing, superficial, or seriously flawed. |
| *(Absent)* | 0 | Not submitted / no evidence. |

**Scoring.** Each rubric's criteria carry weights that sum to **100 points** within the assignment. A criterion's contribution = (level points ÷ 4) × criterion weight. The assignment's 100-point score then counts toward the **course weight** noted in each rubric header (course weights from design §8; they total 100%).

**Individual vs. team (design §8).** CP1–CP4 are individually graded. From CP5 on, shared artifacts get a **team grade adjusted by individual-contribution evidence** — per-student git history/PRs, a contribution log, and confidential peer evaluations at midpoint and end. Solo students are graded on the same criteria at one-person scope.

**Revision policy.** Major artifacts (proposal, design doc, infrastructure package) may be revised within a defined window after feedback; rubrics reward **evidence of revision** explicitly — iteration is the point.

**Pass conditions.** To pass, a student must reach at least **Developing** on every criterion of the discovery brief, written proposal, pitch, design doc, infrastructure package, MVP, and final presentation. Strong code cannot compensate for a missing founding artifact.

---

# Phase 1 — Clarify & Explore

## CP1 — Idea Briefs
*Three 1-page candidate concepts · Individual · Part of the 10% "Discovery" bundle (with CP2)*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Divergence & breadth | 25 | Three genuinely distinct problem spaces spanning different users/domains | Three distinct ideas, some overlap | Ideas are minor variants of one another | Effectively one idea, or fewer than three |
| Real-need orientation | 25 | Each names a plausible real user and a felt need, with a hint of evidence | Each names a user and need | Needs asserted but vague or self-serving | Toy/hypothetical needs only |
| Richness potential | 20 | At least one idea visibly could grow into a multi-dimensional, lasting project | One idea shows some breadth | Breadth unclear for all three | All ideas trivial in scope |
| Clarity & concision | 15 | Crisp, 1-page discipline; easy to grasp fast | Readable, mostly to length | Padded or hard to follow | Disorganized or incomplete |
| Reflection | 15 | Thoughtful take on what makes a project worth building to last | Reasonable reflection | Generic reflection | Missing or perfunctory |

**Criterion explanations.**
- **Divergence & breadth** rewards the divergent-thinking discipline the CPS spine depends on early: students should explore *across* the problem space, not refine one pet idea.
- **Real-need orientation** keeps the focus on real users from day one — the course is selecting for projects that serve someone, not clever toys.
- **Richness potential** is the "could a multi-disciplinary team grow into this?" north star (§9), applied gently at the idea stage.
- **Clarity & concision** enforces the 1-page constraint; founders must communicate an idea fast.
- **Reflection** assesses whether the student internalized the founding mindset, not just produced ideas.

## CP2 — Product Definition Brief
*Users, needs, success criteria · Individual · Completes the 10% "Discovery" bundle*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Target user clarity | 20 | Userbase sharply defined and bounded; who's in/out is clear | User defined | User vague or overbroad | "Everyone" / undefined |
| Needfinding quality & honesty | 30 | Real interviews/observation **and/or** a rigorously documented persona/proxy (ideally interviews informing a persona) with honest reasoning about its limits | Credible needfinding with some evidence | Thin evidence; reasoning gaps | Asserted needs, no method |
| Prioritized needs | 20 | Needs prioritized with a defensible rationale | Needs listed and ranked | Needs listed, not prioritized | Needs unclear |
| Success criteria | 20 | Specific, defensible, observable criteria for "this works" | Reasonable criteria | Vague criteria | Missing |
| PRD mapping | 10 | Cleanly reads as a real PRD — problem and user, not solution | Mostly reads as a PRD | Partial | Not recognizable as a PRD |

**Criterion explanations.**
- **Target user clarity** — a founder/sponsor must know exactly whose problem they own; fuzziness here undermines everything downstream.
- **Needfinding quality & honesty** is the heart of the discovery grade. Because persona/proxy work is an allowed substitute this iteration, *honesty about method and its limits* is graded as heavily as the findings themselves.
- **Prioritized needs** checks that the student can distinguish must-haves from nice-to-haves — the basis for later MVP scoping.
- **Success criteria** force a falsifiable definition of success, which the final demo will be judged against.
- **PRD mapping** ties this artifact to the sponsor role the lead may carry into the capstone.

---

# Phase 2 — Ideate & Pitch → Form Teams

## CP3 — Written Proposal
*Individual · Course weight: 12%*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Problem & user clarity | 15 | Problem and users compelling and evidence-backed | Clear problem and users | Somewhat vague | Unclear |
| Solution & core features (+ non-goals) | 15 | Coherent solution; sharp feature set; explicit non-goals | Solution and features defined | Features fuzzy; no non-goals | Solution unclear |
| Feasibility & technical approach | 20 | Stack/dependencies researched; approach credible and justified | Reasonable, mostly justified | Approach asserted, thin | Infeasible or absent |
| Scope realism (1-semester MVP) | 15 | Clear, achievable vertical slice at ~10 hrs/wk | Plausible scope | Over- or under-scoped | Wildly unrealistic |
| Richness & extensibility | 15 | Exercises multiple engineering dimensions; clear path for a larger team | Some breadth and extensibility | Narrow | Toy-scale |
| Risks & mitigation | 10 | Real risks named with credible mitigations | Risks identified | Generic risks | None |
| Argument & revision | 10 | Persuasive, well-written; visible response to peer feedback | Clear writing; some revision | Rough; little revision | Poor / no revision |

**Criterion explanations.**
- **Problem & user clarity** and **Solution & features** carry the product case; **non-goals** are graded because scoping *out* is as important as scoping in.
- **Feasibility & technical approach** rewards real homework on stack and dependencies — arguing feasibility without overpromising.
- **Scope realism** is checked against the concrete one-semester / ~10-hrs-week budget.
- **Richness & extensibility** apply the §9 selection criteria the proposal will be judged on at pitch time.
- **Risks & mitigation** assess engineering judgment about what could go wrong.
- **Argument & revision** grades the proposal as technical communication and rewards iteration.

## CP4 — Pitch Presentation #1
*Persuade + recruit · Individual · Course weight: 8%*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Problem/solution clarity | 20 | Audience grasps the need and idea immediately | Clear | Somewhat muddled | Confusing |
| Persuasiveness & recruiting | 25 | Compelling enough to attract teammates; clear call to join | Persuasive | Flat | Unconvincing |
| Feasibility defense | 15 | Defends scope/tradeoffs convincingly | Defends adequately | Shaky | Cannot defend |
| Handling of questions | 15 | Direct, composed, honest under questioning | Handles most questions | Struggles | Deflects/unable |
| Slide & visual quality | 10 | Clean, purposeful visuals | Serviceable | Cluttered | Poor/absent |
| Delivery & professionalism | 15 | Confident, well-paced, within time | Solid delivery | Uneven/over time | Unprofessional |

**Criterion explanations.**
- **Persuasiveness & recruiting** is weighted highest because Week-5 is the course hinge: a pitch *succeeds* if it convinces classmates to join. This is the one rubric where audience effect is part of the grade.
- **Feasibility defense** and **Handling of questions** test whether the student can think on their feet about their own project's risks.
- **Slide quality** and **Delivery** assess pitch craft as a professional communication skill.
- Note: peer evaluation scores feed instructor judgment here, but the grade is the instructor's.

---

# Phase 3 — Develop & Design

## CP5 — Design Document
*Team (or solo) · Course weight: 12%*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Architecture clarity | 20 | Components, interfaces, data, and external services clearly modeled | Architecture clear | Partial/ambiguous | Missing or incoherent |
| Appropriate detail | 15 | Right altitude — neither hand-wavy nor over-specified | Mostly right | Too shallow or too deep | Unusable |
| Tech choices & rationale | 15 | Choices justified against alternatives | Choices justified | Asserted, little rationale | Unjustified |
| Data & interface design | 15 | Sound data model and interface sketch | Present and reasonable | Incomplete | Missing |
| Risk & open questions | 10 | Honest risks and open questions surfaced | Some risks noted | Token | None |
| Implementability | 15 | Plan clearly buildable in the timeframe | Buildable | Doubtful | Not actionable |
| Readability & revision | 10 | A future contributor could navigate it; visible revision | Readable; some revision | Rough | Poor / no revision |

**Criterion explanations.**
- **Architecture clarity**, **Data & interface design**, and **Tech choices & rationale** are the core engineering content — can the team show the system's shape and defend its decisions.
- **Appropriate detail** is a 300-level judgment skill: documenting enough without over-specifying.
- **Implementability** ties the design to the one-semester MVP reality.
- **Readability** is graded through the *future-contributor* lens central to the course — the doc must serve a stranger who joins the project.

## CP6 — Git Workflow Lab
*Team (or solo) · Part of the 12% "Git + Tech-Comm" bundle (with CP9)*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Commit hygiene | 25 | Logical, atomic commits; clear, conventional messages | Mostly clean | Noisy/uneven | Dumps; poor messages |
| Branch & PR workflow | 25 | Correct maintainer-centered branch→PR→review→merge flow | Workflow followed | Inconsistent | Not followed |
| PR quality | 20 | Reviewable, scoped PRs using the template | Reasonable PRs | Large/unclear PRs | Unreviewable |
| Review participation | 20 | Substantive, constructive review comments on peers' PRs | Some real review | Rubber-stamp | None |
| Team git standards | 10 | Standards documented and actually followed | Documented | Vague | Absent |

**Criterion explanations.**
- This lab grades *mechanics under a real workflow*, not git trivia. The emphasis is the **maintainer-centered** model (branch → logical commits → draft PR → review → merge under policy), not fork-and-upstream.
- **Review participation** is weighted because reviewing others' code well is a graded skill in its own right, not a formality.
- **Team git standards** rewards setting and honoring the team's own conventions — founders write the norms.

## CP7 — Project Infrastructure Package
*Team (or solo) · Course weight: 12%*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Completeness | 25 | All required files present and substantive (README, LICENSE, CONTRIBUTING, COC, issue/PR templates, onboarding) | Nearly all present | Several gaps | Skeletal |
| Newcomer usability | 25 | A stranger can install, run, and start contributing from the docs alone | Mostly self-serve | Needs hand-holding | Unusable |
| License appropriateness | 15 | License chosen and justified for the project's goals | Appropriate license | License present, unjustified | Wrong/missing |
| Governance & comms norms | 15 | Clear maintainer expectations, channels, decision norms | Present | Vague | Absent |
| Professionalism & consistency | 10 | Polished, consistent, credible as a real OSS project | Solid | Uneven | Sloppy |
| Contributor-readiness | 10 | Clearly built for others to join and build on | Mostly | Partial | Not considered |

**Criterion explanations.**
- **Completeness** maps directly to the required repository artifacts in design §10.
- **Newcomer usability** is the package's real test — can someone who's never seen the repo get started? This is verified again in the Week-11 repo audit.
- **License appropriateness** rewards a *justified* choice, not just dropping in MIT by reflex.
- **Governance & comms norms** capture the founder-defining-the-rules emphasis.
- **Contributor-readiness** asks whether the project is genuinely ready for others to join and build on — a defining founder responsibility.

---

# Phase 4 — Implement & Build

## CP8 — Project Plan & Roadmap
*Team (or solo) · Course weight: 8%*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Work breakdown | 25 | Coherent epics → milestones → issues; right granularity | Reasonable breakdown | Coarse/uneven | Vague list |
| Prioritization & estimation | 20 | Prioritized backlog with credible estimates | Prioritized | Some prioritization | None |
| Definition of done | 15 | Clear, testable DoD | Present | Vague | Absent |
| Contribution pathways | 20 | Good-first-issues and labels invite future contributors | Some starter tasks/labels | Minimal | None |
| Roadmap into future | 20 | Credible roadmap into a future semester/team | Roadmap present | Thin | Missing |

**Criterion explanations.**
- **Work breakdown** and **Prioritization & estimation** assess turning vision into manageable, sequenced work.
- **Definition of done** grades whether the team has a shared, checkable bar for completion.
- **Contribution pathways** and **Roadmap into future** are weighted heavily because *creating on-ramps for future contributors* is a defining course goal, not an afterthought.

## CP9 — Technical Communication Portfolio
*Individual evidence within the team · Completes the 12% "Git + Tech-Comm" bundle*
*Contents: 2 bug reports, 1 feature request, 1 PR description, 2 review comments, 2 responses to feedback — graded on quality, not completion.*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Precision & clarity | 25 | Exact, unambiguous; reader knows precisely what's meant | Clear | Some ambiguity | Vague/confusing |
| Completeness | 25 | Bug reports include reproduction, expected vs. actual; requests fully framed | Mostly complete | Missing elements | Incomplete |
| Actionability | 20 | A maintainer could act immediately | Actionable | Needs follow-up | Not actionable |
| Tone & professionalism | 15 | Respectful, collaborative, on-brand for OSS | Professional | Uneven | Unprofessional |
| Responsiveness to feedback | 15 | Engages critique thoughtfully; updates accordingly | Responds adequately | Defensive/thin | Ignores |

**Criterion explanations.**
- Graded on **quality, not quantity** — the listed counts are a floor, but a thoughtful bug report beats six rote ones.
- **Completeness** is anchored to the defect/fault/failure framing taught in Week 8 (reproduction, expected vs. actual).
- **Responsiveness to feedback** assesses the two-way nature of technical communication — how the student receives and acts on review, not just how they write.

## CP10 — MVP Plan → Progress Demo + Repo Audit
*Team (or solo), with individual-contribution adjustment · Course weight: 16% (largest)*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| MVP plan quality | 15 | Sharp: what's in, what's deferred, what risk v1 addresses | Clear plan | Vague plan | Missing |
| Proves key claims (vertical slice) | 25 | Working vertical slice clearly proves project viability | Slice mostly proves it | Partial/broad-shallow | Doesn't prove the point |
| Technical coherence | 15 | Clean, coherent implementation aligned to the design | Mostly coherent | Patchy | Incoherent |
| Demo readiness | 15 | Smooth, well-framed live demo | Works with minor hiccups | Rough | Fails to demo |
| Repo audit (peer onboarding) | 15 | A peer clones, builds, runs, and finds entry points unaided | Minor friction | Significant friction | Cannot build/run |
| Documentation & honesty | 10 | Limitations and known issues documented candidly | Documented | Thin | Absent/overclaims |
| Individual contribution | 5 | Git history/PRs show real, balanced contribution | Evident contribution | Uneven | Little/none |

**Criterion explanations.**
- **Proves key claims** is the heaviest single criterion in the course: an MVP's job is to *prove the project's core viability* via a vertical slice, not to be broad and shallow.
- **Repo audit** operationalizes contributor-readiness — a classmate must clone, build, run, and locate where a new feature would go. This is the buildability gate.
- **Documentation & honesty** rewards candor about limitations over polish that oversells.
- **Individual contribution** is where the team grade is adjusted by per-student git/PR evidence and peer evaluation (design §8).

---

# Phase 5 — Launch & Reflect

## CP11 — Launch & Onboarding Package + Retrospective
*Team (or solo) · Part of the 10% "Final" bundle (with CP12)*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Launch-package completeness | 30 | Architecture overview, roadmap, known-issues, tech-debt log, onboarding all present and useful | Mostly complete | Gaps | Skeletal |
| Setup verification | 15 | Setup independently reproducible from docs | Reproducible with minor friction | Unclear | Fails |
| Retrospective honesty & insight | 25 | Candid about what held, what the MVP validated, what's next | Honest reflection | Surface-level | Missing/spin |
| Future-work framing | 20 | Compelling, realistic next steps without overselling | Reasonable | Vague | Absent or inflated |
| Contributor-readiness | 10 | A new contributor could get up to speed and start building | Mostly | Partial | No |

**Criterion explanations.**
- **Launch-package completeness** and **Setup verification** assess whether a new contributor can actually get the project running and start building — the central deliverable of the course.
- **Retrospective honesty & insight** is weighted heavily because honest reflection (what assumptions held, what the MVP truly validated) is graded over a rosy narrative.
- **Future-work framing** rewards a credible roadmap that doesn't oversell — the lead may pitch this to capstone faculty.

## CP12 — Final Pitch + Demo (Mastery Artifact)
*Team (or solo) · Completes the 10% "Final" bundle · Defended in the finals-week demo day (capstone faculty invited)*

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| "What need does this serve?" | 20 | Need is vivid, real, and evidence-backed | Clear need | Vague | Unconvincing |
| "What has been built?" (live demo) | 25 | Confident live demo of a working slice | Working demo | Shaky/partial | Fails |
| "Where does it go next, and how can others join?" | 20 | Compelling, concrete case for how others can join and keep building | Clear | Thin | Missing |
| Integration | 15 | Ties discovery → proposal → design → build into one coherent story | Mostly coherent | Disjointed | No through-line |
| Persuasiveness & delivery | 10 | Polished, persuasive, well-paced | Solid | Uneven | Poor |
| Q&A handling | 10 | Direct, honest, composed with faculty | Handles most | Struggles | Cannot |

**Criterion explanations.**
- The first three criteria are the **three questions the final must answer** (design §7, Week 14) — they're the spine of the mastery artifact and together carry most of the weight.
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
- **Peer-evaluation system:** drafted — see `development/Peer-Evaluation-System.md` (design + grade-flow mechanics), `resources/Pitch-Evaluation-Sheet.md` (Pitch Day instrument), and `resources/Peer-Evaluation-Form.md` (midpoint/end confidential evals).
- **Revision-window mechanics** (how regrades after revision are averaged or replaced) should be pinned down before the term.
