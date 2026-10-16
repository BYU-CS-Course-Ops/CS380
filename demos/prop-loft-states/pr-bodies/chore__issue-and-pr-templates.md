**Problem.** Blank issues get blank reports: no steps, no expected-versus-actual, no environment.

**Approach.** Issue forms for bugs (steps, expected, actual, environment, all required) and features (the problem, who has it, today's workaround, then an optional idea). Both apply `needs triage`. A `config.yml` routes conduct reports away from public issues. The pull request template asks for problem, approach, where to look first, and testing, with the checklist from the git standards.

**Where to look first.** `.github/ISSUE_TEMPLATE/bug_report.yml`.

**How you tested it.** YAML parses; after merge, open *New issue* and confirm both forms render.

### Self-review
- [x] One logical change
- [x] Commit message follows the seven rules
- [x] No code; no tests affected
