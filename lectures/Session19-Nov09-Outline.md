# Session 19 — MVP Thinking & Systematic Debugging — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 19 of 27 · Mon, Nov 9, 2026 · 75-minute block**
**Prior reading (all free — nothing to buy):**
- **Henrik Kniberg — [*Making sense of MVP*](https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp)** — carried over from Wednesday; today we use the whole argument: earliest **testable** → earliest **usable** → earliest **lovable**, and what each stage is supposed to *teach you*.
- **[*Debugging on Purpose*](../canvas_material/pages/Debugging-Reading.md)** (course reading, Canvas page `pg-debugging-reading`) — the reasoning loop around the debugger: say the failure exactly, hypothesize more than once, test the cheapest guess first, pin the defect with a failing test, write three lines. Draws on Zeller's free *Debugging Book* and Julia Evans's *A debugging manifesto*.
**Maps to:** Design Week 10, Session A — *evaluate example MVPs; "what must v1 prove?" workshop; debugging reasoning model.*

> **Status: OUTLINE (v2) · deck built** (`canvas_material/lectures/powerpoint/Session19-ProveAndDebug.pptx`, 21 slides, `tools/build-session19.js`) **· V1 Proof Sheet and Debugging Loop Card built · debugging demo kit built** (`demos/session19-debugging/`) **· CP10 and the MVP Plan published.** First half of Week 10 — the deepest build fortnight. Two tools for it: sharper MVP judgment (throwaway vs. evolutionary, what v1 must *prove*) and a systematic debugging discipline for when the build fights back. **MVP Plan due Wed, Nov 11.** *v2: the prior-course debugging module is replaced by a course reading written for this course; the example MVPs are chosen (git's first commit, Denied → Flask, a broad-shallow Prop Loft, Chandler as the real-world echo); the live vignette runs on a planted Prop Loft bug from a kit; the known-issues log is previewed here because CP10 grades it.*

---

## Purpose of this session

Your slice is committed and the build is on. Two things will decide the next fortnight. First, **MVP judgment**: an MVP is not a small product — it's an instrument for *proving something*: that the need is served, that the scary tech works, that a user can get through the flow. Founders who know what v1 must prove make a hundred small decisions correctly; teams that don't, polish the wrong corners. Second, **debugging discipline**: from here on you'll spend real hours on defects, and the difference between one hour and five is rarely knowledge — it's method. Hypothesis → evidence → isolate → fix, written down.

---

## Learning objectives

By the end of this session, a student can:

1. **Distinguish throwaway from evolutionary prototyping** and say which their MVP is (and where).
2. **State what their v1 must prove** — the claims, ranked — and cut what proves nothing.
3. **Evaluate an MVP** — does it prove its claims? — on real examples.
4. **Debug systematically:** form hypotheses, gather evidence, isolate, fix, and log it.
5. **Capture known limitations honestly** as they build — the start of the known-issues list CP10 reads.

---

## Instructor prep / materials

- **Printables** (both in `canvas_material/resources/`, one per student):
  - **V1 Proof Sheet** (`V1-Proof-Sheet.html` + `.pdf`, full page; §3–§4) — the four prompts (need, technical, usability claims, each with an evidence line and a rank box; the falsifier), the cut, the throwaway corners with where they're labeled, and the share-out line. *(v1 planned a half-sheet; four claims with evidence lines need the full page.)*
  - **Debugging Loop Card** (`Debugging-Loop-Card.html` + `.pdf`, two identical half-sheets per page, cut line; §5) — the loop 0–4, the error → defect → fault → failure chain, the three-line debug log and where it goes, stuck/AI rules, and the known-issue line. A keep-beside-the-keyboard card, not a worksheet.
- **The example MVPs** (§4) — three, each picked for one lesson, plus one real-world echo. Facts checked Oct 24, 2026; sources at the end of this section.

  | Example | Kind | What v1 proved | What it deliberately didn't | The lesson |
  |---|---|---|---|---|
  | **git's first commit** — Linus Torvalds, Apr 7, 2005: *"Initial revision of 'git', the information manager from hell."* About 1,200 lines of C, 11 files, a handful of plumbing commands (`init-db`, `update-cache`, `write-tree`, `commit-tree`, `cat-file`, …). | **Evolutionary**, a true vertical slice | The **technical claim**, ranked first: content-addressed storage fast enough to manage the kernel (his target: applying a patch in ≤ 3 s). Self-hosting the next day — git tracked its own source, so the need claim was tested by its first user. | Usability (no porcelain, no friendly commands) and merging (first multi-branch merge Apr 18). | Rank the claims; prove the scariest one with the thinnest end-to-end thing; defer the rest *knowingly*. It managed the 2.6.12 kernel release ten weeks later. |
  | **Denied → Flask** — Armin Ronacher, Apr 1, 2010: an April Fools' "microframework," one file, ~160 lines wrapping Werkzeug and Jinja2, with a website and screencast. 10,000+ screencast downloads, 50,000+ site hits, 50 GitHub followers in days. Flask, a real project written fresh, about a month later. | **Throwaway** (an accidental demand test) | The **need claim**: people wanted a tiny, single-entry Python web framework. | Anything technical: it was a joke wrapper, and none of it was kept. | A throwaway can answer a need question cheaply, and its job is to be thrown away. *Aside, if time:* Ronacher's own post-mortem lesson was "don't be honest: be bold." Ask the room whether that survives contact with a contributor who clones the repo (it's the opposite of CP10's honesty criterion). |
  | **Prop Loft, broad-shallow** — synthetic, one slide. The Nov 18 demo as it would look built screen-first: a styled search page, a styled item page, a styled checkout form — and no checkout model behind them. | **Cautionary** | Nothing: every screen shows, no claim is tested. The form "works" until someone asks what happens when two volunteers check out the same waistcoat. | — | The same project as Session 18, so the contrast is exact: same hours, slice-first vs. screen-first. Run the four prompts on it and watch each come back empty. |
  | *Echo:* **Chandler** (Open Source Applications Foundation, 2002–2008) — an ambitious open-source personal information manager (email, calendar, tasks, sharing) chronicled in Scott Rosenberg's *Dreaming in Code*; 1.0 shipped in Aug 2008, years after the work began, and funding ended that year. | Real-world broad-shallow, at scale | — | — | One sentence, not a slide's worth: "This isn't a student mistake. Funded teams of professionals do it." Accounts attribute the delays to technical complexity, feature creep, and management; don't claim more than that. |

  **Backup example** (if the room is quick): **Linux 0.01–0.02**, 1991. The Aug 25 announcement ("just a hobby, won't be big and professional like gnu") already lists its edges: 386-only, "probably never will support anything other than AT-harddisks." The Oct 5 post for 0.02: "even usable (though may not be depending on what you want)" — runs bash, gcc, make, sed. It's the best one-slide preview of the known-issues list: a v0 that says what it can't do.

  Sources: [git's first commit](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290); [Git, Wikipedia — History](https://en.wikipedia.org/wiki/Git) (dates, 3-second target, 2.6.12); [Ronacher, *April 1st Post Mortem*](https://lucumr.pocoo.org/2010/4/3/april-1st-post-mortem/); [Flask, Wikipedia](https://en.wikipedia.org/wiki/Flask_(web_framework)); [Chandler, Wikipedia](https://en.wikipedia.org/wiki/Chandler_(software)) and [*Dreaming in Code*, Wikipedia](https://en.wikipedia.org/wiki/Dreaming_in_Code); [Linux history (CMU mirror of the posts)](https://www.cs.cmu.edu/~awb/linux.history.html).
- **The live debugging vignette** (§5, ~6 min) — **built:** `demos/session19-debugging/` (start at its README; the run sheet is `DEMO-SCRIPT.md`). `setup.sh` builds a local throwaway clone `~/repos/prop-loft-debug` on branch `demo/out-marker`: Prop Loft ahead of `session-18` with search, the checkout model (the conditional unique constraint), and the list's **Out marker** with a planted defect — the due-date subquery isn't tied to its item (`item=OuterRef("pk")` missing), so **one** admin checkout marks **every** item "Out · due Dec 5." All eleven tests pass (each test puts one item in the database), which is part of the lesson. The arc: the slice walked → the failure stated exactly (*every* row, *the same* date) → three hypotheses (data, display, query) → the cheapest first, and it's wrong (the admin shows one checkout) → one log line clears the template → `git log` + two lines of the view isolate it → a failing test pins it (`patches/regression-test.patch`) → the fix → 12 tests OK → the slice re-walked → the three-line debug log (`text/debug-log.md`). Nothing is pushed; the canonical repo isn't touched. *(Session 13's demo already used the search box's missing `.strip()`, so that bug was off the table.)* Run `setup.sh` before class and after every rehearsal.
- **Slides (built, 21):** title (1) · today (2) · the MVP is an instrument, Kniberg's three stages (3) · throwaway vs. evolutionary (4) · the honest middle, labeled corners (5) · the four questions (6) · **Prop Loft's sheet**, ranked need → usability → technical, falsifier from design §7 (7) · Prop Loft's cut (the list's Out marker, Session 18's named next cut) and corners, and why the setup guide stays (8) · workshop (9) · git (10) · Denied → Flask (11) · Prop Loft broad-shallow + the Chandler line (12) · the loop (13) · cheap tests (14) · **live:** the failure + three hypotheses, each killed on a click (15) · **live:** the failing test and the fix (16) · the chain walked backward (17) · the debug log + required-lite floor (18) · stuck + AI (19) · known issues, Prop Loft's first entry + Linux 0.02 (20) · wrap (21).

---

## Timed outline (≈75 min)

### 1. Framing — the MVP is an instrument — 5 min
- Kniberg's real point: each stage exists to **test a claim with something usable.** The question is never "how much can we build by Nov 18?" but "what will Nov 18 *prove*?"
- Connect to the slice statement: the slice is *what* you demo; today sharpens *why it matters.*

### 2. Throwaway vs. evolutionary — 8 min
- **Throwaway:** built to answer a question, then discarded — your Week-3 spikes were this. It's allowed to be ugly; it's not allowed to sneak into main.
- **Evolutionary:** built to keep — your MVP is this; it travels through PRs, meets your definition of done, carries your name into the audit.
- The honest middle: most projects throw away a *corner* (a mocked integration, a hardcoded config) inside an evolutionary whole. Fine — **if labeled.** An unlabeled mock is a future contributor's trap. Where the label goes: the known-issues list (§6).

### 3. "What must v1 prove?" — workshop — 20 min
- Hand out the **V1 Proof Sheet.** The prompt set, each project answering in writing:
  1. **The need claim** — what shows a real user's need is actually served? (Trace to CP2's success criteria.)
  2. **The technical claim** — which risk (Week 3's register) does v1 retire? What's the evidence?
  3. **The usability claim** — can the target user get through the slice unaided?
  4. **The falsifier** — what result on Nov 18 would tell you something's *wrong* with the idea? (If nothing could, v1 proves nothing.)
- Rank the claims; then the cut question: **name one thing you're building that proves none of these.** (Every project has one.) Move it to the roadmap. Then the corners: what's mocked, hardcoded, or temporary inside v1, and where is it labeled?
- Share-out: one claim + one cut per project, aloud (the sheet's last line).

### 4. Evaluate the examples — 12 min
- Apply the same four prompts to the prepared examples (prep table), fast, as a room: **git** first (which claim was ranked first, and what did Linus knowingly not build?), then **Denied → Flask** (the throwaway that answered the need question), then **Prop Loft broad-shallow** (run the four prompts and watch each come back empty), closing on the one-line **Chandler** echo.
- The evaluator's eye they're building here is the one that will judge *their* demo on Nov 18 — and their final demo in December.

### 5. Systematic debugging — the reasoning model — 20 min
- **The loop** (from today's reading, on the Debugging Loop Card): **say the failure exactly and reproduce it** → **hypothesize** (2–3, not 1) → **test the cheapest first**, not the likeliest (vary input, look at the data, one log line, the debugger, `git log`/`diff`/`bisect`, shrink the case) → **review** (dead? progress; standing? narrow until you can point to the defect, explain when it bites, and propose a fix) → **fix and verify** (failing test first; fix the defect, not the symptom; run everything; did it break the slice?).
- **Vocabulary payoff from Session 15:** you observe a **failure**; at runtime the program hits a **fault**; a **defect** in the code causes it; an **error** put it there. Investigate backward; hypotheses are guesses about where on that chain the defect sits.
- **Live vignette (~6 min, run sheet):** the planted Out-marker bug — including the wrong first hypothesis and the moment evidence kills it. Model *calm*. Close on the three lines.
- **The debug log** (three lines: what I saw · what I suspected · what it was): in the bug's issue, or the PR description if you hit it on your own branch. Cheap to write, gold at the audit and in the retrospective. **The floor (required-lite):** any bug that cost more than an hour, and any bug you don't fix yet.
- AI note (standing policy): AI can be a debugging aid — rubber-duck it, ask it for hypothesis candidates — but *you* verify with evidence; an unverified AI explanation is hypothesis number four.

### 6. Known issues — the preview — 3 min *(new in v2, taken from §6's wrap time)*
- **Why now:** CP10's *Documentation & honesty* criterion (10 pts) reads the repo at the Nov 18 freeze. Students who first hear "known issues" in Week 12 will have nothing for it.
- **What to start today:** `docs/known-issues.md` (the default; a README section is fine), linked from the README. One entry per item: what happens · when it bites · any workaround · link to its issue. Three sources feed it, all from today: the **throwaway corners** from the sheet, the **cut** if it leaves a visible gap, and **bugs you decide not to fix yet** (the debug log's "unfixed" case).
- One slide: Linux 0.02's announcement listing what it can't do (backup example) — a v0 that says so reads as honest; "no known issues" reads as "we didn't look."
- Don't teach the tech-debt half: that, and the full log's shape, is Session 23's, when it becomes part of CP11.

### 7. Wrap + before next class — 7 min
- Recap: v1 proves claims; label your throwaway corners; debug with a written loop; write down what doesn't work.
- **Wednesday (Nov 11):** **MVP-plan review** (structured peer pass on your MVP Plan) + the setup guide, written and cold-tested. **MVP Plan due Wednesday:** what's in / what's deferred / what technical risk it addresses / demo plan — one page; it's the slice statement + today's sheet, formalized.
- Reminder: **CP10 progress demo + repo audit is Nov 18** — one week of building left before a stranger reads your repo. CP10's handout and rubric are now on Canvas.

---

## Threads to carry forward

- The **claims ranking** becomes the demo script's spine (Nov 18) and the retrospective's "what did the MVP validate?" (Wk 13).
- **Labeled throwaway corners + debug logs** seed `docs/known-issues.md` now, which CP10 reads on Nov 18 and which grows into the **known-issues / tech-debt log** (Wk 12, CP11).
- The falsifier question returns in the final demo's Q&A — honesty about what wasn't proven.
- Debugging method + evidence discipline = the **Capable** strand under build pressure. Debug logs are also good CP9 bug-report material.

---

## Open questions / decisions before we flesh this out

- ~~**Example MVPs**~~ **resolved (v2):** git's first commit (evolutionary vertical slice), Denied → Flask (throwaway demand test), a synthetic broad-shallow Prop Loft (cautionary), Chandler as a one-line real-world echo, Linux 0.02 as backup and the known-issues slide. No past student work used.
- ~~**Prior-course debugging reading**~~ **resolved (v2):** replaced by `canvas_material/pages/Debugging-Reading.md` (the hypothesis → test → review loop and the three exit conditions — isolate, explain the circumstances, propose a fix — carried over and refreshed for this course; the ruby exercise dropped).
- ~~**MVP Plan handout**~~ **published:** `canvas_material/assignments/handouts/MVP-Plan.md.jinja`; the CP10 criterion it's graded on now matches the published rubric. **No separate printable of the handout:** the deliverable is a repo doc (`docs/mvp-plan.md`), and the V1 Proof Sheet is its paper draft (parts 3 and 4). Session 20's three-question review sheet is the next printable.
- ~~**Debug-log floor**~~ **resolved (Tom, Oct 24): required-lite** — a three-line log for any bug that cost more than an hour, and for any bug left unfixed (which then also gets a known-issues entry). Enforced only through evidence that's already graded (CP9's bug reports, CP10's *Documentation & honesty*), not a new criterion. The reading and the card say this.
- **Example sourcing check:** Chandler's account is from secondary sources (Wikipedia, Rosenberg's book); keep the slide to the one line.

---

## Deliverable / after class

- **Due Wed, Nov 11:** **MVP Plan** (one page: in / deferred / risk addressed / demo plan).
- Build continues; slice issues front of queue; debug log in force; `docs/known-issues.md` started.

---

## Appendix — classroom handouts (Session 19)

- **V1 Proof Sheet** (`canvas_material/resources/V1-Proof-Sheet.html` + `.pdf`, one page, one per student; §3–§4) — **built.**
- **Debugging Loop Card** (`canvas_material/resources/Debugging-Loop-Card.html` + `.pdf`, two half-sheets per page; §5) — **built.**
- **Reading:** *Debugging on Purpose* (`canvas_material/pages/Debugging-Reading.md`, Canvas page `pg-debugging-reading`) — **built.**
- **MVP Plan assignment:** `canvas_material/assignments/handouts/MVP-Plan.md.jinja` — **published.**
- **CP10 rubric** (for the horizon): the Assignment Rubrics page (Progress Demo + Repo Audit) — **published.**
- **Demo kit:** `demos/session19-debugging/` — **built**, tested end to end Oct 24 (reset, failing test, fix, 12 OK).

---

## Appendix — run sheet: evaluating the examples (§4, slides 10–12, 12 min)

Nothing runs live here: all three are slides. The move is the same on each, and it's what makes the 12 minutes work: **ask the prompt, let the room answer, then click to confirm.** Each slide's right column reveals one prompt per click (need → technical → usability → the fourth row), and a last click shows the lesson bar. Budget about 4 minutes a slide; if the room is slow, give the answer and click.

**Set it up (15 s, before slide 10):** "Same four questions you just answered for your own project. Now we're the evaluators. This is the eye that scores your demo on Nov 18."

### Slide 10 — git's first commit (~4 min)
1. Read the left card aloud: the date, the commit message (it gets a laugh), "about 1,200 lines, no friendly commands, no merging."
2. Ask **"What was the need claim?"** → they'll say "Linus needed version control." Push: *how do we know the need was real?* Click 1: it managed its own source the next day — the first user was the author.
3. Ask **"Which claim did he rank first?"** Most will guess "it works." Click 2: speed. A 3-second patch target, because the kernel's size was the whole problem.
4. Ask **"Was it usable?"** Click 3: deliberately not. Merging came on April 18.
5. Ask **"What did he skip?"** Click 4. Then click 5, the lesson. Close with: "Ten weeks later it managed a kernel release. The thin thing grew."

### Slide 11 — Denied → Flask (~4 min)
1. Read the left card. Ask first: **"Was this an MVP?"** (Nobody meant it as one. That's the point: it worked as a demand test by accident.)
2. Click 1 (need): people wanted a tiny framework — the numbers on the left are the evidence.
3. Click 2 (technical): none. Ask **"What would have happened if he'd kept the joke code?"** (A framework built on a prank.)
4. Click 3 (usability): the snippets *were* the product.
5. Click 4 (throwaway) and click 5 (lesson): you keep the answer, not the code — same as their spikes.
6. *If time:* Ronacher's post-mortem lesson was "don't be honest: be bold." Ask whether that survives a contributor who clones the repo. Let one person answer; don't settle it. It sets up the known-issues slide.

### Slide 12 — Prop Loft, built screen-first (~4 min)
This is the one that lands, because it's the project they've watched since Session 11 and the same hours as Session 18's plan.
1. **Frame it (30 s):** "Same project, same 20 hours, same Nov 18. Instead of the slice, the maintainer built the screens first: a styled search page, a styled item page, a styled checkout form. All three look great in a demo. There's no checkout model behind them." Leave the right column empty.
2. **Ask each prompt before its click**, and let them find the hole:
   - **"Can a volunteer find out who has the waistcoat?"** → no, nothing records a checkout. **Click 1.**
   - **"Does the database refuse a second checkout?"** → there's no table to refuse anything. **Click 2.**
   - **"Can a volunteer check one out unaided?"** → they can press the button; nothing happens. **Click 3.**
   - **"What result on Nov 18 could tell the maintainer they're wrong?"** → nothing, because nothing is being tested. **Click 4.** Say the line on the slide: *so it proves nothing.*
3. **The contrast (30 s):** "Session 18's version, with the same hours: plain pages, no styling, and a volunteer can find, open, and check out the waistcoat. Which one would you rather demo?" *Optional, if Prop Loft's board is open in a tab:* show M1's slice statement on the milestone page.
4. **Click 5, one sentence:** "This isn't a student mistake. Chandler was a funded open-source project with professional engineers, and it spent years building broad before anything was usable." Don't add detail: the sources are secondhand.
5. **Bridge to debugging (10 s):** "So: build the thin thing that proves something. And when the thin thing breaks — and it will this week — here's how to find out why." → slide 13.

**If you're running long:** take slide 11 in two minutes (clicks 1–5 without the aside), and keep slide 12 whole. It's the one that changes what they build this week.

---

*Student page: `canvas_material/lectures/session-pages/Session19-StudentPage.md.jinja` (published in args). Next step: click through the deck's reveals and do the PowerPoint render pass; rehearse the vignette once `session-18` is tagged (the kit builds on `docs/design-plain-forms` until then). Related: `Session18-Nov04-Outline.md`, `Session20-Nov11-Outline.md`, `CS301R-ProjectCreation_v4.md` (§7 Week 10).*
