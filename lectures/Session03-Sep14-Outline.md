# Session 3 — Open Source, Licensing & Governance — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 3 of 27 · Mon, Sep 14, 2026 · 75-minute block**
**Prior reading (recommended — confirm in advance):**
- **GitHub Open Source Guides** — [*Starting an Open Source Project*](https://opensource.guide/starting-a-project/) and [*Leadership and Governance*](https://opensource.guide/leadership-and-governance/). Short, practical, founder-oriented.
- **Browse** [*choosealicense.com*](https://choosealicense.com/) (GitHub's interactive license picker) and skim [*tl;drLegal*](https://www.tldrlegal.com/) for plain-language license summaries.
- *Optional enrichment:* Eric Raymond's [*The Cathedral and the Bazaar*](http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/) (the classic on the open, "bazaar" development model — a copy also lives in `open-source-project-course/modules/introduction/`).
**Maps to:** Design Week 2, Session A — *the open-source model & why we build in the open; license comparison & practical implications; governance basics; the lead-as-sponsor model.*

> **Status: OUTLINE (initial draft).** First Monday of Week 2 — a teaching/discussion session (Session A). The problem-finding continues on students' own time; in class we start the craft of *building in the open.*

---

## Purpose of this session

Today is about the **"open" in open source.** You're still hunting for problems on your own time; in class we start learning what it takes to *found* a project other people can see, use, and join. Three things: **why** we build in the open, **how software licenses actually work** (and which to pick), and the **governance choices a founder makes** so a project is safe and inviting to contribute to. This is the conceptual groundwork for your Project Infrastructure Package later — and today you make a first real decision: which license fits the project you're imagining.

---

## Learning objectives

By the end of this session, a student can:

1. **Explain the open-source model** and why founding a project in the open is worth it.
2. **Compare the major license families** — permissive (MIT, Apache-2.0) vs. copyleft (GPL, AGPL) — and their practical implications.
3. **Choose and justify a license** for a project.
4. **Name the governance choices a founder must make** — visibility, code of conduct, contribution process, maintainer expectations, communication channels, decision-making.
5. **Describe the lead-as-sponsor / maintainer role** they'll grow into.

---

## Instructor prep / materials

- **Assign the reading in advance** (see above) and expect it done.
- *choosealicense.com* open in the browser for a live license walk-through.
- **Example repos to demo** (strong governance, **Appendix A**) and **repos for students to audit** (**Appendix B**) — open them in tabs beforehand.
- The one-page **License Cheat Sheet** — `resources/License-Cheat-Sheet.md` — to hand out or show.
- The **License/OSS short-response** prompt (this session's deliverable) — pick one from **Appendix D**.
- *Reusable from the prior course:* `open-source-project-course/modules/introduction/` (Cathedral & Bazaar PDF, possible-projects.md) and `modules/collaborative/` for repo/governance material.

---

## Timed outline (≈75 min)

### 1. Bridge + framing — 4 min
- Recap Session 2 (you generated a big pool of candidate problems; keep feeding the journal). Quick journal check.
- Today we switch gears — from *finding* problems to the craft of *building in the open.*

### 2. Why build in the open? — 10 min
- The open-source model and what "open" actually buys you: transparency, contributors, reuse, longevity, trust — the "many eyes" bazaar idea.
- Why **this course** builds in the open, even for a class project: it's how you found something others can join and inherit-forward.
- **Short discussion (from the reading, not slides) — pick a few:**
  - What do you actually *get* by building in the open vs. keeping it private? (contributors, feedback, reuse, trust, longevity, a public portfolio)
  - What feels scary about building in public — and how real is it? ("my code isn't good enough," someone taking it, being judged)
  - *"Given enough eyeballs, all bugs are shallow"* — do you buy it? When does the bazaar model work, and when doesn't it?
  - Why would anyone contribute to *your* project? What makes a project worth joining?
  - Does "open source" mean free? (freedom vs. price; who pays for maintenance?)
  - Once contributors show up, what's the founder's job?

### 3. Licenses — how they actually work — 16 min
- What a license **grants and withholds** — use, modify, distribute, and (for some) patent rights. **"No license" = all rights reserved** — that's *not* open source.
- The two families: **permissive** (MIT — do almost anything; Apache-2.0 — adds an explicit patent grant) vs. **copyleft** (GPL-3.0 — derivatives must stay open; AGPL — extends that to networked use).
- Practical tradeoff: *maximum adoption* (permissive) vs. *keep derivatives open* (copyleft). Note that ~60% of projects use MIT, Apache-2.0, or GPL.
- **Walk choosealicense.com live — what to point out:**
  - The three starting paths on the home page: *"simple and permissive"* (MIT), *"care about sharing improvements"* (GPL), *"community standards / patent protection"* (Apache-2.0).
  - On any license page, the **three columns are the whole mental model:** **Permissions** (commercial use, modify, distribute, private use), **Conditions** (include license & copyright notice; *disclose source* + *same license* for copyleft; *state changes* for Apache), **Limitations** (no liability, no warranty, no trademark).
  - The **patent grant** callout on Apache-2.0 (and its absence on MIT).
  - The [/no-permission](https://choosealicense.com/no-permission/) page — what "no license" means.
  - The [appendix comparison grid](https://choosealicense.com/appendix/) for a side-by-side of everything.
  - *How to apply it:* add a `LICENSE` file in the repo root (GitHub offers a picker).
- **Hands-on (~3 min) — "Pick a license":** each student opens choosealicense.com and, for their most promising candidate idea, jots (1) the license name, (2) one sentence on *why* (adoption vs. keeping derivatives open), and (3) one thing it *requires* of people who use their code. Then a 30-second turn-to-a-neighbor: "what did you pick and why?" Take 1–2 aloud — this primes the short-response deliverable. *(Cheat sheet: `resources/License-Cheat-Sheet.md`.)*

### 4. Governance — the choices a founder makes — 16 min
- What governance is and **why contributors need it** — people won't contribute to a project whose rules and expectations are unclear.
- The founder's choices: **visibility** (public from day one?), a **code of conduct**, the **contribution process** (issues, PRs, review), **maintainer expectations & responsiveness**, **communication channels**, and **decision-making** (benevolent-dictator vs. small council).
- **Show strong vs. weak governance side by side** (repos in Appendix A):
  - **Strong** — a README that *onboards* (what it is, quick start, a clear "how to contribute" link); a `LICENSE`; a `CONTRIBUTING.md` (setup + PR process + expectations); a `CODE_OF_CONDUCT.md`; issue/PR **templates**; labeled **good-first-issues**; a visible roadmap; responsive maintainers and a clear communication channel.
  - **Weak / early-stage** (frame as *incomplete*, not "bad") — just code + a bare README: no `LICENSE` (legally not reusable), no `CONTRIBUTING` (newcomers don't know how to help or what's expected), no code of conduct, no templates, stale unanswered issues.
  - **The point to land:** governance is what turns *cool code* into *a project people can actually join.* Walk a contributor's-eye view — "I'd like to help; do I know how, and am I even allowed to use this?"
- The **lead-as-sponsor model:** you set the norms and steward the project — you're not just writing code, you're building the place others come to build.

### 5. Activity — license + governance for a real project — 17 min
- **Setup:** small fluid groups. Each group takes a project — ideally **one member's candidate idea**, or one of the **back-pocket ideas (Appendix C)** if they're not ready.
- **Task (decide + justify):** for that project, decide *(a)* which **license** (cheat sheet / choosealicense) and *(b)* three **governance choices** — visibility, contribution process, code of conduct, communication, decision-making — and *why*.
- **Optional variant — audit a real repo:** hand a group an approachable repo (**Appendix B**) and have them **audit its governance** against the Section-4 checklist, then say what they'd keep or change.
- **Share out:** each group gives one license call + one governance call with the reasoning; instructor surfaces tradeoffs.
- **How this differs from Section 4:** in **§4 the instructor walks through exemplars** to show what good governance looks like (guided demonstration); in **§5 the students do the analysis themselves** — deciding for a project or auditing a repo they *haven't* been shown. It's active practice and critique, not watching. Use *different* repos here than the ones you demoed in §4.

### 6. Deliverable + wrap — 12 min
- Introduce the **License / OSS short response** (this session's deliverable): in ~1 page, pick a license for the kind of project you're imagining and justify it, and note the governance choices you'd make.
- Connect it forward to the **Project Infrastructure Package** (Week 8).
- Preview **Session 4 (Wed, Sep 16): the discovery workshop** and assign its reading. Note that the Week-2 **discovery assignment** (talk to real users or build honest personas) kicks off then.

---

## Threads to carry forward

- **License + governance decisions** feed the Project Infrastructure Package (Week 8).
- **"Lead as sponsor"** recurs all semester — you steward a project others join.
- **Building in the open** ties directly to the contributor-readiness through-line.

---

## Open questions / decisions before we flesh this out

- **Reading:** confirmed — include the Cathedral & Bazaar excerpt (recommended parts in **Appendix E**); confirm the exact Open Source Guides pages.
- **Licensing depth:** *confirmed — keep it practical* (concepts + choosealicense, not copyleft edge cases).
- **Activity format:** students' own candidate ideas preferred, with **Appendix C** back-pocket ideas as backup; audit variant uses **Appendix B** repos.
- **License policy:** *confirmed — free choice* via choosealicense.com, justified in the short response.

---

## Deliverable / after class

- **License / OSS short response** (~1 page): which license fits your imagined project and why, plus the governance choices you'd make.
- The Week-2 **discovery assignment** begins after Session 4.

---

## Appendix — back-pocket materials

### A. Example repos to demo (§4 — strong governance)
Recognizable, genuinely exemplary, and small enough to skim live:
- **Homebrew** — `github.com/Homebrew/brew` — famous (Max Howell, from Session 1); excellent CONTRIBUTING, maintainer guidelines, code of conduct.
- **Prettier** — `github.com/prettier/prettier` — clean and approachable: CONTRIBUTING, CoC, issue/PR templates, good-first-issues.
- **Astro** — `github.com/withastro/astro` — a modern, famously welcoming community: governance, CoC, thorough contributor docs.
- *(Alternates: `vitejs/vite`, `vuejs/core`, `django/django`.)*
- For the **weak/early-stage** contrast, don't single out a real project — show a **bare personal repo** (code + README only, no LICENSE/CONTRIBUTING/CoC), or an *early commit* of a now-mature project to show how governance grew.

### B. Repos for students to audit (§5)
Small/approachable enough to audit in ~15 minutes, and *different* from the demo set:
- **firstcontributions/first-contributions** — literally designed for newcomers; audit its onboarding.
- **sindresorhus/awesome** — minimal but has a CoC + contribution guidelines; good to critique what's present vs. missing.
- **sharkdp/bat** or **httpie/httpie** — real, moderate tools with CONTRIBUTING + CoC + templates.
- **github/choosealicense.com** — the license site's own repo; meta and readable.

### C. Back-pocket project ideas (§5)
Rich enough to raise real license/governance questions. Each notes the angle it surfaces:
1. **Campus resource reservation** (practice rooms / lab gear / makerspace) — *permissive so the department can adopt it freely; CoC matters once students contribute.*
2. **Volunteer / shift coordination** for a nonprofit or ward activity — *permissive (the org just wants to use it); who maintains it after you graduate?*
3. **Grad-requirement "what-if" planner** for a specific major — *data-accuracy governance; a contribution process to keep requirements current.*
4. **Crowd-sourced trail / outdoor-conditions tracker** — *AGPL if you want a hosted version to stay open; moderation/CoC for user-submitted content.*
5. **Study-group / tutoring matcher** — *privacy considerations; permissive vs. copyleft if a company might want it.*
6. **Community tool-library / lending manager** (makerspace, ward, neighborhood) — *permissive for wide reuse; clear CONTRIBUTING so other communities can adapt it.*
7. **Open dataset explorer** for a niche public dataset (transit, campus energy, club stats) — *data licensing vs. code licensing; attribution norms.*

### D. License/OSS short-response prompts (the deliverable — pick one)
1. **Pick & justify.** Choose a license for the project you're imagining. In ~1 page: name it, explain in plain terms what it lets others do (and not do), why it fits your goals (adoption vs. keeping derivatives open), and one governance choice you'd make and why.
2. **Compare two.** Compare the two licenses you considered (e.g., MIT vs. GPL-3.0, or MIT vs. Apache-2.0). What's the practical difference for a future contributor or a company that wants to use your code? Which did you pick, and why?
3. **Learn from a real project.** Find a real project similar to yours. What license and governance (CoC, CONTRIBUTING, decision-making) does it use? Would you make the same choices? Why or why not?

### E. Recommended *Cathedral & Bazaar* excerpts (~6–8 pages)
Assign these **named sections** from Eric Raymond's essay ([full text](http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/)) rather than the whole thing — it's structured into short titled sections and 19 numbered "lessons":

- **§1 "The Cathedral and the Bazaar"** — the thesis and the Linux surprise (sets up *why build in the open*).
- **§2 "The Mail Must Get Through"** — read at least **Lesson 1** (*"Every good work of software starts by scratching a developer's personal itch"* — ties straight to Session 1's founders bench), plus Lessons 2–3.
- **§3 "The Importance of Having Users"** — **Lesson 6** (*treating your users as co-developers is your least-hassle route to rapid improvement*).
- **§4 "Release Early, Release Often"** + **§5 "How Many Eyeballs Tame Complexity"** — **Lesson 7** (*release early/often, and listen*) and **Lesson 8 / Linus's Law** (*"given enough eyeballs, all bugs are shallow"* — the exact line the §2 discussion asks about).
- **§10 "Necessary Preconditions for the Bazaar Style"** — what you need before opening up: a runnable, promising thing and decent leadership.
- *Skip* the long fetchmail play-by-play (§7–8) and the economics/management digressions unless you want them.

*The full essay is also in `open-source-project-course/modules/introduction/cathedral-bazaar.pdf`.*

---

*Next step: confirm the reading pages and the example set, then build the slide deck. Related: `Session02-Sep09-Outline.md`, `Session04-Sep16-Outline.md`, `CS301R-ProjectCreation_v4.md` (§7 Week 2), `resources/`.*
