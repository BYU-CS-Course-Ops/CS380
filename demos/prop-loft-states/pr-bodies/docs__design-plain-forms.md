**Problem.** Sizing the first milestone against the hours the maintainer actually has (about 10 a week, 20 for the milestone) came to 21. "Fits on paper" isn't fitting: the written self-review every pull request gets isn't in that number. The biggest piece was the check-out form, sized a full week with HTMX because HTMX is new to us (design §7). The design said HTMX, so building with plain forms without saying so would leave the design wrong.

**Approach.** Take the fallback the design already named: plain server-rendered forms with full-page reloads for the MVP, HTMX revisited after the strike-night trial. That brings the check-out form to about half a week and the milestone to 18. The decision is in design §6 in the same shape as the others (chosen, alternative, why, evidence, what would change our mind); §4's Web UI row and the HTMX risk in §7 now agree with it, and the revision history says what changed. The README's course-tags table gets the `session-18` row.

**Where to look first.** *Decision: plain forms for the MVP, HTMX later* in `docs/design.md` §6.

**How you tested it.** No code changes. Every link resolves in the rendered file, including the new §6 anchor from the README.

### Checklist (from our [git standards](https://github.com/prop-loft/prop-loft/blob/main/docs/git-standards.md))

- [x] One logical change, small enough to review in one sitting
- [x] Commit messages follow the seven rules
- [x] `python manage.py test` passes
- [x] Docs updated if behavior changed
- [ ] *Maintainers:* self-review posted as a comment (until there's a second maintainer)
