# Session 18 — Estimation, Sequencing & the Vertical Slice — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 18 of 27 · Wed, Nov 4, 2026 · 75-minute block**
**Prior prep:**
- **Bring:** your tracker with M1 fine-grained and M2 coarse-decomposed (from Monday).
- **Read (short):** **Henrik Kniberg — [*Making sense of MVP*](https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp)** — the skateboard picture, properly understood: deliver something *usable end-to-end* at every stage, not a pile of parts. (Assigned now because it drives today's slice-planning; it returns Monday for MVP thinking proper.)
**Maps to:** Design Week 9, Session B — *estimation & sequencing practice; plan the vertical slice for the MVP.*

> **Status: OUTLINE (v2) · deck built** (`canvas_material/lectures/powerpoint/Session18-SizeFitOrder.pptx`, 23 slides, `tools/build-session18.js`) · **Fit Check Sheet built.** A working session (Session B). Estimation is taught fast and practiced on each project's real backlog; the session's product is a **sequenced M1 with a committed vertical slice.** **CP8 Project Plan & Roadmap due end of today.** *v2: every demo runs on Prop Loft's real M1 and M2 issues (tag `session-17`, the canonical board); sizes are tied to the course week (S ≈ one sitting, L ≈ a whole week of one person's hours) instead of the v1 hour bands; the estimate → fit check → cut → sequence → slice statement chain is worked end to end on Prop Loft before students run it on their own.*

---

## Purpose of this session

A backlog without sizes and order is a wish list. Today has three jobs: **estimate** M1's issues (fast, honestly, without pretending to precision you don't have), **sequence** them (dependencies first, risk early, the slice always walkable), and **commit to the vertical slice** — the single end-to-end path (Kniberg's skateboard) that must work on Nov 18. The estimation skill matters less for the numbers than for the conversation it forces: the moment two people size the same issue differently is the moment a hidden assumption surfaces. *(Solo: size alone first, then have your review partner size the same issues cold from their text — an outside sizing surfaces the same assumptions, and an issue a partner can't size is missing something.)*

---

## Learning objectives

By the end of this session, a student can:

1. **Estimate work items relatively** (t-shirt sizes, anchored on finished work) and calibrate against the project's capacity.
2. **Surface hidden assumptions** through estimation disagreements.
3. **Sequence a milestone** — dependencies, risk-first, slice-always-walkable.
4. **Define the vertical slice** their Nov 18 demo will walk, end to end.
5. **Cut honestly** when the arithmetic says the milestone doesn't fit — and name the next cut before it's needed.

---

## Instructor prep / materials

- **Prop Loft at [`session-17`](https://github.com/prop-loft/prop-loft/tree/session-17)**, live on the canonical board (published Oct 29 — see the publishing checklist). Open in tabs: the board, milestone **M1 · Demo-able core**, and the three demo-round issues below. Issue numbers on the canonical repo follow the pull requests', so slides name issues by title.
- **Don't pre-size Prop Loft.** The board has no *Size* field yet; adding it, voting, and filling it in are done live (§2–§5), so the canonical board shows the after-state students check their CP8 against tonight.
- **The anchor:** Prop Loft's item list (commit *Show the catalog as a list of items* on `main`) — finished work, sized after the fact as **S**. Relative estimation needs one thing everyone agrees on.
- **The demo round — three M1 issues, each picked for what's hidden in its text.** How the room votes can't be predicted, so the plan is built on the **maintainer's sizes** (fixed, on the slide, revealed after the vote) and on what each issue hides, not on a guessed split. The room's vote is for the conversation; Prop Loft's tally and the cut use the maintainer's numbers whatever the room says.

  | Issue (M1) | Maintainer's size | What's hidden in it | The question that surfaces it |
  |---|---|---|---|
  | *Show an item's detail page* | **S** | Little: a good first issue with a *Where to start* is sizeable from its own text. It's the check on the anchor. | *"Bigger or smaller than the item list was?"* |
  | *Record checkouts, at most one open per item* | **M** | It reads like "one model, five fields," but the acceptance criterion says *the database refuses* a second open checkout — *a constraint, not just a form check* — because the design's strike-night observation had three volunteers returning items at once (design §6, the Postgres decision). That's a conditional unique constraint, a migration, and tests that expect the database to refuse, on SQLite in development and Postgres deployed. | *"What stops a second checkout of the same item?"* |
  | *Check an item out from its page* | **L** as the design reads, **M** with plain forms | Design §6 lists HTMX for partial updates; §7 says HTMX is new to both authors — *four-hour learning box; fall back to plain forms.* Whether a voter counted the learning box decides the size. This issue drives the cut in §3. | *"Did you picture HTMX or a plain form? Have you used HTMX?"* |

  **However the vote comes out, the move is the same — make the assumptions visible:**
  - **The room splits:** ask the lowest and the highest voter what they pictured. Usually they pictured different work; the issue's text settles which.
  - **The room agrees with the maintainer:** ask one voter to say what they pictured anyway. Agreement on the number can hide different work — if two people pictured different things and landed on the same size, the issue is still unclear.
  - **The room agrees, but not with the maintainer:** that's the split, between the room and the maintainer. Reveal the maintainer's size and ask the room what the maintainer must have been assuming, then ask the question in the table.
  - **Nobody can size it:** that's a finding too — the text is missing something a stranger needs. Ask what they'd need to know, and note it as an acceptance criterion to add.

- **The M1 tally — the maintainer's sizes**, on a slide after the demo round (sizes → hours per the §2 translation):

  | M1 issue | Size | ≈ hours | On the slice? | Needs |
  |---|---|---|---|---|
  | *Search items by name* | S | 2 | yes | — (already In progress) |
  | *Show an item's detail page* | S | 2 | yes | — |
  | *Record checkouts, at most one open per item* | M | 4 | yes | — |
  | *Show who has an item and when it's due back* | S | 2 | yes | the checkout model |
  | *Check an item out from its page* | L → **M** after the cut | 7 → **4** | yes | the checkout model, the detail page |
  | *Write a setup guide a newcomer can follow cold* | M | 4 | **no** — in M1 because contributors need it before the demo | a reader who didn't write it |
  | **Total vs. budget** | | **21 → 18** vs. **20** | | |

  Budget: Prop Loft has **one maintainer** (its communication norms say so) × ~10 h/week × 2 weeks = **20 h**. *(The maintainer isn't taking a class, so their honest number isn't the course's 7; the arithmetic is the same — count the hours that actually exist.)* 21 against 20 is "fits on paper," which means it doesn't: the written self-review every Prop Loft PR gets isn't counted. **The cut:** take the design's own fallback up front — plain forms for the MVP, HTMX revisited after it — which brings the checkout form to M and the total to 18, leaving 2 h for review. **The declared next cut**, if the Nov 11 check shows M1 behind: the list's "Out" marker (the first criterion of *Show who has an item*) moves to M2; the item page alone still walks the slice.
- **The M2 check, one slide** (coarse sizes, same budget): filters S 2 · empty-search message XS 1 *(a good first issue — counted anyway, because a contributor may not come)* · returns S 2 · overdue list M 4 · add an item M 4 · photo upload M 4 · HEIC spike S 2 = **19 of 20**. It fits with an hour to spare and no room for M1 to slip into it — so M2's next cut is named now too: filters go to the roadmap. Two **person dependencies** hide in M2 (the add-item form is co-designed with the wardrobe lead; the HEIC test needs a borrowed iPhone): book them now, not when the issue comes up.
- **Prop Loft's sequence** (§4 demo). **Ready** holds what can start now, in order; the top of **Backlog** holds what's next once its dependencies merge. (*Setting Up Your Board* §5: Ready means nothing it depends on is unfinished — so the order spans both columns.)
  1. *Search items by name* — already **In progress**.
  2. *Record checkouts* — **Ready, top.** The riskiest piece left once HTMX is cut, and the root of two dependency edges.
  3. *Show an item's detail page* — **Ready, second.**
  4. *Show who has an item and when it's due back* — **Backlog, top** (needs the model). **After this, the slice walks**, with the checkout entered through the admin: search → open → "out to Sam, due Dec 5." That's the skateboard, and it's the Nov 11 check.
  5. *Check an item out from its page* — **Backlog, second** (needs the model and the detail page). Turns the skateboard into a volunteer's flow. Opened only after the model merges, so two Ms are never in review at once.
  - *Write a setup guide* — **Ready, third**, and it runs **alongside**, not last: draft it in week one, and **ask the cold reader now and put a date on it.** A dependency on a person is still a dependency, and the reader's calendar isn't yours. (Prop Loft's guide lands by Nov 11 — the `session-20` state Session 20 uses.)
- **Prop Loft's slice statement**, written live into M1's milestone description (which today reads *"Find an item by name, open it, check it out, see it marked out. The progress demo."*):
  > *On Nov 18 we will demo: a wardrobe volunteer searches "waistcoat," opens the men's size M waistcoat, checks it out to an actor for the fall show, due back Dec 5, and sees it marked out to that actor.*
- **Live on Prop Loft, two moments** — step by step in the **run sheet** (appendix), with its before-class prep:
  - **§3, the design-doc PR** (~3 min): the cut is a design change, so it goes in through a pull request like any other — branch `docs/design-plain-forms`, already built locally (design §6 gains *Decision: plain forms for the MVP, HTMX later*; §4's Web UI row and §7's HTMX risk agree with it; the README's course-tags table gets the `session-18` row). Push, open, self-review, squash-merge, live.
  - **§5, the board** (~4 min, and the students' own steps): the Size field and sizes, the `slice` label, the sequence, the slice statement on M1.
  - After class, the merge commit is tagged **`session-18`**.
- **Slides:** sizes in one slide (with the anchor); the capacity arithmetic; the demo round (three issues, each with the maintainer's size revealed after the vote); the M1 tally and the cut; the M2 check; sequencing heuristics; the skateboard figure (with Kniberg's caveat that it's about *learning something usable*, not shoddy work); the slice-statement format with Prop Loft's.
- **Voting:** fingers, revealed together on "3-2-1": one finger XS through five fingers XL. No cards to print.
- Timer; students need laptops + their tracker.

---

## Timed outline (≈75 min)

### 1. Framing — estimates are conversations, not promises — 5 min
- Why estimate at all at our scale: to test whether M1 **fits** before Nov 18 tests it for you, and to force the assumption-surfacing conversation. On any team, the number gets forgotten; the "wait, you thought *what*?" doesn't.
- Honesty rule: estimates are internal planning tools. Padding them for looks or trimming them for optimism both defeat the point.

### 2. T-shirt estimation, demonstrated on Prop Loft — 12 min
- **The sizes, tied to the week** (one slide):
  - **XS** — under an hour: a label, a typo, a config line.
  - **S** — one focused sitting (≈2 h).
  - **M** — two or three sittings (≈4 h, about half a week of one person's outside hours).
  - **L** — a whole week of one person's hours (≈7 h). *Split it, or schedule it first.*
  - **XL** — more than a week. It's an epic; split it now.
- **Sizes are relative, so start from an anchor:** Prop Loft's item list is done, and it was an S. "Is this bigger or smaller than the list was?" is an easier question than "how many hours?"
- **The demo round** (prep table): the room votes each issue from its text, fingers revealed together; then the maintainer's size goes up beside the vote.
  - Whatever the vote, run the prep table's move: **ask what each side pictured** — the lowest and highest voter if the room splits, one voter if it agrees, the room versus the maintainer if they differ. Then ask the issue's question from the table.
  - **That conversation is the entire lesson:** a size disagreement — between two students, or between the room and the maintainer — almost always means different work was pictured, not that someone is bad at estimating. The issue text decides which work it is, or shows it needs another acceptance criterion.
  - On *Check an item out*, whatever the room's number, name HTMX as **risk, not size**: the size depends on whether you count the learning box. Park it for the fit check.
  - Keep it to about 2 minutes an issue; if one conversation is running long, that's the trap working — let it, and shorten the next.
- **The capacity arithmetic:** members × ~7 outside hours/week × 2 weeks (a solo founder: 14 h for M1; a team of three: 42 h), minus review overhead. Prop Loft's is 1 × ~10 × 2 = 20. Reveal the maintainer's tally: **21 against 20.**

### 3. The fit check and the cut, on Prop Loft — then yours — 18 min
- **Prop Loft first (~7 min, including the PR):** "fits on paper" isn't fitting — the self-reviews aren't in the 21. The cut takes the design's own fallback (plain forms; HTMX after the MVP) → 18. Then **name the next cut now** (the list's "Out" marker → M2), so that if Nov 11 shows M1 behind, the decision is already made and nobody argues about it under pressure. Close with the M2 check: 19 of 20, the next cut named, the two people booked.
  - Point out what the cut *didn't* touch: the slice. Cuts come from what's off the slice and from *how* things get built (the plain-form fallback), before they come from what the demo shows.
  - **A cut that changes the design gets written down where the design lives — so do it now (~3 min, run sheet A).** Push Prop Loft's prepared branch, open the PR so the room sees the template fill, show the §6 decision in *Files changed* (same shape as every other decision: chosen, alternative, why, evidence, what would change our mind), post the self-review, squash-merge. Then one comment on *Check an item out from its page* pointing at the merged PR: the issue's size changed because the design did.
- **Estimate your M1 (~11 min):**
  - Add the **Size** field to your board (prep, live board steps) — or your project's own scheme, with its reason in CONTRIBUTING.
  - Each member sizes every M1 issue silently, then reveal together and **discuss only the disagreements** (planning poker minus the theater). *Solo: size alone, then trade with your review partner — each sizes the other's M1 cold from the issue text. Where your partner can't size an issue, the acceptance criteria are missing something: fix them.*
  - Every **L** gets one question: *split it or schedule it first?* Every **XL** gets split now.
  - Tally against your budget. **If M1 doesn't fit, cut now** — move issues to M2, shrink acceptance criteria, take a fallback, or demote features to the roadmap. (The Session-8 narrowing moves, third appearance.) Then name your next cut.

### 4. Sequencing + the vertical slice — 12 min
- Heuristics, in order of force, each shown on Prop Loft's M1 (prep sequence):
  1. **Slice first:** identify the single end-to-end path (the Session-12 traced flow is exactly this) — UI → logic → data → back. That's the skateboard; it must be walkable *earliest*, then widened. *Prop Loft: after step 4 the slice walks with an admin-entered checkout; step 5 makes it a volunteer's flow.*
  2. **Dependencies:** what blocks what — draw only the real edges. *Prop Loft has three, all written in the issues' Context ("Needs …"): model → checkout form, detail page → checkout form, model → "who has it." Write the edges in the issues and the sequence follows from them.*
  3. **Risk early:** the scariest issue goes first, not last, while there's still time for it to be wrong (a Week-3 spike may already have de-risked it). *Prop Loft: once HTMX is cut, the database constraint is the scariest thing left — so the model goes second, right behind the search already in progress.*
  4. **People are dependencies too:** a cold reader, a user to co-design with, a borrowed phone. Ask now and put a date on it. *Prop Loft's setup guide is off the slice but runs alongside it, because its reader has a calendar.*
  5. **Review overhead is real:** two Ls in review at once stalls a small project — stagger. (Solo, your review partner is your only outside reviewer: stagger harder.) *Prop Loft never has both Ms in review: the form PR opens after the model merges.*
- Anti-pattern named: **broad-shallow** ("all the screens, none wired") — demos badly, proves nothing. The slice demos *itself*. *(Prop Loft's broad-shallow version would be a search page, a detail page, and a checkout form, all styled, with no checkout model behind them.)*
- **The slice statement**, shown on Prop Loft (prep): *"On Nov 18 we will demo: [user] does [end-to-end action] and sees [result]."* Specific enough to rehearse: a real search term, a real item, a real due date.

### 5. Sequence your M1 + commit the slice — 17 min
- **Watch it once (~4 min, run sheet B):** on Prop Loft's board — add the Size field and fill it in, create the `slice` label and put it on the five slice issues, order Ready and the top of Backlog, replace M1's description with the slice statement.
- **Then each project:**
  - Order the M1 backlog — Ready holds what can start now, in order, and the top of Backlog what follows once its dependencies merge; write any "Needs" edges into the issues that lack them.
  - Create the `slice` label and mark the slice issues.
  - Assign owners for the first week's issues; ask any person you depend on, today.
  - Write the **slice statement** in M1's milestone description. That sentence is the demo script and the M1 exit criterion.
- Instructor circulates with the one question: *"If the demo were tomorrow, what breaks first?"* — that issue goes earlier. (For Prop Loft, the honest answer is "the checkout form doesn't exist," and the sequence's answer is "the admin carries the slice until it does.")

### 6. CP8 finalize + wrap — 11 min
- CP8 checklist pass: milestones dated · M1 issues sized, sequenced, slice-labeled · slice statement on M1 · the fit check done and the cut made (if needed) · feature breakdown (epics) · labels incl. `good first issue` · definition of done revisited in `docs/git-standards.md` · roadmap-beyond-December written. Compare against Prop Loft's board as it now stands. Submit the board URL end of today.
- Recap: estimation surfaces assumptions; the fit check forces the cut early, while it's cheap; sequencing protects the slice; the slice statement is a promise to yourselves.
- Preview Monday (Nov 9): **MVP thinking** — what must v1 *prove*, evaluated on example MVPs — plus the debugging reasoning model, right before the heaviest build fortnight. Kniberg reading carries over.

---

## Threads to carry forward

- The **slice statement** = the **Nov 18 demo script** (CP10) — the plan and the demo are one commitment. Prop Loft's is the model.
- The **declared next cut** gets used or retired at the **Nov 11 check** (Session 20 studio time): is the skateboard walking?
- Estimation disagreements → assumptions → some become **known-issues/tech-debt entries** (Wk 12 log). Prop Loft's HEIC spike is the pattern: a result written in the issue, and in the known issues if it isn't fixed.
- `slice` labels + a sequenced Ready column make the **Week-11 audit** legible to outsiders.
- Cut-to-fit discipline returns at Week 10's "what must v1 prove?" and Week 13's honest retrospective.

---

## Open questions / decisions before we flesh this out

- ~~**Estimation vocabulary**~~ **resolved (Session 17 notes): t-shirt sizes + a "does M1 fit?" check.** On the GitHub Projects board, a single-select *Size* field (XS–XL) holds them.
- ~~**Slice label vs. milestone description**~~ **resolved by the CP8 handout:** both — the statement lives in M1's milestone description, and the slice issues carry a label.
- ~~**CP8 submission**~~ **resolved by the CP8 handout:** the public board's URL in Canvas; the roadmap and definition of done are read from the repo.
- **The size-to-hours translation changed from v1** (S ≈ 2–3 h, M ≈ 6–8 h, L ≈ 12+ h → S ≈ 2 h, M ≈ 4 h, L ≈ 7 h). The new bands tie L to one person's week, so "an L is a week of your M1" falls out of the arithmetic. The CP8 handout only says "sized (t-shirt or your chosen scheme)," so nothing else needs changing.
- ~~**Prop Loft's capacity**~~ **resolved (Tom, Oct 21): one maintainer × ~10 h/week.** It's what makes Prop Loft's M1 come out at "21 against 20, cut to 18" and keeps `docs/roadmap.md`'s line true for M2 (19 of 20). The roadmap now states the number ("…the hours one maintainer actually has this term, about 10 a week, two fit"), amended on the local `docs/roadmap` branch before the `session-17` publish.
- ~~**Does Session 18 leave a Prop Loft state?**~~ **resolved (Tom, Oct 21): yes, `session-18`, made live in class.** The design-doc PR is prepared on the local branch `docs/design-plain-forms` (in `publish.sh`'s stack between `docs/roadmap` and `docs/setup-guide`, which was rebased onto it); the board changes are by hand (run sheet). No `seed.sh` stage 18: a class copy at `session-18` gets stage 17's tracker and the board steps by hand.
- ~~**The Setting Up Your Board page doesn't mention a Size field**~~ **done:** §5 step 6 (the field, the sizes, the anchor, alternatives), and §4 step 3 points to it.

---

## Deliverable / after class

- **Due end of today:** **CP8 Project Plan & Roadmap** (tracker populated, estimated, sequenced; slice statement on M1; roadmap in repo; definition of done revisited in the git standards).
- Build begins in earnest: first slice issues in progress before Monday, and every person-dependency asked.

---

## Appendix — classroom handouts (Session 18)

- **Fit Check Sheet** (`canvas_material/resources/Fit-Check-Sheet.html` + `.pdf`, one page, one per student; §2–§5) — **built.** The five sizes with their hours and a line for the project's anchor; the budget (people × hours × weeks − review); a sizing table for the first milestone (mine · theirs · agreed · hours · slice? · needs) with the total and a three-way verdict (fits with room · fits on paper, which means it doesn't · doesn't fit); where we disagreed and what the acceptance criteria now say; the cut moves in order (off the slice, a fallback, shrink the criteria, defer) with the cut made and the next cut; the slice statement. A working copy, not a turn-in. *(v1 planned a half-sheet of sizes and arithmetic; the sizing table needs the full page.)*
- **Sequencing heuristics + slice statement format** (§4) — slides 16–19, with Prop Loft's sequence and statement.
- **CP8 rubric:** the Assignment Rubrics page (Project Plan & Roadmap).

---

## Appendix — Prop Loft run sheet (live in class)

Everything here happens on the canonical repo, `prop-loft/prop-loft`, in front of the room. Issue numbers there follow the pull requests', so find issues by title.

### Before class (by Tue, Nov 3)

1. **`session-17` is published and the board finished** (publishing checklist, Oct 29). Confirm the board has **no Size field** and no `slice` label yet.
2. **Put the PR branch on top of the published `main`.** The local `docs/design-plain-forms` sits on the pre-publish stack, so pushing it as-is would drag the earlier commits along. Replay its one commit instead:
   ```sh
   cd ~/repos/prop-loft
   git fetch origin
   git switch -C publish/docs/design-plain-forms origin/main
   git cherry-pick docs/design-plain-forms
   git diff --stat origin/main      # expect: README.md, docs/design.md — nothing else
   ```
   Don't push. Leave the local `docs/design-plain-forms` branch alone: `publish.sh` reads it.
3. **Add a table view for sizing** (filling 13 sizes on cards is slow): board **+ New view → Table**, **Group by: Milestone**, named *Plan*. The Size column appears in it once the field exists.
4. **Open in tabs:** the board; the *Plan* view; Issues filtered `milestone:"M1 · Demo-able core"`; M1's milestone page; `docs/design.md` §6 on `main` (the before); `demos/prop-loft-states/pr-bodies/docs__design-plain-forms.md` (the PR body to paste).

### A. The design-doc PR — §3, once the cut is decided (~3 min)

1. **Push** (from the clone, still on `publish/docs/design-plain-forms`):
   ```sh
   git push -u origin HEAD:refs/heads/docs/design-plain-forms
   ```
2. **Open the PR in the browser** — the *Compare & pull request* banner — so the room sees the template. Title: **exactly** the commit subject, *Build the MVP with plain forms, not HTMX* (`publish.sh` later recognizes the merge by it). Body: paste the prepared PR body over the template.
   *Command-line fallback:* `gh pr create -R prop-loft/prop-loft --base main --head docs/design-plain-forms --title "Build the MVP with plain forms, not HTMX" --body-file /mnt/c/Users/steph26/Documents/Classes/CS301R/CS380/demos/prop-loft-states/pr-bodies/docs__design-plain-forms.md`
3. **Files changed:** scroll to the new §6 decision; point out the revision-history row and the §7 row ("fallback taken"). This is what "write the cut down where the design lives" looks like.
4. **Self-review**, as a comment (Prop Loft's git standards: the maintainer's own PR gets one until there's a second maintainer):
   > Self-review: one logical change — the HTMX decision and the three places the design mentions it. The commit message follows the seven rules. No code, so no tests are affected, and nothing in `requirements.txt` pulls in HTMX, so there's nothing to remove. The README's link to the new §6 heading resolves.

   Then tick the last box in the PR body.
5. **Squash and merge.** Check that the title ends *(#N)*; keep the prefilled body. **Delete branch.**
6. **Comment on *Check an item out from its page*:** *"Sized M rather than L after #N: the MVP uses plain forms (design §6)."*

### B. The board — §5, "watch it once" (~4 min)

1. **Size field:** project **⋯ → Settings → + New field** → **Single select**, name **Size**, options **XS, S, M, L, XL** → **Save**. *(Command line: `gh project field-create <number> --owner prop-loft --name Size --data-type SINGLE_SELECT --single-select-options XS,S,M,L,XL`.)*
2. **Sizes,** in the *Plan* view:

   | M1 | Size | M2 | Size |
   |---|---|---|---|
   | Search items by name | S | Filter items by category and size | S |
   | Show an item's detail page | S | Say so when a search finds nothing | XS |
   | Record checkouts, at most one open per item | M | Record a return | S |
   | Show who has an item and when it's due back | S | List overdue items for the wardrobe lead | M |
   | Check an item out from its page | M | Add an item from a phone | M |
   | Write a setup guide a newcomer can follow cold | M | Attach a photo, downscaled in the browser | M |
   | | | Test iPhone (HEIC) photos end to end | S |

   Epics stay unsized: their sub-issues carry the sizes.
3. **`slice` label:** Issues → **Labels → New label**: name `slice`, description *On the path the progress demo walks*. Then the M1-filtered issue list: check *Search items by name*, *Show an item's detail page*, *Record checkouts…*, *Show who has an item…*, *Check an item out from its page* → **Label → slice**. (Not the setup guide: it's in M1, but off the slice.)
4. **Order** on the board: **Ready**, top to bottom — *Record checkouts*, *Show an item's detail page*, *Write a setup guide*. **Backlog**, top two — *Show who has an item…*, then *Check an item out from its page*. *Search* stays **In progress**.
5. **Slice statement:** Issues → **Milestones → M1 · Demo-able core → Edit**; replace the description with:
   > On Nov 18 we will demo: a wardrobe volunteer searches "waistcoat," opens the men's size M waistcoat, checks it out to an actor for the fall show, due back Dec 5, and sees it marked out to that actor.

### After class

1. **Tag the state:**
   ```sh
   cd ~/repos/prop-loft
   git fetch origin
   git tag -a session-18 origin/main -m "CS 301R Sessions 18-19: the plan, cut to fit (design §6: plain forms for the MVP; on GitHub: sizes, the slice label, the slice statement)"
   git push origin session-18
   git ls-remote --tags origin session-18
   ```
2. **Tidy the clone:** `git switch main && git merge --ff-only origin/main && git branch -D publish/docs/design-plain-forms`.
3. **Check** the README's `session-18` row and its §6 link resolve at the tag.
4. If the PR changed during class (an edit from a question in the room), the later `publish.sh` run for `session-20` may stop on a conflict when it replays the setup guide; resolve it there.

---

*Next step: write the Session 18 student page (args entry has its Materials; flip `Publish`); click through the deck's reveals and do the PowerPoint render pass; rehearse the run sheet's before-class steps once `session-17` is published. Related: `Session17-Nov02-Outline.md`, `Session19-Nov09-Outline.md`, `rubrics.md` (CP8), `demos/prop-loft-states/` (issue bodies in `issues/17-*.md`).*
