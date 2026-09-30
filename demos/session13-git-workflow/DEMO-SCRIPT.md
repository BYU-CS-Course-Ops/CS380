# Session 13 — Live Git Workflow Demo: Full Script

**Where:** `~/repos/prop-loft-class`. Its `.demo` links to this kit in the course repo (`demos/session13-git-workflow/`), and the clone's git ignores it, so none of it is ever pushed to Prop Loft. First time on a machine: `setup.sh` (see the kit's README).
**Upstream:** the disposable **`prop-loft/prop-loft-demo`**, created from a fixed commit of the real project (`prop-loft/prop-loft`) and deleted afterward. The real repo is never written to. Settings: `.demo/demo.conf`.
**Outline:** `lectures/Session13-Oct19-Outline.md`, §2 (22 min). The optional conflict sidebar adds about 4 min.
**The change being shipped:** search the catalog by item name, already written and waiting uncommitted on `main`. **No coding in class.** Every step is git and GitHub.

Conventions below: **SAY** = talking points · **DO** = commands, copy-paste as written · **SHOW** = what should be on screen · ⚠ = where it can go wrong.

---

## A. Before class

`.demo/demo-upstream.sh` manages the demo repo: `create` · `reset` (delete + recreate) · `local` (reset this clone only) · `delete`. `reset` and `delete` ask you to type the repo name, and need gh's `delete_repo` permission (one-time: `gh auth refresh -h github.com -s delete_repo`).

### Rehearse (as often as you like)

1. `cd ~/repos/prop-loft-class && .demo/demo-upstream.sh reset` (or `create` if the demo repo doesn't exist yet).
2. Run section B top to bottom. Rehearsal limits: you can't request review from yourself or approve your own PR. For B7–B9, post the two review comments yourself as ordinary PR comments, and skip the approval.
3. `.demo/demo-upstream.sh reset` to go again.

### The day before class: final reset, then the reviewer

⚠ **Order matters.** `reset` deletes the repo, and the student's access goes with it. Do the final reset **first**, invite the student **after**, and don't reset again.

1. `.demo/demo-upstream.sh reset` (the last one).
2. Pick the student and get their **GitHub username**.
3. Add them with write access (needed to be requested as a reviewer and to approve):
   ```
   gh api -X PUT repos/prop-loft/prop-loft-demo/collaborators/THEIR_USERNAME -f permission=push
   ```
4. ⚠ **They must accept the invitation before class** (GitHub emails it; it's also at github.com/prop-loft/prop-loft-demo/invitations). Check:
   ```
   gh api repos/prop-loft/prop-loft-demo/collaborators --jq '.[].login'
   ```
5. Have `.demo/text/canvas-message-to-reviewer.md` ready to paste into a Canvas message.

### Morning of class, on the teaching computer

1. `cd ~/repos/prop-loft-class && .demo/demo-upstream.sh local`
   This resets this clone only (the repo and the student's access stay). It must end with **"Ready … Origin: prop-loft/prop-loft-demo"**.
2. `gh auth status` shows you're logged in as `dagorym`.
3. Terminal font large (≥ 20 pt), dark-on-light or high contrast. Set a short prompt if yours is long: `PS1='\W \$ '`
4. Browser tabs open: https://github.com/prop-loft/prop-loft-demo and its **Pull requests** tab.
5. Send the reviewer the Canvas message now, so it's waiting when you need it.

---

## B. The demo (≈ 22 min, 26 with the conflict sidebar)

### B0. The name (1 min) · *browser: repo home page (prop-loft-demo)*

**SAY:** "Monday's design doc called this project *Backstage*. When we went to create the repo, we checked the name, the way the repository guide tells you to, and found **Spotify's Backstage**, a big open-source developer portal. A near-perfect name, taken. So: **Prop Loft**. It's broader than version 1 on purpose. The design scopes costumes first, but the vision is everything a production stores. *Name for where the project is going; scope for where it starts.*"

**SAY** (once, briefly): "This is a demo copy of the real project, `prop-loft/prop-loft`, so today's practice PR doesn't land in its history."
**SHOW:** the README's "Why 'Prop Loft' and not 'Backstage'" section. Point out the teaching-project notice, the LICENSE (Apache 2.0), and `docs/design.md` (the *revised* design doc: the fixed version of what they dissected).

### B1. The starting point (1 min) · *terminal*

**DO:**
```
git status
git diff --stat
```
**SHOW:** on `main`, five modified files: views, template, tests, README, design doc.
**SAY:** "The feature is written: search by name. Today isn't about the code. It's about how the code gets *in*. And notice where I am: on `main`. I started coding without branching. That happens. Git makes it cheap to fix."

### B2. Branch (1 min)

**DO:**
```
git switch -c feat/item-search
git status
```
**SAY:** "`switch -c` makes the branch and brings my uncommitted work with it. `main` is untouched. The name follows the convention we'll suggest for Wednesday: `type/short-description`. In a repo with 40 open branches, `feat/item-search` tells you what it is before you open it."

### B3. Logical commits (4 min)

**SAY:** "Five files changed, but not as one idea. I'll commit them as the steps a reviewer would want to read, one nameable thing each."

**DO**, one block at a time, pausing on each `git log -1`:
```
git add catalog/views.py
git diff --staged
git commit -F .demo/messages/1-view.txt
git log -1
```
```
git add catalog/templates/
git commit -F .demo/messages/2-template.txt
git log -1
```
```
git add catalog/tests.py
git commit -F .demo/messages/3-tests.txt
git log -1
```
```
git add README.md docs/design.md
git commit -F .demo/messages/4-status.txt
```

**SAY**, on the first `git log -1`: run the imperative test out loud: "*If applied, this commit will* filter the item list by a name query." Subject under 50 characters, no period, and a body that says *why*: "the first step of the design's core flow."
**SAY**, on the trailer: "See the `Co-Authored-By: Claude` line? I had AI help write this code. The log says so. That's the course's AI policy written where a future maintainer will see it. We'll come back to that in the commit critique."

**DO:**
```
git log --oneline main..
```
**SHOW:** four lines that read like a story. "That's the log a maintainer wants: you can read what happened without opening a diff."

⚠ **Short on time?** Skip B3 and use the fallback, which has the same four commits already made:
```
git switch main && git reset --hard HEAD && git switch -C feat/item-search demo/item-search-committed
```

### B4. Push (30 s)

**DO:**
```
git push -u origin feat/item-search
```
**SAY:** "`-u` links my branch to the remote one, so from now on plain `git push` and `git pull` know where to go."

### B5. Draft PR (3 min) · *terminal, then browser*

**DO:**
```
gh pr create --draft --title "Search the catalog by item name" --body-file .demo/text/pr-body.md --base main
```
*(Or show the web form instead: the yellow "Compare & pull request" banner on the repo page, paste the body from `.demo/text/pr-body.md`, choose "Create draft pull request".)*

**SHOW** in the browser: the PR's description (problem · approach · **what to look at first**), the **Commits** tab (the same four commits), and **Files changed**.
**SAY:** "Draft means *not ready to merge, but ready to look at*. Open it early. The description is for the reviewer: what problem this solves, the approach, and where to start reading. Notice it says what's *left out*: category search. Saying what a PR doesn't do is part of keeping it small."

**DO** when ready:
```
gh pr ready
```

### B6. Request review (1 min)

**DO:**
```
gh pr edit --add-reviewer THEIR_USERNAME
```
*(Or: the gear icon next to "Reviewers" in the PR sidebar.)*
**SAY** to the student: "You should have a notification. Go ahead with the review in the message I sent."
**SAY** to the room: "In your project, who reviews? Wednesday you'll decide. Our suggestion: at least one approval from someone who didn't write the change. On a solo project, that's your review partner."

### B7. The review arrives (2–3 min while the student works)

**Fill the wait (topics in order, drop what you don't need):**
- What a reviewer looks at, in order: design, functionality, complexity, tests, naming, comments (Google's guide, §4 of the outline).
- "Request changes" vs. "Comment" vs. "Approve", and what each tells the author.
- Refresh the PR's **Conversation** tab until the review appears.

**SHOW:** the two comments: (1) stray spaces in the query find nothing; (2) should this search category too?

⚠ **Student stuck or absent:** post the two comments yourself as ordinary PR comments (from `.demo/text/canvas-message-to-reviewer.md`) and say what happened. You can't formally review your own PR. The rest of the demo works the same, minus the approval.

### B8. Revise: accept a comment with a commit (3 min)

**SAY:** "Comment one is a real bug. Let me show it." *(Optional: `.venv/bin/python manage.py runserver`, search `bustle` then ` bustle `. Or just trust the test.)*

**DO:**
```
git apply .demo/patches/review-fix.patch
git diff
.venv/bin/python manage.py test
git add catalog/views.py catalog/tests.py
git commit -F .demo/messages/5-review-fix.txt
git push
```
**SHOW:** `git diff` (the fix is one word, `.strip()`, plus a test) and **6 tests OK**.
**DO** in the browser: reply on comment 1 with `.demo/text/reply-comment-1.md`, then **Resolve conversation**.
**SAY:** "The fix goes on the *same branch* as a new commit, and the PR updates itself. The author responds to *every* comment, even just 'fixed in the latest commit.'"

### B9. Revise: disagree with reasons (2 min)

**DO:**
```
gh issue create --title "Search by category and size" --body-file .demo/text/issue-category-search.md
```
Then reply on comment 2 with `.demo/text/reply-comment-2.md`, adding the new issue's number (e.g. "…opened #3…").
**SAY:** "Comment two is a fair point, and it's in the design. But adding it here would double the PR. So: agree with the goal, disagree on *this PR*, give the reason, and open an issue so it isn't lost. Disagreeing respectfully, with reasons, is a skill. So is keeping PRs small."

**Then to the student:** "Go ahead and approve." **SHOW:** the green **Approved** badge.

### B10. (Optional, ≈ 4 min) Sidebar: a merge conflict

**SAY:** "While I was working, someone else changed `main`. Let's make that happen."

**DO:**
```
git push -u origin docs/readme-status
gh pr create --head docs/readme-status --base main --title "Point readers to the issue tracker" --body "Adds the issue tracker to the README's status line."
gh pr merge docs/readme-status --squash --delete-branch
```
**SHOW:** refresh the search PR. **"This branch has conflicts that must be resolved"** (in `README.md`).
**DO:**
```
git fetch origin
git merge origin/main
```
Open `README.md`. **SHOW** the markers:
```
<<<<<<< HEAD
**Status:** … the app lists items and searches them by name.
=======
**Status:** … the app lists items, and search is next. Found a bug or have an idea? [Open an issue](../../issues).
>>>>>>> origin/main
```
**SAY:** "Read *both* sides. Don't just pick mine. Mine says search works; theirs adds the issue link. The right answer keeps both." Replace the whole block with the line in `.demo/text/conflict-resolved-status-line.md`, then:
```
git add README.md
git commit --no-edit
git push
```
**SAY:** "Conflicts are cheap when changes are small and clearly described. This one took a minute because each side did one thing."

⚠ If `git commit --no-edit` complains, run `git commit -m "Merge main into feat/item-search"`.

### B11. Merge under policy (2 min) · *browser, with deck slide 7*

**SHOW** deck slide 7 (merge strategies), then the dropdown on the green merge button. Walk through the three options:
- **Create a merge commit:** keeps every branch commit plus a merge commit. Full history, busier log.
- **Squash and merge:** the whole PR becomes **one** commit on `main`. Linear and easy to revert. *Our suggested default.*
- **Rebase and merge:** replays each commit onto `main`, with no merge commit.

**SAY:** "Each project picks one. That's a Wednesday decision."
**DO:** choose **Squash and merge**. **SHOW** the prefilled message: the PR's **title** as the subject (with `(#N)`) and its **description** as the body. The repo is set up that way (`demo-upstream.sh create` sets it; on your own project it's Settings → Pull Requests → squash merging → "Pull request title and description"). Without that setting, GitHub pastes every branch commit in as a bullet list.
**DO:** trim the body to what a future maintainer needs: keep **Problem** and **Approach**, delete **What to look at first** and **How to try it** (those were for the reviewer).
**SAY:** "This is the message the history keeps." Then raise the question and **leave it open**: "Here's a question you should be asking: why did I write four careful commits, if squash turns them into one? Hold onto it. We'll answer it after we look at what makes a good commit message." *(It's answered on deck slide 21, at the end of the commit-message section.)*
**DO:** confirm, then **Delete branch**.

### B12. Back on main (1 min) · *terminal*

**DO:**
```
git switch main
git pull
git log --oneline -4
git branch -D feat/item-search
```
**SHOW:** `Search the catalog by item name (#N)` on `main`.
**SAY:** "One commit on `main` for the whole change, and the PR number links back to the discussion. Why `-D` and not `-d`? After a squash, `main` doesn't contain my four individual commits, so git can't tell the branch was merged. `-D` says 'I know.'"

**Close (SAY):** "That's the loop: branch, logical commits, draft PR, review, revise, merge under policy. Every choice in it was a governance choice: branch names, what counts as reviewed, how history is kept. Wednesday, you make those choices for your own project and run this loop yourselves."

---

## C. After class

1. Nothing to clean up on the real repo: `prop-loft/prop-loft` was never touched.
2. Leave `prop-loft/prop-loft-demo` up for the semester if students want to look back at the PR, review, and issue. Remove the student's write access now:
   ```
   gh api -X DELETE repos/prop-loft/prop-loft-demo/collaborators/THEIR_USERNAME
   ```
3. End of semester: `.demo/demo-upstream.sh delete`.
4. When Prop Loft should actually get search, land it in the real repo through a normal PR. The same code is in `patches/search-feature.patch` and `patches/review-fix.patch`.

## D. Files in `.demo/`

| File | Used in |
|---|---|
| `demo-upstream.sh` | A: `create` · `reset` · `local` · `delete` |
| `demo.conf` | the canonical repo, the demo repo's name, and the baseline commit |
| `messages/1-view.txt` … `4-status.txt` | B3 commits |
| `messages/5-review-fix.txt` | B8 |
| `messages/6-docs-status.txt` | (already in the `docs/readme-status` branch) |
| `patches/search-feature.patch` | applied by `demo-upstream.sh` |
| `patches/review-fix.patch` | B8 |
| `patches/branches/` | patch series that rebuild `demo/item-search-committed` and `docs/readme-status` on every reset |
| `setup.sh` | one-time setup of the clone and its `.demo` link |
| `text/pr-body.md` | B5 |
| `text/canvas-message-to-reviewer.md` | A (send before class) |
| `text/reply-comment-1.md`, `reply-comment-2.md` | B8, B9 |
| `text/issue-category-search.md` | B9 |
| `text/conflict-resolved-status-line.md` | B10 |

## E. Running it again next semester

**Same demo, same starting point:** `.demo/demo-upstream.sh create` and follow A. Nothing else changes; the demo repo starts clean, with PR and issue numbers back at #1.

**Demo a later point in the project** (the real repo has moved on, and you want to start from there):

1. Set `BASELINE` in `.demo/demo.conf` to the new starting commit of `prop-loft/prop-loft` (`git fetch https://github.com/prop-loft/prop-loft.git main` first, so the commit is in this clone: `origin` points at the demo repo).
2. Rebuild what's pinned to the old baseline:
   - `patches/search-feature.patch`, the uncommitted change: make it on top of the new baseline, then `git diff > .demo/patches/<name>.patch`. (If search is already in the project by then, pick the next feature and write new commit messages.)
   - the two prepared branches: rebuild each on the new baseline (`git switch -C docs/readme-status <BASELINE>` and so on), then regenerate its patch series, e.g. `git format-patch --no-signature -o .demo/patches/branches/readme-status <BASELINE>..docs/readme-status` (delete the old files first).
   - `patches/review-fix.patch`, against the fallback branch's commits.
3. `.demo/demo-upstream.sh reset` and rehearse.
