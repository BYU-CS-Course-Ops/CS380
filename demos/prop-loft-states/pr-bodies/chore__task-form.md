**Problem.** The issue forms are for requests: a bug report or a feature request says what's wrong or what's needed. Planned work needs a different shape (a goal, links to where it comes from, and acceptance criteria a reviewer can check), and without a form for it, tasks get filed as feature requests with the problem fields filled in awkwardly.

**Approach.** A third issue form, `task.yml`: goal, context (links, not a retelling), and acceptance criteria, all required, plus an optional *Where to start* for newcomers. Its help text points at the definition of done in the git standards rather than repeating it. CONTRIBUTING says when to use each form and adds the `epic` label to the labels table.

**Where to look first.** `.github/ISSUE_TEMPLATE/task.yml`.

**How you tested it.** YAML parses; after merge, open *New issue* and confirm the task form renders beside the other two.

### Self-review
- [x] One logical change
- [x] Commit message follows the seven rules
- [x] No code; no tests affected
