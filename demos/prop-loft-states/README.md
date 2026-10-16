# Prop Loft states — one tag per session

**Instructor-only.** Prop Loft (`prop-loft/prop-loft`, local clone `~/repos/prop-loft`) is the course's worked example, built *ahead* of the class. Every state a session needs is an annotated tag on `main`, named for the first session that uses it. Its README carries the same table for students, so anyone browsing the repo can pick the tag for where they are.

| Tag | Sessions | What's new | Used for |
|---|---|---|---|
| `session-11` | 11–12 | The repository: README, LICENSE, `.gitignore` | Starting-Your-Repository: what a new public repo looks like |
| `session-13` | 13 | Approved design; Django skeleton that lists items | The git-workflow demo baseline (`demos/session13-git-workflow/demo.conf` → `BASELINE`) |
| `session-14` | 14–15 | `docs/git-standards.md` | CP6 model; the "you are here" middle repo in Session 15 §2 |
| `session-16` | 16–19 | The front door: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue forms + PR template, `docs/communication-norms.md`; labels + 3 seed issues | CP7 model, front-door examples (Session 16) |
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

`seed.sh` creates the `needs triage` label and the three seed issues in `issues/` (search, the item detail page as a `good first issue`, and the setup guide), and closes the setup-guide issue for `session-20` and later.

## Files

- `seed.sh <owner/repo> <tag>` — recreate the GitHub-side state for a tag.
- `issues/` — the seed issue bodies, in the shape the issue forms produce.
- `publish.sh` — **one-time:** shipped the Session 14–20 states from local branches to the canonical repo (replays each commit onto `main`, opens the PR with its body from `pr-bodies/`, squash-merges, tags, seeds the issues after the front door). `publish.sh session-16` stops after that tag, leaving later branches local. Safe to rerun; merged branches and existing tags are skipped. Kept as the record of how the states were made.
- `pr-bodies/` — the pull request descriptions, written to Prop Loft's own template.
