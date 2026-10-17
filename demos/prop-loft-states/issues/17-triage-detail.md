
---

**Triaged** by the maintainer: accepted, as a task under #{{E1}} in **M1**. Still a good first issue; the *Where to start* above stands.

### Goal

A volunteer opens one item and sees everything needed to decide whether it will work.

### Context

Design §4, Catalog and Web UI; §5, the item fields. Part of #{{E1}}. #{{SHOWOUT}} later adds checkout status to this page.

### Acceptance criteria

- [ ] `/items/<id>/` shows name, category, size, condition, and bin.
- [ ] Each row of the item list links to its page.
- [ ] A missing item returns 404.
- [ ] Tests cover both.
