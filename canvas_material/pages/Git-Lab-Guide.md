*The step-by-step guide for the git workflow lab. Keep it open beside your terminal. Every command here can be copied as written; anything in `ANGLE_BRACKETS` or described in a comment is yours to fill in.*

---

## What this lab is for

Every project that lasts runs the same loop for every change, however small: **say what you're going to change, make it on a branch, explain it, get a second reader, answer them, and merge under the project's rules.** The loop is how a project keeps its history readable and its decisions recorded. It also lets more than one person work without stepping on each other.

Today you run that loop on your own project's repository, using changes that are **trivial on purpose**. When the change takes two minutes, all your attention goes to the process, and the process is the skill being learned. You'll do four things:

1. **Your change:** file an issue, branch, commit, push, and open a pull request.
2. **The second reader:** review someone else's pull request, answer the review of yours, and merge.
3. **A merge conflict, on purpose:** create one, then resolve it deliberately.
4. **Your project's git standards:** decide them, write them down, and ship them through the same loop.

*(In this course, that work is <course-link type="assignment" id="cp6">CP6 — Git Workflow Lab</course-link>, and it's graded from what's in your repository, so everything you do today is the submission.)*

**Working solo?** You do every step. Where a step needs a second person, that's your **review partner**, another solo founder: you review their pull requests and they review yours. In the conflict, you play both people.

---

## Before you start (5 minutes)

**Check your identity.** Every commit is stamped with this name and email, permanently, in a public repository:

```
git config --global user.name
git config --global user.email
```

If either is empty or wrong:

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**Pick the editor git opens for commit messages.** If you've never set one, git may drop you into vim. (If that happens: type `:wq` and press Enter to save and quit.) To use VS Code or nano instead:

```
git config --global core.editor "code --wait"     # VS Code
git config --global core.editor "nano"            # nano
```

**Get a current copy of the repository.** If you already cloned it:

```
cd <your-repo>
git switch main
git pull
```

If you haven't:

```
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>
```

**Confirm you can push, not just clone.** `git push --dry-run` contacts GitHub and checks your credentials without changing anything. "Everything up-to-date" means you're fine. An authentication error means fix it now; ask for help rather than waiting until you're at minute 40.

```
git push --dry-run
```

**Let your reviewer in.** To be requested as a reviewer, a person needs access to the repository. On a team, your teammates already have it. Solo founders: add your review partner now. On GitHub, open the repository → **Settings** → **Collaborators and teams** → **Add people** → their username → role **Write**. They accept from the email GitHub sends them, or at `github.com/<your-org>/<your-repo>/invitations`.

**Look at what's in the repository.** It should be close to this:

```
README.md        # a paragraph about the project, a status line, a Maintainers line
LICENSE          # your working license
.gitignore       # from GitHub's template for your language
docs/design.md   # your design document
```

That's the material you'll work with today. Two rules about it:

- **Don't touch `docs/design.md` today.** Your design document revisions are their own work. *(In this course that's CP5, and it's due today too.)* Editing it in the lab is a good way to collide with yourself.
- **Leave the README's status line alone until Part 3.** It's the line the conflict uses. (The status line is the one that says where the project stands, usually something like *"Design in progress."*)

---

## Part 1 — Your change: issue → branch → commit → pull request (25 minutes)

### Step 1. Pick a starter task

Each is small and real: something your repository genuinely needs. **On a team, each member picks a different one.** If you finish early, take a second one through the whole loop again; the second time is where it starts to feel routine.

| Task | File | What to do |
|---|---|---|
| **A. Point readers to the design** | `README.md` | Add a short `## Design` section that says what the design document covers and links to it: `[docs/design.md](docs/design.md)`. A newcomer's first question is "why is it built this way?" and right now nothing points them to the answer. |
| **B. Say what the license means** | `README.md` | Add a `## License` section: the license's name, one sentence on what it lets people do, and a link to the `LICENSE` file. The file is there, but almost nobody opens it. |
| **C. Keep secrets out** | `.gitignore` | Add the files that must never be committed and aren't in GitHub's template yet: `.env` and `.env.*` (where API keys live), your editor's folder (`.vscode/`, `.idea/`), and OS clutter (`.DS_Store`, `Thumbs.db`). Add a short comment above each group saying why it's there. |
| **D. Fix what's wrong in the README** | `README.md` | Read it the way a stranger would. Fix a typo, a broken link, a sentence that's no longer true, or a project description that has drifted from what you're actually building. (Not the status line.) |
| **E. Map the docs folder** | `docs/README.md` (new) | Create a one-paragraph index of what's in `docs/` and what each document is for. Right now it's one file. It won't be for long, and the index is how a newcomer finds their way. |

### Step 2. File an issue for it

Before you change anything, **say what you're going to change.** On a real project, the issue is where work is announced and discussed before anyone starts: it keeps two people from fixing the same thing and leaves a record of why the change was wanted.

On GitHub: open the repository → **Issues** → **New issue**.

- **Title:** what needs doing, in a few words.
- **Description:** what's wrong or missing now, and why it matters.
- **Assignees** (right sidebar): yourself, so nobody else picks it up.

**Write it however you think a good issue for your project should read.** There's no template yet. How to write a good issue is next session's topic, and the issues you file today are what we'll hold up against it. Note the issue's **number** (`#3`, say); you'll need it.

### Step 3. Branch

Always start from an up-to-date `main`:

```
git switch main
git pull
git switch -c <type>/<short-description>
```

Name the branch with the convention we suggested in the last session, `type/short-description`. For today's tasks the type is almost always `docs` (documentation) or `chore` (housekeeping):

```
git switch -c docs/link-design-doc          # task A
git switch -c docs/license-section          # task B
git switch -c chore/ignore-secrets          # task C
```

*(Your project ratifies or replaces the convention in Part 4. Today's provisional one is fine.)*

### Step 4. Make the change and commit it

Edit the file. Then look at what you're about to commit, **every time**:

```
git status
git diff
```

Stage the file and commit. Leave off `-m`, so git opens your editor and you can write a subject *and* a body:

```
git add README.md
git commit
```

Write the message to **the seven rules** from the last session's reading: a subject line of about 50 characters or fewer, capitalized, imperative mood, no period; a blank line; then a body, wrapped at about 72 characters, that says **what changed and why**, not how. The test for the subject: *"If applied, this commit will \_\_\_."*

```
Link the design document from the README

The design doc explains what the project is and why it is shaped
the way it is, but nothing in the README points to it. A newcomer
who wants the why has to stumble on docs/design.md by accident.

Add a Design section that says what the doc covers and links it.
```

Check what you wrote:

```
git log -1
```

Not happy with it? As long as you **haven't pushed yet**, fix the message without making a new commit:

```
git commit --amend
```

**One logical change per commit.** Most of these tasks are one commit. If yours is honestly two things (say, in task C, the secrets entries and the editor entries are separate decisions), make it two commits: `git add -p` lets you stage part of a file. Never more than two today.

### Step 5. Push the branch

```
git push -u origin <your-branch-name>
```

`-u` links your local branch to the one on GitHub, so from now on a plain `git push` or `git pull` on this branch knows where to go.

### Step 6. Open the pull request

On GitHub, a yellow banner offers **Compare & pull request** for the branch you just pushed. Click it. (Or: **Pull requests** → **New pull request** → set *compare* to your branch.) Check that **base** is `main`.

**Title:** what the change does, in the imperative, the way you'd write a commit subject.

**Description:** it's for the reviewer. Three parts, and a line that links the issue:

```
## Problem
Nothing in the README points to the design document, so a newcomer
who wants to know why the project is built this way can't find out.

## Approach
Adds a short Design section to the README that says what the design
doc covers and links to it. No other changes.

## What to look at first
Whether the one-sentence summary of the design doc is accurate.

Closes #3
```

`Closes #3` (with your issue's number) links the pull request to the issue. When the pull request merges, GitHub closes the issue automatically.

### Step 7. Request a review

In the pull request's right sidebar, click the gear next to **Reviewers** and choose your reviewer:

- **On a team:** round-robin. Each member reviews exactly one teammate's pull request, so everyone gives a review and gets one. Settle the order out loud before anyone requests.
- **Solo:** your review partner.

**If someone requests your review**, start Part 2 as soon as it arrives.

> **Using the GitHub CLI?** If you have `gh` installed and logged in, steps 6 and 7 are one command: `gh pr create --title "..." --body-file pr.md --base main --reviewer <username>`. Either route produces the same pull request.

---

## Part 2 — The second reader: review, respond, merge (15 minutes)

### As the reviewer

Open the pull request you were asked to review → the **Files changed** tab.

1. **Read the description first**, then the diff. Does the change do what the description says, and only that?
2. To comment on a line, hover over it and click the blue **+**. Write the comment and click **Start a review**. (That holds your comments so they all post together, instead of one notification each.)
3. Write **at least two comments**. At least one is **substantive**: about design, accuracy, completeness, or clarity. One may be a nitpick; mark it `nit:` so the author knows it's optional.
4. Use the register from last session: **what I see, why it matters, a question or a suggestion.** Comment on the code, not the coder.
5. When you're done, click **Review changes** (top right), add a one-line summary, and choose:
   - **Approve:** you'd merge this as it stands, or with only the nits fixed.
   - **Request changes:** something needs to change before it merges.
   - **Comment:** you're asking questions and haven't decided yet.

Comments that would work on today's tasks:

> The link text says "architecture," but the doc's own title is "Design Document." Should the README use the same name, so a reader knows they've landed in the right place?

> `.env.*` will also ignore `.env.example`, which projects usually *want* committed so contributors know which variables to set. Should we add `!.env.example` below it?

> nit: "it's" → "its" in the second sentence.

**"Looks good to me!" with nothing else isn't a review.** If the change really is fine, say what you checked and why you're convinced. A question counts as a substantive comment.

### As the author

**Respond to every comment.** There are only three good responses:

- **You agree and fix it.** Make the fix on the **same branch**, as a new commit. The pull request picks it up automatically:

  ```
  git switch <your-branch-name>
  # make the fix
  git add <file>
  git commit
  git push
  ```

  Then reply to the comment with what you did ("Fixed in 3f2a91c"), and click **Resolve conversation**.

- **You disagree, and say why.** Politely, with a reason. Your reviewer might be wrong, or might know something you don't; a reason lets you find out which.

- **It's a good point, but it's not this change.** Say so, open a new issue for it, and reply with the issue number. Keeping a pull request small is a reason in itself.

Then **re-request review** (the circular-arrows icon next to the reviewer's name) so your reviewer knows it's their turn again.

### Merge it

**Today's rule:** a pull request merges only after **at least one approval from someone who didn't write it.** *(That rule is the lab's, because the review is part of what's graded. Your project sets its own rule in Part 4.)*

Once it's approved, the author merges. Open the dropdown on the green button and choose the merge method your project is leaning toward. **Squash and merge** is the suggested default: the whole pull request lands on `main` as one commit, and the branch's individual commits stay in the pull request, where a reviewer read them.

If you squash, **edit the commit message before you confirm.** GitHub prefills it; make it read like a good commit: the pull request's title as the subject, and a short body saying what changed and why. Delete anything that was only for the reviewer.

After merging, click **Delete branch**. Then check that the issue closed itself.

### Back on your machine

```
git switch main
git pull
git log --oneline -5
git branch -D <your-branch-name>
```

You should see your change on `main`. Why `-D` and not `-d`? After a squash merge, `main` doesn't contain your branch's individual commits, so git can't tell the branch was merged. `-D` says "delete it anyway; I know it's merged." (If your project used a merge commit, `-d` works.)

---

## Part 3 — A merge conflict, on purpose (12 minutes)

A conflict happens when two changes edit the **same lines** of the same file, and git can't know which version is right. Conflicts aren't errors. They're git refusing to guess, and handing the decision to a person. Today you make one deliberately, in a place where it's harmless, so the first one you resolve isn't a real one at midnight.

**Who does it:** two people, **A** and **B**. On a team, pick two members; everyone else watches over a shoulder. **Solo: you are both A and B.**

The target is the README's **status line**. (If your README doesn't have one, use the first sentence of its description instead. All that matters is that A and B change the same line.)

### Step 1. Both branch from the same `main`, before either merges

This is the important part. Both branches must start from the same `main`, so do both before anything merges.

**A:**

```
git switch main
git pull
git switch -c docs/status-design-complete
```

Change the status line to say the design is done, for example:

```
**Status:** Design complete; building the first version.
```

```
git add README.md
git commit
git push -u origin docs/status-design-complete
```

**B** (solo: `git switch main` first, then the same steps):

```
git switch main
git pull
git switch -c docs/status-issue-link
```

Change the **same line** differently. Keep the old status, and add a pointer to the issue tracker:

```
**Status:** Design in progress. Questions or ideas? [Open an issue](../../issues).
```

```
git add README.md
git commit
git push -u origin docs/status-issue-link
```

Both open a pull request (Part 1, step 6). Both pull requests still say they can be merged cleanly, because neither has merged yet.

### Step 2. Merge A's pull request

Get it approved and merge it, as in Part 2. Now look at B's pull request on GitHub. It says **"This branch has conflicts that must be resolved."**

### Step 3. B resolves the conflict

GitHub offers a web editor for this. **Do it on your machine today**; it's the version you'll need when a conflict is too big for the web editor.

Bring `main`'s new version into your branch:

```
git switch docs/status-issue-link
git fetch origin
git merge origin/main
```

Git stops and reports a conflict in `README.md`:

```
git status
```

Open `README.md`. Git has written both versions into the file, between markers:

```
<<<<<<< HEAD
**Status:** Design in progress. Questions or ideas? [Open an issue](../../issues).
=======
**Status:** Design complete; building the first version.
>>>>>>> origin/main
```

`HEAD` is your branch's version; `origin/main` is what merged first. **Read both sides before you touch anything.** The reflex is to keep yours, which is how staged conflicts become real bugs. Ask what each change was *for*. A said the design is done; B added a way to reach the project. Both are right, so the resolution keeps both:

```
**Status:** Design complete; building the first version. Questions or ideas? [Open an issue](../../issues).
```

Delete all three marker lines (`<<<<<<<`, `=======`, `>>>>>>>`), save, and finish the merge:

```
git add README.md
git commit
git push
```

The commit message is prefilled ("Merge remote-tracking branch 'origin/main' into …"). That's fine; save and close.

If it goes sideways in the middle, you can always start the merge over:

```
git merge --abort
```

### Step 4. Review and merge B's pull request

The pull request now shows no conflicts. **Solo founders: this is the pull request your review partner must review.** The reviewer should look at the resolution in particular, and say whether it kept what both changes were for. Then merge it as in Part 2.

> **Why merge and not rebase?** Many projects resolve conflicts by rebasing the branch onto `main` instead, which keeps the history linear. It's a fine choice for your project. But it rewrites your branch's commits, so you'd have to force-push, and today the merge commit is the evidence that you resolved the conflict. Use the merge route in the lab.

**Talk it over** (your team, or you and your review partner): what made that conflict easy to resolve? Probably the change was small, each side did one clear thing, and you could read why. That's the whole lesson. Conflicts are cheap when changes are small and the people making them communicate.

---

## Part 4 — Your project's git standards (12 minutes)

Every project has rules for how a change gets in. On most projects they're never written down, so every newcomer has to guess them, and every maintainer applies them a little differently. Writing them down is cheap, and it's the difference between a norm and a hope.

### Decide

Six decisions, each with the default we suggested and some reasonable alternatives. **Every one is your project's call.** If you choose differently from the default, that's fine, as long as you write down why.

| Decision | Suggested default | Reasonable alternatives |
|---|---|---|
| **Branch names** | `type/short-description` (`feat/…`, `fix/…`, `docs/…`, `chore/…`) | Include the issue number (`fix/42-empty-search`); your initials as a prefix |
| **Commit messages** | The seven rules | The seven rules plus a type prefix, as in Conventional Commits (`docs: link the design document`) |
| **Pull request size** | One logical change, small enough to review in one sitting | A line-count guideline (say, about 400 changed lines before you split) |
| **Review** | At least one approval from someone who didn't write the change | Two approvals; an owner's approval for certain files. *Solo: your review partner, or a self-review checklist when no one's available, said honestly* |
| **Merge strategy** | Squash and merge | Merge commits (every branch commit kept); rebase and merge (every commit kept, and every one must be clean) |
| **"Done"** | Reviewed, merged, runs on `main`, docs updated if behavior changed | Add "tests pass" once there are tests; add "the issue is closed with a note" |

### Write it down

Create `docs/git-standards.md` with this skeleton and fill it in. **Every line gets a reason.** That's the habit of considering alternatives, applied to how you work.

```
# Git standards

How a change gets into this project. If you're contributing, this is how
we work; if you think a rule is wrong, open an issue and say why.

## Branch names
<!-- The convention, an example, and why. -->

## Commit messages
<!-- The convention, a link to it, and why. -->

## Pull requests
<!-- How big, what the description must say, and why. -->

## Review
<!-- Who must approve, how many, and why. -->

## Merging
<!-- Which method, who merges, and why. -->

## Definition of done
<!-- The checklist a change must pass, and why. -->
```

### Ship it through the loop

Your standards are a change to the repository, so they go in the way every change does: a branch (`docs/git-standards`), a commit, a pull request that closes an issue if you made one, a review, and a merge. **And merge it the way it says to.** A standards document whose own pull request breaks it isn't a standard.

### Optional: make GitHub enforce it

If there's time, set the repository up to match what you decided. In the repository, **Settings** → **General** → **Pull Requests**:

- Allow only your chosen merge method (uncheck the others).
- If you squash: set the default commit message to **Pull request title and description**, so squash commits start out readable.
- Check **Automatically delete head branches**, so merged branches clean themselves up.

Requiring a pull request and an approval before anything reaches `main` is a **branch ruleset** (Settings → **Rules** → **Rulesets**). Be careful on a solo project: GitHub won't let you approve your own pull request, so a required approval means every merge waits on your review partner. Decide whether that's the rule you want before you turn it on.

---

## Before you leave

Your instructor will skim your standards before you go. Then, so the submission is easy, collect these links:

- [ ] the **issue** you filed
- [ ] your **pull request** (merged, with your responses to every review comment)
- [ ] the **review** you wrote on someone else's pull request
- [ ] the **conflict-resolving pull request** (per project)
- [ ] `docs/git-standards.md` on `main` (per project)

*(In this course they go in your <course-link type="assignment" id="cp6">CP6</course-link> submission. Keep them for your portfolio too: a pull request description and a good review comment are exactly the kind of writing it asks for.)*

From now on, **every change to your project travels this loop.** Your standards become the heart of your `CONTRIBUTING.md`, the file that tells a stranger how to help. *(In this course, that's next week.)*

---

## When something goes wrong

**`git push` says "permission denied" or asks for a password that doesn't work.** GitHub stopped accepting account passwords for git in 2021. Over HTTPS you need a credential manager or a personal access token; the easiest fix is to install the GitHub CLI and run `gh auth login`, which sets it up for you. Over SSH you need a key added to your GitHub account.

**`git push` is rejected with "fetch first" or "non-fast-forward."** Someone pushed to that branch since you last pulled. `git pull`, then push again.

**You made your change on `main` by mistake.** If you haven't committed yet, just make the branch now, and your uncommitted changes come with you:

```
git switch -c <type>/<short-description>
```

If you already committed on `main` but haven't pushed, make the branch (it keeps the commit), then put `main` back where GitHub has it:

```
git branch <type>/<short-description>
git reset --hard origin/main
git switch <type>/<short-description>
```

**Your commit message has a typo and you've already pushed.** Leave it, and write the next one better. Rewriting pushed commits means force-pushing, which rewrites history other people may already have. That's a move for later, on your own branch, with care.

**The merge in Part 3 got confusing.** `git merge --abort` puts everything back the way it was before the merge. Read the two sides again, and start over.

**Your reviewer hasn't answered.** Say so, out loud, now. Don't wait: a pull request that sits unreviewed for twenty minutes is the lab's most common failure, and the fix is usually just "hey, I requested you."
