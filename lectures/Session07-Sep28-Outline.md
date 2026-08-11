# Session 7 — Proposal Anatomy: Arguing for a Project — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 7 of 27 · Mon, Sep 28, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Course reading — [*The Anatomy of a Software Proposal*](../resources/Proposal-Anatomy-Reading.md)** (`resources/Proposal-Anatomy-Reading.md`) — **the primary reading.** Section-by-section: what each part contains, what it's for, where the material comes from, how to write it, and how it fails; the four checks; the order to write the sections in. **Class assumes this has been read** — the skeleton is reviewed, not taught.
- **Sample proposal (weak) — `resources/Sample-Proposal-Weak.md`** — read it and mark the places you stop believing the author. We dissect it in class.
- **Kislay Verma — [*Why programmers don't write documentation*](https://kislayverma.com/why-programmers-dont-write-documentation/)** — short; why clear writing is hard, and why it's engineering work rather than overhead.
- *Optional:* **Write the Docs — [*How to write software documentation*](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/)** — audience, purpose, and structure. The course reading covers this ground applied to proposals; this is the general version for anyone who wants it.
- **Finalize and submit your CP2 Product Definition Brief** — **due at the start of class today**; the proposal is built directly on it.
**Maps to:** Design Week 4, Session A — *proposal structure (executive summary, problem & users, solution, core features, non-goals, technical approach, risks & mitigation, MVP, success criteria); dissect strong vs. weak examples.*

> **Status: OUTLINE (v2).** First half of Week 4 — a teaching session (Session A). Phase 2 begins: from *defining* the opportunity to *arguing for it*. **CP2 Product Definition Brief is due at the start of today's class;** **a proposal draft — two printed copies — is due at Wednesday's workshop;** **CP3 Written Proposal is due Mon, Oct 5.**

---

## Purpose of this session

You've converged on an idea and defined it (CP2). Now you have to **argue for it** — in writing, to an audience that hasn't lived inside your head for four weeks. The written proposal is the course's first full-length act of technical communication: it must convince a skeptical reader that the problem is real, the solution is sound, the scope is honest, and *you* can build it. Students arrive having read the anatomy of a proposal, so class spends its time where reading can't help: **dissecting a real weak proposal until the room can name exactly where it loses its reader**, and rehearsing the hardest move in the genre — **arguing feasibility without overpromising.**

---

## Learning objectives

By the end of this session, a student can:

1. **Name the sections of a software proposal** and what each must accomplish (reinforced from the reading, not introduced).
2. **Write for a skeptical reader** — apply the four checks (audience, content, clarity, tone) to their own draft.
3. **Argue feasibility honestly** — scope, risks, and mitigations without overpromising.
4. **State non-goals** and explain why scoping *out* is as persuasive as scoping in.
5. **Critique a proposal** — identify where a weak example loses its reader, and say what is wrong *specifically* enough for the author to act on it.

---

## Instructor prep / materials

- **Confirm the reading was done** — the session's timing depends on it. A one-question entry poll ("name one section of a proposal and what it's *for*") is enough to find out, and enough to shame the skippers into reading it tonight.
- **Samples in hand, both in `resources/`:**
  - `Sample-Proposal-Strong.md` — *Backstage*, a costume and props catalog for volunteer-run community theaters.
  - `Sample-Proposal-Weak.md` — *CostumeHub*, the same project written by someone who skipped discovery and cut nothing.
  - Both are labeled teaching samples with invented evidence. **Say that out loud** the first time they go on screen — this course grades honesty about evidence, and a sample with fabricated interviews needs its label spoken, not just printed.
- **Slides: `lectures/Session07-ProposalAnatomy.pptx`** — 30 slides, built from this outline. Slide 2 is a pop-up entry poll on the reading · 8–11 the four checks, one each · 12 the dissection setup · **13 "say what's wrong — specifically"** · **14 the two executive summaries side by side** · 15–20 the three excerpt pairs (weak alone, then the contrast, each with a section locator) · 21–22 the pattern lists · 23 feasibility · **24 the CP3 rubric grid** (jump between 23 and 24 during the feasibility discussion) · 25 the spike · 26 the arithmetic with the "do it right now" callout · 27–28 the two activity slides (they stay up while students work) · 29 Wednesday's mechanics · 30 the wrap.
- **A design rule the deck follows, worth keeping on any rebuild:** students have read the *weak* sample only, so **anything the presenter notes tell you to point at is on the slide.** Excerpts also carry a locator line (which of the nine sections, and what that section is for), and slide 14 shows both executive summaries first, so the paragraphs that follow land somewhere on the map instead of arriving from nowhere.
- **Print:** the **Proposal Outline worksheet** (`resources/Proposal-Outline-Worksheet.pdf`), one per student — it drives §6 and the students write on it. Also print the weak sample, one per student, if you'd rather they mark paper than screens in §4.
- **The CP3 rubric** is slide 24 of the deck, so it needs no separate setup — but have `rubrics.md` open if anyone asks about the four performance levels, which the slide deliberately leaves out.
- **Announce Wednesday's mechanics** and mean it: **two printed copies** of the draft, plus the draft uploaded to the LMS.

---

## Timed outline (≈75 min)

### 1. Bridge + framing — 5 min
- Week 3 you *chose* and *defined*; this week you *argue.* The proposal is the first artifact strangers will judge your project by — and it's the direct input to next week's pitch.
- The mindset shift: CP2 was written for *you and the instructor*; CP3 is written **to persuade a skeptical reader.**
- **The credibility economy** (from the reading, in one line): every section either builds credibility or spends it, and when the balance goes negative the reader stops believing the true parts too. Today is about spotting the spend.

### 2. The skeleton, fast — 7 min
- Assumed read. Put the nine sections on one slide and run them as **recall, not instruction** — call on the room: "what is the non-goals section *for*?" "Where does the material for technical approach come from?"
- Only two points get expanded, because they're the ones the reading can't force:
  - **Write them out of order.** Problem → success criteria → solution/features → non-goals (while cutting) → technical approach + spike → risks → MVP → executive summary last. The order exists because each step supplies the next one's material.
  - **Every section either builds credibility or spends it** — restated as the lens for §4.
- If the entry poll said the room didn't read it, spend three more minutes here and take them out of §4's buffer, not out of §5.

### 3. Writing for a skeptical reader — the four checks — 12 min

These four are the course's standing frame for technical writing; students meet them again on bug reports, pull requests, design reviews, and the tech-comm portfolio (CP9). State them in full here, each with its proposal-specific test. Roughly three minutes each.

1. **Audience** — *who is this for, what do they already know, and what must they believe next?*
   - A proposal has three readers who read differently: the **skeptical stranger** hunting for the hole; the **potential teammate** deciding on Oct 7 whether to spend their semester on you; the **grader** checking against criteria. None reads start to finish — they skim headings and dive into whichever section they doubt.
   - Jargon a classmate outside your domain can't parse is a cost, not a credential.
   - **Test to demo live:** hand your problem section to someone who's never heard the idea and ask them to restate it in one sentence. Do this in the room — take one volunteer's problem paragraph, read it aloud, and ask a student on the other side of the room to restate it. It works or it visibly doesn't; either outcome teaches.

2. **Content** — *everything needed, at the right level of detail, nothing extra.*
   - **The altitude rule for proposals: name the stack, don't draw the schema.** Architecture is the Week-6 design doc's job. A proposal that opens an ER diagram has answered a question nobody asked while leaving "is the problem real?" unanswered.
   - **Name your holes.** Where information is genuinely missing, say so — "[A] I haven't observed this yet." A named hole is content; a hidden one is a trap that goes off when the reader finds it.

3. **Clarity** — *short sentences, concrete nouns, one claim per paragraph.*
   - **Test to demo live:** read only your topic sentences, in order. If they don't form the argument alone, the argument is buried in the middles of paragraphs, where skimming readers will never find it. Demonstrate on the strong sample — its topic sentences do read as an argument — then on the weak one, where they read as a list of moods.

4. **Tone** — *how it sounds to a stranger who owes you nothing.*
   - Two failure directions: **salesy** ("revolutionize," "seamless," "game-changing") reads as compensation for missing evidence; **apologetic** ("I hope to maybe attempt") invites doubt before the argument starts.
   - The target is **honest confidence:** here's what I know, here's what I must learn and my plan, here's what I've cut.
- Close the section with the line that carries into §4: **evidence beats adjectives.** "Three of the four wardrobe volunteers I interviewed described the same twenty-minute walk to the racks" persuades; "this is a huge problem" does not.

### 4. Strong vs. weak — dissect the samples — 22 min

Both samples propose **the same project** — a costume and props catalog for a volunteer-run community theater. Same idea, same student-level effort; the difference is discovery and cutting. Students have read the weak one; the strong one's excerpts are new to them.

**The budget:** setup 1 · how-to-answer 1.5 · both executive summaries 2 · three pairs at 5 each · synthesis 2.5.

**Before the pairs — two short beats that make the dissection work:**

- **"Say what's wrong — specifically" (~1.5 min, slide 13).** Students default to reactions — *vague, confusing, too much* — which feel like feedback and give the author nothing to change. Run the translation drill: *"it's vague"* → *"the userbase is six audiences, so it's nobody"*; *"seems hard"* → *"four features in five build weeks, and no evidence behind the estimate."* Convert one with the room before showing the answers. **The test is whether the author could act on it, not whether they used rubric vocabulary** — the CP3 criteria give convenient names and Wednesday's review is anchored to them, but a precise observation in plain words beats criterion jargon attached to a vague complaint. This is the same skill as a useful code-review comment, which is why it recurs all term.
- **The whole argument, in one paragraph (~2 min, slide 14).** Both executive summaries, side by side. Nobody has read *Backstage*, so without this the excerpts arrive with no context. Ask what each paragraph told them: one names a bounded user, an evidence count, a specific tool, a sized MVP, and four exclusions; the other names an adjective and a feature list. It also demonstrates the §2 claim on real text — the summary is written last because it can only compress an argument that already exists.

Then run three paired excerpts. For each: put the weak version up, ask the room **"where do you stop believing this?"**, take three or four answers, *then* reveal the strong version and ask what specifically changed. Push every answer toward the specific defect.

**Pair 1 — the problem statement (~6 min).**
- *Weak:* "Theaters everywhere struggle to keep track of their costumes… The users of CostumeHub include community theaters, high school and university drama departments, dance studios, church and community groups, cosplayers, and eventually professional theater companies… I talked to my aunt, who does costumes for her church's Christmas program, and she said their system is 'a total mess'… I also searched online and found many Reddit posts."
- *Strong:* "Wardrobe and props volunteers at small, volunteer-run community theaters… At the three theaters I visited, that is one to three people per theater… **Need 1 — 'Do we already own this?' cannot be answered from the shop floor.** [E — 4 of 4] … Ruth H., wardrobe lead at a 180-seat house, keeps the collection in a spiral notebook plus a shoebox of printed photos; her answer to 'do we have a Victorian bustle' is 'give me twenty minutes and I'll go look.'"
- **What to make them notice:** the weak userbase is six audiences, which is none; the evidence is one relative and a search; the needs are never ranked. The strong version bounds the user (*one to three people per theater*), ranks needs, attaches a count to each, and quotes a specific person doing a specific thing. The strong card's fourth line is the author's **"What I have not established"** admission — read it aloud and ask whether it made them trust the document more or less. The admission *buys* credibility, which is the counterintuitive move students most resist.

**Pair 2 — technical approach and feasibility (~6 min).**
- *Weak:* "React on the front end and Node.js on the back end, which are modern, industry-standard technologies with lots of community support… I will probably use MongoDB because it's flexible… I have not run a spike yet, but I plan to start with the parts I already know and work up to the harder features."
- *Strong:* "*Client-side image downscaling before upload* — direct result of the spike below; not optional… **Spike — run Sep 24, six-hour box.** Naive full-resolution upload gave a median of 71 s and **three of ten uploads failed** on the throttled connection. Adding client-side downscaling to 1600 px brought the median to **48 s with zero failures.**"
- **What to make them notice:** every weak justification is an *adjective* (modern, industry-standard, flexible) and would fit any project on earth; every strong justification is a *constraint* — and the constraints are on the slide, not asserted: no IT staff at the theater, a box someone can actually operate, a venue where uploads fail. Hand them the swap test: would this sentence fit any other project in the room? And "start with the parts I already know and work up to the harder features" is exactly the failure mode the Spikes reading warned about — the fatal unknown discovered in Week 13. Ask directly: *which of these two authors knows whether their project is possible?*

**Pair 3 — non-goals and MVP (~6 min).**
- *Weak:* "**Non-goals.** None at this time. The goal of CostumeHub is to be a complete solution, so I don't want to rule anything out this early." → "The MVP will include the inventory catalog with photos, barcode scanning, the mobile app, check-out and return tracking, and basic rental support… working about 10 hours per week for 14 weeks, which is 140 hours — plenty of time."
- *Strong:* "**No inter-theater rental marketplace.** The most-requested 'wouldn't it be cool' in my interviews, and the fastest way to lose the semester… **Cutting the rental marketplace is what makes the rest of this proposal credible. It was in my first draft.**" → an MVP sized against "roughly five weeks (Weeks 9–13)," one user type, one workflow, seeded with 60 real items.
- **What to make them notice:** the weak non-goals section is *present and empty*, which is worse than absent — it announces that scoping was postponed, not done. The 140-hour arithmetic is the single most common fatal line in student proposals; kill it here, loudly, and it will not appear in twenty-five drafts on Wednesday. Contrast the strong sample naming a cut it *regretted* — that sentence is the whole lesson about non-goals.

**Synthesis (~4 min).** Put both pattern lists up together:
- **Weak patterns:** the unbounded user ("theaters everywhere," six audiences); anecdote-as-evidence; the feature flood (twelve items, no tiers, no mapping to needs); empty or missing non-goals; adjective-only stack justification; the promised-not-run spike; generic risks ("time management," "bugs may occur"); the 140-hour arithmetic; success criteria that no observer could check ("users love the app," "10,000 users"); the stretch goal that's obviously the real dream.
- **Strong patterns:** bounded users with counts and quotes; ranked needs with [E]/[A] tags; a tiered feature table mapped to needs; non-goals with reasons, including one that hurt; stack choices justified by *constraints*; a spike with a question, a box, pre-declared green/red lines, and an honest result that changed the design; risks that could belong to no other project, each with a dated or triggered mitigation; an MVP sized against five real weeks; success criteria with an observer, an action, and a threshold — including one the author expects to fail.

### 5. Arguing feasibility without overpromising — 12 min
- The proposal's credibility hinges here, and it's the heaviest criterion on the rubric (**Feasibility & technical approach, 20 points**). **The CP3 grid is slide 24, immediately after this one** — jump to it and back rather than describing the weights from memory. Twenty points on feasibility plus fifteen on scope realism is a third of the assignment; walk only those two rows, and leave the four performance levels to `rubrics.md`. The move is **honest confidence:** *here's what I know, here's what I must learn (and my plan), here's what I've cut.*
- Bring the Week-3 toolkit forward explicitly: the **six risk categories** (technical, schedule, dependency, skill, adoption, maintenance), the **know/learn/avoid triage**, the **spike** — required for CP3, and reported with its question, time box, green/red lines, and honest result — and the **learning plan** for what's left.
- **A red spike, honestly reported, scores better than a green one that only tested the easy part**, and far better than a promised one. Use the strong sample's spike: it came back green *only after* a design change, and that condition is now in the technical approach. That's the artifact of a person who found out.
- **The honest budget, out loud, with the arithmetic on the board:** the course expects about **ten hours a week total** — class, reading, discovery, writing, and reviews all come out of it — so real building time is a fraction of ten, and it runs for roughly **five weeks** (Weeks 9–13). Anyone whose MVP was sized by multiplying 10 × 14 has already failed *Scope realism*. Have them do their own arithmetic on paper right now; it takes ninety seconds and changes drafts.
- **Underpromise correctly:** a modest-but-certain MVP beats an impressive-but-doubtful one. Reviewers — and next week's pitch audience — reward scope realism, and it's 15% of the CP3 grade.
- Non-goals as a feasibility argument: every explicit non-goal is proof you've thought about scope. The reader can't see the features you never listed; they can see the ones you named and cut.

### 6. In-class — outline your proposal — 12 min

**6a. Solo — the skeleton and the risks (~6 min).** Hand out the worksheet (`resources/Proposal-Outline-Worksheet.pdf` — one page, one per student). It carries all four prompts below, plus the pair-share questions on the same sheet so nobody has to remember them:
- One line per section — nine lines. Each line says what *this* section will claim, not what section it is.
- Your **three biggest risks**, each with a category and a mitigation that has a date or a trigger.
- Your **five-week arithmetic**: hours you actually have, times five, and what that buys.
- Star the section you have the least evidence for. That's Wednesday's reviewers' first stop.

**6b. Pair-share (~6 min).** Trade worksheets with a neighbor — someone whose project you know nothing about, which is the point. Three minutes each direction. The reader answers exactly three questions, out loud:
1. **Which section is weakest?** Say what is wrong specifically — the translation drill from slide 13 applies here; "it's vague" wastes their partner's turn.
2. **Which claim most needs evidence?** Point at one line and ask "how do you know?"
3. **Do you believe the five-week arithmetic?** One yes or no, and why.

Authors **capture, don't defend** — the same protocol as the Week-3 workshop and Wednesday's review. Instructor circulates and listens for pairs who are being polite instead of useful; model one sharp, kind critique aloud early so the room hears the register.

### 7. Wrap + before next class — 5 min
- Recap: a proposal is an **argument**, section by section, to a skeptical reader; feasibility is argued with evidence, a spike, and honest scope — not enthusiasm.
- **Wednesday (Sep 30) — the peer-review workshop, and it has hard mechanics:**
  - **Bring two printed copies** of your draft. Reviewers mark them up on paper; you keep both.
  - **Upload the same draft to the LMS** by the start of class — completion-checked, not scored.
  - **Minimum draft:** problem & users, solution, non-goals, and risks. A fuller draft gets you a better review.
  - **This is graded downstream.** CP3's *Argument & revision* criterion measures visible response to feedback; **no draft on file caps that criterion at Developing**, because there's nothing to show revision against. Coming empty-handed also costs a classmate their review.
- **CP3 Written Proposal due Mon, Oct 5** (start of class), submitted **with scans or photos of both annotated copies.** It becomes the basis of your **Pitch #1 on Wed, Oct 7.**

---

## Threads to carry forward

- The proposal is **CP2 + feasibility, turned into an argument** — everything traces back to discovery and the Week-3 toolkit.
- **Specific beats vague** — the translation drill in §4 is the same move as a useful code-review comment or bug report; Wednesday's review protocol anchors it to the rubric criteria.
- **The four checks** (audience · content · clarity · tone) are the course's standing frame for technical writing: reused for design review (Wk 6), code review and PR descriptions (Wk 7), the repo audit (Wk 11), and the tech-comm portfolio (CP9).
- **Non-goals** and **scope realism** recur at the pitch, the design doc, and MVP planning.
- **Capture, don't defend** — the review posture, rehearsed in §6b, run for real Wednesday.
- The written proposal → **pitch** (same argument, oral, compressed) → team formation.

---

## Open questions / decisions before we flesh this out

- **Entry poll on the reading:** worth the two minutes, or does it set a policing tone this early? (Recommend running it Session 7 only, since the whole session's timing bets on the reading.)
- **Weak sample on paper or screen** in §4 — paper gets better marking, costs a print run of 25.
- **Draft floor enforcement:** the cap is stated in CP3 and above; confirm how a genuinely excused absence on Sep 30 gets handled (recommend: draft uploaded on time still counts, review made up asynchronously with one classmate).

---

## Deliverable / after class

- No new checkpoint today. **Draft your proposal** — the anatomy reading's section order (§6 of the reading) is the fastest path from CP2 to a full draft.
- **Wednesday, Sep 30:** draft uploaded to the LMS **and two printed copies in hand** at the start of class.
- **Looking ahead:** CP3 Written Proposal due **Mon, Oct 5**, with the annotated draft copies attached; Pitch #1 **Wed, Oct 7.**

---

## Appendix — classroom handouts (Session 7)

- **Proposal Outline worksheet:** `resources/Proposal-Outline-Worksheet.pdf` — the §6 in-class sheet, one page, one per student (source: `Proposal-Outline-Worksheet.html`)
- **Course reading:** `resources/Proposal-Anatomy-Reading.md` (assigned before class)
- **Sample proposals:** `resources/Sample-Proposal-Strong.md` (*Backstage*) and `resources/Sample-Proposal-Weak.md` (*CostumeHub*) — same project, two ways
- **CP3 assignment:** `assignments/CP3-Written-Proposal.md`
- **CP3 rubric:** `rubrics.md` (Written Proposal) — the four-level grid
- **Spikes reading:** `resources/Spikes-Reading.md` (the spike is required for CP3)
- **Feasibility & Risk worksheet:** `resources/Feasibility-Risk-Worksheet.md` (feeds the risks section)
- **Learning-Plan template:** `resources/Learning-Plan-Template.md` (feeds the technical approach)
- **CP2 Product Definition Brief:** `assignments/CP2-Product-Definition-Brief.md` (the foundation)

---

*Next step: the Session 7 student page (`canvas_material/lectures/`). Deck built: `Session07-ProposalAnatomy.pptx`. Related: `Session08-Sep30-Outline.md`, `CS301R-ProjectCreation_v4.md` (§7 Week 4), `rubrics.md` (CP3).*
