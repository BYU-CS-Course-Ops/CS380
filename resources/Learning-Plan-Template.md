# Learning-Plan Template — closing the "learn" gap

*Use this in Week 3 (feasibility) and whenever a candidate idea needs a skill or technology you don't have yet. The goal isn't to list everything you could learn — it's to name the **few real gaps** that stand between you and a buildable project, and make a concrete plan to close them.*

---

## Step 1 — Triage every requirement: Know / Learn / Avoid

For the idea you're evaluating, list what it would take to build, and sort each item into one bucket:

- **Know** — you can already do this. No risk; no plan needed.
- **Learn** — a real but *learnable* gap. These get a plan (below).
- **Avoid** — complexity that doesn't earn its keep. **Cut it, defer it, or route around it** (use a library, a managed service, or a simpler design). Every "avoid" you can justify makes the project more feasible.

| Requirement | Bucket | Note |
|---|---|---|
| _e.g., React front end_ | Know | already comfortable |
| _e.g., real-time sync_ | Learn | never done it — biggest unknown |
| _e.g., custom auth_ | Avoid | use an existing auth provider instead |

---

## Step 2 — Make a plan for each "Learn" item

A learning plan is **stepwise refinement pointed at yourself.** You already know how to break a hard programming problem into tractable pieces; this is the same skill aimed at a skill gap. Five moves — keep each to a line or two. The point is a *specific* path, not "I'll figure it out."

### 2a. Know your "why"

Why this thing, and what does **done** look like? The *why* is what keeps you going on the day it stops being fun. The *done* gives the learning an **ending point** — without one you'll tutorial-spiral forever, always preparing, never building.

### 2b. Set goals — and break them down

A small gap is one goal. A real gap gets refined into chunks, each with a deadline. Make at least one of them **SMART** — **S**pecific, **M**easurable, **A**chievable, **R**elevant, **T**imed.

| ✗ Not a usable goal | ✓ SMART |
|---|---|
| "Learn WebSockets" | "By Friday, two browser tabs exchange messages through a server I wrote, and I can explain the handshake." |
| "Get better at Postgres" | "By Sep 30, I can write and explain a three-table join with an index that measurably speeds it up." |

The difference: you can **finish** the right-hand ones and know that you did.

### 2c. Make a schedule

An unscheduled plan is a wish. Block real time on a real calendar — then two things people rarely account for:

- **Know your focus limit.** How long can you actually concentrate before quality drops? Plan in blocks that size. Push a little past it and the endurance grows over time — it's a mental muscle.
- **Schedule breaks.** We remember best what we study right after starting and right before stopping, so more start/stop boundaries means more retention. Stepping away also lets your subconscious work — the same reason a bug you couldn't crack solves itself on the walk home.

### 2d. Be accountable to someone

Your *why* is intrinsic motivation. A person who's expecting an update is extrinsic — you want both. They encourage you when it's grim, and knowing there's a check-in is often what gets you started.

Working engineers build this in deliberately: a manager who asks about it in a 1:1, a mentor, a study group, a public commitment in a standup or an issue thread. The mechanism is the same everywhere — say out loud, to a specific person, what you're learning and by when. *(In this course the nearest one is your neighbor today, and your teammate once teams form.)*

### 2e. Build something

Learning aimed at a concrete artifact beats learning in the abstract — and the debugging teaches as much as the building does. The efficient move is to pick an artifact that does **two jobs at once**: it teaches you the thing, and it answers a real question the project needs answered. A time-boxed spike is exactly that artifact, which is why experienced engineers reach for one when facing an unfamiliar technology on a real deadline. *(In this course, the spike required for your proposal is usually the same experiment as the "build something" step here — one activity, two jobs.)*

- **The spike:** a **time-boxed experiment (1–3 days)** proving you can do the hard part — a throwaway prototype or focused proof-of-concept. What question does it answer, and what counts as **"green"** (feasible) vs. **"red"** (rethink)?

### Put it together (repeat per gap)

> **Gap:** _______
> **Why / what "done" looks like:** _______
> **SMART goal:** _______
> **How I'll learn it:** _(specific resource — official docs, a named tutorial, a person. Not "Google it.")_ _______
> **When:** _(actual blocks on an actual calendar)_ _______
> **Accountable to:** _______
> **Spike:** _(question)_ _______ · _(time box)_ ___ days · _(green = )_ _______
> **Checkpoint:** _(how I'll know the gap is closed enough to proceed)_ _______

*You won't run this whole ceremony for a two-hour gap — there it's intuitive. The steps still apply every time; making them conscious is what makes the big gaps survivable.*

---

## Step 2½ — How you'll actually do the learning

The techniques that reliably pay, when the plan says "learn it":

1. **Official documentation.** You will read a lot of it. Reading docs well is a *trainable skill* — most people have never practiced it deliberately. Start now.
2. **Take notes in your own words.** The translation *is* the learning; copying isn't.
3. **Experiment.** Try odd inputs and edge cases. Did it do what you predicted? If not, you just found the real gap.
4. **Build something.** Concrete practice cements abstract ideas (see 2e).
5. **Tutorials and videos.** Learn from trailblazers — but don't mistake watching for doing.

**Expect a plateau.** Learning curves aren't linear: fast at first, then a long flat stretch where it feels like you've stopped improving. That plateau is normal, it is where most people quit and decide they're "bad at this," and getting across it is mostly just continuing. Retention comes from **retrieving and using** what you learned, not from re-reading it.

---

## Step 3 — Use AI as a *learning* aid, honestly

AI tools are fair game for **accelerating understanding** — explaining a concept, scaffolding a spike, unblocking an error. They are **not** a way to skip understanding, and the reason isn't a rule someone imposed on you. Code you don't understand is code you can't review, debug, extend, or defend, and the bill always comes due somewhere: in a code review you can't answer for, in an interview, in an outage at 2 a.m. when the person who has to reason about the system is you. A good test: *could you explain how this works, and change it, without the tool?* If not, that's still a "Learn" gap — plan for it. *(In this course that principle is also the standard you're held to: you must understand and be able to defend everything you submit.)*

---

## Step 4 — Reality-check against your time budget

Every project has a budget, and **learning competes with delivery inside it.** The mistake is universal: people count their learning against the calendar rather than against the hours that actually remain after meetings, reviews, writing, testing, and the rest of life come out. Count your "Learn" items against the real remainder, not the nominal number:

- **1–2 real gaps** with clear plans → healthy; this is a normal, ambitious project.
- **3+ deep gaps** in unfamiliar areas → a **schedule/skill risk.** Shrink scope, move something to "Avoid," or pick a more tractable idea.

Learning time is *build time you're not spending*. That's not an argument against learning — it's the reason to plan it deliberately rather than discover it late, when there's no room left to react.

*Your numbers in this course:* about **10 hours a week total**, and that includes class, reading, discovery interviews, writing, and reviews — with real building running roughly **five weeks**. Your learning-and-building time is a fraction of ten, so budget against the fraction.

---

*Pairs with the `Feasibility-Risk-Worksheet.md` (the six risk categories) and the `Idea-Scoring-Sheet.md` (converging in Week 3). Feeds the feasibility section of your Written Proposal (CP3).*
