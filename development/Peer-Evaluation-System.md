# CS 301R — Peer-Evaluation System (Design, v1)

*Instructor-facing design for the course's three peer-input instruments: Pitch Day scoring, the midpoint peer evaluation, and the end-of-term peer evaluation — plus how each flows into grades. Companion to `rubrics.md` and `CS301R-ProjectCreation_v4.md` (§8 Assessment).*

> **Status: DRAFT v1 for instructor review.** Every default below is a proposal; decision points are marked ⚑.

---

## 1. Design principles

1. **Peer input informs; the instructor decides.** No grade is computed mechanically from peer numbers. Peers supply evidence the instructor can't see (in-team behavior, audience effect); the instructor owns the judgment.
2. **Evaluation is a taught skill, not a survey.** Students score against *shared, published criteria* they've used all semester (§9 selection criteria, the team charter). Honest evaluation is framed as professionalism from Session 9 on. (It's the course's **evaluation throughline** — see `CS301R-ProjectCreation_v4.md` §3.)
3. **Anchored to written standards.** The team eval references the *team charter's own definition* of pulling your weight — students are held to what they agreed to, not to unstated expectations.
4. **Bounded effect, unbounded conversation.** Peer input moves grades within defined limits; anything extreme triggers a conversation, not an automatic penalty.
5. **Confidential, not anonymous-to-the-instructor.** The instructor sees who said what (needed to weigh credibility and detect retaliation); teammates never do.

---

## 2. The three instruments at a glance

| Instrument | When | Who rates whom | Feeds into |
|---|---|---|---|
| **Pitch Day scoring sheet** | Wed, Oct 7 (Session 10) | Every student scores every pitch | CP4 grade (instructor-held) + the selection/team-formation huddle |
| **Midpoint peer evaluation** | Opens Wed, Nov 18 · due Fri, Nov 20 | Each member rates all teammates + self | Individual adjustment on CP10; early-warning conversations |
| **End-of-term peer evaluation** | Opens Mon, Nov 30 · due Wed, Dec 9 | Each member rates all teammates + self | Individual adjustment on CP11/CP12 (and the term's team artifacts overall) |

Student-facing instruments: `resources/Pitch-Evaluation-Sheet.md` and `resources/Peer-Evaluation-Form.md` (one form, used at both midpoint and end).

⚑ **Platform:** recommend a digital form (Google Form / Qualtrics / LMS survey) for all three — Pitch Day needs a fast tally, and the team evals need confidentiality. Paper backup for Pitch Day only.

---

## 3. Instrument 1 — Pitch Day scoring (Oct 7)

### What each student submits, per pitch
- **Seven criteria, scored 1–3** (the §9 yardstick students have used since Week 3 — same 1–3 scale as the Idea Scoring Sheet): value · feasibility · richness/breadth · scope realism · extensibility · maintainability · presenter preparedness.
- **The recruiting question:** *Would you join this project?* — **Yes / Maybe / No** (answered honestly; "Yes" is a real signal, not a compliment).
- **One line each:** strongest moment · sharpest concern. (These go back to the presenter, anonymized — the only part shared.)

### How it feeds grades and selection
- **CP4 grade:** peer scores + comments *inform* the instructor's rubric scoring (especially Persuasiveness & recruiting, where audience effect is graded); the instructor scores the rubric.
- **The selection huddle (~10 min, same class):**
  1. Form auto-tallies: mean criteria score + count of "Yes" per pitch.
  2. Instructor overlays own judgment (and any red flags: feasibility scores markedly below the room's enthusiasm).
  3. Blend per v4: **peer scores + recruiting interest + instructor final say** → announce anchor ideas.
- **Oversubscription:** where more students want a project than it can hold, founder preference + instructor steering resolves on the spot (second-choice round).

⚑ **Decision:** share each pitch's numeric averages with its presenter afterward, or only the comment pairs? (Recommend: comments only; numbers stay instructor-side.)

### Anti-gaming
- Scores submitted per-pitch *before the next pitch starts* (the form enforces order); no revising earlier scores after later pitches.
- Students don't score their own pitch.
- Obvious bloc voting (a friend group all-3s/all-Yes on one pitch, all-1s elsewhere) is visible in the data; instructor weighs accordingly — stated in class as a deterrent, enforced quietly.

---

## 4. Instruments 2 & 3 — Team peer evaluations (midpoint + end)

One form, two administrations. Each student rates **every teammate and themselves** on five dimensions (1–5, behaviorally anchored — see the form), answers the charter question, and writes short comments.

### The five dimensions
1. **Contribution & reliability** — showed up, took work, delivered it.
2. **Quality of work** — what they delivered met the team's definition of done.
3. **Collaboration & communication** — responsive, kept the team informed, per the charter's norms.
4. **Initiative & ownership** — found work, unblocked others, acted like a founder not a passenger.
5. **Response to feedback** — engaged review and disagreement professionally.

Plus:
- **The charter check:** *"Measured against our charter's definition of pulling your weight, this person is: exceeding / meeting / below / well below."*
- **The early-warning question (midpoint only):** *"If anyone is below, have you raised it with them directly, per your charter?"* — normalizes the direct conversation the charter promised.
- **Comments:** one thing this person does that helps the team most; one concrete thing that would help more. **Self-evaluation** uses the identical items.

### How evals flow into grades

Team artifacts (CP5–CP12) receive a **team grade**; each student's share is adjusted by an **individual multiplier** the instructor sets from three evidence streams (per v4 §8):

1. **Git/PR/tracker history** (objective volume + quality signals),
2. **Contribution log** (the student's own record),
3. **Peer evaluations** (the in-team view).

⚑ **Proposed bounds:** multiplier normally **0.90–1.10** (±10%). The default is **1.00** — a functioning team where everyone meets the charter needs no adjustment, and most teams should land there. Outside the band only in documented cases (sustained non-contribution or exceptional carry), and **never** on peer numbers alone — the instructor corroborates against git/tracker evidence and a conversation with the student before any multiplier below 0.95.

⚑ **Midpoint is formative first:** its primary output is the early-warning conversation (instructor meets any team/member flagged "below"), giving three weeks to correct before the end-of-term eval carries summative weight. Recommend midpoint affects CP10's individual-contribution criterion (5 pts) only; the end-of-term eval informs the broader multiplier.

### Safeguards
- **Confidential:** teammates never see who rated them what; feedback is relayed only in aggregate/anonymized form, and only when useful.
- **No-retaliation norm**, stated in the syllabus; retaliatory scoring (detectable as a sudden reciprocal drop) is weighed accordingly.
- **Self-vs-peer gap** is itself information: large gaps prompt a conversation, not a penalty.
- **Two-person teams:** peer input is a single voice — corroboration against git/tracker evidence is mandatory before any adjustment.
- **Solo students:** no peer eval; the self-evaluation + contribution log + repo evidence serve alone (multiplier defaults to 1.00).

---

## 5. Administration calendar

| Date | Action |
|---|---|
| Mon, Oct 5 (S9) | Walk the Pitch-Evaluation Sheet in class; calibrate scoring ("what does a 3 on scope realism look like?") |
| Wed, Oct 7 (S10) | Pitch Day: form live; tally in the huddle |
| Mon, Oct 12 | Charters due — the standard the team evals will reference |
| Wed, Nov 18 (S22) | Midpoint eval opens (in the CP10 debrief); due Fri, Nov 20 |
| Week of Nov 23 | Instructor reviews midpoint; early-warning conversations as needed |
| Mon, Nov 30 (S24) | End-of-term eval announced open |
| Wed, Dec 9 (S27) | End-of-term eval due (checked in the admin sweep) |
| After Demo Day | Instructor sets multipliers; documents any outside the 0.95–1.05 middle band |

---

## 6. Open decisions for review (all ⚑ above, gathered)

1. **Platform** — digital form vs. LMS survey vs. paper (recommend digital form; fast tally + confidentiality).
2. **Pitch feedback sharing** — comments only (recommended) vs. comments + averages.
3. **Multiplier bounds** — ±10% band with documented exceptions (recommended), vs. a tighter/looser band, vs. a published formula.
4. **Midpoint weight** — formative + CP10's 5-pt criterion only (recommended), vs. contributing to the term multiplier.
5. **Completion incentive** — is submitting the eval itself required/graded? (Recommend: required; an unsubmitted eval forfeits the student's own input into their multiplier and is noted under professionalism.)

---

*Files: `resources/Pitch-Evaluation-Sheet.md` (student instrument, Oct 7) · `resources/Peer-Evaluation-Form.md` (student instrument, Nov 18 & Nov 30) · this doc (instructor design). Referenced by: `rubrics.md`, `assignments/CP4-Pitch-Presentation.md`, `assignments/Team-Charter.md`, Sessions 9, 10, 22, 24, 27.*
