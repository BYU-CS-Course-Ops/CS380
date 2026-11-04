# Session 24 — The Honest Retrospective & Framing the Final Pitch — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 24 of 27 · Mon, Nov 30, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Atlassian Team Playbook — [*Retrospectives*](https://www.atlassian.com/team-playbook/plays/retrospective)** — the mechanics of a good retro: safety, specifics, and actions (we adapt it from sprint-scale to semester-scale).
- **Google SRE Book — [*Postmortem Culture: Learning from Failure*](https://sre.google/sre-book/postmortem-culture/)** — read for the *stance*: blameless, factual, improvement-oriented. Your retrospective is a postmortem where (hopefully) nothing died.
- **Bring:** your MVP Plan (the claims), your known-issues log draft, and your original CP3 proposal — the retrospective is written against what you *said* you'd do.
**Maps to:** Design Week 13, Session A — *retrospective prompts (what assumptions held, what the MVP validated, where the project goes next as others join); presentation framing.*

> **Status: OUTLINE (v2) · claims-check worksheet built** (`canvas_material/resources/Claims-Check-Worksheet.html` + `.pdf`) **· deck built** (`canvas_material/lectures/powerpoint/Session24-HonestRetrospective.pptx`, 16 slides, `tools/build-session24.js`; general-first: slide 3 opens on the claims every project rests on, slide 13 frames Demo Day as a launch review; reveals on slides 3, 5, 6, 13). *v2 (Tom's notes, Nov 2): the retrospective format is decided — one project document plus a short individual reflection (§3, Open questions); the service/stewardship prompt is now a required part of that reflection, not an optional beat (§3); cut sources named by session (§2); Demo Day meets 8:30–10:00 AM inside the registrar's 7:00–10:00 block (§6). Student page written and marked to publish (`canvas_material/lectures/session-pages/Session24-StudentPage.md.jinja`; general-first; no capstone carry-forward).* Week 13, Session A. Two products take shape today: the **written retrospective** (half of CP11, due Wed Dec 2) and the **frame of the final pitch** (delivered finals week, to an audience including capstone faculty).

---

## Purpose of this session

Fourteen weeks ago you claimed a problem was real, a scope was feasible, and a stack was tractable. The retrospective is where you check your own claims — **honestly**, because an honest retrospective is the most credible artifact a founder produces: it's what tells a capstone faculty member, a future contributor, or a hiring manager that you *see clearly*. Today we write its spine in class (assumptions → validated/refuted → what we'd do differently → where it goes next), then pivot to the final pitch: the same three questions, told forward — *what need does this serve, what has been built, where does it go next and how can others join?*

---

## Learning objectives

By the end of this session, a student can:

1. **Write a blameless, evidence-based retrospective** — claims checked against outcomes, no spin in either direction.
2. **Distinguish refuted assumptions from failures** — a disproven assumption, documented, is discovery working — **and explain why a correct call was correct**, so a claim that held teaches something too.
3. **Frame future work without overselling** — the roadmap as invitation, not fantasy.
4. **Structure the final pitch** around the three questions, for a mixed audience.

---

## Instructor prep / materials

- **Slides:** the retro stance (blameless, specific, actionable); the semester-scale prompt set (§3); the anti-patterns pair (unearned success / performed failure: spin both ways); the final-pitch arc vs. Pitch #1 (what changed).
- **The claims-check worksheet** (built; one per project, print one per student): four blocks, each a row per claim — *the need* (problem statement + proposal: the user and need, how we'd reach them), *the plan* (proposal: scope against the time, the first-named risk), *the build* (the first-version plan's three ranked claims), *the cuts* (two rows, verdict *right call / wrong call / can't tell*). Columns: *what we claimed · what happened: the evidence · verdict (held / refuted / open) · what we learned.* The last column reads *what we learned / why it held*. The evidence rule sits under the table; a closing box says no mix of verdicts is the right one and checks each verdict for evidence, each *held* for having been able to fail. No dates or CP numbers, so it's reusable.
- Know your audience facts for §5: confirm which capstone faculty are invited to Demo Day and what they'll be looking for.

---

## Timed outline (≈75 min)

### 1. Framing — the stance — 8 min
- From the SRE reading: **blameless** means causes live in systems and assumptions, not in persons — "we assumed reachable users, and reaching them took 3× longer" not "Alex was slow."
- **The verdict isn't graded; the evidence is (Tom, Nov 2).** A claim that held, with evidence, was a good call — no one is penalized for having judged well at the start. The learning in a *held* row is *why* the call was right, and whether you'd make it the same way again. A claim that didn't hold, documented, is discovery working. Neither scores higher.
- The two anti-patterns, named — spin in both directions: **unearned success** (it all worked! — with nothing that could have shown otherwise) and **performed failure** (setbacks listed, or invented, to look reflective). Say plainly: there's no quota of failures, and manufacturing one is spin. The graded middle: *claims, evidence, learning.*
- **"Held" means it could have failed** — the callback to Session 19's falsifier. A claim nothing ever tested is *open*, not *held*, and saying so is honest.
- Why it's weighted: retrospective honesty is a CP11 rubric line, and it's the artifact that most predicts whether the *next* project goes better.

### 2. Claims check — project working block — 20 min
- Each project fills the worksheet from their own paper trail (that's why the course made you write everything down):
  - **From CP2:** the need + the users — did real usage/feedback validate them?
  - **From CP3:** feasibility + scope — did the semester arithmetic hold? which risk fired?
  - **From the MVP Plan:** the claims — which did Nov 18 prove? which remain open?
  - **From the cuts (Session 19's V1 Proof Sheet, and those made at the Session 21 check-in):** what did you deliberately not do — and was each cut right?
- Evidence rule: every "validated" or "refuted" points at something — a demo moment, an audit sheet line, an issue, a user conversation.

### 3. The retrospective prompts — drafting the spine — 15 min
- The v4 prompt set, now written as section stubs (2–4 sentences each, live):
  1. **What assumptions held — and which didn't** (from the worksheet's best rows).
  2. **What the MVP validated** (claims with evidence) **and what it didn't** (open questions, stated plainly).
  3. **What we'd do differently** — process (workflow, estimation, review) and product (scope, stack) — each one *actionable*, not vague regret.
  4. **Where the project goes next as others join** — the roadmap framed as invitation; what the first joiner should do; what you'd hand a capstone team. *(Framing rule from v4: future work without overselling — "the foundation supports X" only if it does.)*
- **The format, announced (decided Nov 2; location Nov 4):** the retrospective is **one project document** (the four prompts above), committed as **`docs/retrospective.md`** and included in the `v0.1-launch` tag — public, beside the roadmap and known-issues log, so write it for a stranger. Each member adds a **short individual reflection** — half a page, first person — **submitted privately on Canvas**, never committed. On a solo project, as every project is this term, the author writes both parts; the format is the same so it holds when teams come back.
- **The individual reflection carries the service/stewardship prompt (required — Tom, Nov 2; v4 §14's open note, now settled):** *whom did this work serve, and what did you learn about building for others?* — the users the project was for, and the contributors it's built to welcome. Then one line: *what will you carry into the next project you start or join?* Frame it general-first: every engineer's work ends up in someone else's hands, and noticing who is part of doing the work well. Keep it authentic, not performative — graded for honesty and specificity like the rest of the retrospective (*Retrospective honesty & insight*), never for sentiment. Give it ~3 of the block's 15 minutes as a quiet write.

### 4. From retrospective to pitch — the pivot — 10 min
- The final pitch is the retrospective told forward, for persuasion. The three questions (v4 Wk14) as the arc:
  1. **What need does this serve?** — now with *evidence* Pitch #1 didn't have (discovery + a working slice + audit/user feedback).
  2. **What has been built?** — the live demo, claims-first (the Nov 18 craft, higher stakes).
  3. **Where does it go next — and how can others join?** — the launch package *is* this answer; show the on-ramp, not just the roadmap.
- What changed since Pitch #1: then you sold a *possibility* and recruited collaborators; now you defend a *record* and invite successors, in front of an outside audience (invited faculty among them). *(Capstone carry-forward stays off slides and the student page until Tom has talked with the capstone instructors.)* Honesty compounds: the Q&A will test whether the demo and the retrospective agree.

### 5. Pitch skeleton — project working block — 15 min
- Each project drafts the final-pitch skeleton (**9 min pitch + demo, then 5 min Q&A**, decided Nov 2 — CP12): one slide-idea per beat, budgeted ~2 / ~5 / ~2 min — need (with evidence) → built (demo plan + fallback) → next (roadmap + join). Assign the demo driver and the Q&A first-responders (solo: plan who runs the laptop while you talk, or script around it).
- Instructor circulates with the capstone-faculty ear: *"what would make a skeptical faculty member believe this project has a future?"*

### 6. Wrap — 7 min
- **Wednesday (Dec 2): studio.** Assemble the launch package (punch list → done), run **onboarding test round 2** (the folded-in Thanksgiving session — fresh eyes on the five-needs checklist), finalize the retrospective. **CP11 due end of Wednesday.**
- **Next week:** Mon Dec 7 dry-run (Session 26: full pitch + demo, peer-scored), Wed Dec 9 final studio + cleanup (Session 27). **Demo Day: Mon, Dec 14, 8:30–10:00 AM** (capstone faculty invited). The demo runs from a **`cp12-demo` tag pushed by 11:59 pm Thu, Dec 10** — the last day of classes; nothing but the final may be due after it. The registrar's block is 7:00–10:00; with four projects we start at 8:30 and still finish by 10.
- Tonight: retro stubs → prose; pitch skeleton → slides started.

---

## Threads to carry forward

- The **retrospective** completes CP11 Wednesday; its honesty is re-tested live in Demo Day Q&A.
- The **three questions** structure the dry-run scoring (Session 26) and the CP12 rubric.
- **Refuted-assumptions-as-learning** closes the loop opened in Week 1 (defer judgment, test claims) — say so explicitly; it's the course's epistemics, full circle.
- The roadmap-as-invitation connects CP11 → capstone-seed decisions by faculty.

---

## Open questions / decisions before we flesh this out

- ~~**Retro format**~~ **resolved (Tom, Nov 2): the recommendation** — one project-authored document (matches CP11) with a short individual reflection by each member. All projects are solo this term, but this is the format. **Location (Tom, Nov 4):** the project retrospective lives in the repo (`docs/retrospective.md`, at the `v0.1-launch` tag); the reflection is private, submitted on Canvas with the tag URL and a photo of the signed checklist (CP11 is a text-entry submission, like CP7). *CP11 handout and rubric updated (reflection, its prompt, a `looking_for` note, an instructor note) and CP11 marked to publish.*
- ~~**Service/stewardship prompt**~~ **resolved (Tom, Nov 2): required**, as the individual reflection's prompt (§3).
- ~~**Demo Day slot**~~ **resolved:** Mon, Dec 14 — registrar block 7:00–10:00 AM; the class meets **8:30–10:00** (four projects; everyone gets a little more sleep). **Still open:** faculty invitations, against the 8:30 start.

---

## Deliverable / after class

- Retro spine drafted (headed for `docs/retrospective.md`); reflection started; pitch skeleton drafted. **Due Wed, Dec 2: CP11 Launch Package + Retrospective** (assembled in studio).
- No end-of-term peer evaluations this term (no teams; decided at Session 22, removed here Nov 2).

---

## Appendix — classroom handouts (Session 24)

- **Claims-check worksheet** (§2) — `canvas_material/resources/Claims-Check-Worksheet.html` + `.pdf` (one page)
- **Retro prompt set + anti-patterns** (§1/§3) — slide
- **Final-pitch arc (the three questions)** (§4) — half-sheet
- **CP11 + CP12 rubrics:** `rubrics.md`

---

*Next step: Tom reviews v2. Then: send capstone-faculty invitations for 8:30 AM Dec 14; print the Claims-Check Worksheet. Student page written. Deck built (16 slides: title · today · every project starts on claims · blameless · the verdict isn't graded · spin both ways · held means it could have failed · the worksheet · workshop: claims check · the four retrospective sections · your reflection · the pitch is the retrospective told forward · then vs. now · nine minutes, then five · workshop: pitch skeleton · wrap). Related: `Session23-Nov23-Outline.md`, `Session25-Dec02-Outline.md`, `rubrics.md` (CP11, CP12).*
