# Prop Loft states — one tag per session

**Instructor-only.** Prop Loft (`prop-loft/prop-loft`, local clone `~/repos/prop-loft`) is the course's worked example, built *ahead* of the class. Every state a session needs is an annotated tag on `main`, named for the first session that uses it. Its README carries the same table for students, so anyone browsing the repo can pick the tag for where they are.

| Tag | Sessions | What's new | Used for |
|---|---|---|---|
| `session-11` | 11–12 | The repository: README, LICENSE, `.gitignore` | Starting-Your-Repository: what a new public repo looks like |
| `session-13` | 13 | Approved design; Django skeleton that lists items | The git-workflow demo baseline (`demos/session13-git-workflow/demo.conf` → `BASELINE`) |
| `session-14` | 14–15 | `docs/git-standards.md` | CP6 model; the "you are here" middle repo in Session 15 §2 |
| `session-16` | 16 | The front door: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue forms + PR template, `docs/communication-norms.md`; labels + 3 seed issues | CP7 model, front-door examples (Session 16) |
| `session-17` | 17 | The plan: `.github/ISSUE_TEMPLATE/task.yml`, `docs/roadmap.md`; on GitHub, the `epic` label, milestones M1/M2, five epics with tasks as sub-issues, the seeds triaged into tasks, a public project board | CP8 model; the worked decomposition (Session 17 §2–4); the Setting Up Your Board page |
| `session-18` | 18–19 | The plan, cut to fit: design §6 *Decision: plain forms for the MVP, HTMX later* (§4 and §7 to match); on GitHub, a *Size* field with every M1/M2 card sized, a `slice` label on the five slice issues, the slice statement as M1's description, the Ready column in sequence | The live PR and board steps in Session 18 (§3, §5); CP8's after-state |
| `session-20` | 20 on | `docs/setup.md`, README quickstart → guide | Setup-guide model (Session 20 §4) |

**Adding a state:** build it on a branch through a PR (the project follows its own git standards: squash merge, written self-review), tag the merge commit `session-NN` with an annotated message, push the tag, and add a row both here and in Prop Loft's README table. Link files in the README table through the tag (`.../blob/session-NN/path`), so the links work from every tag.

## Using a state in class

Files come from the tag; issues and labels don't, because they live on GitHub. To give a class a repo in a session's state:

```sh
# a disposable public copy at that tag
gh repo create prop-loft/prop-loft-s16 --public
git -C ~/repos/prop-loft push https://github.com/prop-loft/prop-loft-s16.git session-16:refs/heads/main
# its tracker, to match
./seed.sh prop-loft/prop-loft-s16 session-16
```

Or, read-only: browse `https://github.com/prop-loft/prop-loft/tree/session-16`. The canonical tracker always shows the present: at `session-16` the setup-guide issue shows as closed, because `session-20` closed it.

`seed.sh` runs in stages. **16:** the `needs triage` label and the three seed issues in `issues/` (search, the item detail page as a `good first issue`, and the setup guide). **17:** the plan, from `issues/17-*.md`: the `epic` label; milestones M1 and M2 (due Nov 18 and Dec 2; `M1_DUE`/`M2_DUE` override); five epics; ten tasks as their sub-issues; the seeds triaged into tasks (a *Triaged* note appended below the request as filed, so the before/after stays readable in one issue; search is retitled and its filters split out); and a public project board linked to the repo, columns Backlog → Ready → In progress → In review → Done. **The board needs the token's `project` scope** (`gh auth refresh -s project`); without it the stage skips the board and says so. The auto-add workflow and the extra views can't be set through the API — the script prints them as by-hand steps. **20:** closes the setup-guide issue. *There's no stage 18:* Session 18's GitHub-side changes are made live in class (the run sheet is in the Session 18 outline's appendix), so a class copy at `session-18` gets stage 17's tracker and the board steps by hand.

Stages 16–17 were tested end to end (board excepted) against a throwaway private repo on Oct 16, 2026. Issue numbers on the canonical repo come after the pull requests', so nothing in the course materials cites one by number.

## Files

- `seed.sh <owner/repo> <tag>` — recreate the GitHub-side state for a tag.
- `issues/` — the seed issue bodies, in the shape the issue forms produce.
- `publish.sh` — **one-time:** shipped the Session 14–20 states from local branches to the canonical repo (replays each commit onto `main`, opens the PR with its body from `pr-bodies/`, squash-merges, tags, seeds the issues after the front door and the plan after the roadmap). `publish.sh session-16` stops after that tag, leaving later branches local; `publish.sh session-17` ships the plan (run `gh auth refresh -s project` first, or the board is skipped). `docs/design-plain-forms` (`session-18`) is merged **live in Session 18**, not by the script; a later run finds it on `main` and skips it. Safe to rerun; merged branches and existing tags are skipped. Kept as the record of how the states were made.
- `pr-bodies/` — the pull request descriptions, written to Prop Loft's own template.
