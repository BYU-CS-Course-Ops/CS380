# Session 13 demo kit — the maintainer's git workflow, live

Everything needed to run the Session 13 walkthrough (`lectures/Session13-Oct19-Outline.md`, §2): branch → logical commits → draft PR → review → revise → merge, on the course's worked-example project, **Prop Loft**. The code change is pre-written, so class time goes to the workflow, not the typing.

**Start with [`DEMO-SCRIPT.md`](DEMO-SCRIPT.md)**: the full run sheet, with commands, talking points, and contingencies.

## The three repositories

| | What it is | Written to by the demo? |
|---|---|---|
| `prop-loft/prop-loft` | The real project. Everything Prop Loft builds lands here. | **Never.** |
| `prop-loft/prop-loft-demo` | A disposable public copy, created from a fixed commit of the real project, used in class, and deleted afterward. | Yes: the demo's PR, review, and issue live here. |
| `~/repos/prop-loft-class` | The teaching computer's local clone. Its `.demo` is a symlink to this folder. | Local only. |

## First-time setup on a teaching computer

```
demos/session13-git-workflow/setup.sh                 # clone, venv, .env, and the .demo link
~/repos/prop-loft-class/.demo/demo-upstream.sh create  # create prop-loft/prop-loft-demo
```

Needs `gh` logged in with the `delete_repo` permission, for `reset` and `delete`:
`gh auth refresh -h github.com -s delete_repo`

## What's here

| Path | What it is |
|---|---|
| `DEMO-SCRIPT.md` | The run sheet: before class, the demo step by step, after class, next semester |
| `demo.conf` | The clone's location, the real and demo repo names, and the **baseline commit** the demo starts from |
| `demo-upstream.sh` | `create` · `reset` · `local` · `delete` for the demo repo and the clone's state |
| `setup.sh` | One-time setup of the clone |
| `messages/` | The commit messages used live |
| `patches/search-feature.patch` | The pre-written feature, applied uncommitted to the clone's `main` |
| `patches/review-fix.patch` | The fix for the reviewer's first comment |
| `patches/branches/` | Patch series that rebuild the two prepared local branches: the fallback (`demo/item-search-committed`) and the conflict sidebar (`docs/readme-status`) |
| `text/` | Prepared text: the PR description, the Canvas message to the student reviewer, your replies, the issue, the resolved conflict line |

Every file here is plain text. The kit's `.gitattributes` rule keeps it at LF line endings; CRLF would break `git apply` and put stray `\r` characters into commit messages.

## Changing the demo

Edit files here, not in a copy: the clone reaches them through its `.demo` link, so there is only one copy. Anything pinned to the baseline commit (the patches) has to be rebuilt if `BASELINE` in `demo.conf` changes. `DEMO-SCRIPT.md`, part E, says how.
