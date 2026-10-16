**Problem.** Setup was a six-command block in the README, with no checkpoints and no help when a step fails. Closes #SETUP_ISSUE

**Approach.** `docs/setup.md`: prerequisites with versions, numbered steps, a "you should see" line after each step that can quietly fail, how to run the tests, and the failures we've actually hit, with fixes. The README keeps a short quickstart that links to it, and CONTRIBUTING's first-contribution steps point to it. The README's course table gains its `session-20` row.

**Where to look first.** *When a step fails.* Every entry there is a failure someone actually hit.

**How you tested it.** Followed the guide from a fresh clone into a new virtual environment. The `KeyError` entry came from running `migrate` before creating `.env`; the checkpoints quote the actual output. A cold test by someone who didn't write it comes next.

### Self-review
- [x] One logical change
- [x] Commit message follows the seven rules
- [x] `python manage.py test` passes (2 tests, OK)
- [x] Docs updated: README and CONTRIBUTING link the guide
