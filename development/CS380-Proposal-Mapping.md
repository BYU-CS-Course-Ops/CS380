# CS 380 Proposal vs. CS 301R: Mapping, Drops, and Additions

*Analysis written Oct 17, 2026. It compares one proposal for the course's future, **CS 380 — SE Studio 1: Course Design** ([leesjensen.com/sestudio/CS380-Course-Design.html](https://leesjensen.com/sestudio/CS380-Course-Design.html)), with CS 301R as built for Fall 2026 (`CS301R-ProjectCreation_v4.md`, `CS301R-Course-Summary.md`, the 27 outlines, and `canvas_material/`).*

*How to read it:* the CS 380 page is **one proposal, not a settled plan**. Everything below describes what adopting it would imply. Where it conflicts with the earlier [SE Studio Program Outline](https://leesjensen.com/sestudio/SE%20Studio%20Program%20Outline.html) by the same author, **the CS 380 page wins**, since it's the newer refinement. The program outline is used only for what the CS 380 page doesn't cover: the shape of CS 480, CS 481, and the parallel support courses.

---

## 1. The two courses side by side

| | CS 301R (Fall 2026, as built) | CS 380 (proposal) |
|---|---|---|
| **End product** | Each team (or solo founder) has a **launched, contributor-ready open-source MVP** | **One integrated design package** for the whole class, handed to CS 480; no product is built |
| **Ownership** | Founder-led; the founder can become the capstone sponsor | Faculty select the direction; the class becomes one studio with feature and cross-cutting teams; faculty confirm the architectural and team leads |
| **Scale assumed** | Small cohort (4 this fall), 1 instructor | 50 students, 5 faculty, 5 paid mentors (1:10 each) |
| **Teams** | Individual weeks 1–5 → teams at Pitch Day → same team to the end; solo allowed | Teams of 4 from Week 1; clustered, merged, and redirected at every block end; whole class merges in Week 12 |
| **Shape** | Five CPS phases of uneven length, 12 checkpoints, one big convergence (Pitch Day) | Five identical 3-week blocks (Launch · Practice · Build · Review · Revise · Demo), 5 checkpoints, a selection event every 3 weeks |
| **Selection** | Peer scoring + ranked preferences + instructor's final say; nobody's idea is killed | Faculty decide against published criteria; class feedback informs it; "popularity votes do not determine it" |
| **Building** | ~5 weeks of real building (Weeks 9–13) | Prototypes and technical probes only (Weeks 10–11) |
| **Open source** | The core identity: license, governance, CONTRIBUTING, templates, onboarding | Not mentioned on the CS 380 page beyond "initial license considerations" (Week 5B), though the program outline makes open source a program-wide goal |
| **Enterprise topics** | Light: design doc, architecture, data model, feasibility | Heavy: compliance (FERPA/HIPAA/GDPR/SOC 2/PCI DSS), quality attributes, hosting/distributed architecture, threat modeling, ADRs, ops plans |
| **Rubrics** | 100-pt analytic, weighted criteria, 4 levels, pass conditions | 0–4 common scale, 5 unweighted criteria per checkpoint, one of them individual |
| **Individual evidence** | Peer-eval multiplier + contribution logs + git history; CP9 graded individually | A private reflection and a peer review every block; no multiplier mentioned |
| **Submission** | Canvas uploads; repo pointers from CP7 on | PR into `/docs/<stage>/` in the team repo, PR link in the LMS, revision before scoring |
| **Workload** | ~10 hrs/week total | 2.5 in class + 6.0 out (3 individual + 3 team, including a 75-min team meeting) |
| **AI** | "A tool, not the topic"; disclose, defend | BYU ChatGPT for every student; Week 1A: "use of AI to accelerate results" |

**What doesn't change.** Both courses run CPS-style: diverge, then converge, with evidence before solutions. Both put real users first and ground ethics in BYU's Aims. Both follow a Monday-teach / Wednesday-studio rhythm and grade reasoning over polish. The proposal's outcomes line up with 301R's outcomes 1–4 and its evaluation-and-judgment throughline almost word for word. **Outcomes 5–8 (open-source founding, git workflow, technical communication, build and launch) are not in the proposal.**

---

## 2. Week-by-week mapping

Legend: **●** reuse with light revision · **◐** partial (the core transfers; substantial revision or new material needed) · **○** new

### Block 1 — Frame (Weeks 1–3) → CP1 Frame

| Wk | Proposed class | Current source | | Revisions needed |
|---|---|---|---|---|
| 1A | Kickoff + team workflow (CS 380→480 arc, partner challenges, team norms, GitHub repo, issues/branches/PRs/reviews, AI) | S1 Course Launch; `Starting-Your-Repository` (S11); S13 git walkthrough; `Working-Agreements-Reading` + Team Charter (S11) | ◐ | Rewrite the hook. "Started as one or two people deciding" becomes "partner challenges" and the 380→480 arc. Compress S13's git walkthrough to ~25 min of "how we submit work here" (issue → branch → PR → review). Teams form on day one, so the charter moves from Week 6 to Week 1. The AI section needs a policy decision (see §5). |
| 1B | Know the Customer (customers, users, stakeholders, vocabulary, workflows) | S2 problem-space workshop; `Persona-Template`, `Persona-Examples` | ◐ | S2 is divergent on *needs*. 1B also wants a **stakeholder map** and domain vocabulary, which are new. The personas transfer as they are. |
| 2A | Gather Evidence (interviews, observation, questions, notes, consent, bias) | **S4 discovery workshop**; `Mom-Test-Summary`, `Good-vs-Leading-Questions`, `Interview-Prompt-Cards`, `Interview-Ethics-for-Students` (BYU IRB); the S4 ethics gate | ● | The cleanest transfer in the course. Add **observation** (it's interview-only now). The ethics gate matters even more with external partners and 50 students. |
| 2B | Frame the Problem (problem statement, affected users, scope, non-goals) | S6 convergence workshop; CP2 Product Definition Brief (users, needs, success criteria, non-goals); `Idea-Scoring-Sheet` | ◐ | Convergence happens per team, not per person. Re-aim the scoring sheet at the proposal's Frame criteria (importance, researchability, software fit). **Strip the solution and MVP language** — Frame forbids starting with a solution. |
| 3A | Pitch Proposals (problem, users, value, open questions) | S9 Pitch Workshop; `Pitch-Build-Sheet`; CP1 Idea Briefs | ◐ | It's a **problem pitch**, not a solution-and-recruit pitch. Keep the five-beat structure and the evidence line; drop the ask and recruiting beat. CP1's one-page brief shape fits the `/docs/frame/` brief once "possible MVP direction" is removed. |
| 3B | Demo + Select Direction | S10 Pitch Day; `Pitch-Evaluation-Sheet`; `Team-Preference-Worksheet` | ◐ | Serial pitches become **three 10-minute gallery rotations**. Faculty cluster frames into research tracks instead of collecting ranked preferences. The evaluation sheet becomes strength / question / next step. The preference worksheet can survive as a "which track do you want to join" form. |

**CP1 Frame ≈** CP1 Idea Briefs (one team brief, not three individual briefs) + a CP4-style pitch + a new individual reflection. CP1's rubric rows "problem/user/value" and "evidence tagging" carry over. The `[E]`/`[A]` evidence tagging lines up exactly with the proposal's "separates known facts from assumptions" criterion; keep it.

### Block 2 — Research (Weeks 4–6) → CP2 Research

| Wk | Proposed class | Current source | | Revisions needed |
|---|---|---|---|---|
| 4A | Plan Research (uncertainties → research questions, methods, sources, evidence tracking) | `Learning-Plan-Template`; `Discovery-Notes` (S5) | ◐ | New: a research-question template and a **source & method log**, which CP2 requires. Discovery Notes is the seed. |
| 4B | Study the Domain (needs, workflows, terminology, industry; synthesize) | `Discovery-Notes`; `Persona-Examples` (honest Cara vs. fabricated Ben) | ◐ | Synthesis technique (affinity mapping or similar) is new; we currently teach collection more than synthesis. Cara vs. Ben is a ready-made lesson on overclaiming. |
| 5A | **Find Constraints** (FERPA, HIPAA, GDPR, SOC 2, PCI DSS; questions for experts) | — (one passing mention in `Proposal-Anatomy-Reading`) | ○ | New session and reading. It needs the proposal's guardrail: *student reviews are not compliance certification*. Grounding it in BYU's own FERPA guidance would fit the IRB precedent. |
| 5B | Compare Solutions (existing products, OSS components, alternatives, license considerations) | S3 open source & licensing; `License-Cheat-Sheet`; the "alternatives" sections of CP1/CP3 | ◐ | Competitive and alternatives analysis becomes the main topic. **S3 shrinks to about a third of a session** (license as a *constraint on reusing components*, not as a choice the founder makes). The cheat sheet survives intact. |
| 6A | Synthesize Evidence (opportunity brief: needs, findings, feasibility, uncertainty) | CP2 Product Definition Brief; `Proposal-Anatomy-Reading` (four checks); `Sample-Proposal-Strong/Weak`; `PRD-Reference` | ◐ | The proposal pair still teaches "evidence vs. assertion" well, but both samples argue a *solution*. They need a research-brief variant, or should move to Block 3. |
| 6B | Demo + Select Opportunity | S10 format; S8 `Review-Protocol-Sheet` | ◐ | Same gallery format as 3B. The Review Protocol (strongest section / sharpest concern / one actionable suggestion) is **already strength / question / next step** under different names. Generalize it and drop the CP3 rubric strip. |

**CP2 Research ≈** Discovery Notes + CP2 Product Definition Brief, made team-level, with a method log, an alternatives comparison, constraints, and anonymized findings (`Interview-Ethics` already covers anonymization).

### Block 3 — Design (Weeks 7–9) → CP3 Design

| Wk | Proposed class | Current source | | Revisions needed |
|---|---|---|---|---|
| 7A | Model the Domain (roles, concepts, workflows, data needs) | S12 Rounds 1 (system context) and 4 (data model first cut); `context_notes/` on CS 340 Clean Architecture | ◐ | Pull these out of S12 as their own session; add domain modeling (entities and roles before tables). |
| 7B | **Design UX** (journeys, task flows, low-fi prototypes, accessibility, usability) | — | ○ | New: no journeys, wireframes, or accessibility teaching exists now. Needs a reading, a paper-prototyping studio, and a sample. |
| 8A | Define Requirements (functional + quality goals: performance, security, privacy, availability, usability, interop) | `PRD-Reference` (lists non-functional reqs); CP2/CP3 "core features / non-goals / success criteria" | ◐ | Quality-attribute scenarios are new depth. Non-goals and success criteria transfer directly. |
| 8B | Explore Architecture (languages, platforms, hosting, distributed, deployment) | S11 design-doc anatomy; S12 Round 5 (decisions & alternatives); `Design-Doc-Template`; `Sample-Design-Doc-Backstage`; `Formal-Design-Doc-NASA-Example` | ◐ | The design-doc machinery transfers, but S11/S12 are tuned to a small MVP. Comparing hosting and distributed options at enterprise scale is new. |
| 9A | Weigh Tradeoffs (cost, performance, elasticity, risk, user impact) | S5 feasibility & risk; `Feasibility-Risk-Worksheet` (six categories, "boring stack"); S8 scope-narrowing clinic | ● | A strong fit. Add cost and elasticity as risk dimensions. The narrowing moves ("cut the platform, keep the slice") carry over as written. |
| 9B | Demo + Select Design | as 6B | ◐ | — |

**CP3 Design ≈** CP3 Written Proposal + the front half of CP5 Design Document, with one structural change: **the proposal requires comparing ≥2 plausible directions**, while our proposal argues one. The `Proposal-Anatomy-Reading` needs an "alternatives considered" section added (S12 Round 5 already teaches it in miniature). New pieces: journeys and a low-fi prototype.

### Block 4 — Validate (Weeks 10–12) → CP4 Validate

| Wk | Proposed class | Current source | | Revisions needed |
|---|---|---|---|---|
| 10A | Plan Validation (assumptions → hypotheses, prioritized risks, validation plan) | **`Spikes-Reading`** (question, timebox, green/red, "red is a win"); `Feasibility-Risk-Worksheet` "de-risk the top one or two"; S19 "what must v1 prove?" | ● | Very close already. The proposal's "a prototype that disproves an assumption does not reduce a grade" is our "red is a win." Generalize spikes from technical to user/product hypotheses. |
| 10B | **Test UX** (partner feedback on journeys and prototypes) | S4 interview skills; S16 `Stranger-Read-Sheet` (cold-read protocol) | ◐ | Usability-test protocol (think-aloud, tasks, observation notes) is new. The stranger-read half-sheet is the right *shape* to copy. |
| 11A | Probe Technology (focused technical prototypes: interfaces, data flows, deployment, perf, security) | `Spikes-Reading` (technical flavor); S19 vertical slice vs. broad-shallow; S20 build studio | ◐ | The broad-shallow cautionary case (S19) still teaches the right lesson. Studio build time shrinks to probe-sized. |
| 11B | **Protect Data** (classification, access, retention, privacy, threat modeling) | `Interview-Ethics` (participant data only) | ○ | New. STRIDE-style threat modeling and data classification need a reading and a worksheet. |
| 12A | Interpret Results (tradeoffs, costs, limits, unresolved risks, expert questions) | S24 claims-check worksheet / honest framing "without overselling"; CP11 retrospective | ● | The claims-check is aimed at a launch retrospective. Re-aim it at validation findings; the "observations before conclusions" discipline is the same. |
| 12B | Demo + **Select Application**; class merges into one studio | S10/S11 hinge (anchor selection → teams announced → charter in class) | ◐ | Structurally our Pitch Day → Session 11 hinge, moved to Week 12 and scaled to 50 people. The "nobody's idea is killed" framing, morale handling, and charter-in-class sequence transfer; the mechanics (faculty choose one) don't. |

**CP4 Validate:** no current equivalent. The nearest pieces are the spike requirement inside CP3 Feasibility and the demo half of CP10. This checkpoint needs the most new handout and rubric writing.

### Block 5 — Finalize (Weeks 13–15) → CP5 Finalize for handoff

| Wk | Proposed class | Current source | | Revisions needed |
|---|---|---|---|---|
| 13A | Map Architecture (boundaries, components, data flows, dependencies, deployment; Mermaid) | **S12 diagram workshop**; CP5 Design Document; `Design-Doc-Template` ("diagrams must agree with the prose"); Backstage sample | ● | Add Mermaid / diagrams-as-code. Scale up to a system several teams share. |
| 13B | **Coordinate Teams** (feature vs. cross-cutting teams, interfaces, dependencies, leadership roles) | Team Charter; `Working-Agreements-Reading`; S13 git policies ("teach the job, give the default, allow change with a reason"); CP7 communication norms | ◐ | The charter and norms transfer. **Team-of-teams coordination** (interface contracts, cross-team syncs, ownership maps, leadership roles) is new; nothing at small-cohort scale prepares for it. |
| 14A | Plan Quality (security, privacy, QA, accessibility, deployment, ops) | CP7 Infrastructure Package (definition of done, CONTRIBUTING); S23 contributor-readiness; CP11 known-issues/tech-debt logs; MVP testing floor | ◐ | Our quality material is about repo hygiene and onboarding. Forward-looking quality *plans* (test strategy, accessibility, deployment, ops) are new. |
| 14B | **Record Decisions** (ADRs; trace requirements and risks to choices and evidence) | S12 Round 5 "decisions & alternatives" (seed only) | ○ | ADR template, reading, and a traceability matrix are new. |
| 15A | Prepare Handoff (rehearse, close gaps, next steps for CS 480) | **CP8 Project Plan & Roadmap** (epics, milestones, backlog, starter tasks); `Setting-Up-Your-Board` (S17); CP11 onboarding guide + roadmap; S26 dry-run + "three final questions" | ● | Much of the strongest late-semester material lands here. "Contributor-ready" becomes "CS 480-ready". The three questions become *what need, what's decided, what does 480 do first*. The prioritized CS 480 backlog *is* CP8. |
| 15B | Final Showcase + Celebration | CP12 Final Pitch + Demo; S27; Demo Day logistics with capstone faculty | ● | A design presentation instead of a live demo. Faculty and partner reflections replace capstone-faculty judging. |

**CP5 Finalize ≈** CP5 Design Document (architecture) + CP8 (backlog, roadmap) + CP11 (onboarding, known issues, open questions) + new ADRs, quality plan, and team-interface map.

---

## 3. What leaves CS 380, and where it lands in the sequence

*Downstream courses as sketched in the program outline (the CS 380 page doesn't describe them): CS 380 (fall, 3 cr) → CS 480 (winter, **6 cr**) → optional spring/summer → CS 481 (next fall, 6 cr). CS 329 (QA/DevOps), CS 452 (Database), and CS 348 (Agent Engineering) run alongside CS 480 against the same project.*

**Short answer:** if the proposal is adopted, most deferrals stand. The build work has a clear, larger home in CS 480. **The open-source material does not all move to 480.** The program is explicitly "open social software", but its parts are spread across all three courses and the cross-cutting teams. The outward-facing part (contributor pathways, governance, maintainership) lands at the **end of CS 481**. Two things are effectively dropped as *taught* topics: technical-communication writing and debugging. The founder arc is dropped outright.

| Current content | Where it lands | Notes |
|---|---|---|
| **MVP build**: S19–S22 studio, MVP Plan, CP10 Progress Demo, the vertical-slice lesson | **CS 480 Wk 4–11**: stands | 480 says "thin, end-to-end vertical slices" in so many words. S19's vertical-slice vs. broad-shallow session is ready-made 480 material. The demo cadence also survives: 480 holds integrated demos every two weeks plus a midterm alpha review. |
| **Git workflow lab** (CP6, S13–S14, the Prop Loft demo kit) | **CS 480 Wk 1–3**: stands, reframed | 480 opens by setting up "review, branching, build, deployment, and issue-tracking workflows"; mentors pair on git. But this is a **50-person multi-team repo behind CI gates**, not a founder reviewing contributions. The mechanics transfer; the "maintainer-centered" framing and the "each project decides its policy" stance don't. CS 380 still needs the 1A slice, because every checkpoint is submitted as a PR. |
| **CP7: internal collaboration parts** (CONTRIBUTING as dev setup, PR/issue templates, definition of done, communication norms) | **CS 480 Wk 1–3** + the Architecture & Integration team | The Architecture team "maintain[s] the developer platform, local development environment, and contribution guide." The 480 template lists "collaboration norms" and team definitions of done. |
| **CP7: license choice** | **Unassigned**, probably should stay in **CS 380** | The Compliance team "tracks open-source, content, data, and dependency licenses", and the 380 page touches licensing only as "initial license considerations." But nothing in the outline says **who chooses the project's license, or when**. Three support courses start contributing code in 480 Week 1, so the license has to be set before then, i.e. in 380 Block 5. `License-Cheat-Sheet` and the S3 license-comparison material belong there. |
| **CP7: outward governance** (CODE_OF_CONDUCT, governance model, maintainer norms) | **Split.** Community rules → **Compliance team** (ongoing). Open-source governance → **CS 481** ("Faculty teach … open-source governance and sustainability") | Most of S15's governance material is 481 content. |
| **Contributor-readiness and the stranger onboarding test** (S23, CP10 repo audit, S25, `Stranger-Read-Sheet`) | **CS 481 Wk 12–15**: stands, but two semesters later | 481 ends with "governance and support ownership… community handoff plan" and "maintainership" as a release criterion. The cold-read audit is the right tool there. Note that the same cohort goes from 380 to 481, so *internal* onboarding matters less. Outsiders (future maintainers, community deployers) are the audience. |
| **CP8 backlog / roadmap** | **Stays in CS 380** (the 15A handoff), then 480 issue tracking | Unchanged from the first pass. |
| **Retrospectives** (CP11) | **All three courses**: expands | "Retrospectives" are named Evaluate-stage evidence; mentors attend team retrospectives in 480 and coach them in 481. |
| **CP9 Tech-Comm Portfolio** (bug reports, PR descriptions, review comments, responses to feedback) | **Practiced, but not taught anywhere**: effectively dropped as instruction | 480/481 *use* these constantly: the QA team keeps a "defect taxonomy, severity definitions"; mentors review PRs. But no course or faculty role teaches writing them. Absorbed as practice, the skill tends to be learned badly. **Recommendation:** propose it as a 480 Wk 1–3 topic, or as a CS 329 deliverable (defect reports fit QA). |
| **Debugging reasoning model** (S19) | **Implicit in 480**: mentors "pair … on debugging" | No instruction is named. It's a small, portable session; offer it to 480. |
| **MVP testing floor** | **CS 480 + CS 329**: greatly expanded | Feature teams own unit and component tests; the QA team owns system-level tests; CS 329 builds the pipeline. |
| **Individual founder arc**: individual CP1–CP4, recruiting pitch, ranked preferences, solo option, founder-as-sponsor | **Dropped** | The CS 380 page forms teams of four in Week 1; faculty cluster, merge, and select directions; and the class converges on one application. The program outline is consistent with this: it assigns "product steward" to instructors or rotating students, and external collaborators participate "without becoming the product owner." |
| **Grading machinery**: 100-pt rubrics, pass conditions, the peer-eval multiplier | **Not addressed** by either page | The outline asks for "reusable rubrics" across courses. `rubrics.yaml.jinja` + `rubrics.py` is a concrete offer. |

**Net effect on what 301R hands the sequence:** the open-source and build material isn't lost, but it's spread across 480, 481, and the cross-cutting teams, with **no single owner**. 301R is currently the only place it's taught as one coherent topic. That's worth saying explicitly to the author.

## 4. What would need to be added

**Content (sessions + readings + instruments)**

1. **Regulatory and compliance constraints** (5A): reading, a "questions for a qualified reviewer" worksheet, and the not-certification guardrail.
2. **UX design** (7B) and **usability testing** (10B): journeys, task flows, paper or low-fi prototyping, accessibility basics, a think-aloud protocol sheet.
3. **Requirements with quality attributes** (8A): quality-attribute scenario template.
4. **Architecture options at enterprise scale** (8B): hosting, distributed patterns, deployment, cost and elasticity; a comparison matrix.
5. **Data protection and threat modeling** (11B): data classification, retention, a STRIDE-style worksheet.
6. **ADRs and traceability** (14B): ADR template, requirement → decision → evidence matrix.
7. **Quality planning** (14A): test strategy, accessibility, deployment, and operations plan templates.
8. **Team-of-teams coordination** (13B): feature vs. cross-cutting team design, interface contracts, cross-team sync format, leadership roles.
9. **Research methods** (4A–4B): research-question template, source and method log, synthesis technique.
10. **Stakeholder mapping** (1B) and **observation** as a method (2A).

**Process and structure**

11. **A repeated block template**: six meetings per block, each with fixed deliverables. One handout pattern (team PR + individual reflection + peer review), instantiated five times.
12. **Gallery-rotation review sessions**: station layout, rotation timing, structured feedback form, and a **faculty selection protocol** (published criteria, documented rationale, cluster/merge/redirect mechanics).
13. **Per-block individual reflection prompts** (five) and the strength / question / next step peer-review form (generalized from `Review-Protocol-Sheet`).
14. **Revise-before-score workflow** in GitHub: `/docs/frame/`, `/docs/research/`, `/docs/design-options/`, `/docs/validation/`, `/docs/design/`; PR-link submission; a revision window per block.
15. **Five new rubrics** on the 0–4 scale. The proposal already drafts them, and `rubrics.yaml.jinja` / `rubrics.py` can carry them with equal weights.
16. **Team churn handling**: students change teams every 3 weeks. That needs carry-forward rules for research, recognition of contributions from merged teams, and morale framing (the proposal names this risk).

**Operations (none of this exists, because 301R is one instructor and four students)**

17. **External partner program**: recruitment, participation agreements, a partner role at each review, and a fallback when partners withdraw. The pre-term outreach drafts in `open-source-project-course/emails/` are a start.
18. **Multi-faculty calibration**: five faculty grading against one rubric need norming sessions and shared exemplars.
19. **Mentor training**: mentors attend team meetings and coach; they need a role description, a coaching guide, and a check-in form.
20. **Room and calendar logistics**: capstone room and animation theater bookings.

---

## 5. What 301R does that the proposal doesn't, and is worth keeping in CS 380

These aren't in the CS 380 proposal, but each is cheap to keep and addresses a risk the proposal itself names.

| Keep | Why it matters in CS 380 | Where it fits | Current source |
|---|---|---|---|
| **A required early spike** | The proposal tests technical assumptions only in Week 11A, *after* design selection (9B). One small spike per team before the Design review keeps selection from resting on untested feasibility. That's the proposal's own "important technical uncertainty is deferred" risk. | Block 2 or 3 (as a Research/Design deliverable) | Spikes reading; CP3 Feasibility criterion |
| **An ethics gate before anyone talks to real people** | The proposal teaches consent but has no checkpoint. With 50 students and external partners, a hands-up gate (consent, the IRB boundary, power imbalance) is the cheapest protection the course has. | End of 2A | Session 4 ethics gate; Interview Ethics for Students (BYU IRB) |
| **Evidence tagging ([E] observed / [A] assumed)** | The rubrics ask teams to "separate known facts from assumptions" but give them no mechanism. Tagging is that mechanism, and it carries through all five checkpoints. | Every brief | Persona Template; Persona Examples (honest vs. fabricated) |
| **Individual ideation before teams** | Teams of four on day one tend to anchor on the first or loudest idea. A week of individual divergent work (an idea journal, brainwriting) before the first team frame protects the "diverge" half of the cycle. | Weeks 1–2, feeding 2B | Idea Journal; Session 2 problem-space workshop |
| **Honest scope arithmetic** | The proposal names "enterprise scope overwhelms 380 or 480" but gives no method. 301R's narrowing moves and its "estimate against the hours that actually exist" check retarget naturally to CS 480's real capacity: students × credit hours × build weeks. | 9A, and again at 15A (backlog sizing) | Review Protocol narrowing moves; Feasibility & Risk Worksheet |
| **Appropriate detail vs. over-specification** | CS 380 writes a design that *other people* (CS 480 and three support courses) will build. An over-specified design locks them in; an under-specified one strands them. The proposal doesn't address this balance. | 13A–14B | Session 11 design-doc anatomy; Design Doc Template |
| **A cold-read test of the handoff** | After the Week 12 merge, most CS 480 students won't have written the design they inherit. A partner team reading the package cold ("could you start work Monday?") tests readiness better than a presentation does. | 15A | Stranger Read Sheet (Session 16) |
| **Team charter + working agreements, re-done at each merge** | The proposal says "agree on team norms" each block but gives no instrument. Teams reform up to four times, so a one-page charter re-signed at each merge is realistic. Taught once, reused five times. | 1A, then each block's Launch session | Team Charter; Working Agreements reading |
| **License and repo-governance decision** | The program outline makes open source a goal, but no course owns the license choice, and code starts in CS 480 Week 1. | Block 5 | License Cheat Sheet; Session 3 license comparison |
| **Paired strong/weak samples of the same artifact** | The proposal relies on rubrics and feedback. Dissecting a strong and a weak version of the *same* brief is the fastest way to show what a rubric level looks like, and it scales to 50 students. | Each block's Practice session | Sample Proposal Strong/Weak; Prop Loft samples |
| **"Why this assignment exists" + principle first** | A five-checkpoint, 50-student course with rotating faculty needs every handout to carry its own rationale. | All handouts | The 301R handout convention |

Smaller items worth offering, not insisting on: **pass conditions** (every major artifact at Developing or better, so a strong showcase can't hide a missing research brief); the **draft-on-file rule** (no draft, no revision credit, which keeps the proposal's revise-before-score window honest); and **one reading check** at the single session whose timing depends on a reading, rather than at every session.

## 6. Issues to raise with the proposal's author

1. **Open source is a program goal; it needs an owner and a date.** The CS 380 page is silent on it, but the program outline states it plainly ("open social software"; outcomes include "open-source practices", "contribution guides, maintainership plans"). But license choice is assigned to no course, and contributor pathways arrive only at the end of CS 481. Propose: **license and repo-governance decisions in 380 Block 5**, before the support courses write code in 480 Week 1, with 301R's license material as the content.
2. **Check what the refinement left behind.** The CS 380 page supersedes the program outline's four-block CS 380 template (Frame 1–3, Research + technical discovery 4–7, Design 8–11, Evaluate & hand off 12–15). Two of the outline's CS 380 expectations aren't clearly carried into the newer page, and both are worth confirming as intended:
   - **Earlier proofs of concept.** The outline put technical proofs of concept in Weeks 4–7; the refinement moves them to Week 11A. That leaves high-risk technical assumptions untested through the design-selection review in Week 9. 301R's experience (a required spike graded in the *proposal*, CP3) argues for at least one early spike.
   - **The full operating model.** The outline expected CS 380 to hand off the 13-team model (8 feature teams, plus QA, Security/Privacy, HCI/UX, Compliance, and Architecture), team charters, and repo, hosting, and dev-environment requirements. The refinement's Block 5 covers feature and cross-cutting teams and leads, but not the charters or the infrastructure requirements. 301R's Team Charter, `Working-Agreements-Reading`, and `Starting-Your-Repository` would fill that gap.
3. **CS 380's handoff may carry more weight than the CS 380 page suggests.** If the parallel support courses in the program outline go ahead, CS 329, 452, and 348 take "the CS 380 project proposal as the source of truth" and begin by reviewing its problem statement, MVP boundary, architecture, risks, and acceptance criteria. That raises the bar on 380's design doc and backlog, which is exactly where 301R's CP5 and CP8 material is strongest.
4. **Ownership and motivation.** 301R's engine is that every student owns a project, and the founder can become its sponsor. The proposal swaps that for a funnel in which most students' framings get merged three or four times before Week 12. Its mitigations ("selection is not a grade") are sound, but the motivation cost is real, and 301R's Pitch Day / Session 11 design is the institutional knowledge here. Worth offering.
5. **Five selections in fifteen weeks** is a lot of convergence. 301R spends Weeks 3–5 building up to *one*. The CPS readings and the idea-scoring method should run as the selection method in every block, not just Block 1.
6. **The calendar won't hold 30 meetings.** Fall 2026 gave 27 (a Wednesday start, Labor Day, Thanksgiving Wednesday). The block template needs a rule for which meeting gives way. The finals slot can host 15B, as Demo Day does now.
7. **AI policy conflict.** "Use AI to accelerate results" in Week 1A vs. 301R's "a tool, not the topic; defend everything." This needs a sequence-level decision, especially since individual grades rest on reflections, which AI writes easily.
8. **Individual accountability at 50 students.** One rubric row per checkpoint plus reflections is thin evidence against free-riding in teams that keep reshuffling. `Peer-Evaluation-System.md` was designed for exactly this.
9. **Workload.** 6.0 hours out of class + 2.5 in class ≈ 8.5/week, below 301R's ~10 and BYU's 3-credit norm of ~9. That's fine, but the proposal's deliverable list per block is heavy for 3 hours of individual time.

---

## 7. What carries over regardless of design

The **infrastructure** transfers wholesale and is arguably the most valuable carry-over:

- The `canvas_material/` mdxcanvas pipeline, with every date in `global_args` (the block structure makes date keys even more regular).
- `rubrics.yaml.jinja` → Canvas rubrics + the student page + instructor view; `validate_canvas_material.py`.
- The handout convention, especially **"Why this assignment exists"** and **"general principle first; the course is the example"**. Both fit a design-only course well.
- The deck toolchain (`tools/build-sessionNN.js`, `verify-deck.js`, `render-deck.sh`), and the printable-worksheet pipeline (HTML → headless Chrome PDF).
- **Prop Loft** as a running worked example: its sample product brief and design doc already exist, and it could be the model artifact at every block end.

**Rough tally:** of the proposal's 30 class meetings, **7 map cleanly** (●: 2A, 9A, 10A, 12A, 13A, 15A, 15B), **19 are partial** (◐), and **4 are new** (○: 5A compliance, 7B UX, 11B data protection, 14B ADRs). Two of the partials, 10B usability testing and 13B team-of-teams coordination, are close to new. Of 301R's 27 sessions, about 17 contribute substantial material; S13–S16 and S19–S23 (git lab, infrastructure, build, audit) mostly move to CS 480.
