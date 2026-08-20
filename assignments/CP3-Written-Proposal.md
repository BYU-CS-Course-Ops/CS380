# Assignment — Written Proposal

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Checkpoint 3 (CP3) · Individual work**
**Assigned:** Mon, Sep 28 · **Draft due:** Wed, Sep 30 — **two printed copies in class + upload to the LMS** · **Due:** start of class **Mon, Oct 5**
**Weight:** 12% of the course grade

---

## The short version

Write a **3–5 page proposal** that argues your project into existence: the problem and its users (with discovery evidence), the solution and its core features, what you're deliberately *not* building, the technical approach, the honest risks, an MVP you can actually build in the time this term leaves you, and success criteria. It's the written version of the case you'll pitch on Oct 7 — and the document your future team inherits.

**Read first:** `resources/Proposal-Anatomy-Reading.md` walks every section — what it contains, what it's for, where the material comes from, how to write it, and how it fails — plus the order to write the sections in. Two sample proposals for the same project, `resources/Sample-Proposal-Strong.md` and `resources/Sample-Proposal-Weak.md`, show the difference in practice.

---

## Why this assignment exists

Every project you will ever found — a startup, an internal tool, an open-source library, a research effort — begins the same way: **someone has to be convinced.** A funder, a manager, a professor, a potential teammate. The proposal is where engineers learn that persuasion is not salesmanship; it's *evidence, honest scope, and clear writing* arranged so a skeptical reader can check your reasoning and come out agreeing.

The specific skill this assignment trains is the hardest one in the genre: **arguing feasibility without overpromising.** Anyone can promise an impressive product; a founder earns trust by showing what they know, what they must learn (with a plan), and what they've cut. That honest-confidence posture is what your pitch audience will reward next week, what capstone faculty look for in December, and what separates credible engineers from optimistic ones for the rest of your career. Nearly everything here already exists in your CP2 brief and your Week-3 feasibility work — the new work is the *argument*.

---

## What to produce

A 3–5 page document with these sections (the Session 7 skeleton):

1. **Executive summary** — the whole argument in one paragraph. Write it last.
2. **Problem & users** — who, what need, and the discovery evidence behind it (from your Discovery Notes and CP2; tag [E]/[A] where useful).
3. **Solution overview** — what you'll build and how it addresses the *prioritized* needs.
4. **Core features** — the shortlist that delivers the value; visibly prioritized.
5. **Non-goals** — what you are deliberately not building, and why. Required, not optional.
6. **Technical approach** — stack and key dependencies with a one-line justification each (your Learning Plan belongs here, along with **your spike result** — see the requirement below).
7. **Risks & mitigation** — real risks from the six categories (technical, schedule, dependency, skill, adoption, maintenance), each with a credible mitigation.
8. **MVP definition** — the vertical slice you can actually build in the time this term leaves you; what's in, what's deferred. Do the arithmetic honestly: the course runs at about **ten hours a week including everything** — class, reading, discovery, writing, and reviews — and the real building window is roughly **five weeks** (Weeks 9–13). Size against what's left, not against ten times fourteen.
9. **Success criteria** — carried forward from CP2; what "this works" means, observably.

---

## Requirements & constraints

- **Individual work.** 3–5 pages, Markdown or PDF.
- **Evidence over adjectives.** "Three of four commuters I interviewed described this workaround" persuades; "this is a huge problem" doesn't.
- **At least one spike is required.** Run a time-boxed investigation on your project's scariest unknown and report the result — the question, the time box, and green (feasible) or red (what you'll change) — in your technical-approach/risks sections. This is the difference between an argued feasibility claim and a hoped-for one; it's graded under *Feasibility & technical approach*. (See `resources/Spikes-Reading.md`.)
- **The draft is a required turn-in, not just something to bring.** By the start of class **Wed, Sep 30**: upload your draft to the LMS *and* bring **two printed copies** to class (print them yourself — the LMS deadline is set to the start of the period). Minimum sections: problem & users, solution, non-goals, and risks. A fuller draft gets you a better review.
  - The uploaded draft is **completion-checked, not scored** — it exists so revision can be graded against something.
  - **No draft on file caps *Argument & revision* at Developing.** Half of what that criterion measures is your response to feedback, and with no draft there is nothing to show improvement against. Arriving empty-handed also costs a classmate their review.
- **Keep both annotated copies.** Your reviewers mark up the printed drafts on paper; you submit **scans or phone photos of both** with the final proposal — no particular format, they just have to be **clearly legible** (flat page, good light, the reviewer's handwriting readable). Visible response to peer feedback is what *Argument & revision* rewards — the annotated pages are the evidence.
- **AI use:** allowed for tightening prose and organizing; the argument, evidence, and judgment must be yours, defensibly. Disclose substantial use.

---

## Grading

Scored on a 100-point analytic rubric; **12% of the course grade.** Reach at least **Developing** on every criterion to stay on a passing track.

| Criterion | Weight | What it measures |
|---|---|---|
| **Problem & user clarity** | 15 | Problem and users compelling and evidence-backed — the discovery trail shows. |
| **Solution & core features (+ non-goals)** | 15 | Coherent solution; sharp, prioritized feature set; explicit non-goals. Scoping *out* is as persuasive as scoping in. |
| **Feasibility & technical approach** | 20 | Stack and dependencies actually researched; **at least one spike run on the scariest unknown, with its result honestly reported**; approach credible and justified — real homework, not hand-waving. |
| **Scope realism (MVP for this term)** | 15 | A clear, achievable vertical slice, sized against the *real* build window — roughly five weeks, with the ~10 hrs/week total already spent on class, reading, writing, and reviews — with the arithmetic shown. |
| **Richness & extensibility** | 15 | Exercises multiple engineering dimensions; a path for others to join and build. |
| **Risks & mitigation** | 10 | Real, specific risks with credible mitigations — engineering judgment about what could go wrong. |
| **Argument & revision** | 10 | Persuasive, well-written, and visibly improved in response to peer feedback — measured against your Sep 30 draft and the annotated copies you submit with it. **No draft on file caps this criterion at Developing.** |

**Performance levels:** Exemplary (4) · Proficient (3) · Developing (2) · Beginning (1) · Absent (0). Score per criterion = (level ÷ 4) × weight.

**The table above summarizes what each criterion measures. For the full four-level grid — exactly what Exemplary, Proficient, Developing, and Beginning look like on each criterion — see `rubrics.md` (Written Proposal), the rubric document you received in Week 1.** Read the levels before you write, not after you're graded.

---

## Tips and common pitfalls

- **The feature flood kills proposals.** Twelve features with no priorities reads as "hasn't decided what matters." Five features, ranked, with non-goals, reads as judgment.
- **Underpromise correctly.** A modest-but-certain MVP beats an impressive-but-doubtful one — scope realism is graded, and your pitch audience can smell overpromise.
- **Generic risks score low.** "Time management" is not a risk; "the campus API requires approval that may take 3+ weeks — mitigation: static schedule import as fallback" is.
- **The executive summary is the pitch in miniature.** If it doesn't work alone, the proposal doesn't work.
- **Don't design.** Architecture diagrams belong in Week 6. Name the stack; don't draw the schema.
- **"Ten hours times fourteen weeks is 140 hours" is the single most common fatal line.** Those ten hours already include class, reading, discovery, writing, and reviews, and building doesn't start in Week 1 — you have roughly five real building weeks. Show that arithmetic and size the MVP against it.
- **Write the sections out of order.** Problem → success criteria → solution and features → non-goals (while you're cutting) → technical approach and spike → risks → MVP → executive summary last. `resources/Proposal-Anatomy-Reading.md` §6 explains why each step feeds the next.
- **Read the weak sample before you draft, and the strong one after.** Most first drafts fail the same four ways `Sample-Proposal-Weak.md` does, and it is much cheaper to recognize that in someone else's proposal than in your own.

---

## Submission

**Wed, Sep 30 (draft):** upload the draft to the LMS by the start of class and bring **two printed copies**. Completion-checked.

**Mon, Oct 5 (final):** submit via the LMS by the start of class:
1. The final proposal (3–5 pages, Markdown or PDF), and
2. **Scans or photos of both annotated draft copies** from Wednesday's review — legible enough to read.

Your pitch (CP4, Wed Oct 7) delivers this same argument in 6–8 minutes — and if your idea anchors a team, the proposal is revised into the **team proposal** your teammates build from.

---

*Part of the arc: **CP2 Product Definition Brief → CP3 Written Proposal → CP4 Pitch #1 → team formation.** See `rubrics.md` for the full grid, `resources/Proposal-Anatomy-Reading.md` for the section-by-section guide, `resources/Sample-Proposal-Strong.md` and `resources/Sample-Proposal-Weak.md` for the worked contrast, `resources/Spikes-Reading.md`, `resources/Feasibility-Risk-Worksheet.md`, and `resources/Learning-Plan-Template.md`.*
