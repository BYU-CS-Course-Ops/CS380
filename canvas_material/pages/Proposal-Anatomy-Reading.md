*A free, self-contained explainer written for CS 301R. Read it before Session 7 — class assumes you have.*

*What follows is about a genre you will write for the rest of your career: the document that argues a piece of software should exist. It shows up as a startup's seed memo, an internal one-pager arguing for a new service, an RFC or design proposal on an open-source project, a grant application, a request to your manager for two engineers and a quarter. The sections have different names in different places, but the argument underneath is always the same, and so are the ways it fails. Where this course has a specific version of something — a checkpoint, a rubric, a deadline — it appears as an **example** of the general move, not as the point.*

*The running example is an invented project: a **shift-coverage and callout log for a rural volunteer EMS squad**. Two full sample proposals for a different project (a community-theater costume catalog), one strong and one weak, are in `resources/Sample-Proposal-Strong.md` and `resources/Sample-Proposal-Weak.md`.*

---

## 1. What a proposal actually is

A proposal is **an argument with sections**. Not a description of your idea, not a plan document, not a design. Its job is to move a reader who has never heard of your project from *"I have no opinion"* to *"yes, this should exist, and this person should build it."*

That means every sentence is doing one of three things: establishing that the **problem is real**, that the **solution is sound**, or that **the author can actually do it**. Sentences doing none of those are costing you space and attention. A reader who finishes your proposal and can't restate your argument didn't lose focus — you never made one.

This is also why proposals are worth learning as a genre rather than as an assignment. The thing being decided changes — funding, headcount, a quarter of engineering time, whether a maintainer merges your RFC — but you are always asking someone to spend a scarce resource on your judgment.

## 2. Who reads it, and how

Picture the reader concretely, because the abstract reader will let you get away with anything.

Almost every proposal has three kinds of reader, and they read for different things:

- **The skeptic.** Someone with no stake in your success who reads to find the hole — a reviewer, a senior engineer, a funder, a maintainer who has seen forty proposals like yours. Every unsupported claim is a hole. This reader is not hostile; they are doing their job, which is to not be fooled.
- **The person you're recruiting.** Anyone deciding whether to spend their own time on your project: a coworker choosing between your effort and another, a potential co-founder, a contributor deciding whether this repo is worth their weekends, an engineer deciding whether to transfer onto your team. They're asking *is this real, is it interesting, and is this person going to be organized?* They read your risks section hardest, because it tells them what working with you will feel like. **This is the reader most authors forget**, and the reason a proposal is a recruiting document whether or not you meant it to be. *(In this course, this reader is literal and immediate: your classmates decide at Pitch Day whether to join your project.)*
- **The evaluator.** Someone applying explicit criteria — a grant panel with a scoring sheet, a design-review board with a checklist, a promotion committee, a request-for-proposals with stated requirements. The move that matters here is universal: **find out what the criteria are before you write.** They usually exist in writing, and asking for them is normal. *(Here, they're the CP3 grid in `rubrics.md`, handed to you in advance.)*

None of them reads start to finish on the first pass. They skim headings, read the summary, and dive into whichever section they most doubt. That's why the structure is conventional and the headings are boring: a boring heading is a navigation aid, and a reader who can find the section they doubt is a reader you can still convince.

## 3. The credibility economy

Here is the single most useful idea in this reading: **every section either builds credibility or spends it.**

You start at neutral. A specific, evidenced claim buys credit. A vague claim, an unexplained technology choice, a feature list with no priorities, or a promise that doesn't fit the calendar spends it. When the balance goes negative, the reader stops believing the *good* parts too — including the parts that were true.

This has a counterintuitive consequence, and it holds in every setting where you'll write one of these: **admitting a limitation usually buys credit rather than spending it.** "I have not talked to a new volunteer yet, only to squad leads" tells the reader you know where your evidence stops, which makes everything you *did* claim more believable. Hiding the gap doesn't remove it; it means the reader finds it themselves, and then wonders what else you hid. Experienced reviewers read for this specifically — a proposal with no acknowledged weakness is either dishonest or naive, and they can't tell which.

## 4. The nine sections

Names vary by context; the jobs don't. For each: what goes in it, what it's *for*, where the material comes from, how to write it, and how it fails.

### 4.1 Executive summary

**What it is.** One paragraph — the entire argument in miniature: problem, who has it, what you'll build, the strongest piece of evidence, what the first deliverable contains, and one thing you're deliberately not doing.

**What it's for.** It is the only part guaranteed to be read, and the only part read *first*. Busy readers decide here whether to read on, and readers who never read on will still repeat your summary to someone else — which means it's also the version of your argument that travels.

**Where it comes from.** Your own finished proposal. **Write it last.** Every attempt to write it first produces a paragraph about what you *hope* the proposal will say.

**How to write it.** Six to nine sentences. Lead with the problem, not with your product name. Include one concrete number or quote — it's what makes a summary sound reported rather than imagined. End with scope: a summary that only promises is a summary nobody believes.

> **Example.** "Ridgeline Volunteer EMS covers a 40-mile valley with 22 volunteers and no paid staff. Shift coverage lives in a group text: the captain posts an open shift and counts thumbs-up emoji, and twice this year a shift went uncovered because a swap was agreed in a side conversation nobody else saw. In three interviews with squad officers and a review of six weeks of the group thread, every uncovered shift traced to the same failure — the schedule of record was a chat log. **Callboard** is a shared shift calendar with explicit swap requests: a swap isn't real until someone accepts it, and the calendar always shows who is actually on. The first release covers the calendar, swap requests, and an at-a-glance coverage gap view for one squad. It does not touch dispatch, patient records, or state reporting — those are regulated systems, and staying out of them is what makes this buildable."

**How it fails.** Adjectives instead of facts ("a huge problem," "a revolutionary platform"); the product name in the first four words; no numbers; no scope.

*In this course:* your executive summary is also the seed of your pitch — the same argument, compressed further and delivered out loud.

### 4.2 Problem and users

**What it is.** Who specifically has this problem, what the need is, and the evidence that it's real.

**What it's for.** Everything downstream is judged against it. A reader who doesn't believe your problem will not evaluate your solution charitably — they'll evaluate it as a solution in search of a need, which is the most common way real proposals die.

**Where it comes from.** Whatever needfinding you actually did: interviews, observation, support tickets, usage data, forum threads, your own logged experience of the problem. This section is mostly *selection* — which two or three needs matter most, and the best evidence for each. *(In this course, that raw material is your Discovery Notes and CP2 brief.)*

**How to write it.** Name a bounded, reachable userbase — "22 volunteers at one rural squad," not "first responders." State needs as *needs*, not features, and attach evidence to each: how many people said it, who they were, what they actually did. Quote sparingly and specifically. Rank the needs; an unranked list is where feature floods are born. Then say what you *don't* know. Marking which claims are evidenced and which are assumed is a habit worth keeping in professional work too — reviewers trust a document that distinguishes them.

> **Example.** "**Need 1 — the schedule of record is a chat log.** [E — 3 of 3 officers] Every officer described reconstructing coverage by scrolling the group text. The captain keeps a paper copy she updates 'when I remember.' Both uncovered shifts this year (Feb 3, Jun 19) followed a swap agreed in a direct message. **Need 2 — nobody sees a gap until it's the day of.** [E — 2 of 3] … **[A] Not established:** I've spoken to officers, not to rank-and-file volunteers, so I'm inferring that the *swap requester's* experience is painful. That's an assumption, and it's why my first success criterion is about volunteers, not officers."

**How it fails.** "Everyone" as a userbase; a need asserted with no source; one anecdote from a friend or relative generalized to a market; needs listed but never ranked.

### 4.3 Solution overview

**What it is.** A paragraph or two describing what you'll build and how it meets the *prioritized* needs — at the level of what a user does, not how the code works.

**What it's for.** It's the hinge: the reader now knows the problem and wants to see whether your idea actually addresses it, or just lives near it.

**Where it comes from.** Your own thinking, disciplined by the need ranking you just wrote.

**How to write it.** Describe one user doing one thing, concretely, in a sentence or two — then explicitly map back: "this addresses need 1; need 3 is handled by X." That map is what separates a solution from a wish. Also name the one constraint that shapes the design — a place, a device, a regulation, a person's willingness — because it makes every choice that follows legible.

> **Example.** "A volunteer opens Callboard on their phone, sees the next two weeks, and taps an open shift to claim it or their own shift to request a swap. A swap is a *request* until another volunteer accepts it; until then the original person is still on, and the calendar says so. That directness is the point: it addresses need 1 by making the calendar — not the chat — the record, and need 2 by making an uncovered shift visible as a gap the moment it appears. The shaping constraint is the valley itself: half the squad has no reliable data service at home, so anything that only works online is a non-starter for them."

**How it fails.** Sliding into architecture; describing features instead of use; never connecting back to the needs.

### 4.4 Core features

**What it is.** The shortlist that delivers the value, visibly prioritized.

**What it's for.** It shows judgment. Anyone can list twelve features; the artifact that persuades is the one where a reader can see what you'd cut first. Readers who fund and staff work are, in effect, buying your prioritization — the feature list is where they inspect it.

**Where it comes from.** Your prioritized needs. Every top-tier feature should be traceable to a need you evidenced.

**How to write it.** A table or a tiered list — P0 / P1 / P2, or must / next / later. Five to eight items is normal. Put the serving need next to each one. If a feature doesn't map to a need, either you skipped evidence or the feature is decoration.

> **Example.** "**P0** — shift calendar for the next 30 days (need 1) · claim an open shift (need 1) · swap request with explicit accept (needs 1, 2) · coverage-gap view for officers (need 2). **P1** — text notification when a swap is accepted. **P2** — recurring shift patterns; hours reporting for the annual state grant."

**How it fails.** The feature flood — twelve items, no tiers, no mapping. It reads as *hasn't decided what matters*, and that impression contaminates every section that follows.

### 4.5 Non-goals

**What it is.** What you are deliberately not building, and why.

**What it's for.** This is the most underrated section in the genre. Non-goals prove three things at once: you know the space well enough to see the adjacent temptations, you've made choices rather than deferred them, and your scope is a decision rather than an accident. In professional settings it does a fourth job — it protects you later, when someone assumes a thing was always in scope. A written non-goal is the cheapest disagreement you will ever have.

**Where it comes from.** The offcuts. Write this section *while* you're cutting the feature list, not after — the reasons are freshest as you cut.

**How to write it.** Three to six items, each with a one-line reason. Choose the things a reader would *expect* you to build; excluding something nobody wanted proves nothing. Reasons should be about scope, risk, evidence, or fit — not "no time," which reads as an apology rather than a decision.

> **Example.** "**No dispatch integration.** The county CAD system is a regulated interface with a months-long approval path; the squad's problem is coverage *before* the tones drop, not during a call. **No patient care records.** HIPAA-regulated, and any credible answer there is a different project with different reviewers. **No payroll or hours-to-grant reporting in v1.** The state grant report is real work volunteers do, and it's the obvious v2 — but it depends on a year of accurate shift data that this tool has to earn first."

**How it fails.** Omitted entirely; or present but empty ("none at this time — we want to be full-featured"), which tells the reader you haven't scoped, you've just postponed.

### 4.6 Technical approach

**What it is.** The stack and key dependencies with a one-line justification each, an honest account of what you don't yet know, and the result of any investigation you ran to find out.

**What it's for.** It's where "can this person build it?" gets answered. The question isn't whether your stack is impressive — it's whether the choices were *made* rather than defaulted to, and whether you know which part is hardest.

**Where it comes from.** Your feasibility analysis, your plan for closing skill gaps, and your spike log. *(In this course: Session 5's feasibility work, the Learning-Plan template, and the spike CP3 requires.)*

**How to write it.** A small table: choice, and why *for this project*. Good reasons sound like constraints ("no IT staff at the site," "half the users are offline at home," "I've shipped this stack before, and the admin panel is free"). Bad reasons sound like adjectives ("modern," "industry-standard," "flexible") and would fit any project on earth. Name what you don't know and how long you've budgeted to learn it — an honest gap with a plan is a *strength* here, because the alternative reading is that you didn't notice the gap.

Then report your spike: the question, the time box, the green and red lines you set in advance, and what actually happened. **A red result honestly reported beats no investigation at all, and beats a green one that only tested the easy part.** This is the general habit worth carrying: reduce your scariest unknown *before* you commit, and show the reader you did.

> **Example.** "*Offline-tolerant reads (service worker + local cache)* — half the squad has no home data service; a schedule you can't read at home isn't a schedule. This is the choice everything else bends around. *Postgres* — shifts, swaps, and people are relational, and swap acceptance needs a transaction I don't want to hand-roll. **Spike, four-hour box:** *can a swap accepted by two phones seconds apart produce a double-assignment?* Green: no double-assignment in 50 concurrent attempts. Red: any double-assignment, or a fix that needs a queue. **Result: red on the first design** — optimistic checks let two accepts through 6 times in 50. A single conditional `UPDATE … WHERE assignee IS NULL` fixed it, verified 0/50. Four hours turned a data-integrity risk into a settled design decision, and it's why the swap flow is written the way it is."

**How it fails.** Adjective-only justifications; "we'll probably use…"; no plan for a stack the author has obviously never used; an investigation that's promised rather than run.

### 4.7 Risks and mitigation

**What it is.** An honest register of what could go wrong, each with a credible mitigation. A useful set of categories: technical, schedule, dependency, skill, adoption, maintenance.

**What it's for.** It's the section experienced readers trust most, and the one the people you're recruiting read hardest. Specific risks say *I have thought about how this goes wrong.* Generic risks say *I filled in the section.* Naming a risk also makes it discussable — an unnamed risk can only be discovered, usually late.

**Where it comes from.** Your feasibility analysis, whatever your spike *didn't* settle, and the calendar.

**How to write it.** A table: risk, category, mitigation. Make each risk falsifiable and local to *your* project — a risk that could appear in anyone's proposal isn't a risk, it's a genre convention. A mitigation must be an action with a trigger or a date, not an intention. And retire the risks your spike already killed rather than leaving them in to look thorough.

> **Example.** "*The squad's only real test window is the Nov 14 duty weekend; if I miss it I have no live data.* **Schedule.** Feature-freeze Nov 9; if the weekend falls through, run a tabletop with three volunteers and the previous month's real schedule, which the captain has already agreed to. — *Volunteers keep using the group text because it's where everyone already is.* **Adoption.** The captain posts the calendar link into that same thread for the first two weeks rather than fighting it; success criterion 3 measures swaps completed in the app, not app installs."

**How it fails.** "Time management." "Bugs may occur." "Team members might get busy." Every reader has seen these, and they carry no information about your project.

### 4.8 First deliverable — the MVP

**What it is.** The slice you will actually build first: what's in, what's deferred.

**What it's for.** It's where scope realism is judged, and it's the promise you'll be measured against. Every proposal that survives becomes a commitment, and this section is the part that becomes it.

**Where it comes from.** The intersection of your top-tier features, your risk register, and the time you actually have.

**How to write it.** State the slice as a workflow that runs end to end for one user type, then list what's deferred. Deferred is not abandoned — pointing at the roadmap keeps ambition visible while keeping the promise small.

Then do the arithmetic honestly, and this is the part almost everyone gets wrong: **the time you have is never the time on the calendar.** Meetings, review, writing, testing, deployment, and the work of the rest of your life come out of the same budget before a line of feature code gets written, and the window rarely starts today. Professionals estimate against the *remaining, uninterrupted* hours; amateurs multiply weeks by an optimistic daily rate. **Underpromise correctly: a modest deliverable you certainly finish beats an impressive one you might.** Delivering what you promised is how you get to make the next proposal.

*In this course, the concrete version of that arithmetic:* the ~10 hrs/week expectation covers **everything** — class, reading, discovery, writing, and reviews — and real building runs for roughly **five weeks** (Weeks 9–13). Sizing an MVP by multiplying ten hours by fourteen weeks is the single most common fatal line in a student proposal.

> **Example.** "**In:** the 30-day calendar, claim-an-open-shift, swap request with explicit accept, and the officer gap view — for one squad, seeded with Ridgeline's real roster, deployed and used for one duty weekend. **Deferred:** notifications, recurring patterns, hours reporting, and anything multi-squad. One user type, one workflow, end to end, on real data."

**How it fails.** A "first deliverable" that's just the feature list again; arithmetic that ignores everything except coding; a stretch goal that's obviously the actual dream, which tells the reader where your attention will really go.

### 4.9 Success criteria

**What it is.** Observable statements of what "this works" means.

**What it's for.** They make the project falsifiable. They're also self-interested: whoever evaluates the result will use *some* definition of success, and writing yours down first means it's one you can actually meet and demonstrate.

**Where it comes from.** Your definition of the problem, sharpened until each item is checkable against the thing you're actually building first.

**How to write it.** Each criterion needs an observer, an action, and a threshold. "Users love it" fails all three. Include at least one criterion involving a real user who is not you doing something real — that's the one that tells the reader whether you plan to test or to demo. Naming the criterion you expect to fail is a credibility gain, not a loss.

> **Example.** "1. Over one duty weekend, every shift's assignee in the app matches the paper log the captain keeps in parallel — zero discrepancies. 2. At least four swaps are requested and accepted **in the app** by volunteers other than me. 3. An officer identifies an uncovered shift more than 48 hours before it starts, at least once. Criterion 2 is the one I expect to miss; habits live in the group text."

**How it fails.** Adjectives ("intuitive," "stable," "bug-free"); user-count targets you have no mechanism to produce; nothing an observer could check when the work is done.

## 5. Four checks to run on every paragraph

These four apply to any technical writing with a reader on the other end — proposals, bug reports, pull request descriptions, design docs, incident writeups, release notes. They're worth internalizing once and reusing forever. *(You'll be asked to apply them repeatedly in this course, including in the tech-comm portfolio.)*

1. **Audience.** Who is this for, what do they already know, and what must they believe next? Jargon your reader can't parse is a cost, not a credential. *Test:* hand your problem section to someone who's never heard the idea and ask them to restate it in one sentence. If they can't, the section is broken — no matter how clear it is to you.
2. **Content.** Is everything needed here, at the right level of detail, with nothing extra? Altitude is a judgment call, and for proposals the rule is **name the stack, don't draw the schema** — detailed design is a later document's job, and spending your reader's attention on it leaves "is the problem real?" unanswered. Where information is genuinely missing, say so rather than writing around the hole. A named hole is content; a hidden one is a trap.
3. **Clarity.** Short sentences. Concrete nouns. One claim per paragraph. *Test:* read only your topic sentences, in order. If they don't form the argument by themselves, your argument is buried in the middles of paragraphs, where skimming readers will never find it.
4. **Tone.** How does this sound to a stranger who owes you nothing? Two failure directions: **salesy** ("revolutionize," "seamless," "game-changing") reads as compensation for missing evidence; **apologetic** ("I hope to maybe attempt") invites doubt before the argument starts. The target is **honest confidence**: here's what I know, here's what I must learn and my plan for it, here's what I've cut.

## 6. The order to write them in

Not the order they're read in. This order exists because each step supplies material the next one needs — and because the hardest section, the first deliverable, is easiest once everything above it is decided.

1. **Problem and users** — from your evidence. Everything else is judged against it, so it goes first.
2. **Success criteria** — early, not late. Deciding what "works" means *before* you pick features is what stops the feature list from becoming a wishlist; each feature now has to earn its place against a criterion.
3. **Solution overview and core features** — chosen to satisfy 1 and 2, then ranked.
4. **Non-goals** — written *while* cutting the feature list in step 3, when you still remember why each cut made sense.
5. **Technical approach** — now that you know what you're building. Run your spike here if you haven't; the result usually changes something above it, and that's the spike working.
6. **Risks and mitigation** — falls out of step 5 and the calendar. Delete the risks your spike retired.
7. **First deliverable** — the intersection of top-tier features, real risk, and the hours that actually exist. Hardest section; by now it's mostly arithmetic.
8. **Executive summary** — last. It's a compression of a finished argument, and you can't compress one you haven't finished.
9. **A revision pass.** Read only your topic sentences (check 3). Then read only your claims and ask "what's my source?" Then cut adjectives. Most six-page drafts become better four-page proposals in this pass alone.

## 7. Evidence, and where each claim comes from

Every factual claim should have a traceable source, and you should know which one it is even where you don't cite it. The general discipline — *know why you believe each thing you're asserting* — is what separates a proposal from a pitch deck.

| Claim about… | Comes from | Looks like |
|---|---|---|
| Who the users are and what they need | Needfinding — interviews, observation, tickets, data | "3 of 3 officers described…" [E] |
| What you're guessing | Your own honesty | "[A] I haven't observed this — assumption" |
| Whether the hard part is possible | A time-boxed investigation you ran | "4-hour box; red on the first design; here's the fix" |
| What you'll need to learn | Your skill-gap plan | "~4 hours, with a documented fallback" |
| Whether it fits the time available | The calendar, minus everything that isn't building | "roughly five weeks of real building" |

*In this course, those map to your Discovery Notes and CP2 tags, your spike log, the Learning-Plan template, and the course calendar.*

## 8. Length, format, and the last mile

Length is set by the decision at stake and the reader's patience, not by how much you have to say — a proposal asking for one engineer for a month should be shorter than one asking for a team for a year. A few pages is typical for a founding proposal, and shorter is almost always better than longer. *(For CP3: three to five pages.)*

Use conventional section headings; the reader is navigating, not admiring. Tables work well for features, stack choices, and risks — they compress, and they make omissions obvious, which is a feature. Prose for problem, solution, and summary, because those are arguments and bullets hide the connective tissue that makes an argument an argument.

Before you submit, check that:

- [ ] Every top-priority feature traces to an evidenced need.
- [ ] Non-goals exist, and each has a reason.
- [ ] Your investigation of the scariest unknown is reported with its question, time box, pre-declared green/red lines, and honest result.
- [ ] No risk in your table could be copy-pasted into someone else's proposal.
- [ ] The first deliverable is one workflow, end to end, sized against the hours that actually exist — with the arithmetic visible.
- [ ] Every success criterion has an observer, an action, and a threshold.
- [ ] The executive summary works alone, contains a number, and names something you're not doing.
- [ ] Your topic sentences, read alone, make the argument.
- [ ] Somewhere in the document you admit a limitation.

## 9. Knowing the bar before you write

Wherever a proposal is evaluated, the criteria exist — sometimes published, sometimes in a reviewer's head, sometimes in an RFP nobody read carefully. Finding them out first is free, and not doing it is the most avoidable way to lose.

*In this course they're published:* CP3 is scored on the seven-criterion grid in `rubrics.md` (Written Proposal). Read the four performance levels before you write. The heaviest single criterion is **Feasibility & technical approach** (20 points), with **Scope realism** and the non-goals-bearing **Solution & core features** at 15 each — a deliberate signal that *arguing feasibility without overpromising* is the skill this genre lives or dies on.

---

*Related: `assignments/CP3-Written-Proposal.md` · `resources/Sample-Proposal-Strong.md` · `resources/Sample-Proposal-Weak.md` · `resources/Spikes-Reading.md` · `resources/Feasibility-Risk-Worksheet.md` · `resources/Learning-Plan-Template.md` · `rubrics.md`*
