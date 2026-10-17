
---

**Triaged** by the maintainer: accepted, as a task under #{{E1}} in **M1**. Filtering by category and size is split out to #{{FILTER}} (M2), so this one stays a single pull request.

### Goal

A volunteer finds an item by typing part of its name.

### Context

Design §2, goal 1; §4, Catalog. Part of #{{E1}}. The request above is the why.

### Acceptance criteria

- [ ] A search box at the top of the item list filters it to items whose name contains the text, ignoring case.
- [ ] An empty search shows the full list.
- [ ] The search text stays in the box after searching.
- [ ] Tests cover a match, mixed case, and an empty search.
