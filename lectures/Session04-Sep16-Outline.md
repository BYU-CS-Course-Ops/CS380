# Session 4 — Discovery Workshop: Needfinding & Talking to Users — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 4 of 27 · Wed, Sep 16, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Course summary of *The Mom Test*** — `canvas_material/pages/Mom-Test-Summary.md` (the rules and techniques for talking to users without fooling yourself). *(The library has the full book if you want it; not required.)*
- **Nielsen Norman Group — [*User Interviews 101*](https://www.nngroup.com/articles/user-interviews/)** — how, when, and why to run interviews.
- **Nielsen Norman Group — [*Personas*](https://www.nngroup.com/articles/persona/)** — background for the persona you'll build.
- **Interview ethics for students** — `canvas_material/pages/Interview-Ethics-for-Students.md` (short — consent, privacy, and when interviews count as "research").
**Maps to:** Design Week 2, Session B — *discovery workshop: interviewing, good questions, honest persona/proxy construction, consent/ethics.*

> **Status: OUTLINE (v2 — expanded per instructor notes).** Second half of Week 2 — a hands-on workshop (Session B). Students practice interviewing in class, then talk to real people during the week.

---

## Purpose of this session

You've generated a big pile of candidate problems. The founder's next job is the hardest and most important one: **understand a real user's need deeply enough to speak for it** — that's the sponsor role. Today is about **discovery (needfinding):** how to talk to people about their problems *without fooling yourself*, how to ask non-leading questions, and how to capture what's real. It's a workshop — you practice interviewing in class, then take it to real people this week.

---

## Learning objectives

By the end of this session, a student can:

1. **Explain why naive user questions mislead**, and apply the three Mom Test rules.
2. **Ask open, non-leading questions** and tell a good question from a leading one.
3. **Run a short discovery interview** and capture the needs they hear.
4. **Build an honest, evidence-tagged persona/proxy** when real access is limited.
5. **Follow basic consent/ethics** when talking to real people.

---

## Instructor prep / materials

- **Assign the reading in advance** and expect it done.
- **Print / post the handouts:** `canvas_material/pages/Good-vs-Leading-Questions.md`, `canvas_material/pages/Interview-Prompt-Cards.md`, `canvas_material/pages/Persona-Template.md` (and the `Mom-Test-Summary.md` reading).
- A slide with the **three Mom Test rules** and one with the **mock-interview process** (§4).
- **The ethics gate (deck slide 8)** — the hands-up confirmation that closes §3. Run it every time this session is taught; it is the last gate before students interview real people.
- The **Discovery Notes assignment** (`canvas_material/assignments/handouts/Discovery-Notes.md.jinja`) ready to hand out.
- *Reusable from the prior course:* discovery/needfinding material in `open-source-project-course/`.

---

## Timed outline (≈75 min)

### 1. Bridge + framing — 3 min
- From *generating* problems to *investigating* them. Today's goal: learn to hear the **truth** about a need — not the polite version — and start finding out which of your candidate problems are real.

### 2. Why discovery is hard — the validation trap + the Mom Test rules — 11 min
- **The validation trap:** people are nice and tell you what you want to hear. Ask *"would you use this?"* and you'll get a polite "yes" — so you hear **validation, not truth**, and build something no one needs.
- **The three Mom Test rules (put these on a slide):**
  1. **Talk about their life, not your idea.** Don't pitch — ask how they do things *today*, what's annoying, what they've tried.
  2. **Ask about specifics in the past, not generics or hypotheticals.** *"Tell me about the last time you…"* beats *"Would you…?"* or *"Do you usually…?"*
  3. **Talk less, listen more.** If you're the one talking, you're not learning.
- **Watch-fors:** compliments ("cool idea!") are fluff, not data; "I usually / always" is a generic — pull it back to a *specific* recent instance; "I would…" is a hypothetical — ask what they do *now*.
- **Real signals:** an existing workaround, time or money already spent, genuine emotion, "email me when it's ready."
- *(Anchor: the Mom Test summary handout.)*

### 3. Interview craft — good vs. leading questions + consent/ethics — 10 min
- **Good vs. leading (from the handout):** work through 3–4 pairs live — *"Would you use an app that…?"* → *"Tell me about the last time you dealt with…"*; *"How much would you pay?"* → *"What do you currently spend on this?"*
- **The core moves:** *"walk me through the last time,"* *"how do you handle it now?"* (surfaces workarounds), dig into **time / money / effort**, then **let silence do the work.**
- **Consent & ethics (make this explicit):** this is course-level needfinding, not formal research, but the norms matter —
  - **Ask permission and say why:** *"I'm a student learning about [problem] — can I ask you a few questions? ~10 minutes."*
  - **Be honest** — you're learning, not selling.
  - **No recording without permission;** notes are fine.
  - **Respect their time and their "no."**
  - **Protect privacy** — anonymize in your notes/brief.
  - **Check with the instructor first** for sensitive topics/populations (minors, health info, etc.).
  - *(Anchor readings: the consent section of the Good-vs-Leading handout and `canvas_material/pages/Interview-Ethics-for-Students.md`, which is grounded in BYU IRB guidance.)*
- **Then close the section with the gate (~2 min, deck slide 8).** You've just taught the norms; now confirm them, because this is the last checkpoint before students go talk to real people on their own. Read the four aloud — *ask and say why · no recording unless they say yes · anonymize your notes · sensitive topic, ask me first* — and take hands on each. A room that can't raise hands on "anonymize" hasn't read the ethics handout, and that is worth finding out now rather than after someone's name lands in a brief. Two points on the gate slide are **not** in the norms list above, because they come from the reading:
  - **The IRB boundary.** A classroom project isn't "research" in BYU's sense, so no IRB review is required — but ethics apply in full, and publishing or making generalizable claims later *would* require IRB approval first. Tell them to come ask before collecting more data if they think they're crossing that line.
  - **Power imbalance.** Someone who might feel they can't refuse you — a roommate, an employee, someone you lead — can't give a real "no." Students trip here because their easiest interviewees are exactly the people who can least comfortably decline.

### 4. Practice — mock interviews (3 rounds) — 24 min
- **Triads: Interviewer · User · Observer**, rotating so **everyone interviews once — three rounds** (three roles → three rotations).
- **Process (put this on a slide):**
  1. **Setup (~2 min):** form triads; each person picks a **real problem area they genuinely have** (prompt cards) to be the "user" for.
  2. **Each round (~6 min):** ~5 min interview + ~1 min rotate & jot notes.
     - **Interviewer:** good, non-leading questions only — *no pitching, no solutions.* You're starting cold (the User picked the topic), so use the **interviewer funnel** on the prompt card — open → last instance → workaround → "why" ladder → reflect back — to reach the real problem fast.
     - **User:** answer truthfully from your own life.
     - **Observer:** tally leading questions and capture the real needs that surface.
  3. **Rotate** roles so each person is Interviewer once, User once, Observer once.
  4. **Debrief (~4 min):** which leading questions slipped in? what real need surprised you? what was the hardest habit to break?
- *Timing: 2 setup + 3 × 6 rounds (18) + 4 debrief = 24 min.*

### 5. When you can't reach a real user — honest personas/proxies — 11 min
- Real conversations are the **default** (next section) — but you'll also build **one honest persona**, both for the experience and for needs you can't reach directly.
- **What makes it "documented honestly" (the persona template):**
  - **Every claim is tagged** `[E]` **evidence** (with a real source — a forum thread, a review, a community post, your own observation) or `[A]` **assumption** (a labeled guess).
  - **No invented facts** — a guess is marked `[A]`, never dressed up as fact.
  - **A sources list**, and **the top assumptions you'd verify** in a real conversation.
- Walk the template quickly; show the **honest vs. made-up persona examples** (`canvas_material/pages/Persona-Examples.md`) side by side — same topic (commuter parking), opposite method — then debrief what makes one trustworthy.
- **Scope it modestly** — ~an hour of gathering readily-available evidence, not a research project.

### 6. The Discovery Notes assignment + capture — 8 min
- **Real conversations are required.** Everyone **must talk to at least one real person (aim for 1–3)** who *actually has* the problem. **There are no seeded users — you find your own** (roommates, classmates, family, club/ward members, people in the affected community).
- **Plus: build one honest persona** (template) for a need you couldn't reach directly — kept modest.
- **Capture the needs, not solutions:** who they are, the problem *in their words*, how they handle it today, what it costs them, and one thing that surprised you.
- Hand out **`canvas_material/assignments/handouts/Discovery-Notes.md.jinja`**. It feeds your **Product Definition Brief** (Week 3).

### 7. Wrap + before next class — 8 min
- Recap the three rules in one breath.
- Preview **Week 3:** feasibility, self-directed learning, and the **Product Definition Brief.**
- **Due soon:** the License/OSS short response (Session 3) and your Discovery Notes. Keep feeding the journal.

---

## Threads to carry forward

- **Discovery notes** feed the Product Definition Brief (Week 3) and the written proposal.
- *"Understand a real need well enough to speak for it"* = the **sponsor role.**
- **Honest persona/proxy** is a supplement this iteration — the real conversation is required.
- **Non-leading questioning** is a technical-communication skill (the course through-line).

---

## Open questions / decisions before we flesh this out

- **Consent/ethics reading:** drafted — `canvas_material/pages/Interview-Ethics-for-Students.md` (grounded in BYU IRB's "Is IRB Review Required?" guidance). *Decision needed:* assign it as pre-reading (it's ~2 pages), or just discuss in class from the handout? *(Currently listed under Prior reading.)*
- **Persona scope:** confirmed — everyone builds **one** modest persona *in addition to* the required real conversation(s); ~an hour.
- **Practice format:** confirmed — triads, **three rounds** so everyone interviews.
- **Number of conversations:** minimum **one**, aim for **1–3** — confirm the floor you'll grade against.

---

## Deliverable / after class

- **Discovery Notes** (`canvas_material/assignments/handouts/Discovery-Notes.md.jinja`): notes from **1–3 real conversations** + **one honest persona**, for your starred problem spaces. Feeds the Product Definition Brief.

---

## Appendix — classroom handouts (Session 4)

- **The Mom Test — summary (reading):** `canvas_material/pages/Mom-Test-Summary.md`
- **Good vs. Leading Questions (+ consent/ethics):** `canvas_material/pages/Good-vs-Leading-Questions.md`
- **Interview Prompt Cards (mock-interview rounds):** `canvas_material/pages/Interview-Prompt-Cards.md`
- **Persona Template (honest, evidence-tagged):** `canvas_material/pages/Persona-Template.md`
- **Persona examples (honest vs. made-up):** `canvas_material/pages/Persona-Examples.md`
- **Interview ethics for students (reading):** `canvas_material/pages/Interview-Ethics-for-Students.md`
- **Discovery Notes assignment:** `canvas_material/assignments/handouts/Discovery-Notes.md.jinja`

---

*Next step: finalize the consent/ethics reading decision, then build the Session 4 slide deck and student page. Related: `Session03-Sep14-Outline.md`, `CS301R-ProjectCreation_v4.md` (§7 Week 2), `assignments/`, `resources/`.*
