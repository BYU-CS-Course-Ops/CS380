# Spikes — Buying a Cheap Answer to Your Scariest Unknown (Course Reading)

*A free, self-contained explainer written for CS 301R. Most articles on spikes are written for teams running sprints, where a spike de-risks a backlog item so it can be estimated. You're doing something a little different — deciding whether an idea is worth founding a whole project on — so this is the course's take, tuned to that moment. If you want the industry-standard framing, Mike Cohn's short article is linked at the bottom.*

---

## What a spike is

A **spike** is a **short, time-boxed investigation whose only deliverable is an answer** — not a feature, not shippable code. You run one when you're facing an unknown scary enough that you shouldn't commit until you've reduced it. The output is *knowledge and confidence*: "yes, the hard part is doable," or "no, not this way." The prototype you build to get that answer is usually **throwaway** — you're buying information, and the code was just the receipt.

The term comes from Extreme Programming, where a "spike solution" is a quick experiment to learn just enough to move forward. The instinct is old and good: **when you don't know, go find out — deliberately, and on a clock.**

## Why *you* need one right now

You've just rated your idea against the six feasibility risks and circled the one or two that could sink it. A spike is what you do with a circled risk instead of hoping it works out. Here's the leverage: **you don't have to build the whole thing to find out whether the hard part is possible.** You can answer "is real-time sync feasible for me, in the time I have?" in a day or two — long before you've sunk weeks into building everything *around* that hard part.

The alternative is the expensive path every builder has walked at least once: commit to the idea, build all the easy scaffolding first, and discover the fatal unknown late — when you're up against a deadline with no room left to change course. **The cost of a wrong assumption grows the longer it stays hidden:** found early, it's a cheap course-correction while you still have options; found late, it's a crisis with none. A spike deliberately drags that discovery as early as you can — to the point where changing direction is still easy. *(In a one-semester project, that's the difference between finding out in week 3 and finding out in week 10 — but the principle holds on any timeline, from a weekend hack to a multi-year system.)*

## The anatomy of a good spike

A spike that works has four parts. Miss any of them and it stops being a spike.

1. **One specific question.** Not "explore authentication" — a question with an answer you can actually reach: *"Can I get two browser tabs to share a live queue within one second, using a managed realtime service?"* Vague questions produce vague digging.
2. **A time box.** One to three days is typical; a few hours for a small one. The number is fixed *in advance* and it is the whole point. **A spike without a time box is research with no exit condition** — it runs until you're exhausted, consumes the time you needed for the actual build, and rarely hands you a clean answer.
3. **A green line and a red line, decided up front.** Before you start, write down what result means *"feasible — proceed"* (**green**) and what result means *"not this way — rethink"* (**red**). Deciding this beforehand is what keeps you honest when you're three energy drinks deep and tempted to call a mess "basically working."
4. **A throwaway bar.** You are answering a question, not shipping. The moment the answer is clear, you stop — even if the prototype is ugly, especially if it's ugly. Keep what you *learned*; you can throw the code away.

## Green, red — and why red is a win

- **Green** — the hard part worked inside the box. The risk is retired. You now build the real thing knowing the scary part is possible, and you've probably learned enough to build it well.
- **Red** — it didn't. **This is not failure; this is the spike doing its job cheaply.** A red spike, run early, tells you to **rescope, route around, or drop** while it costs almost nothing and you still have room to maneuver. Say your live-sync spike comes back red: that doesn't kill the project, it tells you real-time might be a nice-to-have you can fake with a five-second refresh for v1, with true live updates on the roadmap. You just turned "is this doomed?" into a scoping decision — and you made it while you still had time to act on the answer, not while staring down a deadline with no runway left.

The genuinely bad outcome is neither green nor red: **the spike with no time box**, where you dig forever and never force the question. Don't run those.

## Two flavors you'll meet

- **Technical spike** — *"Can this be built, by me, in a reasonable way?"* Feasibility of an approach or a tool. This is the one you'll use most in this course.
- **Functional (product) spike** — *"What does the user actually need here?"* Clarifies a fuzzy requirement before you design around a guess. In this course a lot of that "what" work happens in your discovery interviews, but the instinct — *investigate before you commit* — is the same.

## The join: your spike is also your learning

Here's the part specific to how this course works. When the scary unknown is a **skill you don't have yet**, your spike usually *is* the "build something" step of your learning plan. The throwaway prototype that proves the hard part is feasible is the same throwaway prototype that teaches you the skill. **One activity, two jobs:** it de-risks the project *and* closes the gap. That's why the spike sits in both your Feasibility & Risk worksheet and your Learning Plan — it's the hinge between them.

## Common mistakes

- **No time box.** The cardinal sin. Everything good about a spike comes from the clock.
- **A vague question.** "Look into it" is not a spike; "answer *this*, yes or no" is.
- **Gold-plating the throwaway.** Polishing code you're going to delete. You're buying an answer, not building a product.
- **Skipping it and hoping.** The circled risk doesn't go away because you looked away from it.
- **Spiking things that aren't actually risky.** Spikes cost time you could be building with, so only spike the risks you *circled*. Don't spike the parts you already know how to do.

## The one-line version

**A spike buys a cheap answer to your scariest unknown before you bet the project on it: one clear question, a fixed time box, and a green/red line you set in advance — and a red answer is a win, because it's cheap now and expensive later.**

---

## References

Written for CS 301R, drawing on:

- **Mike Cohn — [*What Are Agile Spikes? When and Why Do Teams Use Spikes?*](https://www.mountaingoatsoftware.com/blog/spikes)** (Mountain Goat Software). The clearest free, non-gated industry treatment — good on time-boxing and on *not* overusing spikes. Read this if you want the standard sprint-team framing alongside ours.
- **Gregory Engel — [*The Practice of Sizing Spikes with Story Points*](https://agilealliance.org/the-practice-of-sizing-spikes-with-story-points/)** (Agile Alliance, 2018). Argues that spikes should be **time-boxed rather than estimated**, so that a struggling spike shows up honestly instead of hiding in a velocity number — the reasoning behind rule #2 above.
- **Kent Beck — *Extreme Programming Explained: Embrace Change*** (Addison-Wesley). Origin of the "spike solution" — the idea of a quick, disposable experiment to learn just enough to proceed.
