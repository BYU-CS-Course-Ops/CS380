# Session 21 — Check-in & Troubleshooting Studio — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 21 of 27 · Mon, Nov 16, 2026 · 75-minute block**
**Prior prep:**
- **Bring problems, not polish:** your current blockers (technical, scope, team or process), your board, and the slice as it stands.
- **CP9 portfolio check:** you should have most of your 8 artifacts identified by now (2 bug reports · 1 feature request · 1 PR description · 2 review comments · 2 responses to feedback). Due **Wednesday.**
**Maps to:** Design Week 11, Session A — *short check-in; troubleshooting scope and technical direction.*

> **Status: OUTLINE (v1) · deck built** (`canvas_material/lectures/powerpoint/Session21-CheckInStudio.pptx`, 13 slides, `tools/build-session21.js`) · **Repo Audit Sheet built** (`canvas_material/resources/Repo-Audit-Sheet.pdf`). §5 may change once Session 22 is reviewed. Minimal lecture by design (v4: "studio critique" week). A short structured check-in, then the whole session is triage and coached studio — the last working session before **Wednesday's CP10 demo + repo audit and CP9 portfolio.**

---

## Purpose of this session

Two days before the progress demo, the worst thing class time could be is a lecture. Today is a **working session with structure**: a fast public check-in that makes each project's true state visible (to themselves, mostly), instructor-led triage of the scope and technical problems that check-in surfaces, and studio time where the fixes happen with help on hand. The founder skill being exercised is **honest mid-course assessment** — seeing clearly where you are, cutting what must be cut *now* rather than Wednesday morning, and asking for help while it can still change the outcome.

---

## Learning objectives

By the end of this session, a student can:

1. **Report project state honestly and fast** — done / at-risk / blocked, no theater.
2. **Triage under a deadline** — scope cut vs. push-through vs. fallback, decided deliberately.
3. **Re-scope a demo two days out** without hiding the change (the plan is amended, not fudged).
4. **Finalize audit readiness** — the repo a stranger meets Wednesday is main as it stands.

---

## Instructor prep / materials

- **The check-in format** (below §2) posted; strict timer.
- **Wednesday's run of show** ready to announce (demo order, timing, what "bring" means). Audit pairings are set at the start of Session 22 from attendance.
- **Audit sheet preview:** the **Repo Audit Sheet** (`canvas_material/resources/Repo-Audit-Sheet.pdf`, one page), linked from the CP10 handout. Bring a few printed copies to pass around during slide 9. Its four parts: get it running (six setup steps, each marked *as written · guess / workaround · step wrong or missing · couldn't*, with minutes); find your way (the project in one sentence, a good first issue located in the code); read the history (six checks); a stall log; and the one thing that most stopped the auditor. The four results line up with the rubric's *Repo audit* levels without the auditor scoring anything.
- **The blocker board, introduced today:** a whiteboard column, *Blocked > 30 min*, one line per blocker with the project's name. It starts here, the first full studio session, and stays up in every studio session after (Weeks 11–13). Pre-load anything you noticed in the MVP Plans, repos, and Session 20 cold-test issues over the weekend.

---

## Timed outline (≈75 min)

### 1. Framing — 3 min
- Today exists to make Wednesday boring (in the good way). Honest state now → deliberate choices → no Tuesday-midnight surprises.
- **Introduce the blocker board.** Anything that has stopped you for more than 30 minutes goes on it: one line, your project's name. It's not an admission of falling behind; it's the queue. Being stuck in private costs an hour, and on the board the instructor works the queue in order and spots when two projects hit the same wall. The check-in fills it today; from here on, in every studio session, you add to it yourself.

### 2. Lightning check-in — every project, 2 minutes, timed — 15 min
- Format (posted; no slides allowed):
  1. **The slice you'll demo:** the path in the slice statement on your first milestone (Session 18), which is what Wednesday's demo walks. Does it work end to end today? (yes / almost / no)
  2. **M1 state:** done vs. remaining (numbers, not adjectives).
  3. **Top blocker** (one).
  4. **The cut we're considering** (every project names one — normalizes cutting).
- Instructor writes the blockers and cuts on the board as they're said — that's the triage queue.

### 3. Triage — the board, worked aloud — 12 min
- Group the blockers: technical (worked in studio — see §4), scope (decide *now*: cut, shrink acceptance criteria, or fallback), demo-mechanics (assign to the fallback pattern), team/process (take offline with instructor).
- For each scope decision, the two-question test: *does keeping it prove one of your v1 claims? does cutting it break the slice?* If no/no — cut, amend the MVP Plan (visibly — that's honesty, not failure), move on.
- One theme to name if present: the project that's *ahead* — redirect them to audit-readiness polish (setup guide freshness, README truthfulness) rather than new features.

### 4. Studio — coached build + audit readiness — 40 min
- Build; the instructor works the blocker board in triage order. On technical blockers the role is **coach, not fixer** (with four projects, overlap between them is unlikely and the stacks vary): *what have you tried? what's the cheapest next test* (Session 19's debugging loop)? *who outside would know* — the library's issue tracker, its docs, a forum? *is it worth a cut or a fallback instead?* A higher-level perspective is often what unblocks someone.
- **Audit-readiness pass** (every project, before leaving, ~10 min of the block):
  - Fresh-clone test *one more time* on main (Wednesday's Session 20 cold test, now stakes-adjacent) — setup guide still true?
  - Board truthfulness: does "In progress" mean in progress *today*? Stale board reads badly in an audit.
  - The `good first issue` items: still real, still approachable?
  - README first paragraph: still describes what the project actually is this week?
- **CP9 assembly corner:** anyone missing portfolio artifacts uses studio time to finish/collect them (there are legitimate ones everywhere: this week's PRs, the demo-path issues, review responses).

### 5. Wrap — Wednesday's run of show — 5 min
- Announce: demo order, timing (whole-room demos 9 min each: 6 to demo, 2 of questions, 1 to swap; audits: everyone at once, each project auditing its partner's repo while the partner audits theirs), and the deliverable mechanics (CP9 via LMS; CP10 evidenced live + repo state).
- Tonight through Tuesday: finish the slice, **tag `cp10` and push it by 11:59 pm Tuesday** (and paste its URL in Canvas), rehearse the demo once from the tag, fallback included.

---

## Threads to carry forward

- The **cuts made today** appear in the Week-12 known-issues/tech-debt log and the Week-13 retrospective ("what we deliberately didn't do") — deliberate cuts are *content* for those artifacts, not embarrassments.
- **Freeze-by-tag discipline** previews release habits (launch package, Wk 13).
- Honest check-in format returns as the retrospective's raw material.
- The **blocker board** stays up in every studio session through Week 13; students add to it themselves after today.
- Audit-readiness = the contributor-ready thread, one week before it's graded.

---

## Open questions / decisions before we flesh this out

- **Check-in visibility:** public to the room (recommended — normalizes honesty and cuts) vs. per-project with instructor only.
- ~~**Demo group size Wednesday**~~ **resolved (Tom, Oct 24): by enrollment** — whole room for this term's four projects; small groups above about six.
- ~~**Freeze deadline**~~ **resolved (Tom, Oct 24): freeze by tag** — `cp10` pushed by 11:59 pm the night before; the demo, the audit, and grading all read the tag.

---

## Deliverable / after class

- No new deliverable today. **Due Wed, Nov 18:** **CP10 Progress Demo + Repo Audit** (live) and **CP9 Technical Communication Portfolio** (LMS).

---

## Appendix — classroom handouts (Session 21)

- **Lightning check-in format** (§2) — slide
- **Repo Audit Sheet** (preview) — `canvas_material/resources/Repo-Audit-Sheet.html` + `.pdf`, one page; on Canvas via the CP10 handout
- **CP9 + CP10 rubrics:** `rubrics.md`

---

*Next step: finalize Wednesday's demo order and run of show (audit pairings are set Wednesday from attendance). Student page written (`canvas_material/lectures/session-pages/Session21-StudentPage.md.jinja`, marked to publish, with the Repo Audit Sheet, CP10, and CP9 under Materials); it links the Session 22 page, which must be published before Nov 16. Deck built (13 slides: title · today · the blocker board · lightning check-in · triage · the scope test · studio · audit-readiness pass · the audit sheet · the audit rules · Wednesday's run of show · freeze by tag · wrap). Related: `Session20-Nov11-Outline.md`, `Session22-Nov18-Outline.md`, `rubrics.md` (CP9, CP10).*
