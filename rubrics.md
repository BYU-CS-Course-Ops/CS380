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
*Team (or solo) · Part of the 12% Git + Tech-Comm bundle, with CP9* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Commit hygiene | 25 | Logical, atomic commits; messages pass the seven rules and explain why | Mostly clean; messages say what changed | Noisy or uneven; "WIP"/"fixed stuff" in the history | Dump commits; messages explain nothing |
| Branch & PR workflow | 25 | Issue → branch → PR → review → merge under policy, every step visible; conflict resolved in its PR | Workflow followed, minor gaps | Steps skipped or out of order | Not followed |
| PR quality | 20 | Small, scoped PRs; description gives problem, approach, and where to look first, and closes the issue | Reasonable PRs with a real description | Large or unclear; thin description | Unreviewable |
| Review participation | 20 | Substantive, kind review of another maintainer's PR; every comment on your own PR answered | Some real review; responses to most comments | Rubber-stamp ("LGTM" alone) | None |
| Project git standards | 10 | Each standard documented with its rationale, and the lab's own history follows it | Documented | Vague, or contradicted by the history | Absent |

**What it measures** (handout table, Canvas criterion description).
- **Commit hygiene** — Logical, atomic commits; clear, conventional messages in the imperative that explain why.
- **Branch & PR workflow** — The maintainer-centered flow followed correctly: branch → PR → review → merge under policy.
- **PR quality** — Scoped, reviewable PRs with descriptions that orient the reviewer.
- **Review participation** — Substantive, constructive written review of a peer's PR — a graded skill, not a formality.
- **Project git standards** — Standards documented, reasoned, and actually followed in the lab itself.

**What each criterion is looking for** (student-facing, rubrics page).
- Everything is read from the repository — its issues, pull requests, reviews, and history. That is how a project's engineering is judged in the world, too: a future contributor or a hiring manager opens the repo, not a write-up about it.
- **Commit hygiene** and **PR quality** are the record you leave for the next reader. A message that explains *why*, and a PR small enough to actually review, are what make that record useful.
- **Branch & PR workflow** is about each step being visible, including the merge conflict resolved inside its PR. Rewriting a branch before it merges (force-pushing over commits your reviewer read) erases the evidence; squash-merging afterward does not.
- **Review participation** is weighted as heavily as PR quality because reviewing someone else's code well is a skill in its own right. "LGTM" with nothing else is a rubber stamp; a real question counts as substance. Answering the comments on your own PR counts here too.
- **Project git standards** asks whether your project wrote its own norms, gave a reason for each, and then actually followed them.

**Instructor notes.**
- This lab grades *mechanics under a real workflow*, not git trivia. The emphasis is the **maintainer-centered** model (branch → logical commits → draft PR → review → merge under policy), not fork-and-upstream.
- **Review participation** is weighted because reviewing others' code well is a graded skill in its own right, not a formality.
- **Project git standards** rewards setting and honoring the project's own conventions — founders write the norms.

## CP7 — Project Infrastructure Package
*The front door a stranger walks through · Team (or solo) · Course weight: 12%* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Completeness | 25 | All eight items present and substantive — README, LICENSE, CONTRIBUTING, code of conduct, templates + labels, setup placeholder, communication norms, seed issues | All present; one or two thin | One or two missing, or several present in name only | Most missing or skeletal |
| Newcomer usability | 25 | A stranger can say what it is, its honest status, and their first step from the docs alone; the partner's cold read was acted on | Mostly self-serve; one question a stranger would still have to ask | The first sentence or the first step is unclear; a stranger needs the author | A stranger can't tell what this is or how to help |
| License appropriateness | 15 | Exact text, fields correct, and a rationale that argues this license for this project against a real alternative | Correct license with a reasonable rationale | License present but unjustified, or fields wrong | Missing, or a poor fit for the project's stated goals |
| Governance & comms norms | 15 | Channels, keepable response times, who maintains, how decisions get made, and a working conduct-reporting contact | All present; one vague or optimistic | Several missing, or promises no student project can keep | Absent |
| Professionalism & consistency | 10 | Consistent names, promises, and links across every file; every item merged through a reviewed PR | Minor inconsistencies or a broken link | Files contradict each other, or pushed straight to main | Sloppy; reads as unfinished |
| Contributor-readiness | 10 | Templates ask for what a maintainer needs; labels support triage; 2–3 real seed issues written to the templates' own standard | Templates and labels in place; seed issues adequate | Stock templates unadapted, or seed issues vague | No templates or seed issues |

**What it measures** (handout table, Canvas criterion description).
- **Completeness** — All eight front-door items are in the repository and each one does its job, not just exists.
- **Newcomer usability** — From the README and CONTRIBUTING alone, a stranger can tell what the project is, what works today, where it's going, and how to start helping.
- **License appropriateness** — The exact license text, correctly filled in, with a recorded rationale for why it fits this project's goals.
- **Governance & comms norms** — A contributor knows where to talk, how fast to expect a reply, who decides, and how to report a problem — and every promise is one you can keep.
- **Professionalism & consistency** — The files agree with each other and the repository, links work, and everything shipped through reviewed pull requests.
- **Contributor-readiness** — Templates, labels, and seed issues make a good contribution the easy one to make.

**What each criterion is looking for** (student-facing, rubrics page).
- Everything is read from the repository, the way a stranger meets it: logged out, with no one to ask. That's how a potential contributor, a user, or an employer meets any project in the world.
- **Completeness** and **Newcomer usability** carry half the points between them. Completeness asks whether each of the eight items is there and doing its job; Newcomer usability asks whether the README and CONTRIBUTING actually orient someone. The README's first sentence and an honest status line matter more than length. **Someone else has to read it cold:** a front door no one has tested on a stranger tops out at Proficient here *(in this course, your partner's Stranger's Read sheet, photographed and submitted with CP7)*.
- **A project that doesn't run yet should say so.** "Not runnable yet — see `docs/setup.md`", with a placeholder that names the stack and links the issue tracking the real guide, earns full credit. A quickstart that fails costs you under both Newcomer usability and Professionalism. *(Install and run are graded later, in the repo audit, once there's code to set up.)*
- **License appropriateness** rewards a reasoned choice, not a particular license. MIT can score Exemplary if the rationale argues it for your project's goals; any license scores poorly if the only reason is that it's the default.
- **Governance & comms norms** is graded on credibility. "Reviews within a week" from a one-person student project is a promise a contributor can rely on; "24/7 support" is not. Solo founders still owe an answer to "how do decisions get made?": how does someone else's proposal get decided, and where?
- **Professionalism & consistency** catches the front door that contradicts itself: a README promising Discord when the norms say issues only, a CONTRIBUTING that links a file that isn't there. Shipping every item through a pull request is part of it: the process documents itself.
- **Contributor-readiness** asks whether your templates, labels, and seed issues make the right contribution the easy one. Whatever a template asks for is what you'll get, so adapt the stock forms to what you actually need.

**Instructor notes.**
- **Completeness** maps to the front-door subset of design §10's required repository artifacts. The setup guide is a *placeholder* in CP7 (stack + tracking issue); the full guide is written and partner-cold-tested in Session 20 and followed by the Session 22 auditor.
- **Newcomer usability** does *not* grade install/run — that's CP10's *Repo audit* criterion. Evidence for the partner read: the photo of the Stranger's Read sheet submitted with CP7, and PRs/issues that cite it. Grade the repo at the `cp7` tag, not at main. A missing read caps this criterion at Proficient — but only for a founder who skipped it: if a partner is absent, the instructor reads, and an odd count makes a triple that rotates (each person reads one repo and is read by one).
- **Governance & comms norms** is the founder-defining-the-rules emphasis: the public parts of the team charter, rewritten for strangers. The code of conduct's reporting contact belongs here, not under Completeness.
- **Contributor-readiness** is graded on the machinery (templates, labels, seed issues); the *welcome* lives in Newcomer usability via CONTRIBUTING. Keep them separate when scoring so one weak file isn't penalized twice.
- One grade per project; on team projects, adjusted by individual contribution (design §8).


# Phase 4 — Implement & Build

## CP8 — Project Plan & Roadmap
*Your plan, in public · Team (or solo) · Course weight: 8%* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Work breakdown | 25 | Epics named for value; every M1 issue one coherent, reviewable change with checkable acceptance criteria; M2 coarse but real; seed issues triaged; the board is public and true | A sound breakdown; a few issues too big, too vague, or missing acceptance criteria | Epics that are really components, or issues without acceptance criteria; the board out of date or private | A list of features, not a plan someone could work from |
| Prioritization & estimation | 20 | Ordered with the slice and the riskiest work first; every M1 issue sized; the capacity arithmetic shown, and M1 cut to fit | Ordered and sized; capacity checked loosely | Some order or some sizes; no capacity check | No order and no sizes |
| Definition of done | 15 | Every item checkable (the test command named, what "docs updated" means, who confirms); linked from CONTRIBUTING | Revisited and mostly checkable; one item vague | Unchanged since CP6, or mostly items no one could check | Absent |
| Contribution pathways | 20 | 2–3 genuinely small starting-point issues, each with a *Where to start*; labels in use and explained in CONTRIBUTING; the board and roadmap linked from the front door | Starting points marked; one thin on context | Marked but not approachable, or no context to start from | No way in for a newcomer |
| Roadmap into the future | 20 | Next and later work in order, with what was cut and why; each item framed as a place to help; non-goals stated | A credible roadmap; thin on what was cut or where others fit | A wish list with no order or reasoning | Missing |

**What it measures** (handout table, Canvas criterion description).
- **Work breakdown** — The MVP is cut into epics of user-visible value and issues someone could pick up, each with acceptance criteria, grouped into dated milestones on a public board that shows real state.
- **Prioritization & estimation** — The backlog is in order, every M1 issue is sized, and the hours were counted — M1 fits the time that actually exists, or something was cut.
- **Definition of done** — The project-wide bar every change must pass, revisited in your git standards now that there's code, so each item can be checked.
- **Contribution pathways** — A newcomer can find a real place to start, and has what they need to start it without asking.
- **Roadmap into the future** — Where the project goes after the MVP, as others join — written down, honest about what was cut, and framed as places to help.

**What each criterion is looking for** (student-facing, rubrics page).
- Everything is read from the repository and the board, logged out, the way a would-be contributor meets a project: no spreadsheet, no explanation from you. A private board can't be graded, so check its visibility.
- **The defaults are defaults.** A task form, an `epic` label, the five board columns, and a `needs triage` label are one good way to do each job, not the only one. Changing any of them costs nothing here, provided CONTRIBUTING says what you do instead and why. A board with no review state is the exception: every project works through pull requests, so keep one.
- **Work breakdown** is graded on the issues as much as the epics. The test for an issue is whether it's one coherent change one person could carry and a reviewer could review as a unit, and whether its acceptance criteria are checkable: "checkout works" is a hope, "an item that's already out can't be checked out again" is a criterion. Detail M1 fully and M2 loosely; that's the right shape, not a shortcut.
- **Prioritization & estimation** rewards honesty over ambition. Show the capacity arithmetic (who, how many hours, how many weeks) and what you cut to make M1 fit. An M1 that was trimmed scores higher than an impressive one that couldn't fit.
- **Definition of done** lives in your git standards from CP6; don't copy it into a new file. It's graded on whether a reviewer could check each item, now that there's code to test.
- **Contribution pathways** and **Roadmap into the future** carry 40% together, on purpose: a plan that only serves the people building it today is half a founding artifact. A starting-point issue with no context is a trap, not an invitation. The roadmap is allowed to dream, as long as dreams are labeled as dreams.

**Instructor notes.**
- Grade the repository and the public board as of the due date; the submission is the board URL. If the board is private, ask for it to be made public before grading rather than scoring it as missing.
- **Work breakdown** and **Prioritization & estimation** assess turning vision into manageable, sequenced work. Sizes are taught in Session 18 (t-shirt + "does M1 fit?"); accept any consistent scheme. The slice statement on M1 belongs here and becomes CP10's commitment.
- **Departures from the defaults** (task form, `epic` label, columns, intake mechanism) are never a deduction when CONTRIBUTING gives the reason; an unexplained gap is graded as a gap. Only the review state on the board is fixed.
- **Definition of done** stays a section of `docs/git-standards.md` (decided Oct 2026; v4 §10 updated). Grade the revision since CP6, not the existence of a file.
- **Contribution pathways** and **Roadmap into the future** are weighted heavily because *creating on-ramps for future contributors* is a defining course goal, not an afterthought.
- One grade per project; on team projects, adjusted by individual contribution (design §8).

## CP9 — Technical Communication Portfolio
*Individual · Completes the 12% Git + Tech-Comm bundle, with CP6* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Precision & clarity | 25 | Exact and unambiguous throughout; the reader never has to guess what's meant | Clear, with an occasional loose phrase | Some ambiguity a reader would have to ask about | Vague or confusing |
| Completeness | 25 | Every bug report has the full anatomy; the feature request frames the need, the user, and the workaround | Mostly complete; one part thin | Key parts missing, such as expected vs. actual or the environment | Incomplete throughout |
| Actionability | 20 | A maintainer could act on each artifact immediately | Actionable, with a question or two | Needs a round of follow-up before anyone can act | Not actionable |
| Tone & professionalism | 15 | Respectful and collaborative, including when critical; on the work, not the person | Professional | Uneven; curt or careless in places | Unprofessional |
| Responsiveness to feedback | 15 | Engages critique thoughtfully; fixes it, or explains a reasoned disagreement | Responds adequately | Defensive or thin | Ignores feedback |

**What it measures** (handout table, Canvas criterion description).
- **Precision & clarity** — Exact and unambiguous — the reader knows precisely what's meant on the first pass.
- **Completeness** — Bug reports carry steps to reproduce and expected vs. actual; feature requests state the need, the user, and the workaround.
- **Actionability** — A maintainer could act immediately — no follow-up questions required.
- **Tone & professionalism** — Respectful and collaborative — even, especially, when critical.
- **Responsiveness to feedback** — Critique engaged thoughtfully — a change made, or a disagreement explained — without defensiveness.

**What each criterion is looking for** (student-facing, rubrics page).
- The portfolio is graded as a whole, on the writing itself. The counts (two bug reports, one feature request, and so on) are a floor for coverage, not the score. One careful bug report outweighs six rote ones.
- **Precision**, **completeness**, and **actionability** are one question asked three ways: could the person reading this act on it without coming back to you? That's the bar for every bug report and pull request you'll write at work, too.
- **Completeness** follows the bug-report anatomy from Session 15. For the feature request, it means a need and a user, not a solution order.
- **Responsiveness to feedback** is the two-way half of the skill. A disagreement handled well ("I kept it because X; happy to revisit if Y") counts as much as a fix.
- Your one- or two-sentence note on each artifact is read. It shows you can tell your best writing from your most recent.

**Instructor notes.**
- Contents: 2 bug reports, 1 feature request, 1 PR description, 2 review comments, 2 responses to feedback — graded on **quality, not quantity**. The counts are a floor; a thoughtful bug report beats six rote ones.
- **Completeness** is anchored to the defect/fault/failure framing taught in Week 8 (reproduction, expected vs. actual).
- **Responsiveness to feedback** assesses the two-way nature of technical communication — how the student receives and acts on review, not just how they write.

## CP10 — Progress Demo + Repo Audit
*Working and joinable · Team (or solo), with individual-contribution adjustment · Course weight: 16% (largest)* · **published**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| MVP plan quality | 15 | In and deferred both named, throwaway corners labeled; the risk tied to its evidence; ranked claims, a falsifier, a three-line script, and a real fallback | All four parts present and clear; the claims or the fallback a little thin | Features listed without claims, or nothing honestly deferred, or no fallback | Missing, or a wish list |
| Proves key claims (vertical slice) | 25 | The whole slice walks, end to end, on real code and data, and each claim in the plan is visibly proven or honestly reported as not | The slice walks with a gap or two, and the main claim is proven | Parts of the slice work but don't connect, or many screens with nothing wired behind them | Nothing walks end to end; the demo can't prove the point |
| Technical coherence | 15 | Built as designed, or every departure recorded in the design doc; code organized and readable; at least one test exercises the slice's core logic | Mostly as designed; a departure or two not written down | Patchy; the code and the design tell different stories | No recognizable relation to the design |
| Demo readiness | 15 | Claim first, slice walked smoothly in time, an honest edge named, questions answered directly (or a fallback run calmly) | Works, with minor hiccups or a loose frame; or a declared clip run calmly after the live demo failed | Rough; over time, unframed, or a failure with no fallback ready | No demo |
| Repo audit (peer onboarding) | 15 | The auditor builds, runs, and locates the code for a starter issue unaided, following the guide as written | Minor friction; the auditor gets through with a small guess or workaround | Significant friction; steps missing or wrong, the way in unclear | The auditor can't build or run it from the docs |
| Documentation & honesty | 10 | A known-issues list naming the labeled throwaway corners, the deliberate cuts, and the open bugs; README status true; the demo's claims match the code | Limitations documented; a gap or two | Thin; a known limitation left unsaid | Nothing documented, or claims the code doesn't support |
| Individual contribution | 5 | Team: every member's work visible in commits, PRs, and reviews, reasonably balanced. Solo: steady, reviewable PRs across the fortnight | Team: contribution evident from everyone, somewhat uneven. Solo: steady work, with one or two oversized PRs | Team: uneven, one member's work hard to find. Solo: most of the work in a final burst | Little or no contribution visible |

**What it measures** (handout table, Canvas criterion description).
- **MVP plan quality** — The one-page plan: what's in, what's deferred, the risk v1 retires, and a demo plan that states the claims it will prove. Graded from the revision due Nov 11.
- **Proves key claims (vertical slice)** — The slice, walked end to end, proves what the plan said it would: the need is served, the risky part works, a user can get through. The heaviest single criterion in the course.
- **Technical coherence** — What was built matches what the design argued, or the design was updated where it changed; the code is organized so a contributor could find their way.
- **Demo readiness** — A live demo inside the time box that opens with the claim, walks the slice, names an honest edge, and handles trouble with a fallback rather than a restart. A declared recorded clip caps this at Proficient, unless the room failed.
- **Repo audit (peer onboarding)** — A classmate who has never seen the project clones it, follows your setup guide exactly, runs it, and finds where a new feature would go, from your docs alone.
- **Documentation & honesty** — What doesn't work yet is written down where a newcomer will see it, and the README and demo claim no more than the code does.
- **Individual contribution** — Git history, pull requests, and reviews show real, reasonably balanced contribution from each member. Solo: the work arrives across the fortnight in reviewable pull requests, not in one late dump.

**What each criterion is looking for** (student-facing, rubrics page).
- **Working and joinable.** CP10 tests the two things a founded project has to be, with the two instruments that can't be faked: a slice walked live, and a stranger following your docs with no one to ask.
- **Proves key claims** is the heaviest criterion in the course, and it rewards depth over breadth. One flow walked end to end, on real code and real data, proves more than ten screens with nothing behind them. A demo that shows a claim *wasn't* proven, and says so, can still score well here; a broad tour that proves nothing can't.
- Your demo is scored against your MVP Plan. If the plan changed between Nov 11 and the demo, amend the plan in the repo: a visible change is honesty, a quiet one reads as a miss.
- **Documentation & honesty** is read from the repository at your `cp10` tag: a known-issues list (`docs/known-issues.md` is the default) with the throwaway corners you labeled, the cuts you made, and the bugs you know about. A short honest list scores higher than none, and "no known issues" reads as "we didn't look."
- **Repo audit** is graded on what the auditor experienced, not on how hard you worked. The auditor doesn't score you: their sheet records what happened (did it build and run from the guide as written, where did they stall), and the instructor assigns the level from it. The auditor works from your docs alone, with no one to ask: a hint would hide exactly the gap the next stranger falls into.
- **Individual contribution** is read from the commits, pull requests, and reviews, so work done off the record doesn't show here. On a team it's how one project grade becomes fair to each member. Solo, it rewards working in the open: small pull requests across the fortnight, the way a contributor would see the project grow.
- Everything read from the repository is read at your `cp10` tag, pushed by 11:59 pm the night before. A recorded clip is a declared last resort: it caps **Demo readiness** at Proficient unless the failure was the room's.

**Instructor notes.**
- **Proves key claims** is the heaviest single criterion in the course: an MVP's job is to *prove the project's core viability* via a vertical slice, not to be broad and shallow. Score against the MVP Plan's ranked claims as revised (or visibly amended).
- **Repo audit** operationalizes contributor-readiness: a classmate must clone, build, run, and locate where a new feature would go. The instructor assigns the level (decided Oct 2026); the auditor's sheet is factual evidence, not a score. Students audit each other at the same time (decided Oct 30), so the instructor is the only observer: watch the audits or repeat the hardest step, and discount stalls a reasonable newcomer wouldn't hit.
- **Documentation & honesty** rewards candor about limitations over polish that oversells. Grade the repo at the `cp10` tag (freeze by tag, decided Oct 2026). `docs/known-issues.md` is introduced as the default in Session 19 and grows into CP11's known-issues and tech-debt log; a Known issues section in the README is an acceptable alternative.
- **Technical coherence:** the MVP testing floor is Exemplary-only (decided Oct 2026): at least one test on the slice's core logic is needed for Exemplary, and missing it caps nothing below that.
- **Demo readiness:** the recorded-clip cap (Proficient) is waived when the failure is the room's — projector, network, classroom machine — not the project's.
- **Individual contribution** is where the team grade is adjusted by per-student git/PR evidence and peer evaluation (design §8).


# Phase 5 — Launch & Reflect

## CP11 — Launch Package + Retrospective
*Team (or solo) · Part of the 10% Final bundle, with CP12* · **draft — not yet in student-facing wording**

| Criterion | Wt | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1) |
|---|---|---|---|---|---|
| Launch-package completeness | 30 | All present, current, and genuinely useful; the architecture matches what was built, and the log names every corner, cut, and open finding | All present; one is thin or a little out of date | One missing, or several stale or thin | Most missing, or present only as headings |
| Setup verification | 15 | The tester got it running, tests passing, from the docs alone; anything they hit is fixed or logged | Running with minor friction, and the friction fixed or logged | Ran only with help, or stalls left unaddressed | The tester couldn't get it running, or no test happened |
| Retrospective honesty & insight | 25 | Each major claim checked against evidence; refuted assumptions stated plainly with what was learned; changes you'd make are specific | Honest and mostly evidence-based; some claims asserted rather than checked | Surface-level, or a victory lap, or a list of regrets | Missing, or spin the repository contradicts |
| Future-work framing | 20 | Specific, sequenced next steps a newcomer could start on; claims only what the foundation supports | Reasonable next steps, a little general | Vague ("add more features"), or disconnected from the roadmap | Absent, or promises the code can't support |
| Contributor-readiness | 10 | All five needs pass in the onboarding test, and the test on the core logic checks something real | The five needs mostly met, and the testing floor met | Gaps in the five needs, or no automated test on the core logic (a missing test caps this here) | A newcomer couldn't get started |

**What it measures** (handout table, Canvas criterion description).
- **Launch-package completeness** — The package pieces are in the repository at the launch tag, each true and useful to a newcomer: the architecture overview, the roadmap, the known-issues and tech-debt log, and the onboarding guide.
- **Setup verification** — A classmate who hadn't seen the project set it up from your docs alone in the onboarding test, and you fixed or logged whatever they hit. The signed checklist is the evidence.
- **Retrospective honesty & insight** — Your claims from the start of term checked against what happened: what held, what didn't, what the MVP validated, and what you'd do differently. Evidence over narrative, weighted heavily on purpose.
- **Future-work framing** — Where the project goes next as others join: next steps a serious outside reader could believe, whether a potential contributor, a maintainer, or a faculty member weighing it for a capstone.
- **Contributor-readiness** — Could a new contributor get up to speed and start building? The five newcomer needs answered, and at least one automated test on the core logic so a newcomer can tell whether they broke something.

**What each criterion is looking for** (student-facing, rubrics page).
- **Writing it down well enough to be picked up.** Everything in the package should be true at the launch tag. A short, accurate document beats a long, stale one, because a newcomer trusts what they read.
- **Retrospective honesty** rewards checking claims, not defending them. A refuted assumption, documented with what you learned, scores *higher* than a victory lap. The retrospective is cross-checked against the repository and the onboarding test: a retro that claims "smooth onboarding" over a failed setup step reads as spin.
- **Blameless means blameless.** Causes live in assumptions and systems ("we assumed the API was free; it rate-limited us"), never in named people.
- **Future-work framing** is read by someone deciding whether to join. Say what a newcomer would do first, and claim only what the code supports.
- **The testing floor:** at least one automated test on the slice's core logic, run by the command your setup guide names, passing at the launch tag. Without one, *Contributor-readiness* caps at Developing.

**Instructor notes.**
- **Launch-package completeness** and **Setup verification** assess whether a new contributor can actually get the project running and start building — the central deliverable of the course. Grade at the `v0.1-launch` tag; the signed Contributor-Readiness Checklist from the onboarding test is the evidence for Setup verification.
- **Retrospective honesty & insight** is weighted heavily because honest reflection (what assumptions held, what the MVP truly validated) is graded over a rosy narrative. Cross-check it against the repo and the onboarding-test sheet.
- **Future-work framing** rewards a credible roadmap that doesn't oversell — the lead may pitch this to capstone faculty.
- **Testing floor (decided Oct 30):** CP11 requires at least one automated test on the slice's core logic; missing it caps *Contributor-readiness* at Developing. This raises CP10's Exemplary-only rule because CP11 asks whether someone else can safely change the code.

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
