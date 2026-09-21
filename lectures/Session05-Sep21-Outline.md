# Session 5 — Feasibility, Self-Directed Learning & the Learning Plan — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 5 of 27 · Mon, Sep 21, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Peter Norvig — [*Teach Yourself Programming in Ten Years*](https://norvig.com/21-days.html)** — the mindset behind self-directed learning and tech-stack discipline: depth over shortcuts, learn by doing, choose tools deliberately.
- **DIY Genius — [*How to Create Your Own Self-Directed Learning Plan*](https://www.diygenius.com/how-to-create-a-self-directed-learning-plan/)** — the concrete mechanics we'll use in class: your *why*, SMART goals, a real schedule, an accountability partner, and building something to prove it. Norvig motivates the habit; this operationalizes it.
- **Course reading — [*Spikes — Buying a Cheap Answer to Your Scariest Unknown*](../canvas_material/pages/Spikes-Reading.md)** (Canvas → Course Resources; `canvas_material/pages/Spikes-Reading.md`) — the time-boxed investigation you'll use to de-risk an unknown before committing; the green/red framing you'll use in class. *Optional companion:* [Mike Cohn — *Agile Spikes*](https://www.mountaingoatsoftware.com/blog/spikes) for the standard industry framing.
- **Re-skim:** the **Value vs. Do-ability** section of the CPS handbook (p. 27) — [download the PDF](https://brdo.berkeley.edu/sites/default/files/cps_handbook.pdf) — you'll use it Wednesday to converge.

**Optional (deeper on *how* learning works):**
- **Maestro — [*What is the Learning Curve? The Science of Boosting Knowledge Retention*](https://maestrolearning.com/blogs/what-is-the-learning-curve-2/)** — the forgetting curve and why retrieval and spacing beat re-reading; the science behind the plateau we name in §4.
- **Peter Brown, Henry Roediger & Mark McDaniel — *Make It Stick: The Science of Successful Learning*** — the definitive treatment of how to study for retention. Not free to buy, but [available through the HBLL](https://lib.byu.edu/search/byu/search?q=make%20it%20stick&scope=external).
**Maps to:** Design Week 3, Session A — *feasibility analysis; "what must I already know vs. learn vs. avoid"; a learning-plan template; richness check (does this exercise multiple engineering dimensions?).*

> **Status: OUTLINE (v1).** First half of Week 3 — a teaching session (Session A). Sets up Wednesday's convergence workshop, where **CP1 Idea Briefs** are due; **CP2 Product Definition Brief** follows on Mon, Sep 28, after students have converged.

---

## Purpose of this session

For three weeks you've been *diverging* — generating and investigating problems. Now you start *converging*, and the first honest question a founder asks is: **can I actually build a meaningful working slice of this with the time and skill I have?** Today gives you the tools to answer that: how to name and weigh **feasibility risk**, how to tell **what you must already know from what you can learn from what you should avoid**, and — the part most people skip — how to **plan the learning itself** instead of hoping it happens.

That last piece is the one with the longest shelf life. Almost everything you build in your career will require something you don't know yet, and after graduation nobody assigns you the reading. **Self-directed learning is the skill under all the other skills**, and a learning plan is how you make it deliberate: a real goal, broken down, scheduled, made accountable to someone, and proven by building something. You'll use these instruments Wednesday to narrow to one or two ideas — and you'll use them for the rest of your working life.

---

## Learning objectives

By the end of this session, a student can:

1. **Name the six feasibility-risk categories** and identify which ones threaten a given idea.
2. **Triage what they know vs. must learn vs. should avoid**, and scope a **time-boxed spike** to reduce the biggest unknown.
3. **Describe how they learn** — name techniques that have worked for them, recognize where they are on the learning curve, and state how they'll know a gap is closed.
4. **Draft a learning plan** for a skill a candidate idea requires: a *why*, goals broken down (at least one **SMART**), a realistic **schedule**, an **accountability partner**, and something they'll **build** to make the learning concrete.
5. **Choose a tech stack deliberately** — favoring tools they can own, explain, and support over novel ones.
6. **Use AI responsibly as a learning aid** while still owning and being able to defend their understanding.

---

## Instructor prep / materials

- **Assign the reading in advance** and expect it done.
- **Slides:** the six risk categories; the know / learn / avoid triage; the learning curve (plateau); the five learning-plan steps; SMART with the live good/bad contrast; the techniques toolkit.
- **Print the handout:** one **Feasibility Pass Worksheet** per student (`canvas_material/resources/Feasibility-Pass-Worksheet.pdf`) — the §6 exercise on one page: the six risks rated across three candidate ideas (A in class, B and C before Wednesday), know / learn / avoid, and a one-gap learning plan. The fuller guidance lives on two Canvas pages: the **Feasibility & Risk Worksheet** (`canvas_material/pages/Feasibility-Risk-Worksheet.md`) and the **Learning Plan Template** (`canvas_material/pages/Learning-Plan-Template.md`).
- Have the **worked example — QueueUp, a live office-hours help queue (*Appendix B*)** — ready to model the feasibility pass, the spike, and the learning plan live. It's a teaching vehicle, not a suggested project; the Session-1 reservation tool stays an illustration, not a template.
- **Be ready to name your own learning plan.** §4 lands far better if you can say what *you* had to learn recently, how you went about it, and where you stalled. Students discount the advice if it sounds theoretical.
- *Reusable from the prior course:* the **Learning to Learn** module — `open-source-project-course/modules/curious/learning.md` — is the direct source for §4–§5 (discussion prompts, the five-step plan, the techniques list). Feasibility/scope material elsewhere in that repo.

---

## Timed outline (≈75 min)

### 1. Bridge + framing — 4 min
- Three weeks of diverging; now we converge. Today is the **feasibility toolkit** plus the skill underneath it — **learning what you don't know yet, on purpose.** Wednesday you use both to narrow to **1–2 ideas** — **CP1 is due Wed, Sep 23**, and **CP2 follows Mon, Sep 28**, once you've chosen.
- The founder's honest question: *can I build a real slice of this with the time I actually have — and if not yet, can I close the gap?*

### 2. Feasibility & the six risk categories — 14 min
- Feasibility isn't a yes/no — it's a set of **risks you name honestly and then reduce.** Hiding a risk doesn't make it go away; it just moves the surprise to week 10.
- **The six categories (put these on a slide), each with a one-line example:**
  1. **Technical** — is the core hard part actually doable? (e.g., real-time sync, offline support, ML accuracy.)
  2. **Schedule** — does the vertical slice fit the time you actually have? Estimate honestly, then cut.
  3. **Dependency** — do you rely on an API, dataset, device, or service that could vanish, cost money, or rate-limit you?
  4. **Skill** — is there a gap between what the build needs and what you know today?
  5. **Adoption** — will real users actually use it, or is the need too weak?
  6. **Maintenance** — can you (and future contributors) keep it running and understandable?
- **The move:** for your leading idea, rate each category **low / medium / high**, and circle the one or two that could sink the project. Those are what you de-risk first.
- **Model it live** on the worked example — **QueueUp**, a live office-hours help queue (full arc in *Appendix B*). Fill the six-risk table on the board with the room. The read that matters: **Technical (high)** and **Skill (high)** land on the *same* unknown — real-time sync — so that's the one thing you de-risk first. Say that out loud: two risk boxes, one root cause.

### 3. De-risking — know / learn / avoid, and the spike — 12 min
- **Triage every requirement into three buckets:**
  - **Know** — you can already do it; no risk here.
  - **Learn** — a real but *learnable* gap; make a plan (next section).
  - **Avoid** — complexity that doesn't earn its keep; **cut it or route around it.** (This is the "boring stack" instinct from Session 1: complexity only where it pays for itself.)
- **Triage QueueUp live (from *Appendix B*):** **Know** — CRUD app, REST backend, component UI, basic auth. **Learn** — real-time sync (the circled risk). **Avoid** — rolling your own auth (use campus SSO / a provider), presence/video (it's a queue, not a call tool), native mobile (web is fine for v1). Point out that every honest **Avoid** *reduces* feasibility risk — routing around complexity is a skill, not a cop-out.
- **The spike (from the reading):** a **time-boxed investigation (1–3 days)** whose only goal is *learning*, not shipping a feature — a throwaway prototype or a focused research dive to answer "is this hard part actually feasible?"
- **This is required, not optional.** Every student runs **at least one spike** on their chosen idea's scariest unknown before the proposal; its result lands in CP3 and is graded there. Say it plainly today so no one is surprised: a feasibility claim you haven't tested is a guess, and the proposal asks for evidence, not optimism.
- **Model the spike live — scope it on QueueUp's scariest unknown:**
  - **Frame the move aloud:** "I don't have to *build* real-time to find out whether I *can*. I timebox a throwaway experiment against the single scariest unknown."
  - **The question:** *Can I get a queue that updates live across two browsers in under ~1 second, using a managed realtime layer, in two days?*
  - **Time box:** 2 days. **Green =** open two tabs; add an entry in tab A; it appears in tab B with no refresh in <1s; claiming it in the TA tab clears it from the student tab live.
  - **The lesson students miss — a "red" spike is a *win*, not a failure.** If sync is too hard, or the free tier rate-limits below a class's worth of updates, red doesn't kill QueueUp — it tells you real-time may be a *nice-to-have you can fake with a 5-second refresh.* **The spike converts "is this doomed?" into a scoping decision.** This is the single most important point in the section — land it.
  - **Highlight:** narrate the timebox ("if I'm not green by Thursday I *stop* and reconsider — I don't keep digging"), and that a green spike here retires **both** risk #1 and risk #4 at once.

### 4. How you actually learn — and tech-stack discipline — 14 min

*The pivot of the session: from "what don't I know?" to "how do I go about knowing it?" Students have been learning their whole lives, almost always on someone else's schedule. Make the process itself visible before asking them to plan it.*

- **Open with the honest frame (2 min):** you've been learning for eighteen-plus years, and nearly all of it was directed by someone else — teacher, syllabus, assignment. After graduation, **nobody assigns you the reading.** You pick the topic (or your job picks it), and the entire process is yours to design. That transition is the one this course cares most about.
- **Quick discussion — surface their own practice (5 min).** Ask two or three of these to the room; take answers aloud, don't lecture the answers:
  - *When you had to learn something genuinely new, what actually worked? What didn't?*
  - *Where do you go to learn — and does the environment change how well it goes?*
  - *How do you know when you've learned enough?* (Watch for "when it compiles" — press on it.)
  - *What do you still remember six months later, and why that and not the rest?*
- **Name the learning curve (2 min):** progress is not linear. Early learning feels fast, then plateaus — the plateau is normal and is where most people quit and declare themselves "bad at it." Knowing the shape in advance is what gets you across it. Retention comes from **retrieval and use**, not re-reading.
- **Norvig's point (2 min):** there are no 24-hour shortcuts — expertise comes from **deliberate practice and learning by doing.** Ten years is the honest headline, but the mechanism is what matters here: sustained practice on real problems beats tutorials consumed passively.
- **The techniques that actually pay (2 min)** — the toolkit, stated plainly:
  1. **Official documentation** — reading docs is a *trainable skill*, not a chore; most students have never practiced it deliberately.
  2. **Notes in your own words** — the translation is the learning.
  3. **Experiment** — poke it with odd inputs; did it do what you predicted? If not, you've found the gap.
  4. **Build something** — concrete work cements abstract ideas, and the debugging teaches as much as the building.
  5. **Tutorials and videos** — learn from trailblazers, but don't mistake watching for doing.
- **Tech-stack discipline (2 min):** all of the above costs time, which is why stack choice *is* a learning decision. Favor a **tractable stack** you and your teammate can reason about at 1 a.m. and onboard the next contributor into. Reach for the novel/hot tool only where it clearly earns its place — every unfamiliar tool is a "Learn" item you're volunteering for.
- **AI as a *learning* aid, used responsibly (1 min):** great for explaining a concept, scaffolding a spike, or unblocking — but the standard from Session 1 holds: **you must understand and be able to defend everything you submit.** The test: *could you explain how this works, and change it, without the tool?* If not, it's still a gap — plan for it. Using AI to skip understanding is the trap; using it to accelerate understanding is the goal.

### 5. Building a learning plan — 18 min

*Walk the template live against the worked example, one step at a time. This is the section that has to land — the plan is the artifact they'll actually reuse. Use **QueueUp's** circled gap — real-time sync — so §2, §3, and §5 all trace one idea; the fully worked plan is in **Appendix B**.*

- **Framing:** a learning plan is stepwise refinement pointed at yourself. You already know how to break a hard programming problem into tractable pieces — this is the same skill, applied to a skill gap. **Five steps:**

  1. **Know your "why" (2 min).** Why this thing, and what does *done* look like? The why supplies motivation on the day it stops being fun; the target supplies an **ending point**, so learning doesn't sprawl forever. Vague why → infinite tutorial spiral.
  2. **Set goals — and break them down (5 min).** Small gap: one small goal. Real gap: refine it stepwise into chunks, each with a deadline. Make at least one **SMART** — **S**pecific, **M**easurable, **A**chievable, **R**elevant, **T**imed. *Contrast live on QueueUp's gap:* "learn real-time sync" (unmeasurable, never done) vs. "by end of day 2, two browser tabs share a live queue through a managed realtime service I wired up, and I can explain how the subscription pushes updates." The second one you can *finish* — and notice it's the **same statement as the spike's green line**: a good SMART goal and a good spike are often the same sentence.
  3. **Make a schedule (4 min).** Block actual time — an unscheduled plan is a wish. Then two things students rarely consider: **know your focus limit** (how long *can* you concentrate? push a little past it and the endurance grows — it's a muscle), and **schedule breaks** (we remember best what we study right after starting and right before stopping, so more start/stop boundaries means more retention — and stepping away lets the subconscious work, which is also why walking away fixes bugs).
  4. **Be accountable to someone (3 min).** The "why" is intrinsic motivation; a person expecting an update is extrinsic, and you need both. They encourage you when it's grim, and the check-in itself creates momentum. **In this course you already have one:** your neighbor now, your teammate after Oct 7. *Ask students to name theirs out loud before leaving.*
  5. **Build something (2 min).** Learning aimed at a concrete artifact beats learning in the abstract — and for this course, **the spike from §3 *is* the build.** That's the join: the spike de-risks the project *and* proves the learning. One activity, two jobs.

- **Close the loop back to the template's mechanics (2 min):** each gap gets **the gap · how you'll learn it (a specific named resource, not "Google it") · the spike (question, time box, what counts as green) · the checkpoint** (how you know it's closed enough to proceed).
- **The honest budget check:** the course expects ~10 hrs/week *total* — class, reading, discovery, writing, and reviews all come out of it, so real learning-and-building time is a fraction of that. **1–2 real gaps** with plans is a healthy, ambitious project; **3+ deep gaps** is a schedule/skill risk — shrink scope, move something to "Avoid," or pick a more tractable idea. Learning time is build time you're not spending. Plan it; don't discover it in Week 10.
- *Note for students: you won't run this whole ceremony for every small thing — for a two-hour gap it's intuitive. The steps still apply; making them conscious is what makes the big ones survivable.*

### 6. In-class — feasibility pass + one learning plan — 10 min
- **Solo (or with your neighbor), on one starred idea:**
  1. Rate the **six risks** low/med/high; circle the top one. *(3 min)*
  2. Bucket its main requirements into **know / learn / avoid**. *(2 min)*
  3. Take your biggest **"Learn"** item and write a **one-gap learning plan**: why · one SMART goal · when you'll actually do it · who you'll tell · the spike that proves it. *(4 min)*
  4. **Say your accountability partner's name to them** before you leave. *(1 min)*
- Collect one or two aloud — especially a sharp SMART goal and a well-scoped "avoid."

### 7. Wrap + before next class — 3 min
- Recap: feasibility = **named, weighed, and reduced** risk; converge on what you can **own**; and the gaps that remain get a **plan**, not a hope.
- **Wednesday, Sep 23 (convergence workshop):** bring **2–3 candidate ideas** with a rough feasibility read on each. We'll add the richness test and score them there.
- **Due Wed, Sep 23:** **CP1 Idea Briefs.** Bring your **Discovery Notes** — they feed CP2. **CP2 Product Definition Brief** is due **Mon, Sep 28** (write it after you converge). Keep feeding the journal.

---

## Threads to carry forward

- The **feasibility read + learning plan** feed the **written proposal's** feasibility section (Week 4).
- **Know / learn / avoid** and the **spike** habit recur throughout the build phase.
- **Richness** is introduced Wednesday (Session 6) as part of the scoring yardstick; it is the §9 north star and returns at pitch and in team formation.
- **The learning plan is meant to be revisited, not filed.** Students will have worked their plans by the build phase — the Week 13 retrospective asks whether the plan survived contact with the project (goals sized right? schedule realistic? accountability actually used?).
- **Self-directed learning** is the *Curious* strand and an explicit course outcome — reinforce it whenever a team hits an unfamiliar technology, not just today.
- **AI-as-learning-aid, defend-what-you-submit** is a standing course norm.

---

## Open questions / decisions before we flesh this out

- **Learning-Plan template + Feasibility/Risk worksheet:** created — Canvas pages `canvas_material/pages/Learning-Plan-Template.md` and `canvas_material/pages/Feasibility-Risk-Worksheet.md` (kept as two short readings), plus the one-page printable `canvas_material/resources/Feasibility-Pass-Worksheet.pdf` for §6.
- **CP2 Product Definition Brief handout:** created — `canvas_material/assignments/handouts/CP2-Product-Definition-Brief.md.jinja`.
- **Spike expectation:** *resolved* — **at least one spike is required.** Every student runs one time-boxed spike on their chosen idea's scariest unknown before the proposal, and reports the result (green/red + what they'll do about it) in **CP3's technical-approach/risks section**, where it's graded under *Feasibility*. A hand-waved feasibility claim with no spike behind it is the failure case this closes.

---

## Deliverable / after class

- No new checkpoint due today. **Prepare for Wednesday:** a feasibility read on your 2–3 leading candidates, and your Discovery Notes in hand.
- **Also:** a one-gap learning plan for your leading candidate (started in class) — it feeds CP3's feasibility section in Week 4.
- **Required (once you've converged):** run **at least one spike** on your chosen idea's scariest unknown during the proposal window (Sep 23–Oct 5). Its result — green/red and what you'll do about it — goes in CP3 and is graded under *Feasibility*.
- **Looking ahead:** CP1 Idea Briefs due Wed, Sep 23; CP2 Product Definition Brief due Mon, Sep 28.

---

## Appendix A — classroom handouts (Session 5)

- **Feasibility Pass Worksheet** (printable, one per student — §6): `canvas_material/resources/Feasibility-Pass-Worksheet.pdf` (source `.html` alongside)
- **Learning Plan Template** (Canvas page): `canvas_material/pages/Learning-Plan-Template.md`
- **Feasibility & Risk Worksheet** (Canvas page — six categories + de-risk moves): `canvas_material/pages/Feasibility-Risk-Worksheet.md`
- **Selection criteria (§9)** — from `CS301R-ProjectCreation_v4.md` / the Session 1 deck
- **CPS handbook — Value vs. Do-ability (p. 27):** [download the PDF](https://brdo.berkeley.edu/sites/default/files/cps_handbook.pdf)

---

## Appendix B — Worked example: **QueueUp**, a live office-hours help queue

*The one idea threaded through §2 (feasibility), §3 (know/learn/avoid + the spike), and §5 (the learning plan). It's a **teaching vehicle**, not a suggested project — keep the reservation tool from Session 1 as illustration and this as illustration; students find their own. Modify freely; the structure is what matters, not the specific idea.*

**One line for the board:** In a busy CS course, office hours are chaos — students don't know their place in line, TAs lose track of who's next, and remote students get skipped. **QueueUp** is a shared **live** queue: a student adds themselves with a question topic, everyone sees their real-time position, and the TA claims the next person — remote and in-person unified.

**Why it teaches well** (for you, not the slide): reachable users are literally down the hall (discovery is trivial this week); it has **one genuinely scary unknown** — real-time sync — whose spike can go green *or* red, and the red path is the best lesson in the session; the skill gap is real but learnable; and it's rich enough (two roles, a data model, live sync, notifications, later analytics) to quietly preview Wednesday's richness test.

### The six-risk pass (§2)

| # | Category | Read | Why |
|---|---|---|---|
| 1 | **Technical** | **High** | Live queue state pushed to every open client in ~1s. Never done real-time. |
| 2 | Schedule | Med | One course; add / see-position / claim, live — that slice fits. |
| 3 | **Dependency** | Med | Build WebSockets myself vs. lean on a managed realtime service (free-tier rate limits?). |
| 4 | **Skill** | **High** | Built request/response apps, never real-time. *Same root as #1.* |
| 5 | Adoption | Med | Will students open an app vs. just walk in? Confirm the "I get skipped / don't know my place" pain is real. |
| 6 | Maintenance | Med | Runs live during every session; a mid-session crash is very visible. TA onboarding. |

**Circle #1 and #4** — one unknown wearing two hats. That's what you de-risk first.

### Know / Learn / Avoid (§3)

- **Know:** CRUD web app, REST backend, component UI, basic auth.
- **Learn:** real-time sync — pushing queue changes to all connected clients live.
- **Avoid:** rolling your own auth (use campus SSO / a provider); presence/video (it's a queue, not a call tool); native mobile (web is fine for v1). *Every honest "Avoid" reduces feasibility risk.*

### The spike (§3, "Model it live")

- **Question:** *Can I get a queue that updates live across two browsers in under ~1 second, using a managed realtime layer, in two days?*
- **Time box:** 2 days.
- **Green =** open two tabs; add an entry in tab A; it shows in tab B with no refresh in <1s; claiming it in the TA tab clears it from the student tab live.
- **Red =** can't get sync working, or the free tier rate-limits below a class's worth of updates → **rescope, don't abandon:** ship a 5-second refresh for v1, note real-time on the roadmap. **The spike converts "is this doomed?" into a scoping decision** — this is the point to land.
- A green spike retires **both** risk #1 and risk #4 at once.

### The learning plan (§5)

- **Gap:** real-time client sync — never done it.
- **Why / what "done" looks like:** all clients see a queue change within ~1s; done = the two-tab demo works reliably.
- **SMART goal:** *"By end of day 2, two browser tabs share a live queue through a managed realtime service I wired up, and I can explain how the subscription pushes updates."* (Note: same sentence as the spike's green line.)
- **How I'll learn it:** the service's official quickstart + one named tutorial — not "figure it out."
- **When:** two 3-hour blocks, Tue/Thu evening.
- **Accountable to:** my neighbor — I show them the two-tab demo Thursday.
- **Spike:** the one above. **Checkpoint:** green → real-time is feasible, proceed; red → ship polling for v1, real-time to the roadmap.

*Coherence note: the `Learning-Plan-Template.md` SMART example lands on this same real-time gap, so the handout and the lecture reinforce one case instead of introducing two.*

---

*Deck built: `canvas_material/lectures/powerpoint/Session05-Feasibility.pptx` (16 slides, source `tools/build-session05.js`). Student page: `canvas_material/lectures/session-pages/Session05-StudentPage.md.jinja`. Related: `Session06-Sep23-Outline.md`, `canvas_material/assignments/handouts/CP2-Product-Definition-Brief.md.jinja`, `canvas_material/pages/Learning-Plan-Template.md`, `canvas_material/pages/Feasibility-Risk-Worksheet.md`, `canvas_material/pages/Spikes-Reading.md`, `canvas_material/resources/Feasibility-Pass-Worksheet.pdf`, `CS301R-ProjectCreation_v4.md` (§7 Week 3), `rubrics.md` (CP2).*
