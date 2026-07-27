# Session 1 — Course Launch — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 1 of 27 · Wed, Sep 2, 2026 · 75-minute block**
**Prior reading:** none (first day — everything is self-contained and motivational)
**Maps to:** Design Week 1, Session A — *course overview; good vs. weak project ideas; selection criteria (§9); intro to Creative Problem Solving (divergent/convergent).*

> **Status: OUTLINE.** This describes everything Session 1 should cover and roughly how the 75 minutes are spent. It is the scaffold we'll flesh out into slides/script/talking points next.

---

## Purpose of this session

The first day has three jobs, in priority order:

1. **Reframe the students' mental model** — from *"I take assignments"* to *"I found projects."* This is the single most important shift of the whole course, and it starts now.
2. **Show them where they're going** — a launched, contributor-ready open-source project defended at a public demo day — so every later assignment has an obvious destination.
3. **Launch the divergent-thinking engine** — get them generating and journaling candidate problems *today*, because the Idea Briefs (CP1) are due Sep 23 and good briefs come from three weeks of exploration, not one evening.

Because no reading is assigned, this session must stand entirely on its own and be energizing rather than administrative. Syllabus logistics are necessary but should not dominate.

---

## Learning objectives

By the end of Session 1, a student can:

1. **Explain how this course differs** from prior CS coursework and from a "contribute to open source" course — i.e., articulate the founder/maintainer mindset.
2. **Describe the culminating experience** and the arc that leads to it (discovery → proposal → pitch → teams → design → build → launch → demo).
3. **Name the project selection criteria** and distinguish a strong project idea from a weak one using them.
4. **Define divergent vs. convergent thinking** and explain why the course starts with divergence.
5. **Begin an idea journal** and know exactly what the Idea Briefs assignment asks for.
6. **Recognize the eight course outcomes** — including that **technical communication runs through the whole course**, not just one assignment.

---

## Instructor prep / materials

- Slides (to be built from this outline).
- 3–4 concrete example project ideas prepared as **good vs. weak** contrasts (some rich/real, some toy/overscoped) — ideally drawn from real past student or OSS projects.
- The selection-criteria list on a single visible slide/handout.
- The one-page **Idea Brief template** (from `assignments/CP1-Idea-Briefs.md`) ready to show.
- Index cards or a shared doc for the closing idea-journal kickoff.
- Syllabus / schedule / rubrics posted to the LMS before class.
- *Reusable from the prior course:* the CPS module (`open-source-project-course/modules/creative/cps.md`) and its egg-drop exercise — source material for the CPS spine (segment 8) and the Sep 9 divergent workshop; `modules/creative/applying-in-engineering.md` shows CPS applied to a concrete SE problem.

---

## Timed outline (≈79 min as drafted — trim ~4 to fit the 75-minute block)

### 1. Welcome & hook — 5 min
- Quick who-I-am, who-you-are (light; full intros can wait).
- **Hook:** open with a provocation — *"Nearly every big open-source project you rely on started as one or two people deciding a problem was worth solving. This semester, that's you."*
- Name 2–3 of the examples below out loud (pick the ones this room will recognize fastest), then land the turn: *…and this semester, that's you — maybe with a teammate.*
- One-sentence promise: *by finals week you will have founded and launched a real project others want to help build.*

**Examples that fit "one or two people, one itch" — a deep bench so you can pick what lands with the room (name 2–3).**

*Solo founders:*

| Project | Founder (year) | The itch that started it | What it is now |
|---|---|---|---|
| **Linux** | Linus Torvalds (1991) | A student wanted a free Unix-like kernel for his own PC; announced it as "just a hobby, won't be big and professional." | Runs most of the internet, all Android phones, and the world's supercomputers. |
| **Git** | Linus Torvalds (2005) | Needed version control for Linux after its previous tool fell through; built the core in about two weeks. | The default version control system everywhere; the thing under GitHub. |
| **Python** | Guido van Rossum (1989) | A holiday side project to build a language he'd actually enjoy using. | A top-tier language powering the web, data science, and most of modern AI. |
| **Ruby on Rails** | David Heinemeier Hansson (2004) | Extracted the web framework out of his own product (Basecamp) because he was tired of rebuilding the same plumbing. | Launched a generation of startups; still a go-to for shipping web apps fast. |
| **Node.js** | Ryan Dahl (2009) | Frustrated that web servers blocked on slow I/O; wanted non-blocking JavaScript on the server. | A backbone of modern web backends and tooling. |
| **Vue.js** | Evan You (2014) | A Google engineer wanted the good parts of Angular in something small he could build solo. | One of the most-used front-end frameworks in the world. |
| **Redis** | Salvatore Sanfilippo, "antirez" (2009) | Building his own startup's real-time analytics, he needed a data store fast enough to keep up — so he wrote one. | The default in-memory database for caching and real-time data across the industry. |
| **OBS Studio** | Hugh "Jim" Bailey (2012) | Wanted a free way to record and stream video. | What essentially every streamer and screen-recorder uses. |
| **Homebrew** | Max Howell (2009) | Tired of how painful installing software on a Mac was; built "the missing package manager." | Ubiquitous among developers on macOS. |
| **SQLite** | D. Richard Hipp (2000) | Wanted a database with zero configuration that could just be embedded in a program. | The most widely deployed database on Earth — in phones, browsers, cars, and apps. |

*Pairs — the shape your teams will be:*

| Project | Founders (year) | The itch that started it | What it is now |
|---|---|---|---|
| **WordPress** | Matt Mullenweg & Mike Little (2003) | Wanted to keep a discontinued blogging tool alive, so they forked it and kept going. | Powers a huge share of all the websites on the internet. |
| **Django** | Adrian Holovaty & Simon Willison (2005) | Newspaper developers who needed to build database-backed sites on brutal deadlines. | A leading Python web framework. |
| **MySQL** | Michael "Monty" Widenius & David Axmark (1995) | Wanted a fast, free relational database when the options were expensive or slow. | One of the most widely used databases in the world. |
| **Godot Engine** | Juan Linietsky & Ariel Manzur (open-sourced 2014) | Built their own game engine for their studio's projects, then released it to everyone. | A major free and open-source game engine. |

- *Extra solo names on the bench if you want them: curl (Daniel Stenberg, 1996), FFmpeg (Fabrice Bellard, 2000), Vim (Bram Moolenaar, 1991), pandas (Wes McKinney, 2008), Flask (Armin Ronacher, 2010), Ruby (Yukihiro "Matz" Matsumoto, 1995).*
- *Honesty / teaching note: each of these began with one or two people's decision, and most attracted collaborators fast — that's the point, not a caveat. One or two founders prove the thing is worth building, then others come. Call out the pairs deliberately: two people with a shared itch is exactly the shape your small teams will take this semester.*
- *To flesh out: confirm which 2–3 land best with this cohort; optionally swap in a project tied to a tool they'll use this term.*

### 2. What this course is — and what it isn't — 10 min
- The core reframe: **from building assignments → to founding a project.** Most courses hand you the problem; here you must *find* one, *prove* it's worth solving, and *lay a foundation others can build on.*
- You are the **founder/maintainer** — the person who understands the user need, makes the decisions, writes the project's norms, and creates the pathways future contributors will follow. That's a different posture from the newcomer who joins a project and learns its rules, and it's the posture the whole course trains.
- What the course deliberately does **not** try to cover (not all of software engineering — it's the subset needed to *found* a project).
- **The "contributor vs. founder" visual.** Put this on a slide (pick ~6 rows that land fastest for this room). It's the sharpest way to show what we're selecting for — and the whole right-hand column *is* the course.

| Dimension | Contributor — joins an existing project | Founder / maintainer — you, this course |
|---|---|---|
| The problem | Picks up an existing issue to work on | Must **find and prove** a problem worth solving |
| The users | Already known and understood by the maintainers | **You discover** who they are and what they need |
| Starting point | An established codebase and community | A blank repository |
| The rules | Learn and follow the project's norms | **Write the norms** — license, CONTRIBUTING, code of conduct, workflow |
| Decisions | Work within the maintainers' direction | **Make and defend** the architecture, scope, and tech choices |
| Scope | Sizes a single change / PR | Scopes the **whole product** down to a one-semester MVP |
| Code review | Submits work to be reviewed | **Sets up the review process** and reviews others' work |
| Onboarding docs | Reads the docs to get started | **Writes the docs** so a stranger can get started |
| Future contributors | Is the newcomer being welcomed | **Builds the on-ramps** that welcome newcomers |
| Success looks like | A merged pull request | A **launched project people want to help build** |
| Time horizon | The life of one contribution | Something **built to last** beyond this course |

- *Lead slide — the 6 rows to show (the rest are backup / discussion): **The problem · The users · Decisions · The rules · Future contributors · Success looks like.** They trace the semester in miniature: problem → users → ownership → governance → contributor pathways → a launch others help build. (Strongest swaps if you want them: **Starting point** for visceral punch, **Scope** to put MVP-thinking on the slide.)*
- *Delivery note: don't disparage the contributor role — it's valuable and it's where most students have lived. The point is that founding demands an additional set of muscles, and building those muscles is what this course is for.*
- *Optional forward-pointer: each right-column row becomes a graded artifact later — find/prove the problem → Idea Briefs + Product Definition Brief; discover users → Wk 2 discovery; write the norms → Infrastructure Package (Wk 8); defend decisions → Design Doc + Pitch; build on-ramps → Project Plan & roadmap (Wk 9); contributor-readiness → Launch & Onboarding Package. You can preview this now or just let them feel it accumulate.*

### 3. Where we're headed: the culminating experience — 8 min
- Describe the end state: each student/team finishes with a **working MVP**, an **open-source-ready repo** (governance + onboarding), a **Launch & Onboarding Package**, and a **final pitch + demo** at a finals-week demo day **with capstone faculty invited.**
- Why it matters: what distinguishes a passing student is not strong code alone but a **founded, defensible, contributor-ready project.**
- The bigger picture (briefly, honestly): this is the prototype first semester of a planned three-semester studio; a project founded here *may* be carried into the capstone with **you as its sponsor.** Framed as opportunity, not obligation.
- *To flesh out: a simple one-slide roadmap graphic from today → demo day.*

### 4. What you'll be able to do — the course outcomes — 3 min
- **Purpose of this beat:** segment 3 showed the *artifact* you'll finish with; this shows what you'll be able to *do*. Make the eight course mastery outcomes (design doc §4) explicit on day one so the whole skill arc is visible — and so **technical communication** doesn't stay invisible.
- **Put the eight outcomes on the slide as five memorable clusters:**
  1. **Discover a real need** — find a real user and articulate the problem, goals, and success criteria. *(Outcome 1)*
  2. **Judge feasibility & scope** — weigh risk and breadth; cut an ambitious vision down to a one-semester MVP. *(Outcome 2)*
  3. **Design the system and the project** — architecture, data, interfaces, technology choices and rationale. *(Outcome 4)*
  4. **Found and build it in the open** — license and governance, git/PR/review workflows, and a working MVP others can join and build on. *(Outcomes 5, 6, 8)*
  5. **Communicate it — persuasively and precisely** — proposals, pitches, design docs, issues, PRs, reviews, launch docs. *(Outcomes 3, 7)*
- **Spotlight technical communication as the through-line** — it's the outcome students most underrate. Say it plainly: *"Almost everything you produce in this course is an act of technical communication — the proposal, the pitch, the design doc, the issues, the pull requests, the code reviews, the launch docs. We treat writing and communicating clearly as core engineering work, not a soft skill. In practice you'll spend more time reading, writing, and reviewing than writing fresh code."* Highlight it on the slide the way the selection criteria star the north-star items.
- **Tie it to the founder identity:** a founder's job is *largely* communication — writing the norms, documenting decisions, defending them, and reviewing others' work. It isn't a side skill; it's how founding gets done.
- **Distinguish from today's objectives:** these are the **course** outcomes — what you can do by the *end of term* — distinct from the **session** objectives listed up top (what you walk out with *today*). Name the difference so students know what they're accountable for, and when.
- *To flesh out: build the outcomes slide (five clusters, technical communication highlighted); decide whether to also show the full eight-outcome list from design §4 or keep just the clusters. Timing: this beat pushes the session to ~79 min — reclaim ~4 min elsewhere (e.g., tighten the founders-bench naming in segment 1 or the logistics segment).*

### 5. Why this fits a BYU education — 4 min
- Brief, authentic framing (not a lecture on the Aims): founding a real project that serves real people is applied learning of exactly the kind a BYU education is for — intellect put to work, with integrity, in the service of others.
- Name the throughline in plain terms: over this semester you'll **serve** a real user's genuine need, **teach yourself** what you don't yet know (the habit that matters most in a field that changes every year), act with **integrity** toward your users, teammates, and the people who will join to help build it, and do work of real consequence.
- Touch the SE emphasis's **5 C's** lightly — this course leans hardest on **Curious** (finding real problems), **Christlike** (serving others; welcoming future contributors), **Collaborative**, **Capable**, and **Creative**. They'll hear these again; plant them now.
- Land it in a sentence and move on — the goal is to set the tone that this work matters, not to sermonize.
- *To flesh out: decide how explicitly to invoke the gospel / eternal-perspective framing vs. keeping it light on day one; consider one sentence of personal conviction about why founding-to-serve is worth doing well.*

### 6. Good vs. weak project ideas + the selection criteria — 12 min
- **Start with the clean good/weak contrast.** Put up a few ideas; for each, ask the room the three quick questions: *would this survive a semester? could a team grow into it? does anyone actually need it?*

  *Strong (show ~2):*
  - **Reservation system for a campus resource** — practice rooms, lab equipment, makerspace tools. Real users you can actually talk to; rich (auth, calendar, conflict handling, notifications, admin view); obvious one-semester MVP; extensible; plain web stack.
  - **Shift / volunteer coordination for a local nonprofit or a ward activity** — service-oriented, real reachable users; roles, scheduling, reminders, reporting; MVP = one org's core workflow.
  - *(reserve)* **Tracker for a hobby community** — climbing sends, running-route conditions, board-game stats, birding logs. A real online community to interview for discovery; naturally data + visualization + a social layer.

  *Weak (show ~2):*
  - **Generic to-do list / habit tracker** — no unmet need, no external users, low richness.
  - **A clone of a major app** (Twitter, Spotify, Instagram) — a great way to *learn*, which is exactly why design courses build them, but not a *founding* project: the need is already met and there's no real user you're serving. *(Handle gently — students likely just built a clone in their prior design course. Frame it as "perfect for learning, different goal here" and let the connection surface organically.)*
  - *(reserve)* **"An AI app that does everything"** — no defined user or need; feasibility/scope risk; puts AI at the center, which this course treats as a tool, not the topic.
  - *(reserve)* **Crypto / stock-trading bot** — feasibility, skill, and adoption risk; dubious real need; weak open-source-community fit.
- Introduce the **project selection criteria** (§9) as the shared yardstick used all semester (by them, by peers at the Week-5 pitch, by the instructor):
  - serves a real need for a real, reachable userbase
  - rich / broad (multi-disciplinary growth potential) — the north star
  - open-source-worthy
  - has a one-semester MVP (vertical slice at ~10 hrs/week)
  - extensible
  - tractable stack
  - has room to grow (others can join and build on it)
- Emphasize the *"real need for real users"* and *richness* criteria most — they're the ones students most often miss.
- Note the first-iteration flexibility: **smaller-scope and solo projects are supported**; richness is the aspiration, not a hard floor.
- **Seed the evaluation throughline.** Say it plainly: *scoring ideas against explicit criteria is a skill you'll practice all semester* — on your own ideas at convergence (Wk 3), on each other's pitches at selection (Wk 5), and on design docs, PRs, and demos after that. These seven are what "good" means *for founding a lasting open-source project*; the **method transfers** to any idea you'll ever weigh (a startup, a feature proposal at work). *(Throughline defined in `CS301R-ProjectCreation_v4.md` §3.)*
- **Then convert a weak idea into a strong one — applying the criteria live.** This models the convergence move they'll make in Week 3: take a too-small or too-big idea and reshape it until it passes.
  - *"A to-do app"* → **a shared task board for one specific volunteer group**, with role-based assignments and reminders. Same domain, now real users and real richness.
  - *"A new social network"* → **a focused coordination tool for a single community** (one club, one ward, one lab). The unbuildable version becomes a tractable vertical slice.
  - *(reserve)* *"A personal portfolio site"* → **an open, self-hostable showcase platform for a discipline**, with templates and a gallery — now extensible and worth a contributor community.
- **Convergent-tool preview (optional):** name **Value vs. Do-ability** — scoring an idea along two axes, how much *value / real need* it carries vs. how *feasible* it is — as the lightweight way they'll narrow candidates against these criteria in the Week-3 convergence workshop. *(From the prior course's CPS toolkit.)*
- *To flesh out: swap in a local example or two you know students will recognize; decide which criteria to spotlight.*

### 7. The founder/maintainer mindset — 10 min
- What a founder owns that a contributor doesn't: understanding the **user need** deeply, making and defending **decisions**, creating **pathways for future contributors**, and writing the project's **norms**.
- Introduce the "sponsor" idea: understanding a real user need well enough to speak for it is a central job of this course.
- **Real users — the ideal, with a substitute:** talking to real people is strongly encouraged and supported; where access is genuinely limited, **documented persona/proxy needfinding** is acceptable this iteration if the reasoning is honest. (Preview; details in Week 2.)
- **Founder-decision vignettes (tell 2–3; pose each as "what would you do?" for ~30 seconds before you reveal the call).** The point isn't the answer — it's that a founder has to make it and defend it.
  - **Saying no to a feature.** Your campus-resource reservation tool is catching on, and a prominent user asks for slick Google Calendar sync. It sounds great — but your MVP still can't reliably prevent double-bookings. You decide: not yet. You log it as a "later" issue, explain why, and hold the team on the core booking flow. *A contributor picks from the tickets that exist; a founder decides which tickets exist.* The skill is protecting scope and saying no with a reason.
  - **Choosing the boring stack.** For the volunteer-coordination tool you could use a hot new framework everyone's posting about, or a plain, well-documented stack you and your teammate already know. You pick the boring one — because you'll be the one debugging it at 1 a.m., onboarding the next contributor into it, and still supporting it in three months. *Complexity only where it earns its keep.* The skill is choosing technology you can own, explain, and support — not just show off.
  - **The first outside contributor.** A stranger opens a pull request on your hobby-community tracker: a feature you didn't ask for, in a style that doesn't match the project. A contributor would just clean up their own PR; as founder you have to decide how the project treats newcomers. Is there a CONTRIBUTING guide and PR template to point them to? Do you thank them, request changes, and keep them engaged — or reject it and lose a potential collaborator? *Your response is the project's culture.* The skill is creating pathways and writing the norms that turn a stranger into a contributor.
  - *(reserve)* **Serving the user, not yourself.** You started the project dreaming of a slick recommendation engine. But when you actually talk to users, what they keep asking for is a boring "export to spreadsheet" button. You build the boring thing first. *The project exists to serve them, not to entertain you.* The skill is letting real need, not personal preference, set priorities.

### 8. How the semester works — 10 min
- **Studio + workshop model:** Mondays lean lecture/critique, Wednesdays lean workshop/studio/demo. We won't always use the full block — some sessions release into team work.
- **The CPS spine.** The whole semester rides on one idea from the Osborn–Parnes **Creative Problem Solving** process: *generate many options before you narrow to one.* Introduce the two modes in plain terms:
  - **Divergent thinking** — generating many different ideas; defer judgment, prefer quantity, welcome wild ideas, build on others'.
  - **Convergent thinking** — narrowing many ideas down to the best one; apply judgment against your goals and constraints, while keeping the novelty alive.
- **Why diverge first (the one research hook for day one):** cite the delayed- vs. simultaneous-evaluation finding — groups that generated a pile of ideas *before* evaluating any produced better solutions than groups that judged as they went. It's the evidence behind "don't fall in love with your first idea." *(It's also why the Idea Briefs ask for three, not one.)*
- **Map CPS onto the course's five phases** — put this on one anchor slide they'll see all term:

  | CPS stage | Course phase | Weeks |
  |---|---|---|
  | Clarification | Clarify & Explore | 1–3 |
  | Ideation | Ideate & Pitch → form teams | 4–5 |
  | Development | Develop & Design | 6–8 |
  | Implementation | Implement & Build → Launch & Reflect | 9–14 |

- Name-drop, don't teach, the tools they'll meet later — Post-It brainstorming and brainwriting for divergence; **Value vs. Do-ability** scoring for convergence (which maps neatly onto our selection criteria). The full CPS treatment plus the egg-drop warm-up exercise come in the **Sep 9 divergent workshop**, not today.
- **The individual → team arc:** Weeks 1–5 are individual (everyone explores, proposes, and pitches). The Week-5 selection + pitch is the hinge: teams form around the surviving ideas (or you continue solo). Weeks 6–14 are team-based.
- Reassure: **no one's idea gets killed out from under them** — solo is a legitimate path.
- *To flesh out: build the single CPS-to-phases anchor slide; keep day-one CPS to vocabulary + the one research hook (depth is Sep 9). Source: adapted from the prior course's `open-source-project-course/modules/creative/cps.md`.*

### 9. Logistics that actually matter today — 5 min
- **Time expectation:** ~10 hrs/week (≈2.5 in class + ≈7.5 outside). Say it plainly.
- **Assessment shape (not every line):** the grade rewards **process and founding artifacts**, not the prototype alone — discovery, proposal, design, governance, and launch all carry real weight; strong code can't compensate for a missing foundation. Point them to `rubrics.md`.
- **AI policy:** AI tools (e.g., Claude Code) are allowed for brainstorming, learning, and drafting, **but you must understand and be able to defend everything you submit;** disclose substantial AI use. AI is a tool here, not a topic.
- **Where things live:** syllabus, schedule, rubrics, assignment handouts on the LMS.
- Keep this segment tight — resist reading the syllabus aloud.
- *To flesh out: decide which 3–4 policies get airtime vs. "read the syllabus."*

### 10. Kick off Idea Briefs + launch the idea journal — 10 min
- **Introduce CP1 — Idea Briefs (~3 min).** Three genuinely different one-page problem concepts + a short reflection, due **Wed, Sep 23** — individual work. Show the one-page **brief template** and name the reflection prompt: *"What makes a software project worth building to last?"* Point them to the `CP1-Idea-Briefs.md` handout for the full spec. Stress **genuinely different** — three flavors of the same app doesn't count.
- **Launch the idea journal (~1 min).** The briefs are the polished output of three weeks of noticing, not a night-before scramble. Point to the `Idea-Journal.md` handout — and tell them the activity we're about to do *is* the first page of that journal.
- **In-class divergent taste (~4 min) — solo generation, then share.**
  - **Solo, 3 min, silent.** Put the prompt on the slide and say it: *"List as many problems as you can — things that are broken, annoying, tedious, slow, or missing — for you or the people around you: your clubs, job, major, ward, roommates, hobbies. Don't judge them, don't solve them, just get quantity. Aim for at least 8."* If the room stalls, prime with: *what did you complain about or work around this week? what takes way more steps than it should? what tool do you wish existed?*
  - **Share, ~1 min.** Collect a handful aloud (or a 30-second turn-to-a-neighbor first if the room has energy). React with pure acceptance — no evaluating — to **model deferring judgment.**
- **Decisions (made, so the slide can be built):** **solo first** — it protects individual idea generation, since the briefs are individual; pair-share is optional flavor. **Don't collect or grade** the lists — instead have students **keep the list as entry #1 in their idea journal.** The warm-up literally starts the assignment.
- **Set the intention for Sep 9 (~1 min):** we do this for real and at length in the divergent workshop — come with a journal that's already been fed for a week.
- *To flesh out: build the prompt + sub-prompts slide; decide physical cards vs. a shared doc (a shared doc lets them paste straight into their journal).*

### 11. Wrap & before-next-class — 2 min
- Recap the one big idea: *founders find and prove problems; we start by exploring widely.*
- Before **Wed, Sep 9:** keep the idea journal going; skim the CP1 handout; come with raw problems to the divergent workshop.
- No assigned reading this week; note that future sessions *will* expect pre-reading.

---

## Threads to carry forward (so Session 1 sets them up)

- **Selection criteria** reappear at every evaluation point — introduce them cleanly here.
- **Divergent/convergent vocabulary** is used all semester — plant it today.
- **Idea journal** must actually start today or the three-week exploration collapses into a cram.
- **Real-users vs. persona/proxy** is previewed here, taught in Week 2.

---

## Open questions / decisions before we flesh this out

- **Interactivity level:** how much of day 1 is lecture vs. the closing activity? (Current plan: mostly framing, one short divergent taste at the end.)
- **Example projects:** source 3–4 strong good/weak contrasts — real past projects are far more persuasive than invented ones. *Do you have go-to examples you like?*
- **Icebreaker / intros:** include real student introductions on day 1, or defer to Sep 9 to protect time?
- **Syllabus depth:** how much logistics live in the lecture vs. an LMS "read this" task?
- **Slide vs. discussion balance:** confirm the studio ethos should show even on day 1 (i.e., they talk, not just listen).

---

*Next step: flesh this outline into slides + talking points (and decide the example set). Related files: `CS301R-ProjectCreation_v3.md` (design), `CS301R-Schedule-Fall2026.md` (dates), `assignments/CP1-Idea-Briefs.md` (the assignment this session launches).*
