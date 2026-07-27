# CS 301R — Follow-Up Items

Deferred decisions and work items surfaced during course development. Distinct from the
**pending decisions** in `CLAUDE.md` (which are Tom's calls awaiting a verdict) and the
**work queue** (which is scheduled build-out). Items here are *known gaps we chose not to
close yet* — each needs a decision or a build before the course runs.

Format: `**Item** — what it is · *why deferred* · what closing it would take.`

---

## Curriculum

- **Learning Plan Reflection artifact (Week 13).** The prior course graded a *reflection written after working the plan* (`open-source-project-course/modules/curious/learning.md`, "Learning Plan Reflection"), not the plan itself — the reflection is where the learning-to-learn outcome is actually assessed. The new course teaches the plan in Session 5 and never revisits it.
  *Why deferred:* raised 2026-07-23 while reconciling Session 5 against the prior course's Learning to Learn week; adding a graded artifact touches the weighting table, which isn't finalized.
  *To close:* decide graded vs. ungraded; if graded, place it in the Week 13 retrospective (v4 §7 Week 13 already notes *"[adapts: … Learning to Learn]"*), write the prompts (did your goals size right? was the schedule realistic? did you use your accountability partner? what did building teach you?), and reconcile the weight against `rubrics.md` and the syllabus grading table.

- **Self-directed learning as a course-wide strand.** v4 (lines ~122, ~250–251) describes an SDL strand "reinforced course-wide," but `learning plan` / `self-directed` appears only in Sessions 4, 5, 7 and CP3 — all inside Weeks 2–4. It disappears exactly when students start hitting real unfamiliar technology.
  *Why deferred:* surfaced 2026-07-23; fixing it properly means touching build-phase outlines that are otherwise complete.
  *To close:* add short SDL callbacks at 2–3 build-phase moments (first spike, first unfamiliar-dependency decision, the Week 13 retrospective) so the strand is real rather than declared.

- **Learning-to-learn readings — folded in, minor quality residual.** *Resolved 2026-07-24:* the prior course's readings are now Session 5 prior reading — `diygenius` self-directed learning plan (**required**; maps cleanly onto the §5 five steps), and `maestrolearning` learning curve + *Make It Stick* via HBLL (**optional**). Both blog links verified live and free/non-gated. Residual, if ever worth revisiting: both are lightly marketing-adjacent (diygenius has one sponsored ad; maestrolearning ends in product CTAs) — a course-authored replacement could remove even that, as was done for the spike reading. Not urgent; Tom chose to include them as-is.

---

## Instructional design

- **Session 5 / Session 6 timing is now tight on both sides.** Moving the richness check out of Session 5 (2026-07-23) freed 10 min there but pushed Session 6 to 81 min, absorbed by trimming §2 (8→7), §5 peer feedback (18→16), and §8 wrap (8→5). Session 6 has no slack left.
  *To close:* verify against the clock when the Session 6 deck is built; if it overruns, the peer-feedback round is the only section with real give (drop to groups of 3).

---

## Housekeeping

- **CP2 handout path is inconsistent.** Sessions 5 and 6 reference `assignments/Product-Definition-Brief.md`; the file on disk is `assignments/CP2-Product-Definition-Brief.md`.
  *To close:* one find-and-replace across the outlines once confirmed the CP2-prefixed name is the keeper.

- **Spikes reading — origin citation has no live link.** `resources/Spikes-Reading.md` References cites the term's origin to Kent Beck, *Extreme Programming Explained* (offline book) because every clean *online* origin source is broken: the c2 wiki "SpikeSolution" page is now a JS-only shell that renders no content, and `extremeprogramming.org` serves a mismatched SSL cert (cert is for `*.m3xs.net`), so it can't be safely linked. The two live citations in that reading (Cohn/Mountain Goat, Engel/Agile Alliance) were verified 2026-07-24; the Beck citation is book-only.
  *Why deferred:* Tom will poke into it later if a citeable online origin is wanted.
  *To close:* find a live, ad-free origin source for the XP "spike solution" (a stable c2 mirror, a recovered Wayback capture of extremeprogramming.org/rules/spike.html, or Beck's book via an HBLL/library link) and add it to the References section — or leave the book citation as-is.

---

*Add items here rather than losing them in conversation. When one closes, delete it and note the resolution in the affected file.*
