**Download the template:** <file path="../resources/Design-Doc-Template.md" canvas_folder="Course Handouts" /> — a Markdown file. Save it into your repository as `docs/design.md` and fill it in there.

---

## Why a template

Most organizations that take design documents seriously have a template, and conforming to it is part of the job. A template does three things for the people around you. **Reviewers know where to look** — the alternatives are always in the same place, so a missing one is obvious. **Readers can compare documents** — two teams' designs line up section by section. And **the template remembers what you forget** — nobody skips the failure case when there is a heading waiting for it.

How formal that template is depends on the organization. At many software companies a design doc is an informal working document: a few pages, reviewed by teammates, updated when it stops being true. In regulated and safety-critical settings — aerospace, medical devices, government systems — the design document is a formal deliverable: signed off by named reviewers, placed under change control, and written partly to earn approval from management before money is spent. Both are design documents. They differ in how much process surrounds them, because the cost of getting the design wrong differs.

This template sits deliberately in the middle. The sections are the ones nearly every organization asks for. The **status line, revision history, and sign-off table** are lightweight versions of the formal machinery — enough to practice recording who reviewed a design and what changed, without the paperwork. *(In CS 301R, this is the required structure for <course-link type="assignment" id="cp5">CP5, the Design Document</course-link>, and each section maps to a criterion on its rubric.)* To see the formal end of that spectrum in a real artifact, the <course-link type="page" id="pg-formal-design-doc-example">NASA example</course-link> is a signed, change-controlled detailed design for a spacecraft mission's data system.

## Using it well

- **Keep every heading.** If a section genuinely doesn't apply, say so in one sentence and why. An empty heading reads as forgotten; a justified "not applicable" reads as a decision.
- **Replace the italic guidance** with your content. Delete the prompts once a section is written.
- **Decisions and trade-offs in; mechanics out.** No copied schemas, no pseudo-code for routine code, no pinned library versions. If a paragraph says *how you'll implement something* without saying *what you decided and why*, it probably belongs in the code, not the doc.
- **Alternatives considered is the heart of it.** Sometimes the alternatives were weighed in a conversation; sometimes someone did real work to settle the question — a benchmark, a prototype, a full trade study. When the decision rests on work, cite the work. *(Your CP3 spike is exactly this kind of evidence.)*
- **Diagrams must agree with the prose.** A component in the text that's missing from the diagram, or the reverse, is the most common defect in a first draft.

For a worked example to critique — written to this template, and deliberately imperfect — see the <course-link type="page" id="pg-sample-design-doc">sample design document</course-link>.

---

## The template

<include path="../resources/Design-Doc-Template.md" usediv="false" />
