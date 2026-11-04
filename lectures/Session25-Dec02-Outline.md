# Session 25 — Launch Studio: Assemble the Package, Test the On-Ramp — Lecture Outline

**CS 301R · Software Engineering Studio I: Founding an Open-Source Project**
**Session 25 of 27 · Wed, Dec 2, 2026 · 75-minute block**
**Prior prep:**
- **Bring:** the launch punch list (tracker), retro prose drafted from Monday's stubs and claims-check worksheet (plus your individual reflection), and a repo whose main is in demo shape.
- **Checklist in hand:** the contributor-readiness checklist (five needs) — it's today's test script.
**Maps to:** Design Week 13, Session B — *studio: assemble the launch package; draft the retrospective* — **plus the absorbed Week-12 Session B: peer onboarding test round 2** (folded here when Thanksgiving took Nov 25).

> **Status: OUTLINE (v1, synced Nov 2** with decisions made in Session 24's review: two-part retrospective, verdicts not graded, CP12's `cp12-demo` tag by Thu Dec 10, no peer evaluations this term**).** A shipping studio. Three products leave today done: the **Launch & Onboarding Package** (assembled, in-repo), the **retrospective** (finalized), and a **passed onboarding test round 2**. **CP11 Launch Package + Retrospective due end of today.**

---

## Purpose of this session

Assembly day. Everything the launch package needs already exists in some draft — today it becomes a coherent, honest, in-repo package a stranger could pick up in January. The quality gate is **onboarding test round 2**: one more cold-eyed classmate walks your five-needs on-ramp (the Week-11 audit's successor, folded in from the lost Thanksgiving session), and what they trip on gets fixed *today* or documented in known-issues *today*. Nothing ships undocumented; nothing documented is untrue. That's the launch bar.

---

## Learning objectives

By the end of this session, a student can:

1. **Assemble a complete launch package** — architecture, setup verification, roadmap, known-issues, onboarding — as merged repo artifacts.
2. **Run and pass an onboarding test** — and triage its findings (fix now vs. document honestly).
3. **Finalize a retrospective** that agrees with the repo it describes.
4. **Declare launch-done** against an explicit checklist rather than a feeling.

---

## Instructor prep / materials

- **Onboarding-test pairings** (fresh eyes — *not* the Week-11 auditor; rotate pairs so each repo gets its second stranger).
- **The contributor-readiness checklist** (from Session 23) printed as the test script.
- **The CP11 completeness checklist** posted: the six package items (including the test a newcomer can run) + the retrospective with each member's reflection, all merged/submitted.
- Rove hard; today's blockers are small and numerous. CP11 mechanics (decided Nov 4): the retrospective is merged as `docs/retrospective.md` and tagged with the package; each student's Canvas text entry carries the tag URL, their private reflection, and a photo of the signed checklist.

---

## Timed outline (≈75 min)

### 1. Standup — punch-list triage — 6 min
- Each project, 60 seconds: what's left on the punch list, who's on what, and what they want from the onboarding test.
- The day's rule, stated once: **fix it or log it — silence is the only failure.** (Known-issues honesty from Session 23, now operational.)

### 2. Assembly block 1 — 22 min
- Heads down on the package, in priority order: onboarding guide current → architecture overview matches as-built (refresh the Week-6 diagrams; delete what you didn't build) → roadmap framed as invitation (Monday's §3.4) → known-issues log ingests the cut list, throwaway corners, and any open audit findings.
- Everything via PR, reviewed — the process ships with the project. Retro finalizers work in parallel where the package doesn't need them.

### 3. Onboarding test round 2 — 22 min
- New pairings; the tester runs the **five-needs script** on the host repo, out loud, host silent:
  - *What is this?* (README, 60 seconds, explain it back) → *Am I welcome?* (CONTRIBUTING/CoC tone) → *How do I start?* (setup, followed exactly) → *Where do I start?* (pick a `good first issue`, locate the code) → *Will anyone respond?* (norms stated? credible?)
  - Tester marks each need **pass / stall / fail** with one line of why; signs the sheet (CP11 evidence, same as Week 11).
- Hosts capture; no rescuing. If time allows, reverse the pairing; else the reverse test completes by end of day.

### 4. Assembly block 2 — fix or log — 15 min
- Triage the test findings on the spot: quick fixes merged now; everything else becomes an honest known-issues entry or a labeled starter issue (a newcomer-facing gap can *be* a `good first issue` — that's the system working).
- Retro cross-check (the Monday thread): does the retrospective agree with what the test just showed? A retro that claims "smooth onboarding" over a failed setup step gets rewritten *now*. The cross-check runs both ways: a claim that held stays held if the evidence supports it — nobody manufactures a setback to look reflective (CP11 grades the evidence, not the verdict).

### 5. Ship it — CP11 submission — 7 min
- Run the CP11 completeness checklist aloud per project: architecture ✓ setup-verification (test sheet) ✓ roadmap ✓ known-issues ✓ onboarding guide ✓ test ✓ retrospective + reflection ✓ — `docs/retrospective.md` merged, tag `v0.1-launch` pushed, then each student submits the tag URL + reflection + checklist photo on Canvas.
- The moment deserves naming: **the project is launched.** What remains is telling its story well.

### 6. Wrap — Week 14 — 3 min
- **Mon Dec 7: dry-run** — full final pitch (9 min) + live demo, peer-scored against the three questions; bring it performance-ready, not draft-ready.
- **Wed Dec 9: final studio** — polish only. **Thu Dec 10, 11:59 pm:** `cp12-demo` tag pushed (last day of classes) — Demo Day runs from it.
- **Demo Day: Mon, Dec 14, 8:30–10:00 AM.**

---

## Threads to carry forward

- **CP11 ships today**; Demo Day (CP12) presents it — the package is the "where does it go next" answer made tangible.
- The signed test sheets join the Week-11 audit sheets as the **contributor-readiness evidence trail.**
- Fix-or-log discipline is the professional habit the course wants to survive the semester.
- Tagged repo = the artifact capstone faculty (and future employers) actually browse.

---

## Open questions / decisions before we flesh this out

- ~~**Repo tag convention**~~ **resolved:** `v0.1-launch` for CP11 (in the handout); `cp12-demo` for Demo Day (CP12, by 11:59 pm Thu Dec 10).
- **Reverse-test logistics:** in-class if pacing allows vs. by end-of-day — same decision as Week 11; recommend end-of-day.
- **Late-package policy:** CP11 has downstream dependents (dry-run Monday) — confirm the revision window from the syllabus applies here in compressed form.

---

## Deliverable / after class

- **Due end of today:** **CP11 Launch Package + Retrospective** (retrospective merged; repo tagged; tag URL, reflection, and checklist photo on Canvas).
- **Mon, Dec 7:** dry-run — full pitch + demo, performance-ready.

---

## Appendix — classroom handouts (Session 25)

- **Onboarding test script:** the contributor-readiness checklist (Session 23)
- **CP11 completeness checklist** — slide + half-sheet
- **CP11 rubric:** `rubrics.md`

---

*Next step: set fresh test pairings; build the Session 25 deck (minimal) and student page. Related: `Session24-Nov30-Outline.md`, `Session26-Dec07-Outline.md`, `rubrics.md` (CP11).*
