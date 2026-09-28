# Session 6 — Convergence Workshop: Narrowing to a Defensible Idea — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 6 of 27 · Wed, Sep 23, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Re-read:** the **Value vs. Do-ability** section of the CPS handbook (p. 27) — [download the PDF](https://brdo.berkeley.edu/sites/default/files/cps_handbook.pdf) — the convergence tool you'll use today.
- **Atlassian — [*Prioritization frameworks*](https://www.atlassian.com/agile/product-management/prioritization-framework)** — the modern product-world cousin of Value vs. Do-ability (the value/effort 2×2); optional but useful.
- **Bring:** your **Discovery Notes** (Session 4) and **2–3 candidate ideas** with the feasibility read from Session 5. *(The richness test is taught today, before you score.)*
**Maps to:** Design Week 3, Session B — *convergence workshop: score candidate ideas against the selection criteria; instructor + peer feedback; pick 1–2.*

> **Status: OUTLINE (v1).** Second half of Week 3 — a hands-on workshop (Session B). **CP1 Idea Briefs** are due today; today's convergence produces the leading idea that **CP2 Product Definition Brief** documents, so CP2 is written afterward and due **Mon, Sep 28.**

---

## Purpose of this session

You've diverged for three weeks; today you **converge** — deliberately, not by defaulting to whichever idea you're most attached to. Convergence done well is a discipline: you **score candidate ideas against a shared yardstick**, pressure-test them with **peer and instructor feedback**, and narrow to **one or two** you can defend. By the end you'll have a leading idea with a **written rationale**, ready to carry into your **Product Definition Brief** and, next week, your written proposal. The evaluation method you practice today — decide what "good" means, score against it, weigh value vs. do-ability, get feedback, commit — is **portable to any idea in any context** (a proposal at work, a startup, a side project); this course's criteria are one instance of it.

---

## Learning objectives

By the end of this session, a student can:

1. **Apply convergent-thinking principles** — decide deliberately, improve ideas rather than only killing them, and avoid premature convergence.
2. **Apply a richness check** — does the idea exercise multiple engineering dimensions and have room to grow?
3. **Evaluate ideas against explicit criteria** — a portable skill — using **this course's selection criteria** as the working set, and plot candidates on **Value vs. Do-ability**.
4. **Give and receive structured peer feedback** that challenges value, feasibility, and richness.
5. **Choose 1–2 ideas** to carry forward and **write a defensible one-line rationale**.
6. **Map the chosen idea onto the Product Definition Brief** (users, needs, success criteria).

---

## Instructor prep / materials

- **Assign the reading in advance;** expect the feasibility read from Session 5 done.
- **Slides:** the convergent-thinking principles; **the portable evaluation method** and **the criteria we chose** (one instance of it); the richness test (dimensions · room to grow · thin vs. too big); the Value vs. Do-ability 2×2; the peer-feedback protocol; the CP2 shape.
- **Two worked calibration candidates for §3 are provided** — a thin *ClassClock* vs. the rich legal-defense platform (from the SE Studio proposal). Use them as-is, or swap in an idea the room actually raised in Session 2 if that contrast lands better.
- **Print / post the handouts:** the **Idea Scoring Sheet** (includes the Value vs. Do-ability grid) — `canvas_material/resources/Idea-Scoring-Sheet.pdf`, **two pages, print double-sided, one per student**; the **CP2 Product Definition Brief** assignment — `canvas_material/assignments/handouts/CP2-Product-Definition-Brief.md.jinja`; the **PRD reference** — `canvas_material/pages/PRD-Reference.md`.
- Have the **CP2 rubric** (`rubrics.md`) visible so students see what the brief is graded on.
- *Reusable from the prior course:* convergence/scoping material in `open-source-project-course/`.

---

## Timed outline (≈75 min)

### 1. Bridge + framing — 3 min
- Three weeks of opening up; today we **narrow down.** Goal: leave with **1–2 defensible ideas** and the rationale for them.
- **Due today:** CP1 Idea Briefs. Today's work produces the idea your **CP2** will document — CP2 itself is due **Mon, Sep 28**, once you've chosen.

### 2. Convergence, done well — 7 min
- **The trap: premature convergence** — grabbing the first or favorite idea and stopping. The point of scoring is to make the choice **defensible**, not just decisive.
- **Convergent-thinking principles (from the CPS reading):** be **deliberate** (use the criteria, don't go on vibes), **check your objectives** (does it serve a real need?), **improve** promising ideas rather than only killing weak ones, **keep the novelty alive**, and **stay affirmative** — narrowing isn't tearing down.
- Converging doesn't mean marrying an idea — it means choosing a **working direction** you can defend and revise.

### 3. Evaluating ideas — the portable method, our criteria, and Value vs. Do-ability — 16 min
- **The portable method (lead here).** Evaluating an idea is a transferable skill — five moves: **(1)** decide what "good" means (pick criteria that fit the goal), **(2)** score against them, **(3)** weigh value vs. do-ability, **(4)** pressure-test, **(5)** commit with a rationale. It works on any idea — a feature at work, a startup, a side project. **Only move 1 changes between contexts;** today we aim it at *our* criteria.
- **Our criteria (move 1, for this course):** real need for a real, reachable userbase · richness/breadth · open-source-worthy · one-semester MVP (~5 real build weeks) · extensible · tractable stack · room to grow. These are what a *founded, lasting, open-source* project needs; a different goal would list different criteria. The two students most often miss are **real need** and **richness** — so teach richness properly before they score. *(Students have these on the Idea Scoring Sheet and saw them in the Session 1 deck.)*
- **The richness test — *is it worth founding on?* (6 min).** Monday's feasibility work asked *can I build it?* That's only half the question: **an idea can be perfectly feasible and still too thin to found a project on.**
  - **The check:** does it **exercise multiple engineering dimensions** (data, interfaces, logic, integration, maybe real-time or ML) — and does it have **room to grow**, so others could join and build on it after your slice ships?
  - **The two failure modes.** *Too thin:* a weekend script — you'd finish it and there'd be nothing left to found, nothing for a contributor to do. *Too big:* feasible only as a fantasy; no slice you could actually ship. Both feel fine on Monday's feasibility worksheet, which is exactly why richness is a separate test.
  - **The sweet spot:** a **rich core with a buildable vertical slice** — deep enough that finishing your slice leaves obvious, valuable next work for other people.
  - **Two calibration candidates — worked (put both up; ask "which is the better founding bet?").** Quantify each so the contrast is concrete:
    - **A — "ClassClock" (thin-but-easy).** A browser extension that reads your class schedule and counts down to your next class. *Value: low* — your phone calendar already does it; no one has an unmet need. *Do-ability: high* — one data source, one screen, a weekend, ~200 lines. *Richness: fails* — one component, nothing to hand a contributor; finish it and the project is over. **Plots bottom-right → here, just drop.**
    - **B — legal-defense crowdsourcing (rich-but-scary).** A platform that invites the world to help defend someone in legal danger: structured intake, AI-assisted guidance, crowd-sourced pro-bono research, crowd funding, document management, and hooks into court systems. *Value: high* — a real, underserved need (access to justice). *Do-ability as stated: low* — the source design is 10–12 teams / ~50 people over three semesters; there is no as-is one-semester build. *Richness: very high* — six feature areas plus data, services, UX, and compliance. **Plots top-left: high value, low do-ability → narrow or spike, don't drop.** *(Drawn from the SE Studio proposal's legal-assistance cohort example.)*
    - **The move — narrow B to a slice.** The better founding bet is B, **shrunk to a buildable vertical slice:** e.g., a structured **intake + document-assembly tool for one low-stakes case type** (small-claims self-filing), with a **queue where a volunteer reviews a submission.** One semester — realistically five weeks of building, out of a ~10 hrs/week that also covers class, reading, writing, and reviews — can ship that, and finishing it leaves obvious next work (AI guidance, funding, more case types, court integration) for contributors. **That's the sweet spot: a rich core with a slice you can actually ship.**
    - *Swap in an idea the room actually raised in Session 2 if that contrast lands better — the point is the pattern, not these two examples.*
- **The scoring grid:** rate each candidate on **value, feasibility (from your Session-5 risk read), richness, scope realism, and real-need** — high/medium/low or 1–3.
- **Value vs. Do-ability (the CPS 2×2, and Atlassian's value/effort cousin):** plot each idea — **high value + high do-ability = your quick wins to pursue;** high value + low do-ability = narrow the scope or run a spike first; low value = drop regardless of ease.

### 4. Workshop, part 1 — score your candidates — 12 min
- **Solo, on the Idea Scoring Sheet:** score each of your 2–3 candidates against the criteria, then **plot them on Value vs. Do-ability.**
- For each, write **the single biggest risk** (from Session 5) and, if it's high-value but low-do-ability, **how you'd shrink it to a buildable slice.**
- Circle your **provisional top one or two** before feedback — so you can see whether feedback changes your mind.

### 5. Workshop, part 2 — peer feedback round — 16 min
- **Form small groups of 3–4** (place solo-track students in a group too, so they still get a full round). It's a **round-robin: everyone presents once,** ~4 min each.
- **Run each person's turn the same way** — this is the exact process printed in **Part 3 of the Idea Scoring Sheet**, so students already have it in hand:
  1. **Present (~90 sec)** — top 1–2 ideas: the user, the real need, why it scores well; if high-value/low-do-ability, the slice they'd cut.
  2. **Peers pressure-test (~2.5 min)** along the three axes: *need real & user reachable? feasible at one-semester scope? rich enough to found on?*
  3. **Each piece of feedback follows one protocol:** affirm what's strong → name the sharpest concern → one concrete suggestion.
  4. **Presenter captures on the sheet, doesn't defend** — no arguing or explaining; they weigh it in §6.
  - **Then rotate** to the next person until all have presented.
- **Instructor circulates,** joining groups to add the instructor read where it's most useful — especially on *real need* and *richness*, the two most often missed.

### 6. Converge — pick 1–2 and write the rationale — 8 min
- Weigh the feedback and **commit to one or two** to carry forward.
- Write a **one-line defensible rationale** for each: *who it's for, the real need, why it's feasible at scope, and why it's rich enough.*
- This is a **working direction**, not an irreversible vow — but from here your discovery and proposal work focus here.

### 7. Wire it to CP2 — the Product Definition Brief — 8 min
- The idea you just chose becomes your **Product Definition Brief** — **which you'll write this weekend and turn in Mon, Sep 28**, now that you've converged. Walk the shape here so students leave knowing exactly what to write (and show the CP2 rubric):
  - **Target user** — sharply defined and bounded; who's in and out.
  - **Needs** — from your **Discovery Notes** (real conversations + your honest persona), **prioritized** with a rationale.
  - **Success criteria** — specific, observable definitions of "this works."
  - **PRD mapping** — it should read like a lightweight product-requirements doc. *(Point students to `canvas_material/pages/PRD-Reference.md` for what a PRD contains and what it leaves out.)*
- **Honesty is graded as heavily as findings** — be clear about what came from real users vs. an assumption.
- **Turn in CP1 today.** CP2 is due **Mon, Sep 28** — the weekend gap is deliberate, so the brief reflects today's feedback instead of being rushed out the same hour you chose the idea.

### 8. Wrap + before next class — 5 min
- Recap: you converged **deliberately**, against a shared yardstick, with feedback — and you can **defend** your pick.
- **Preview Week 4:** proposal anatomy — what belongs in a software proposal and how to argue feasibility without overpromising. **CP3 Written Proposal** is due Mon, Oct 5.
- Keep doing discovery on your chosen idea; the more real input now, the stronger the proposal.

---

## Threads to carry forward

- The **chosen idea + rationale** become the spine of the **written proposal** (Week 4) and **Pitch #1** (Week 5).
- The **Product Definition Brief** is the **sponsor artifact** — knowing a user's need well enough to speak for it.
- **Scoring against shared criteria** is the same discipline used to evaluate proposals at pitch time.
- **Structured peer feedback** is a technical-communication skill (the course through-line).

---

## Open questions / decisions before we flesh this out

- **CP2 Product Definition Brief handout:** created — `canvas_material/assignments/handouts/CP2-Product-Definition-Brief.md.jinja`.
- **Idea Scoring Sheet + Value/Do-ability grid:** created — Canvas page `pg-idea-scoring-sheet`, printable at `canvas_material/resources/Idea-Scoring-Sheet.pdf` (`.html` source alongside).
- **CP1 / CP2 sequencing:** *resolved* — CP1 is due at the workshop; CP2 was moved off the same day to **Mon, Sep 28**, so students converge first and then document the chosen idea. (Was: "same-day due," which asked for a CP2 draft before the idea existed.) Only the CP1 in-class turn-in time still needs confirming (start-of-class recommended).
- **Solo path:** students converging toward a solo project should still get a full feedback round — confirm grouping so no one is left out.

---

## Deliverable / after class

- **Due today:** **CP1 Idea Briefs** (three concepts + reflection).
- **Due Mon, Sep 28:** **CP2 Product Definition Brief** (users, needs, success criteria for the chosen idea) — written over the weekend from today's converged pick and feedback.
- **After class:** keep refining discovery on the chosen idea; begin thinking in proposal terms for Week 4.

---

## Appendix — classroom handouts (Session 6)

- **Idea Scoring Sheet** (selection criteria + Value vs. Do-ability grid): `canvas_material/resources/Idea-Scoring-Sheet.pdf` — one per student
- **CP2 Product Definition Brief assignment:** `canvas_material/assignments/handouts/CP2-Product-Definition-Brief.md.jinja`
- **PRD reference** (what a PRD contains): `canvas_material/pages/PRD-Reference.md`
- **CP2 rubric:** `rubrics.md`
- **CPS handbook — Value vs. Do-ability (p. 27):** [download the PDF](https://brdo.berkeley.edu/sites/default/files/cps_handbook.pdf)
- **Discovery Notes (from Session 4):** `canvas_material/assignments/handouts/Discovery-Notes.md.jinja`

---

*Next step: build the Session 6 student page (deck built — `canvas_material/lectures/powerpoint/Session06-Convergence.pptx`, 19 slides). Related: `Session05-Sep21-Outline.md`, `canvas_material/assignments/handouts/CP2-Product-Definition-Brief.md.jinja`, `canvas_material/pages/Idea-Scoring-Sheet.md.jinja`, `canvas_material/pages/PRD-Reference.md`, `CS301R-ProjectCreation_v4.md` (§7 Week 3), `rubrics.md` (CP1, CP2).*
