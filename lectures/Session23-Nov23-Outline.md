# Session 23 — Contributor-Readiness: Built to Be Joined — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 23 of 27 · Mon, Nov 23, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Open Source Guides — [*Building Welcoming Communities*](https://opensource.guide/building-community/)** — what makes people join, stay, and grow into co-owners; the founder's side of the newcomer experience.
- **Bring:** your **audit sheet + top-five fix list** from last Wednesday — today turns them into the contributor-readiness plan.
**Maps to:** Design Week 12, Session A — *contributor-readiness checklist; new-contributor needs.* *(Week 12's Session B is lost to Thanksgiving — its peer-onboarding round 2 folds into the Dec 2 studio.)*

> **Status: OUTLINE (v2) · deck built** (`canvas_material/lectures/powerpoint/Session23-BuiltToBeJoined.pptx`, 14 slides, `tools/build-session23.js`; general-first throughout: slide 3 asks when they were last new to a codebase, slide 5 sets each need's open-source artifact beside its team-at-work equivalent, slide 8 states what any codebase owes the next person before the course's version). *v2 (Tom's notes, Oct 30): **recalibrate to the general principle.** Weeks 9–11 were heavily about getting each repo ready; today steps back out — the five newcomer needs are what any newcomer to any project asks (a new hire on a team, a contributor to an open-source project, someone inheriting an internal tool, you in eight months), and each student's project is the lived example. Every block below leads with the general case. Also: the testing floor is set (§3), Thanksgiving week carries no expectation (§6), and the contributor-readiness checklist is built.* The only session this week (Wed Nov 25 = no classes). The last *teaching* session of the course — everything after is studio, rehearsal, and the demo. Deliverable horizon: **Launch & Onboarding Package draft** takes shape this week; **CP11 (Launch Package + Retrospective) due Wed, Dec 2.**

---

## Purpose of this session

Every project anyone joins — a new job's codebase, an open-source library, a lab's research code, a tool a colleague left behind — asks the newcomer the same five questions before they can contribute, and most projects answer them by accident or not at all. Being able to answer them on purpose is a skill that outlives this course: it's how good teams onboard new hires in days instead of months, and how open-source projects turn a drive-by visitor into a regular. **Lead with that.** Then make it concrete: the audit told you how a stranger experiences *your* project today. This session is about the project you're actually founding: one that people **join**. Contributor-readiness is the course's promise kept — "you lead, others join to build" — and it's concrete: a newcomer needs to know *what this is*, *that they're welcome*, *how to start*, *where to start*, and *that someone will respond*. Today we build the checklist that answers those needs, ground it in your fresh audit evidence, and lay out the **Launch & Onboarding Package** — the artifact that carries your project past December, whether into the capstone, a successor team, or the open web.

---

## Learning objectives

By the end of this session, a student can:

1. **Name the five newcomer needs** that any project has to answer — at work, in open source, anywhere someone new arrives — and point to the artifact that answers each in their own repo.
2. **Audit their project for joinability** — beyond mechanics (can it build?) to invitation (would I stay?).
3. **Set light quality expectations honestly** — what testing/docs an MVP owes a contributor.
4. **Plan the Launch & Onboarding Package** — what exists, what needs writing, who writes it.

---

## Instructor prep / materials

- **Framing rule for the deck and student page:** each block opens with the general case (a new hire's first week, a first-time contributor, an inherited internal tool) and uses the student's project and Prop Loft as the worked example — not the reverse. The last three weeks were inward-facing by necessity; this is where the course turns back outward.
- **Slides:** the five newcomer needs mapped to artifacts; the contributor-readiness checklist; the launch-package skeleton (from CP11's definition); examples of great onboarding docs from real projects (1–2 screenshots).
- **The audit-evidence move:** have 3–4 anonymized findings from last week's audit sheets ready ("three of five auditors stalled at the same setup step") — today's content grounded in their own data.
- **CP11 rubric** (`rubrics.md`) posted.

---

## Timed outline (≈75 min)

### 1. Framing — joined, not just used — 6 min
- **Open general:** think of the last time you were new to a codebase — a job, an internship, a class project you inherited, an open-source repo. What did you need before you could do anything useful? Collect two or three answers; they're the five needs before we name them.
- The distinction that defines the course's last leg: a *usable* project serves users; a *joinable* project grows builders. The final demo's third question — *where does it go next, and how can others join you?* — is answered with artifacts, not hopes.
- Last week's audit = your baseline. Today = the gap between "a stranger survived" and "a stranger stayed."

### 2. The five newcomer needs — 15 min
- These are universal: a new hire asks them on day one, a would-be contributor asks them in the first five minutes, and you'll ask them of every codebase you ever join. Each need → the artifact that answers it (on an open-source project; the internal-team equivalent in parentheses on the slide) → the quality bar, with a real-project example where it shines:
  1. **"What is this?"** → README first screen — value, status, screenshot. *(Bar: a stranger explains your project back in one sentence.)*
  2. **"Am I welcome?"** → CODE_OF_CONDUCT + CONTRIBUTING's tone + how you responded to the audit issues. *(Bar: the reading's insight — people decide from small signals fast.)*
  3. **"How do I start?"** → `docs/onboarding.md` — setup that survived the cold test, project tour, first-contribution walkthrough. *(Bar: zero tribal knowledge required.)*
  4. **"Where do I start?"** → `good first issue` items with context + the roadmap. *(Bar: each starter issue has enough context to attempt without asking.)*
  5. **"Will anyone respond?"** → communication norms + maintainer expectations, honestly stated for a student-run project. *(Bar: promises you'll actually keep — "reviews within a week," not "24/7.")*
- Thread the audit evidence through: which needs did last week's auditors hit gaps on?

### 3. Honest quality expectations for an MVP — 12 min
- The general principle first: any codebase someone else will change owes them a way to know they didn't break it, docs that are true, and an honest list of what's broken. Then what that means for an MVP (and what it doesn't):
  - **Tests where they earn their keep — the floor (decided Oct 30):** *by launch, every project has at least one automated test on its slice's core logic, run by the command its setup guide names, and passing on the launch tag.* A stranger's PR has to be checkable against *something*. This raises CP10's bar (a test there was Exemplary-only) because the audience has changed: CP10 asked whether it works; CP11 asks whether someone else can safely change it. Not coverage theater — one real test beats twenty that assert nothing. CP11's *Contributor-readiness* criterion and the checklist carry it.
  - **Docs that are true** beat docs that are complete: a short, accurate architecture overview (the Week-6 diagrams, refreshed) over a stale wiki.
  - **The known-issues / tech-debt log** (`docs/known-issues.md`): every labeled throwaway corner (Wk 19), every deliberate cut (Wk 21), every unfixed audit finding — *written down.* An honest log is a joinability feature: it tells a newcomer what's real.
- The founder's framing: technical debt isn't shameful; **undocumented** technical debt is.

### 4. The Launch & Onboarding Package — laid out — 12 min
- The CP11 skeleton (draft due as it takes shape this week; assembled Dec 2):
  - **Architecture overview** (refresh the design-doc diagrams to as-built)
  - **Setup verification** (onboarding guide + evidence it works cold)
  - **Roadmap** (beyond December — where a joiner would take it)
  - **Known issues + tech-debt log**
  - **Onboarding guide for new contributors** (the five needs, answered)
  - **A test a newcomer can run** (the testing floor, §3)
- Each item traces to something that already exists in draft — the package is assembly + honesty, not new invention. Each project maps: exists / needs refresh / needs writing, with names.

### 5. Project working block — readiness plan — 25 min
- Each project merges three inputs into one **launch punch list**: the top-five fix list (audit), the five-needs gaps (today), and the package to-do map (§4).
- Rank by joinability impact; assign owners; put the items in the tracker (they're issues like everything else — eat the dog food to the end).
- Instructor circulates with the newcomer's question: *"if I forked this in January with no one to ask — what kills me first?"* That item goes to the top.

### 6. Wrap — 5 min
- Recap: five needs, honest quality, the package is assembly. The project's afterlife is decided by what's written down in the next nine days.
- **No class Wednesday (Thanksgiving).** **Mon Nov 30:** retrospective + presentation framing. **Wed Dec 2:** studio — package assembled + peer onboarding test round 2; **CP11 due.**
- **Thanksgiving week: no expectation** (decided Oct 30). Enjoy the holiday. Anyone who wants to close open issues or keep building may, and the punch list is ready for them — but nothing is due and nothing assumes it.

---

## Threads to carry forward

- The **launch punch list** = the Dec 2 studio agenda; the package = **CP11** = the repo's permanent front door.
- Known-issues honesty feeds the **retrospective** (Wk 13) and the final demo's credibility under Q&A.
- The five needs become the **onboarding test round 2** script (Dec 2) — the same checklist, one more stranger.
- "Where does it go next & how can others join?" = final-demo question #3 — answered by today's artifacts.

---

## Open questions / decisions before we flesh this out

- **Capstone-seed track — decided in principle (Tom, Oct 30): an optional, ungraded addendum**, introduced today, done in Week 14's polish time, shown to faculty at Demo Day. **Outline-only for now:** Tom is checking with the capstone instructors before any of it goes on a slide, the student page, or the checklist. A capstone project differs from CP11's case: not one stranger on a starter issue, but a 4–5 person team, with the founder as product owner, starting a semester at once. The polish is what lets that team start without relitigating what's already decided.
  - **Belongs with the founder this semester:**
    1. **A one-page next-phase brief:** the user, the evidence, and success criteria for the next version; maps onto the capstone's PRD (what CP2 was built to feed).
    2. **Short decision records:** why this stack and architecture, so a new team doesn't reargue them in week one.
    3. **An ownership and access plan:** who owns the GitHub organization, any hosting or service accounts, and where secrets live; plus a real user or partner the team can talk to.
  - **Possibly the capstone team's work — pending the capstone instructors:**
    4. **A backlog sized for a team semester** (the next two or three epics split into parallel issues).
    5. **Automated checks (CI) on every pull request.**
  - Revisit after the conversation; until then, nothing student-facing mentions it.
- ~~**Testing floor**~~ **resolved (Tom, Oct 30): formalized.** At least one automated test on the slice's core logic, run by the setup guide's command, passing on the launch tag. Stated today (§3); carried by CP11 (*Contributor-readiness*, and a CP11 requirement) and the checklist. CP10's Exemplary-only rule stands for CP10.
- ~~**Thanksgiving-week expectations**~~ **resolved (Tom, Oct 30): none.** Optional work on open issues or the MVP is up to each student (§6).

---

## Deliverable / after class

- No deliverable this week, and no expectation over Thanksgiving. **Launch punch list** in the tracker by the end of class; package items owned.
- **Due Wed, Dec 2:** **CP11 Launch Package + Retrospective** (assembled in the Dec 2 studio).

---

## Appendix — classroom handouts (Session 23)

- **Contributor-Readiness Checklist** — `canvas_material/resources/Contributor-Readiness-Checklist.html` + `.pdf` (one page: the five needs, each with where a newcomer looks, the bar, and pass / stall / fail; then the under-the-hood items an author checks, including the test floor; a **Since the audit** section where the authors write their two worst Session 22 audit stalls before the test and the tester marks each *fixed / logged / still there*, which ties round 2 to round 1 without re-running the audit sheet; tester's signature). Used as a self-check today and as the onboarding-test script on Dec 2. A different instrument from the Repo Audit Sheet on purpose (Oct 30): the audit tested mechanics (can a stranger get in?), this tests the whole front door (would they stay?), including the two needs the audit never asks — welcome and response. No dates or CP numbers, so it's reusable.
- **Launch-package skeleton** (§4) — slide
- **CP11 rubric:** `rubrics.md` (Launch Package + Retrospective)

---

*Next step: Tom confirms the capstone-seed addendum with the capstone instructors (outline-only until then). Student page written (`canvas_material/lectures/session-pages/Session23-StudentPage.md.jinja`, marked to publish; general-first; no capstone addendum). Deck built (14 slides: title · today · the last time you were new · joined vs. used · the five needs · the bars · your audit by need · what any codebase owes · the testing floor · technical debt · the launch package · the checklist · workshop · wrap). Before class: write 3–4 anonymized audit findings on the board for slide 7. Checklist built; CP11 handout and rubric reviewed. Related: `Session22-Nov18-Outline.md`, `Session24-Nov30-Outline.md`, `rubrics.md` (CP11).*
