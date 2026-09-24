# Clean Architecture — what CS 340 taught them

*Context note · instructor-only · written Sep 2025 against `~/repos/softwaredesign`*

**The short version.** "Clean Architecture" is Robert C. Martin's (Uncle Bob's) book and
the layering scheme in it. CS 340 — **Software Design, the prerequisite for CS 301R** —
assigns three of its chapters early in the term and then makes students build to it all
semester in the Tweeter project. Every student in the room has read it, been quizzed on
it, and written code shaped by it. It is the closest thing they have to a shared idea of
"what an architecture is," so it is what they will reach for on Wednesday's whiteboards.

---

## Where they got it

**Course:** CS 340 Software Design (Rodham MW / Wilkerson TTh sections).
**When:** lesson 6 of ~34 — in Fall 2026, **Wed Sep 23**, week 4. Early, and quizzed.
It sits directly between *Modeling / UML* (lesson 5) and *User Interface Architecture*
(lesson 8), so in their heads it's part of one block about "how to describe a system."

**Assigned reading** — three chapters, via BYU's O'Reilly subscription:

| Chapter | What it argues |
|---|---|
| **15 — What Is Architecture?** | Architecture is about **keeping options open**. The architect's job is to leave as many decisions unmade, for as long as possible. Separates *policy* (the rules that make the software worth writing) from *detail* (database, framework, UI, delivery mechanism). |
| **20 — Business Rules** | Two kinds of policy: **Entities** (rules true regardless of software) and **Use Cases** (rules specific to this application). Both should be ignorant of how they're delivered. |
| **22 — The Clean Architecture** | The concentric-circles diagram and **the Dependency Rule**. |

**The Dependency Rule, which is the whole idea:** source-code dependencies point only
*inward*. Four rings, outermost to innermost — Frameworks & Drivers → Interface Adapters
→ Use Cases → Entities. An inner ring knows nothing about any outer ring. When control
has to flow outward, it crosses the boundary through an **interface the inner ring owns**.
Consequence, and the line students quote: **"the database is a detail."** So is the web,
so is the framework.

---

## What they actually own

Distinguish two things here, because they diverge — and the built version is the one
they reach for under pressure.

**Read:** three chapters and a quiz. The concentric diagram. Vocabulary.

**Built:** a semester of Tweeter, layered exactly this way —

- **Milestone 2** — the client in **MVP** (Model-View-Presenter; CS 340 teaches MVP
  specifically, and contrasts it with MVC and MVVM). Business logic lives in
  **presenters**, which talk to a **view interface**, never to a React component. They
  then unit-test presenters with mocks, which is the payoff the layering was for.
- **Milestone 3** — the server split into a **handler layer** (one Lambda per endpoint)
  delegating to a **services layer**. On the client, a **network layer** with a
  `ServerFacade` (façade pattern) so presenters never know a network exists.
- **Milestone 4A** — a **data access layer**: DAO interfaces that are explicitly
  *database-agnostic*, a DynamoDB package implementing them, and an **Abstract Factory**
  so "your Service classes should never call `new` to create a DAO." That assignment is
  the Dependency Rule made mandatory and graded.

Reinforced elsewhere in the same course: a four-step **dependency inversion** recipe
(extract an interface → depend on it → implement it → inject it), the Adapter and DAO/DTO
patterns, and the **Ten Design Commandments**, two of which are the Dependency Rule in
plain English:

> 7. Thou shalt depend on abstract interfaces rather than concrete types.
> 8. Thou shalt isolate the implementation of thy design choices, making it easier to
>    **repent of those choices** in the future.

Commandment 8 is worth memorizing. It is Martin's "keep options open" in one sentence,
and it is the best bridge I have into why a design doc argues alternatives.

---

## How to use it in CS 301R

**The lever.** Martin's argument — architecture exists to keep decisions reversible —
is *the same argument* as the design doc's **alternatives considered** and **"what would
change our mind."** They already believe the premise; I'm just moving it from code
structure to prose. Session 12, Round 5 is where to cash this in: *"CS 340 told you to
isolate a choice so you can repent of it later. Writing down what would change your mind
is the same move, one level up."*

**Expect the layer cake, and be glad.** When a team draws Web UI → Services → DAOs →
Database, that is CS 340 (and CS 240's chess) talking. It's a good default for a
five-week build and I should say so out loud. The gap isn't that they picked badly —
it's that they've **never picked at all**; both prior courses handed them the
architecture with the assignment.

**Two places leaning on it sends them wrong:**

1. **Round 1, the system-context diagram.** Clean Architecture is about the inside of
   one deployable unit. It has nothing to say about where the system *ends*, and it
   actively pushes the other way: to Martin, an external service is a detail to be
   hidden behind an interface. A context diagram wants the opposite — every external
   dependency named, outside the box, with a labeled arrow. A student reasoning from
   Clean Architecture in Round 1 will hide exactly what I'm asking them to expose.
2. **Round 2, components.** Martin's rings are a **layering**, not a decomposition by
   responsibility. "Three to six components, each with one job" is a different cut than
   "four concentric layers." A team that maps its whole system onto
   Entities/UseCases/Adapters/Frameworks has drawn a layer cake and called it a
   component diagram. Ask what each box *does*, in verbs.

---

## Caveats worth knowing

- **Three chapters of ~34.** They don't have the book's argument about component
  cohesion, coupling, or boundaries — just the rings and the rule.
- **Early and quizzed, then absorbed.** By December what they remember is "services,
  DAOs, presenters," not the diagram. Say the concrete words, not "the Dependency Rule."
- **They read Martin uncritically,** because the assignment didn't invite otherwise.
  Clean Architecture is opinionated and genuinely contested — the layering has real costs
  in small systems, which is exactly our situation. I can push back on it without
  contradicting a prerequisite; I just shouldn't assume they've heard any pushback before.
- **MVP, not MVC.** If I say MVC they'll follow, but MVP is the one they built.

---

## Vocabulary they may use

The Dependency Rule · entities · use cases · interface adapters · frameworks and drivers ·
policy vs. detail · "the database is a detail" · dependency inversion · abstract factory ·
DAO / DTO · façade · MVP, presenter, view interface · service class · database-agnostic
interface.

**Sources:** `~/repos/softwaredesign/instruction/software-architecture/`,
`.../design-principles/ten-design-commandments.md`,
`.../dependency-inversion-abstract-factory/`, `.../abstracting-dependencies-adapter-dao/`,
`.../ui-architecture/`, and `tweeter/milestone-{2c,3,4a}/`.
