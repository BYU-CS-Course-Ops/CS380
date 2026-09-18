**The document:** <file path="../resources/SAE_Database_Design.pdf" canvas_folder="Course Handouts" /> — *LAT SAE Database System Detailed Design*, document **GSSC-0012**, NASA Goddard Space Flight Center, 64 pages. It is one of the Fermi Science Support Center's [publicly baselined documents](https://fermi.gsfc.nasa.gov/ssc/dev/baselined_documents/), and your instructor wrote it.

*Optional. Nobody is asking you to read 64 pages — look at the pages named below and notice the **shape** of the thing.*

---

## Why this is here

The course reading, [*Design Docs at Google*](https://www.industrialempathy.com/posts/design-docs-at-google/), says design docs are informal: a few pages, no fixed format, updated when they stop being true. That is accurate for a great deal of software work, and it is what the <course-link type="page" id="pg-design-doc-template">course template</course-link> is built for.

It is not the whole picture. In aerospace, medical devices, defense, and government systems, the design document is a **formal deliverable**. It carries a document number. Named reviewers sign it. It goes under change control, so you can tell what the design said on the day a decision was made. And it is written partly to **earn approval from management before money is spent** — a design review is a gate, not a conversation.

Same genre, wildly different amount of process. The difference isn't bureaucracy for its own sake: this system served science data for a spacecraft mission expected to run for decades, operated by people who would arrive years after the authors left. When the cost of a wrong design is high and the document will outlive its authors, the process around it grows.

## A short tour

Page numbers are the PDF's.

| Look at | Page | What to notice |
|---|---|---|
| **Signature page** | 3 | *Prepared by* (the author), *Concurrence* (two managers), *Approved by* (the project manager). Real signatures on a design. Nothing gets built until they're there. |
| **Change record** | 4 | Eight revisions, 2005 → 2010, each with the pages affected and a version label — Draft v0.1 through **Baseline** and on. This is a revision history under change control. |
| **Introduction and related documents** | 9 | "This document, together with the relevant requirements documents, should provide all the information necessary to develop and test the database systems described herein." Then: the requirements documents it traces to (GSSC-0006, GSSC-0007), the interface control document, and the operating-environment document — each by number. **Traceability:** every design decision can be walked back to a requirement. |
| **General description + Figure 1** | 11–12 | Four components and how data flows between them. It is a **system-context diagram** and a **component diagram**, under 2010 names. Figure 2 goes further than our template asks and maps components onto physical host machines. |
| **A message definition** | 28 | Name, ID value, senders, receivers, whether it has a body, description, field-by-field layout. This is an **interface specification** — the level of detail two teams need when they must integrate without talking. |
| **A configuration table** | 21 | Every configuration parameter, its meaning, and its default. |
| **MySQL table descriptions** | 60 | Every database table, column by column. |

## What this changes about the rules you just learned

Notice that the last three rows are exactly what CP5 and the template tell you **not** to do: no copied schemas, no exhaustive parameter lists. Both pieces of advice are right, for different situations, and the difference is worth understanding, because you'll meet both in your career.

| | An informal design doc *(our template)* | A formal detailed design *(this document)* |
|---|---|---|
| **Primary reader** | Teammates and a future contributor | Reviewers who must approve, and operators who arrive years later |
| **Lifetime** | Until the design changes | The life of the mission, under change control |
| **What earns its place** | Decisions and their trade-offs | Decisions **and** the specifics needed to build, test, integrate, and operate |
| **Approval** | Someone reads it and comments | Named signatures, at a review that gates the work |
| **Failure it prevents** | Building the wrong thing | Building the wrong thing — plus a team that can't integrate, an operator who can't run it, and a decision nobody can reconstruct |

**The transferable judgment:** the right altitude depends on who reads the document, how long it must survive, and what it costs to be wrong. A two-person project writes down its decisions and lets the code carry the mechanics. A mission writes both down, because the mechanics are a handover to strangers.

**Two honest caveats about this example.** First, **read it for form, not technology** — it describes CGI scripts and a 2010 MySQL deployment, and the tech has moved on. Second, by our template's standard, its altitude leans heavily toward *how we'll build it*: the decisions and the alternatives considered are largely not in this document, because in that organization they lived in requirements documents, trade studies, and review presentations instead. That's a real difference in how the thinking was split across documents — and a useful reminder that "where does this belong?" is itself a design-document question.
