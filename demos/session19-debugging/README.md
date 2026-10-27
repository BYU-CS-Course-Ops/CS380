# Session 19 demo kit — debugging a planted bug, live

Everything needed for the five-minute debugging vignette in `lectures/Session19-Nov09-Outline.md`, §5: a real-looking bug in **Prop Loft**, found with the loop the session teaches (hypothesize → test cheaply → review → fix and verify), including one wrong first hypothesis, and written up as a three-line debug log.

**Start with [`DEMO-SCRIPT.md`](DEMO-SCRIPT.md)**: the run sheet, with commands, what to say, and contingencies.

## The bug

Prop Loft's list gains a *Status* column ("Out · due Dec 5" or "In"), the first criterion of the M1 issue *Show who has an item and when it's due back*. The view finds each item's open checkout with a subquery, and the subquery isn't tied to the item (`item=OuterRef("pk")` is missing). So as soon as **one** item is checked out, **every** item reads "Out · due Dec 5". All the tests pass, because each test puts a single item in the database: one that's out, or one that's in, never both.

It was picked because it sits on Prop Loft's slice (the slice statement ends "…and sees it marked out to that actor"), it shows up with one admin checkout, it invites a believable wrong first guess (the admin saved several checkouts), the cheapest test kills that guess in thirty seconds, and it gets past a test suite that looks complete. *(Session 13's demo already used the search box's missing `.strip()`, so that one's taken.)*

## Where it runs

Locally, in a throwaway clone (`~/repos/prop-loft-debug`), on a local branch `demo/out-marker`. **Nothing is pushed**: the canonical repo `prop-loft/prop-loft` is never touched, and no disposable GitHub repo is needed. The branch is Prop Loft *ahead* of its `session-18` state: search merged, the checkout model built, the Out marker just written. It isn't Prop Loft's published history; if Prop Loft's real checkout code lands first and differs, rebuild the patches on it (below).

## First-time setup, and resetting

```
demos/session19-debugging/setup.sh
```

The same command resets everything: it rebuilds the branch from the patches, recreates the database with the demo data and a local admin login, and runs the tests (expect `OK` — the bug gets past them). Run it before class and after every rehearsal.

## What's here

| Path | What it is |
|---|---|
| `DEMO-SCRIPT.md` | The run sheet: before class, the vignette step by step, contingencies |
| `demo.conf` | The clone's location and source, the base tag, the branch name, the admin login |
| `setup.sh` | Builds or resets the demo |
| `patches/branch/` | The three commits of the demo branch: search, the checkout model, the Out marker (with the bug) |
| `patches/regression-test.patch` | The test that pins the bug (fails before the fix) |
| `patches/fix.patch` | The test and the fix together: the fallback if live typing goes wrong |
| `fixtures/demo-data.json` | Three bins, five items, two actors, one show; no checkouts (the demo makes one live) |
| `text/` | The log line to paste, the debug log, the fix's commit message |

Every file here is plain text, kept at LF by the course repo's `demos/** text eol=lf` rule.

## Rebuilding the patches

If `BASE` moves to a state whose `catalog/` app has changed: run `setup.sh` (it will stop where a patch fails), fix the commit by hand in the clone, then `git format-patch -3 -o <kit>/patches/branch` and regenerate `fix.patch` and `regression-test.patch` with `git diff` after making each change on top. Check that `manage.py test` says `OK` on the branch and still `OK` after `fix.patch`, and that `regression-test.patch` alone fails.
