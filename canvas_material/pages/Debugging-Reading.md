*A free, self-contained explainer written for CS 301R. You already know how to use a debugger; this is about the reasoning around it, the part that decides whether a bug costs you one hour or five. The free sources it draws on are linked at the bottom.*

---

## Why method beats knowledge

Every programmer has lost an evening to a bug that turned out to be one line. Looking back, the time rarely went into not *knowing* something. It went into changing things at random, rereading the same code hoping it would look different, and believing a guess for an hour before checking it. The difference between a one-hour bug and a five-hour bug is usually **method**: a deliberate loop of guessing, checking, and writing down what you learned.

The loop is the scientific method, applied to a program. That isn't a metaphor. A bug is a fact about the world you don't understand yet, and the way to understand a fact is to form a hypothesis, predict what you'd see if it were true, run the cheapest experiment that could prove it wrong, and let the result decide.

## The loop

### 0. Say the failure exactly, and make it happen on demand

Before any hypothesis, write down **what you expected and what actually happened**, as precisely as you can: not "the list is broken" but "after one checkout, every item in the list says *Out, due Dec 5*." The precise description is your first piece of evidence. Notice the details (*every* item, *the same* date): they are clues.

Then **reproduce it**: find the steps that make it happen every time. A bug you can trigger on demand is half solved. A bug you can't reproduce is your first problem, and the next steps are about narrowing the conditions until you can.

*(This is the same discipline as a good bug report: steps to reproduce, expected versus actual. A precise report written for someone else is also the best start on a bug you're fixing yourself.)*

### 1. Hypothesize: two or three, not one

From the failure, ask: **what could produce exactly this?** Generate two or three candidates, each naming *where* the problem could be. Recall the chain: a programmer's **error** puts a **defect** in the code; when it runs, the defect causes a **fault** inside the program; the fault shows up as a **failure** you can see. You observe the failure, so each hypothesis is a guess about where along that chain the defect sits: the data? the display? the query? the configuration? the input?

Why more than one? Because the first idea that comes to mind feels true, and a single hypothesis turns debugging into an attempt to prove yourself right. With three on the page, you're choosing between them, and evidence does the choosing.

### 2. Test cheaply, cheapest first

For each hypothesis, ask: **what's the cheapest thing I could do that would prove it wrong?** Then run the cheapest test first, not the test for the hypothesis you happen to believe. A thirty-second check that kills a hypothesis is worth more than an hour confirming a favorite.

The cheap tests are few and reliable:

- **Vary the input.** Does it fail for every value, or only some? Empty, one, many? Only the first time?
- **Look at the data.** Is what's stored what you think is stored? Check it directly, in the database, the file, the admin screen.
- **Add one log line** where two hypotheses diverge, printing the value one of them says is wrong. Evidence beats belief.
- **Use the debugger** to stop at that line and inspect the state, when one print isn't enough.
- **Ask what changed.** If it worked yesterday, `git log` and `git diff` narrow the search to what's new. For a long history, `git bisect` finds the commit that broke it by binary search.
- **Shrink it.** Cut the failing case down, in a scratch file or a test, until removing anything more makes the failure disappear. What's left is the defect's neighborhood.

### 3. Review: a dead hypothesis is progress

After each test, update. **Dead?** Cross it out, say so, and move on. You didn't waste the time: one place the defect isn't is real information. **Still standing?** Keep narrowing until you can do three things: **point to the defect**, **explain the conditions** that make it cause the failure, and **propose a fix**. If you can't yet explain why the failure looked exactly as it did, you haven't finished isolating it, even if you've found something suspicious.

### 4. Fix and verify

- **Write a failing test first.** A test that fails for the right reason proves you understand the bug, and it stays in the suite so the bug can't come back quietly. Ask, too, why the existing tests missed it: the answer often names a whole class of case nobody checked.
- **Fix the defect, not the symptom.** Hiding the failure (catching the exception, special-casing the bad value) leaves the defect in place for the next person.
- **Run everything**, not just the new test, and then walk the feature by hand. **Does the fix break anything that used to work?**
- **Clean up** the log lines and scratch code you added along the way.

### 5. Write it down: the debug log

Three lines, where the next person will find them:

- **What I saw:** the failure, precisely.
- **What I suspected:** the hypotheses, including the wrong ones, and the evidence that settled each.
- **What it was:** the defect, the fix, and the test that now covers it.

If someone reported the bug, the log goes in their issue. If you hit it on your own branch, it goes in the pull request's description. It takes two minutes, and it pays back three ways: the next person to see the same failure finds it with one search; a reviewer can check your reasoning, not just your diff; and when you look back over a project, the debug logs are an honest record of where the time actually went. *(In this course, keep one for any bug that cost you more than an hour, and for any bug you decide not to fix yet.)*

A bug you decide not to fix yet doesn't disappear. It becomes a **known issue**: a short, honest note a newcomer can read before they trip over it (see *Bugs you don't fix*, below).

## When you're stuck

- **Time-box it.** Pick a limit before you start (an hour is common). When it runs out, change something: step away, explain the problem out loud, or ask someone. Stuck isn't failure; staying stuck alone is a choice.
- **Explain it to a duck.** Saying the problem out loud, step by step, to anyone (a rubber duck works), forces you to state assumptions you've been skipping. Often the bug is in the step you were about to skip.
- **AI is a tool, not an oracle.** An assistant is good for generating hypothesis candidates, explaining an unfamiliar error message, or suggesting a cheap test. But an explanation you haven't checked against evidence is just a confident guess. Treat its answer as hypothesis number four, and test it like the others.
- **Check your trust.** It's usually your code, but not always. Libraries, documentation, and configuration can be wrong too, and "that part can't be the problem" is a hypothesis like any other.

## What doesn't work

- **Shotgun debugging:** changing several things at once until it works. You won't know which change mattered, or what you broke.
- **"It works now."** If you can't say why it stopped failing, it will be back.
- **Fixing before understanding.** The fastest-looking route is usually the slowest.
- **Debugging from memory.** Run the experiment. The program is right there.

## Bugs you don't fix

Every project ships with bugs it knows about. Founders and maintainers who are trusted are the ones who **say so**: a short known-issues list in the repository, each entry giving what happens, when it bites, any workaround, and a link to its issue. To a newcomer, an honest list reads as a project that tells the truth; a project that claims to have no known issues reads as one that hasn't looked. *(In this course, that list starts as `docs/known-issues.md` during the build and grows into the known-issues and tech-debt log in the launch package.)*

## The one-line version

**Say the failure exactly, guess more than once, test the cheapest guess first, let evidence kill the wrong ones, pin the defect with a failing test before you fix it, and write three lines so nobody has to do it twice.**

---

## References

Written for CS 301R, drawing on:

- **Andreas Zeller — [*Introduction to Debugging*](https://www.debuggingbook.org/html/Intro_Debugging.html)**, from *The Debugging Book* (CISPA, free online, CC BY-NC-SA). The scientific method applied to debugging, with a worked example: finding, testing, refining, and refuting a hypothesis. The best free long treatment.
- **Julia Evans — [*A debugging manifesto*](https://jvns.ca/blog/2022/12/08/a-debugging-manifesto/)** (2022). Eight short attitudes that keep a debugging session productive, including "inspect, don't squash" and "being stuck is temporary."
- The error → defect → fault → failure vocabulary follows **IEEE Std 1044**, *Classification for Software Anomalies*.
