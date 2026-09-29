# Session 11 — Design Documents: Dissecting the Real Thing — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 11 of 27 · Mon, Oct 12, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Malte Ubl — [*Design Docs at Google*](https://www.industrialempathy.com/posts/design-docs-at-google/)** — the anatomy (context & scope, goals & **non-goals**, the design, **alternatives considered**, cross-cutting concerns), why trade-offs are the point, and when *not* to write one. **Heads-up on the student page:** one embedded meme in "The actual design" section (the "draw the rest of the owl" joke) has profanity in its caption; the point it makes is fine, and the rest of the article is clean. **Read it with two caveats, both named on the student page and in §2:** (1) *"Design docs are informal documents"* is true at Google, not everywhere — in regulated and safety-critical organizations the design doc is a formal, signed-off, change-controlled deliverable, written partly to win management approval; (2) *alternatives considered* can rest on real work, up to a full trade study.
- **Optional — real design docs and the formal end of the spectrum:**
  - **[PEP 657 — Include Fine Grained Error Locations in Tracebacks](https://peps.python.org/pep-0657/)** — a real Python design doc students will recognize the output of: a measured trade-off (a ~22% larger `.pyc` for better tracebacks) and a *Rejected Ideas* section with four alternatives.
  - **Gergely Orosz — [*Companies Using RFCs or Design Docs and Examples of These*](https://blog.pragmaticengineer.com/rfcs-and-design-docs/)** — free; templates and examples from a dozen companies, which makes "the format depends on the organization" visible.
  - **NASA — [*Systems Engineering Handbook*, §6.8 Decision Analysis](https://www.nasa.gov/reference/6-8-decision-analysis/)** — the formal end: *"It is important to document the fact that these options were considered."*
- **[Working Agreements](../canvas_material/pages/Working-Agreements-Reading.md)** — a short course reading (~5 min), written for this course and cited to Atlassian's Working Agreements play. Why groups that intend to last write down how they'll work together, what belongs in one, and the deadlock and missed-commitment questions teams skip. **New in v4:** students meet the charter concept here, before §6 asks them to start one.
- **Bring:** your pitch-day feedback and the proposal for the project you ranked first — the design doc starts from the winning argument.
**Maps to:** Design Week 6, Session A — *read and dissect a sample design doc; appropriate detail vs. over-specification.*

> **Status: OUTLINE (v3).** Phase 3 begins — first session as **teams**. **Teams are announced at the start of today's class** (Pitch Day evaluated and ranked; the weekend was for reading the anchor proposals), and the **team charter is written in class today** and submitted by end of day. Design Document **draft** due end of day Thu, Oct 15 (produced at Wednesday's workshop); **CP5 Design Document (revised) due Wed, Oct 21.** **(v4) The charter is now *started* in class and due end of day Wed, Oct 14**, with a new prior reading behind it. *(v3, Tom's notes: owl-image heads-up; two reading caveats — formality varies by organization, and alternatives can rest on trade studies; sample doc written (Backstage, imperfect on purpose) with real docs as optional reading; light design-doc template created and required for CP5; printable charter worksheet created.)*

---

## Purpose of this session

Your team owns an argument (the proposal). Now you have to decide **how to actually build it** — and write that thinking down so a teammate, a reviewer, or a future contributor can follow it. A design doc is not paperwork; it's where you make the expensive decisions *while they're still cheap to change*: components, interfaces, data, dependencies, and the trade-offs behind each. Today we dissect a real design doc together — what earns its place, what's over-specification — because the fastest way to learn the genre is to read one critically before you write one.

---

## Learning objectives

By the end of this session, a student can:

1. **Name the sections of a design doc** and what each is *for* (per the reading's anatomy).
2. **Explain why trade-offs and alternatives-considered are the heart of the genre.**
3. **Judge appropriate detail** — enough to guide implementation, not so much it's a second codebase.
4. **Read a design doc critically** — find the unstated assumption, the missing alternative, the hand-wave.
5. **Map their own project onto the design-doc shape** (system context, components, data, interfaces).

---

## Instructor prep / materials

- **Assign the reading in advance** and expect it done.
- **Open with a reading check (~2 min — deck slide 3, after the teams reveal).** Same instrument as Session 7, deliberately: *"Name one section of a design doc — and what it is **for**."* Not the label, the job it does for the reader. Take two or three answers. This session earns the check because §2 below **doesn't re-teach the anatomy** — it recalls it and moves to the dissection, so the timing is a bet on the reading. If the room is blank, spend three extra minutes on §2 and take them out of §3's buffer, not out of the dissection. *(Course-wide, this check is used sparingly — Sessions 7 and 11 only — so it stays a signal rather than a ritual students learn to game.)*
- **The sample design doc:** **[Sample Design Document — Backstage](../canvas_material/pages/Sample-Design-Doc-Backstage.md)** (Canvas: `pg-sample-design-doc`). Purpose-written at course scale, continuing the costume-catalog project from the Session 7 sample proposals, written to the course template, and **imperfect on purpose** — the planted problems and where to find them are in the appendix key. Real ones are optional reading (PEP 657, the Orosz collection). **Print `canvas_material/resources/Sample-Design-Doc-Backstage.pdf` (5 pages) — one per student, so everyone can mark it up;** the PDF is regenerated from the Markdown with `tools/print-md.sh` and contains no answers. **Its two diagrams are now real drawings** (`canvas_material/resources/img/backstage-context-flawed.png`, `…-components-flawed.png`, generated by `tools/build-backstage-diagrams.js`) rather than ASCII art — deliberately **deadpan**: same palette as every other course diagram, nothing highlighted, no captions. Planted defect #5 is only findable if the picture doesn't flag itself, so never swap in the Session 12 versions here.
- **The formal-end exhibit (ready):** your own **[LAT SAE Database System Detailed Design](../canvas_material/resources/SAE_Database_Design.pdf)** — GSSC-0012, NASA Goddard, 64 pages, one of the Fermi SSC's [publicly baselined documents](https://fermi.gsfc.nasa.gov/ssc/dev/baselined_documents/), so there's no distribution question. Student-facing framing page: **[A Formal Design Document — a NASA example](../canvas_material/pages/Formal-Design-Doc-NASA-Example.md)** (`pg-formal-design-doc-example`), optional reading with a page-by-page tour. **Have the PDF open at page 3** for §2. Pages that earn their two minutes: **3** (signatures: prepared by / concurrence / approved by), **4** (change record — eight revisions, Draft v0.1 → Baseline), **9** (traceability to numbered requirements documents), **11–12** (the system diagram and components-on-hosts), and **28 / 21 / 60** (a message definition, a config table, the MySQL tables) for the §3 altitude discussion.
- **Print the Team Charter Worksheet** — `canvas_material/resources/Team-Charter-Worksheet.pdf`, two pages (print double-sided), **one per team plus one per solo student.**
- **Slides:** the reading check (above); the anatomy; the formality spectrum (informal team doc → formal signed-off deliverable); the over-specification contrast (a "just right" component description vs. a pseudo-code dump); the template walkthrough; the CP5 rubric.
- Collect **team charters** at the start of class.

---

## Timed outline (≈75 min)

### 1. Teams announced + bridge — 5 min
- **Announce the teams first, in the first two minutes.** Read the roster, name each project's founder, and confirm the approved solo paths. Keep it brisk and matter-of-fact — the deliberation happened over the weekend; this is the result, not a negotiation.
- Say two things while you're there: **most people got their first or second choice** (say the actual numbers if they're good), and **the projects that didn't anchor a team are not failures** — their founders bring discovery work with them into whatever they join.
- Then move: teams sit together for the rest of the session, and everything from here on is team work.
- Welcome to team life. The proposal said *what and why*; the design doc says *how — and why this how.*
- The audience shift again: CP3 persuaded a skeptic; the design doc **guides a builder** — including the teammate you haven't met yet (the future contributor is a design constraint in this course).

### 2. The anatomy, section by section — 12 min
- **Recall, not instruction** — they read it; call on the room rather than lecturing the list. One line each on the job it does:
  - **Context & scope** — the landscape; brought-up-to-speed in a paragraph, not a requirements dump.
  - **Goals & non-goals** — non-goals return (they were in your proposal; here they bound the design).
  - **The design** — overview first: a **system-context diagram**, major components, data storage, API/interface sketches. Focus on what's *relevant to the trade-offs.*
  - **Alternatives considered** — "the most important section": why the chosen design beats the others *given your goals*. One honest alternative per major decision.
  - **Cross-cutting concerns** — at our scale: auth/privacy, error handling, deployment reality.
- The Google sizing wisdom scaled to us: theirs run 10–20 pages; **ours are 3–6 pages plus diagrams** (the CP5 length) — same rigor, smaller problem.
- **Caveat 1 — how formal a design doc is depends on the organization.** The reading says design docs are informal; that's Google's culture, not a law. In regulated and safety-critical settings (aerospace, medical devices, government systems) the design doc is a **formal deliverable**: named reviewers sign it off, it goes under change control, and it's written partly to **earn management's approval** before money is spent — NASA calls them *Detailed Design Documents*. Same genre, different amount of process, because the cost of a wrong design differs. **Show it, don't just say it (2 min):** put GSSC-0012 on screen — page 3, the signature page (*prepared by*, two *concurrences*, *approved by*), then page 4, the change record running Draft v0.1 → Baseline over five years, then page 9, where the introduction traces to numbered requirements documents and promises the reader "all the information necessary to develop and test." Say why it looks like that: the system served a spacecraft mission's science data, operated by people who arrived years after the authors left, and the design review was a gate before money was spent. This is why the course template carries a status line, revision history, and sign-off table: lightweight versions of that machinery.
- **Caveat 2 — alternatives considered can rest on real work.** Sometimes the alternatives were weighed in a conversation. Sometimes someone built and measured them: a benchmark, a prototype, or a full **trade study** — a document of its own recording what was tried, how it was evaluated, and why it was rejected. NASA's handbook puts it plainly: document the options that were considered, including the ones that dropped out. **At course scale, the CP3 spike is exactly this** — and the template asks for the evidence behind each decision.
- **The template (2 min):** walk the headings on the Canvas page *Design Document Template*. Every organization that takes design docs seriously has one; conforming to it is part of the job, and in CS 301R it's required for CP5 — each section maps to a rubric criterion.

### 3. Appropriate detail vs. over-specification — 10 min
- The failure modes, side by side:
  - **Too little:** "we'll have a backend" — no components, no data model, nothing a builder can act on.
  - **Too much:** copy-pasted schemas, pseudo-code for CRUD, pinned versions of every library — stale in a week, and it hides the actual decisions.
  - **Just right:** each major component in a paragraph — its job, its interface, what it talks to, and the decision behind it.
- The reading's test: if a section says "how we'll implement it" without any trade-off, it probably shouldn't be in the doc. **Decisions with rationale in; mechanics out.**
- **Then complicate it, using GSSC-0012 (3 min).** Flip to the message definition on page 28 (name, ID, senders, receivers, field layout), the configuration table on page 21, and the MySQL table descriptions on page 60 — all three are exactly what CP5 forbids. Ask the room why they belong there and not here. The answer is the audience and the lifetime: two teams integrating without talking need the field layout; an operator arriving in eight years needs the parameter defaults; a mission under change control needs the record. **The rule isn't "less detail is always better" — it's that altitude follows the reader, the lifetime, and the cost of being wrong.** Our projects: teammates, one semester, cheap to change — so decisions in, mechanics out.
- Worth naming, because a sharp student will spot it: GSSC-0012 has *less* alternatives-considered content than we require, since in that organization the trade-offs lived in requirements documents, trade studies, and review presentations. **"Where does this belong?" is itself a design-document question.**

### 4. Dissect the sample — 20 min
- **The sample:** *Sample Design Document — Backstage* (printed, one per team; also on Canvas). It's the costume-catalog project students already know from the Session 7 proposals, so nobody spends the reading time learning the domain.
- Read the sample in teams (~8 min), then structured critique (~12) against four questions (printed at the top of the sample):
  1. Could you **start building** from this? What's missing first?
  2. Where's the **unstated assumption**? (There's always one.)
  3. Which decision lacks an **alternative considered** — and what would the alternative be?
  4. Where is it **over-specified** — what could be cut with no loss?
- Collect the best finds aloud. The point: they can now *see* the genre's quality bar before writing to it.

### 5. Map your project onto the shape — 10 min
- Teams: sketch your own doc's skeleton — system-context diagram (boxes and arrows, five minutes' worth), the 3–5 major components, the data entities, and the **two biggest design decisions** you'll need alternatives for.
- This sketch is Wednesday's starting point — bring it.

### 6. Start the charter — 13 min

*Deliberately at the end, not the start: the team has now spent forty minutes critiquing a document together and sketching their own. They have actual evidence about how they operate — who talks, who defers, who writes things down — and a charter written from evidence beats one written from politeness.*

**6a — What a working agreement is, and why — 8 min.** *(New in v4. They read [Working Agreements](../canvas_material/pages/Working-Agreements-Reading.md) before class, so this is recall-and-sharpen rather than a lecture — but it is the first time they've heard the concept aloud, so don't skip it.)*
- The general move first: groups that intend to last write down how they will work together, **while everyone still likes each other**, because that is the cheapest moment to negotiate it. Ask for one unstated expectation that has bitten them on a past team project; take two answers.
- What makes a line real: **checkable, and it survives a bad week.** "Communicate well" fails both tests; "a reply within 24 hours on weekdays" passes both.
- Tour the printed worksheet (`canvas_material/resources/Team-Charter-Worksheet.pdf`) — seven short sections, two pages, printed double-sided. Say plainly what it's for later: **this is the standard the confidential peer evaluations are scored against in November.**

**6b — Answer the two hard ones in the room — 5 min.** The two every team skips when left alone, and the two worth your coaching:
1. **Who breaks a deadlock, and by what rule?** A named tiebreaker beats a stalemate. Settling it while nothing is at stake takes four minutes; settling it during the tie costs a week.
2. **What happens the first time someone misses a commitment?** Who says something, how soon, and what happens next. A charter that can't answer this isn't doing its job.
- Teams write only those two answers now, on the worksheet, talking them through out loud. **Circulate** — the team that writes "we'll all just do everything and communicate constantly" is the one that fails in Week 10; push it for a named channel, a real response time, and a named tiebreaker.
- **Solo students** do the abbreviated version on the same worksheet (§4 cadence, §5 decision-log habit, §6 what "on track" means; the solo box on page 2 says so) — they'll set these norms for contributors later.

**6c — Finish it at the first team meeting.** The rest of the worksheet — roles, channel, cadence, what "pulling your weight" means — is the agenda for the team's **first working meeting, held before Wednesday.** Typed up, committed to the repo, submitted **by end of day Wed, Oct 14.** Completion-graded; enforced all semester.
- **Say out loud: that meeting also creates the repository — it's the first item on the agenda.** Nothing before today has asked for one, and everything from here assumes it: the design template becomes `docs/design.md`, Thursday's draft is submitted as a pointer into it, and Sessions 13–16 run in it. Point at the Canvas page *Starting Your Project Repository* (`canvas_material/pages/Starting-Your-Repository.md`). The defaults (Tom's call): **a free GitHub organization per project**, named for the project, with **at least two owners** (founder + one teammate; solo students own it alone for now); **a public repository**, created with a README paragraph, a `.gitignore`, and the team's **working license** — public with no license is all-rights-reserved, and the Session 15 clinic confirms or changes it. **The charter carries the repository URL in §1**, so every repo URL is in hand by Wednesday night. The charter itself **stays out of the repo** (Tom's call, v5): it's an internal working agreement — promises among teammates, amended after hard weeks, and the peer-evaluation yardstick — and a public repo is forever. The stranger-facing parts (maintainer, decision process, channels) go public in CP7's governance & comms norms. Each member's **first push** is a one-line *Maintainers* entry in the README; the guide asks for it.
- One sentence of warning, because the repo is public from the first push: **no secrets and no interview data, ever** — the guide covers both. Discovery notes promised confidentiality; findings can go in, names and notes cannot.

*Why the split (v4, Tom's call): the concept is new to them, and thirty seconds of introduction followed by twelve minutes of writing produces charters written from politeness. Teaching it, coaching the two questions teams avoid, and letting the rest happen at a real meeting costs one extra minute of class and buys a charter they actually discussed — and it forces the first team meeting to happen inside 48 hours, which is worth something on its own. With a very small cohort, or one where everyone is solo, 6a still runs as taught; 6b becomes each student's own answers.*


### 7. Wrap + before next class — 3 min
- Recap: design docs earn their cost by making trade-offs visible while they're cheap; alternatives-considered is where the thinking shows.
- **Wednesday (Oct 14):** architecture & data-flow **workshop** — teams draw the real diagrams and draft the doc. **The repository and team charter are due end of day Wednesday (the charter carries the repo URL); the Design Document draft is due end of day Thursday, Oct 15** — the workshop boards get typed up with a night in between, and the two deliverables don't land on the same evening.
- **CP5 (revised design doc) due Wed, Oct 21** — the draft→review→revise loop, again.

---

## Threads to carry forward

- **Non-goals** flow proposal → design doc; the design must respect the MVP scope argued in CP3.
- **"Readable by a future contributor"** is a graded CP5 criterion — the contributor-ready thread.
- The **alternatives-considered discipline** returns in the decision log (optional repo artifact, §10) and the retrospective ("which decisions held?").
- The system-context diagram feeds `docs/architecture.md` in the repo (Week 8's infrastructure package).

---

## Open questions / decisions before we flesh this out

- ~~**Sample doc choice**~~ **resolved (v3):** purpose-written *Sample Design Document — Backstage* for the dissection; PEP 657 and the Orosz collection as optional real ones; Tom's NASA excerpt as an optional formal-end example if shareable.
- ~~**Design-doc template**~~ **resolved (v3):** light template created and **required for CP5** — Canvas page `pg-design-doc-template` (`canvas_material/pages/Design-Doc-Template.md`), with the raw Markdown students copy at `canvas_material/resources/Design-Doc-Template.md`. *Both new pages deploy unpublished until Session 11 is finalized.*
- ~~**NASA excerpt**~~ **resolved (v3):** GSSC-0012 supplied by Tom and publicly baselined by the Fermi SSC; included whole (64-page PDF) as optional reading behind a framing page, used as a 2-minute exhibit in §2 and a 3-minute altitude contrast in §3.
- **Team proposal revision:** confirm it's due alongside Wednesday's draft (per the Session 10 open question).

---

## Deliverable / after class

- **Today:** the two hard charter questions answered on the worksheet; the first team meeting scheduled.
- **Before Wednesday:** first team meeting — create the project's GitHub organization and public repository (*Starting Your Project Repository*), then finish the charter. **Due end of day Wed, Oct 14:** the charter, uploaded, with the repository URL in §1 — the charter itself does not go in the repo.
- **Wednesday:** bring the skeleton sketch; **team charter due end of day Wed, Oct 14**; **Design Document draft due end of day Thu, Oct 15.**

---

## Appendix — classroom handouts (Session 11)

- **The sample design doc:** `canvas_material/pages/Sample-Design-Doc-Backstage.md` (Canvas: *Sample Design Document — Backstage*) — one printed copy per team
- **Design-doc template:** `canvas_material/pages/Design-Doc-Template.md` + raw `canvas_material/resources/Design-Doc-Template.md`
- **Team Charter Worksheet:** `canvas_material/resources/Team-Charter-Worksheet.pdf` — one per team + one per solo student
- **Formal-design exhibit:** `canvas_material/resources/SAE_Database_Design.pdf` (+ `.docx` source) with `canvas_material/pages/Formal-Design-Doc-NASA-Example.md` — on screen, not printed
- **Design-doc anatomy** (§2) — slide
- **CP5 rubric:** `rubrics.md` (Design Document)

### Instructor key — what's planted in the Backstage sample

*Instructor-only. The sample is written to the template, so every problem is a template section done badly — which is the lesson.*

| # | Where | The problem | Which question finds it | What good looks like |
|---|---|---|---|---|
| 1 | §4 components — **Checkout** | "Handles check-outs," interface "TBD." The component at the heart of the MVP flow is the one nobody can build from. Overdue logic, returns, and double check-out are all unaddressed. | Q1 — start building | A paragraph: owns checkout records, enforces one open checkout per item, marks returns, computes overdue; interface = the check-out/return form posts. |
| 2 | §4 flow + §4 failure case | **Unstated assumption: the network is there when you save.** The spike proved uploads fail on the shop's wifi, yet the traced flow assumes every request succeeds, and the failure case is one hand-waved sentence. What happens to a check-out tapped on strike night with no signal? | Q2 — unstated assumption | Name the assumption; trace the failure: the form keeps its state, retries, and the item is never shown as "out" unless the server confirmed it. |
| 3 | §1 context (last line) + §6 | **"Each theater gets its own deployment"** — the single-tenant decision is asserted in one sentence with no alternative, though it's the most consequential call in the doc and it shapes the roadmap's multi-theater sharing. Meanwhile Postgres-vs-SQLite, a smaller decision, gets a full block. | Q3 — missing alternative | A §6 block: single-tenant vs. multi-tenant, why single wins for the MVP (no IT staff, simpler data isolation), and what would change their mind. |
| 4 | §5 data model + §6 "Other choices" | **Over-specified:** the full Item column dump (types, nullability, defaults), pseudo-code for a routine search view, and pinned library versions. Stale within a week; buries the decisions. | Q4 — over-specified | The entity table alone is enough; delete the column table, the code block, and the version list. |
| 5 | §3 context diagram + §4 component diagram | **Diagrams disagree with the prose and the scope.** An "Email notifier" and "overdue reminder email" appear in the diagrams but nowhere in the component table — and notifications were explicitly out of the MVP in the proposal. Bonus: `Person` has a phone but no email, so the notifier couldn't work anyway. | Q1 / Q4, or a sharp reader | Remove the notifier (or add it as roadmap, dashed), and keep the diagrams and table in agreement. |
| 6 | §8 implementation plan | **Horizontal layers, not a vertical slice:** all models, then all views, then all templates. Nothing works end to end until milestone 4, which is how a five-week build ends with nothing to demo. | Implementability (rubric) | Milestone 1 = the thinnest slice through the core flow (search → item → check out, ugly but working); widen from there. |

**What's genuinely good, so students don't conclude everything is bad:** tight non-goals carried from the proposal; the photo-downscaling decision argued with real evidence (the CP3 spike) — a course-scale trade study; an honest "reasoned, not measured" admission on the Postgres decision; a revision history and sign-off table actually used; a risks table with owners.

---

*Next step: write the Session 11 student page; then flip `pg-design-doc-template`, `pg-sample-design-doc`, and `s11` to published. Related: `Session10-Oct07-Outline.md`, `Session12-Oct14-Outline.md`, `rubrics.md` (CP5).*
