# Session 26 — Dry-Run Question Bank (instructor's copy)

**CS 301R · Session 26 (Mon, Dec 7, 2026) · reusable on Demo Day (Mon, Dec 14)**

> **Instructor-only.** Use it when the room's questions go soft. Ask **one per project** after the peers have asked theirs, picked to fit what the pitch left open. The aim is to rehearse the questions faculty will ask on Demo Day, not to catch anyone out. Students know the *kinds* of question to expect: the Session 25 wrap and the Session 26 student page say Q&A tests whether the demo, the retrospective, and the repository agree. They don't see this list. On Demo Day, offer a copy to visiting faculty who ask what to probe.

Every question here has a strong answer that's honest in either direction. "It held, and here's how we know" and "v1 didn't prove that; here's how we'd find out" score the same on CP12's *Q&A handling*. What scores low is deflection, or an answer the retrospective or the repository contradicts.

---

## 1. What need does this serve?

1. **Who, specifically, is the user?** Name one real person or role, not a demographic.
   *Strong:* a person they talked to, and what that person does today without the project.
2. **What evidence says the need is real, beyond your own experience?**
   *Strong:* discovery conversations, a user who tried the slice, or a persona honestly tagged `[E]`/`[A]`. *Weak:* "everyone has this problem."
3. **What do people use today instead, and why isn't it good enough?**
   *Strong:* names the workaround and its specific cost. Saying "nothing exists" is usually wrong, and faculty know it.
4. **Did anything in discovery change your mind about the need?**
   *Strong:* a concrete change, or "no, and here's what could have changed it."
5. **If you put this in front of your user tomorrow, what would they say first?**

## 2. What has been built?

6. **What exactly did that demo prove, and what was only shown?** (Session 22's proven-or-shown test.)
   *Strong:* separates the two without being asked twice.
7. **What doesn't the slice do yet that a user would expect?**
   *Strong:* names it plainly and points at where it's logged.
8. **Which of your first-version claims held, and how do you know?**
   *Strong:* cites the falsifier: what could have shown it wrong, and didn't.
9. **What was the hardest bug, and what did it teach you?**
   *Strong:* a cause in an assumption or a system, in the debug-log register.
10. **What breaks first at ten times the users, or the data?**
    *Strong:* a specific bottleneck and whether it matters yet. "Nothing" is a red flag.
11. **What did you cut, and was it the right call?**
    *Strong:* the cut, why, and the evidence for or against it since.
12. **If the live demo had failed just now, what would you have done?**
    Use this one only if the demo ran clean. It checks that the fallback exists.

## 3. Where does it go next, and how can others join?

13. **What's the first thing a new contributor would do in their first hour?**
    *Strong:* points at a real `good first issue` and the onboarding guide, not a promise.
14. **What did your onboarding tester trip on, and what did you do about it?**
    *Strong:* the specific stall, and that it's fixed or logged. This tests whether the retrospective agrees with the signed checklist.
15. **Why would someone choose to work on this rather than something else?**
16. **What's on your roadmap that you'd cut first if time got short?**
    *Strong:* has a ranking. *Weak:* "it's all important."
17. **Who responds to a pull request in February, and how fast?**
    *Strong:* a promise in the communication norms that they'll actually keep after the term.
18. **What does the next version need to prove that this one didn't?**
    *Strong:* consistent with the retrospective's "what the first version didn't prove."

## 4. Integration and the retrospective

19. **What did discovery find that visibly shaped what you built?**
    *Strong:* a direct line from a finding to a design decision.
20. **If you started this project over tomorrow, what would you do differently?**
    *Strong:* one process change and one product change, each actionable. Weak answers blame time.
21. **Which of your original claims was the biggest surprise, either way?**
22. **Your retrospective says [X]. How does that square with [what the demo showed]?**
    Use this only where you've read the retrospective and spotted a gap. It's the question faculty most often ask on Demo Day.

## 5. If the room goes completely quiet

23. **What are you proudest of, and what are you least sure of?**
24. **What would you tell someone starting this project from your repository in January?**

---

*Related: `Session26-Dec07-Outline.md` (instructor prep), `canvas_material/resources/Dry-Run-Score-Sheet.*` (the peers' sheet; its Q&A line records whether the hardest question was answered straight), `rubrics.md` (CP12 *Q&A handling*).*
