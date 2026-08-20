# Session 8 — Proposal Peer Review & Scope-Narrowing Clinic — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 8 of 27 · Wed, Sep 30, 2026 · 75-minute block**
**Prior reading / prep (all free — nothing to buy):**
- **Bring two printed copies of your draft** — problem & users, solution, non-goals, technical approach, and risks at minimum. (A rough full draft is even better.) Reviewers mark up paper; you keep both copies.
- **Upload the same draft to the LMS before class starts** — the LMS deadline is set to the start of the class period. Completion-checked, not scored — but **no draft on file caps CP3's *Argument & revision* criterion at Developing**, since there's nothing to show revision against.
- **Re-skim:** the convergent-thinking principles in the CPS handbook ([download the PDF](https://brdo.berkeley.edu/sites/default/files/cps_handbook.pdf), pp. 6–10) — reviewing a peer's scope *is* convergent thinking applied to someone else's idea.
**Maps to:** Design Week 4, Session B — *peer review of proposal scope and risk sections; scope-narrowing clinic.*

> **Status: OUTLINE (v2).** Second half of Week 4 — a workshop (Session B). The draft→review→revise loop from Session 1's studio model runs for real on the course's first major written artifact. **CP3 due Mon, Oct 5.** *(v2: pairing, LMS timing, printing, and clinic-volunteer decisions resolved; the review protocol is now a printed handout — `resources/Review-Protocol-Sheet.pdf` — carrying the CP3 rubric with it.)*

---

## Purpose of this session

A proposal that's only ever been read by its author is a guess. Today your draft meets its first skeptical readers — and you become one for others. The workshop has two jobs: **make every proposal better** (through structured peer review of the scope and risk sections, where proposals most often fail), and **make every student a better reviewer** — because giving precise, actionable, kind feedback on someone else's work is a core engineering skill you'll use in code review, design review, and every PR from Week 7 on. We close with a scope-narrowing clinic for proposals that are trying to do too much.

---

## Learning objectives

By the end of this session, a student can:

1. **Review a peer's proposal** using the rubric's lens — scope realism, risk honesty, evidence quality.
2. **Give feedback that is specific, actionable, and kind** — and tied to criteria, not taste.
3. **Receive feedback professionally** — capture it, probe it, and decide what to act on.
4. **Narrow an overscoped proposal** to a defensible one-semester vertical slice.
5. **Plan their revision** — turn review notes into a concrete edit list.

---

## Instructor prep / materials

- **Review-pair assignments** prepared in advance — **pairs**, with a single triad if enrollment is odd (enrollment is small this first offering, so pairs give every draft two reviews without the room going long). **Prepare both rounds' pairings**, so round 2 is a re-pair announced from a list rather than a scramble; mix idea domains so reviewers come in cold, like a real audience.
- **Print the review protocol sheet** — `resources/Review-Protocol-Sheet.pdf`, one per student. It carries the protocol, the register examples, the **CP3 rubric**, the scope-narrowing moves, and the author's revision list, so nothing depends on a slide staying up while students read on paper.
- **Have the CP3 rubric on screen too** during the review rounds (the handout is the working copy; the slide is the one everyone can see from across the room).
- **Check the LMS draft uploads** before class — the LMS deadline is set to the **start of the class period**, so the submission list is final when class begins. That list is also the list of who can be scored on *Argument & revision*, and it's easier to sort out on Wednesday morning than in October.
- **Bring pens and a small stack of blank paper.** This is a paper workshop: **students print their own copies** (stated in CP3); reviewers write directly on the author's printed copies, and the author submits scans or photos of both with CP3. Bring a few spare sets for the inevitable printer failure. A student who shows up with one copy, or none, still reviews (see the draft-floor note below), but they leave with nothing to submit.
- Have the **scope-narrowing moves** slide ready (from Session 1's weak→strong reshaping, now applied to proposals) — the same list is on the handout.
- Timer for rotation discipline.

---

## Timed outline (≈75 min)

### 1. Framing — why engineers review each other's writing — 6 min
- The studio loop (draft → review → revise → build → reflect) starts today in earnest. Every major artifact from here on gets reviewed before it's graded.
- **Reviewer's mindset:** your job is to make the *work* better, not to show you're smart. Specific beats general; criteria beat taste; a question is often stronger than a verdict ("what evidence supports this?" > "this seems thin").
- **Author's mindset:** capture, don't defend (same protocol as the Week-3 workshop). You decide later what to act on.

### 2. The review protocol — 5 min
- Hand out the **review protocol sheet** (`resources/Review-Protocol-Sheet.pdf`) as students sit down; put the same protocol on a slide and walk it once. Point out that the **CP3 rubric is on the sheet** — reviewers read with it in front of them, not from memory:
  1. **Read silently** (~10 min) with the rubric next to you, **pen on the author's printed copy.** Focus on **scope realism** and **risks & mitigation** first, then problem/user clarity.
  2. **Mark three things, in writing, on the page:** the strongest section (and why), the sharpest concern (tied to a rubric criterion), and one concrete suggestion the author could execute this week. Sign or initial your comments — the author submits these pages, and the grader should be able to see whose feedback was acted on.
  3. **Discuss** (~7 min): author asks clarifying questions, captures notes.
- Feedback anchored to the rubric's language: "scope realism — I don't believe the calendar sync fits in five weeks of real building" is usable; "seems hard" is not.
- **Say why the paper matters:** these annotated pages are the evidence for CP3's *Argument & revision* criterion. A review conducted entirely out loud leaves the author with nothing to submit.

### 3. Review round 1 — 20 min
- Swap drafts with your assigned partner (one triad if the count is odd). Silent read (~10), then discussion (~7), buffer (~3).
- Instructor circulates: sit with pairs whose discussion stalls; model one strong critique aloud early so the room hears the register.

### 4. Review round 2 (independent read) — 18 min
- Re-pair from the round-2 list. **Both readers are cold** — that's how the pairings are built — so what round 2 buys is not a harsher audience but an **independent** one.
- Teach the inference, because it transfers to code review and user research alike: **a concern both readers raise is about the proposal** (fix it first); **a concern only one raises is ambiguous** — check it with the other reader rather than discarding it.
- Guard the independence: an author who opens with "my last reviewer said the scope was too big" has just spent the value of the round. Interrupt that if you hear it.
- Same protocol, tightened (~8 read / ~7 discuss). Authors close by **marking where the two reviews agree** — that's the top of tonight's edit list.
- Reviewers in round 2 also answer one extra question: **"Would this pitch recruit you?"** — the question that matters on Oct 7.

### 5. Scope-narrowing clinic — 16 min
- Reconvene. The most common review finding will be *too big.* **Ask cold for volunteers** — after two rounds of review the room knows which drafts are overscoped, and a volunteer who has just heard it from two readers is usually willing. Walk the narrowing moves, then apply them live to 1–2 volunteered proposals. *(If nobody bites, narrow `Sample-Proposal-Weak.md` instead — the room already dissected it Monday — then come back to volunteers.)*
  - **Cut the platform, keep the slice** — one user type, one workflow, end to end.
  - **Demote features to non-goals** — moving a feature to non-goals *strengthens* the proposal.
  - **Shrink the user** — one club, one ward, one lab; the Session-1 reshaping move.
  - **Defer the hard integration** — v1 proves the core; the calendar sync is the roadmap's job.
  - **Check against the budget:** say the arithmetic out loud, and do it honestly — the course's ~10 hrs/week covers *everything* (class, reading, writing, reviews), so subtract those before you multiply. What's left, times **roughly five weeks of real building** (Weeks 9–13), is the real number. Most overscoped proposals die on this line.
- Each student writes the one narrowing move their own proposal most needs.

### 6. Wrap + revision plan — 10 min
- Solo: turn your notes into a **revision list** — three concrete edits, ranked, **starting with anything both readers flagged.** (The CP3 rubric explicitly rewards *visible response to peer feedback* under Argument & revision.)
- **Take your two annotated copies home and capture them tonight** while you still know which page is which. **Scanning is cleaner** (a scanner or a phone scanning app); **a plain phone photo is perfectly acceptable** if it's legible — flat page, good light, the reviewer's handwriting readable. Both images are part of Monday's CP3 submission.
- Recap: review is a gift and a skill; scope realism is the difference between a proposal that recruits and one that worries people.
- **Due Mon, Oct 5: CP3 Written Proposal.** Monday is the pitch workshop — you'll turn this argument into a 6–8 minute oral pitch for **Pitch Day, Wed, Oct 7.**

---

## Threads to carry forward

- The **review protocol** (specific · criteria-anchored · kind; capture, don't defend) is the same one used in design review (Wk 6), code review (Wk 7), and the repo audit (Wk 11).
- **"Would this recruit you?"** foreshadows the pitch's recruiting function and team formation.
- **Two independent readers agreeing is evidence; one reader alone is a hypothesis** — the same inference students will use on code review comments (Wk 7) and on the repo audit's onboarding test (Wk 11).
- Revision evidence feeds the CP3 **Argument & revision** criterion — keep both marked-up copies and submit scans with the final proposal.
- Reviewing others' proposals trains the **evaluation skill** students will use scoring pitches next week.

---

## Open questions / decisions

**Resolved (Tom, Aug 2026):**
- **Pairing scheme — pairs**, with one triad if enrollment is odd. Enrollment is small this first offering; pairs across two rounds give every draft two cold readers.
- **Printed copies — students print their own**, stated in CP3. Instructor brings a few spare sets against printer failure.
- **LMS draft — due at the start of class**, enforced by the LMS deadline rather than by collection in the room.
- **Annotated copies — scans *or* phone photos**, no format requirement beyond being clearly legible. (Scanning is the better result; most students will photograph, and that's fine.)
- **Clinic volunteers — asked cold** in the room, with the weak sample proposal as the fallback subject.

**Still open:**
- **Excused absence on Sep 30:** confirm the handling (recommend: on-time LMS upload still counts; the review is made up asynchronously with one classmate, marked-up pages photographed).

---

## Deliverable / after class

- **Revise the proposal** against review feedback. **CP3 Written Proposal due Mon, Oct 5** (start of class, via LMS) — submitted **with scans or photos of both annotated draft copies.**
- Start thinking about the pitch: same argument, 6–8 minutes, persuade + recruit.

---

## Appendix — classroom handouts (Session 8)

- **Review Protocol Sheet:** `resources/Review-Protocol-Sheet.html` / `.pdf` — one page, one per student: reviewer protocol and register, author's side, the **CP3 rubric**, the scope-narrowing moves, and the revision list
- **CP3 rubric:** on the handout above; full version in `rubrics.md` (Written Proposal) — also put it on a slide for the room
- **Scope-narrowing moves** (§5) — slide (also on the handout)
- **Idea Scoring Sheet:** `resources/Idea-Scoring-Sheet.md` (the same criteria, if useful during review)

---

*Session 8 is built: deck `Session08-PeerReview.pptx`, handout `resources/Review-Protocol-Sheet.pdf`, student page `canvas_material/lectures/Session08-Sep30-StudentPage.md`. Related: `Session07-Sep28-Outline.md`, `Session09-Oct05-Outline.md`, `rubrics.md` (CP3).*
