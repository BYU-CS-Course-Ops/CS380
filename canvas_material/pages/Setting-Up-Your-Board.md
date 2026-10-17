*A short, practical guide written for CS 301R. It covers how to make a project's plan visible: what an issue tracker has to do once real work and real strangers arrive, a set of defaults that do it on GitHub, and the steps to set them up. Every default is shown on Prop Loft, the course's worked example, so you can open the real thing beside your own.*

---

## Why the plan belongs in public

A project's plan has two audiences. The people building it need to know what's next and who's on it. Everyone else (a user deciding whether to rely on it, a developer deciding whether to help) needs to see that the project is *going* somewhere, and where they could fit. A plan kept in a spreadsheet, a notebook, or a founder's head serves neither: the team works from a copy that drifts, and outsiders see a repository with no visible future.

Open-source projects solve this by keeping the plan where the work already lives: in the issue tracker, next to the code. Whatever tools a project uses, its tracker has to do five jobs:

| The job | The question it answers | The default on this page |
|---|---|---|
| **Describe each piece of work** so someone can do it and a reviewer can tell when it's done | *What exactly needs doing?* | A task form with acceptance criteria |
| **Notice what's new**, so nothing a stranger files waits unread | *What hasn't anyone looked at?* | A `needs triage` label the forms apply |
| **Group work by the value it delivers** | *What does this add up to?* | Epics: parent issues with sub-issues |
| **Group work by when it's due** | *What has to be true by when?* | Milestones |
| **Show each item's state at a glance** | *What's happening right now?* | A public project board |

The jobs are the point; the defaults are one good way to do them. The defaults are what most projects in this course use, and they're what the steps below set up. **You can change any of them, as long as you say why.** Write the decision and the reason where a contributor will find it, usually CONTRIBUTING, the way your git standards give a reason with each rule. "We track epics as milestones, because each epic is also a release" is a fine decision. "We didn't get to it" isn't.

*In this course, this is the setup CP8 asks for, built in Session 17 and kept up to date through the build. Prop Loft's version is at tag [`session-17`](https://github.com/prop-loft/prop-loft/tree/session-17), and its live tracker is at [prop-loft/prop-loft](https://github.com/prop-loft/prop-loft/issues).*

---

## 1. Describing planned work

**The idea.** Your issue forms are built for **requests**: a bug report or a feature request, written by anyone, describing what's wrong or what's needed. Planned work is different. It's written by a maintainer (or a contributor who has taken it on), and it says what will be built and how anyone will know it's done. Whatever form it takes, a piece of planned work needs:

- **a goal**: one sentence saying what's true for a user when it's done;
- **context**: links rather than a retelling (the design section, the larger piece it belongs to, the request it answers);
- **acceptance criteria**: a checklist a reviewer can mark true or false when the pull request is ready, tests included;
- optionally, **where to start**, for a newcomer: which file, which function to imitate, which test to copy.

**The default: a task form.** Add a third issue form, `.github/ISSUE_TEMPLATE/task.yml`, that asks for exactly those four things, through a pull request like any other change. Prop Loft's [`task.yml`](https://github.com/prop-loft/prop-loft/blob/session-17/.github/ISSUE_TEMPLATE/task.yml) is a reasonable start to copy and edit. *Other ways projects do it:* a plain-Markdown issue template; GitHub's built-in *Task* issue type (available to organizations) plus a written convention for the body; or no template at all and a reviewer who insists on acceptance criteria. A form makes the shape the path of least resistance, which is why it's the default.

**Acceptance criteria aren't the definition of done.** The criteria say what *this* change must do. Your project's definition of done, in your git standards, says what *every* change must pass (reviewed, tests passing, docs updated). Don't copy the definition of done into each issue; link to it.

---

## 2. Noticing what's new, and triage

**The idea.** A project that takes reports from strangers needs a reliable way to tell *nobody has looked at this yet* from *a maintainer has read it and decided*. Without that, new issues sit unanswered, and an unanswered issue tells a would-be contributor that nobody's home. Your communication norms already promise a response time; this is how you keep the promise.

**Triage** is what happens once you've noticed: read the issue, then accept it, split it, or decline it, and say why. Accepting a request means turning it into planned work: add a goal and acceptance criteria, link it to its epic, put it in a milestone. Prop Loft's search request asked for search by name *and* filters by category and size; triage kept search by name in the first milestone and moved the filters into a task of their own for the second. Leave the original request in place and add the task below it, so anyone can see what was asked for and what was decided.

**The default: a `needs triage` label the request forms apply.** It's explicit, and the label's filter is your to-do list.

1. **Create the label** (Issues → Labels → New label). It isn't one of GitHub's defaults.
2. **Have your request forms apply it.** In `bug_report.yml` and `feature_request.yml`, add it to the `labels:` line, for example `labels: ["bug", "needs triage"]`. Leave it off the task form: a task is already decided. *A form only applies labels that already exist in the repository, and it skips missing ones without a warning. Create the label first, then file a test issue to check that it's applied.*
3. **Take it off when you triage**, whatever the decision.

Prop Loft's [bug form](https://github.com/prop-loft/prop-loft/blob/session-17/.github/ISSUE_TEMPLATE/bug_report.yml) shows the `labels:` line.

**Other ways that work:**

- **A column on the board.** If you use a board with auto-add (§5), new issues can land in a *New* status instead of Backlog, and the column is the queue. Nothing extra to create; it only works if you look at the board.
- **"No labels means untriaged."** Zero setup, and fine for a small project, until your forms start applying labels automatically.
- **A person and a rhythm.** Someone reads everything opened since last time, every week. Larger projects usually pair this with one of the above, often rotating who does it.

Whichever you choose, say it in CONTRIBUTING or your communication norms, so a reporter knows what happens after they file.

---

## 3. Epics: grouping work by value

**The idea.** Ten issues are hard to reason about; three or four pieces of user-visible value aren't. Group work under the value it delivers (*check out and return*), not the code it touches (*backend*). Three to five groups cover most first versions.

**The default: parent issues with sub-issues, labeled `epic`.**

1. **Create the `epic` label** (Issues → Labels → New label). Add it to the labels table in CONTRIBUTING so a newcomer knows what it means.
2. **Open one issue per epic**, through the task form, labeled `epic`. Its acceptance criteria describe the whole slice working, plus "every sub-issue is closed."
3. **Hang the work under it.** At the bottom of the epic's description, **Create sub-issue** opens a new issue already linked to it; the menu beside it, **Add existing issue**, links one you already have. The epic shows a progress bar as its sub-issues close.

An epic you won't reach for a while doesn't need sub-issues yet. Write its goal and scope, say it gets broken down when it's next, and link it from your roadmap. Prop Loft's [*Roles and phone layout*](https://github.com/prop-loft/prop-loft/issues?q=label%3Aepic) epic is written this way.

> **📷 Screenshot to come:** Prop Loft's *Find an item* epic, showing its sub-issues and progress bar.

*Other ways:* an **issue type** named *Epic* (organization settings → Issue types), which does the same job as the label without cluttering the label list; or, when each epic is also a release, **one milestone per epic**. Sub-issues are the part worth keeping either way: they're what gives an epic its progress bar.

---

## 4. Milestones: grouping work by date

**The idea.** Some things have to be true by a date: a demo, a release, a trial with real users. Group the work that has to be done by then, and check that it fits before you trust the date.

**The default: GitHub milestones.**

1. **Issues → Milestones → New milestone.** Give it a title that says what it delivers (*M1 · Demo-able core*), a due date, and a one-line description of what's true when it closes.
2. **Put each issue in at most one milestone** (the *Milestone* box in the issue's sidebar). The milestone page shows what's open, what's closed, and the percent complete.
3. **Count the hours before you trust the date.** Add up the hours the people involved actually have before the due date, and leave room for review. If the issues don't fit, cut until they do, and say in your roadmap what moved and why. A milestone that fits and closes on time does more for a project than an ambitious one that slips.

Detail the next milestone fully and the one after it loosely. Plans get more accurate as you get closer, so writing detailed issues for work two months out mostly means rewriting them later.

*Other ways:* a date field on the board, or an *Iteration* field for fixed-length cycles. Milestones are the default because they live on the repository itself, where a visitor finds them without the board.

*In this course: M1 is what you'll demo at the progress demo, and M2 is the finished MVP. Both dates are on the Canvas calendar.*

---

## 5. The board: showing state

**The idea.** Anyone looking at the project should be able to see, in a few seconds, what's waiting, what's being worked on, what's waiting for review, and what's done. The states should be the ones your work *actually* passes through, not someone else's template.

A board isn't part of a repository. On GitHub it's a separate **Project** that holds issues and pull requests from one or more repositories. Since your repository lives in an organization, create the Project there.

**The default: a public GitHub Project, five columns, auto-add on.**

1. **Create it.** On your organization's page, open **Projects** → **New project** → **Board** (under *Start from scratch*). Name it for the project. Check **Import items from repository** and choose your repository; that brings in every existing issue now.
2. **Set the columns.** The board's columns are the options of its **Status** field. A new board starts with *Todo / In Progress / Done*. The default here is five:

   | Status | Means |
   |---|---|
   | **Backlog** | Decided, but not ready to start |
   | **Ready** | Acceptance criteria written; anyone can pick it up |
   | **In progress** | Someone has said they're on it |
   | **In review** | A pull request is open and waiting for review |
   | **Done** | Merged and closed, per the definition of done |

   Edit them from any column's **⋯** menu, or from the project's **⋯** → **Settings** → **Status**. Change them to fit how your project works (a *New* column if that's how you notice new issues, say), but keep a review state: every project here works through pull requests, and *In review* is where your review policy is either kept or quietly skipped.
3. **Turn on the automation.** Open **⋯** → **Workflows**. Two workflows are on already: *Item closed* and *Pull request merged* both set the status to Done. Turn on **Auto-add to project** too: choose your repository, use the filter `is:issue,pr is:open`, and save. New issues and pull requests then land on the board by themselves. *(A free organization gets one auto-add workflow, and it only catches items created after you turn it on. That's why step 1 imported the existing ones.)*
4. **Make it public, then link it.** **A new project is private by default**, even when the repository is public, so a visitor would see nothing. Open **⋯** → **Settings**, find **Visibility**, and choose **Public**. Then, in your *repository*, open the **Projects** tab → **Link a project** → choose it. Now the board is one click from the repository, and each issue's sidebar shows its status.
5. **Add the views you'll actually use.** Views are free, and the board stays the default. Two are worth having: a board **grouped by milestone** (*what's left before the demo?*) and one **grouped by parent issue** (*how is each epic doing?*). Use **+ New view**, then the view's menu → **Group by**.

> **📷 Screenshot to come:** Prop Loft's board, five columns, with cards in Backlog, Ready, and In progress.

> **📷 Screenshot to come:** the Workflows page with *Auto-add to project* turned on.

Then place the cards. Everything starts in **Backlog**. Move to **Ready** only what's actually ready (acceptance criteria written, nothing it depends on unfinished), and to **In progress** only what someone is working on now. A board where everything is "In progress" tells a reader nothing.

---

## 6. Contribution pathways

The board shows the people already working what's next. A newcomer needs something more specific: a way in.

- **Mark two or three issues as starting points**, and mean it. Each should be small, need no knowledge of the project's history, and have a **Where to start** section. The default marker is GitHub's `good first issue` label, which GitHub itself uses to surface beginner-friendly work to newcomers, so there's rarely a reason to change it. Prop Loft's [item detail page](https://github.com/prop-loft/prop-loft/labels/good%20first%20issue) issue is the model: which file to add to, which existing view to imitate, which test to copy.
- **Link the plan from the front door.** A line in the README and in CONTRIBUTING is enough: what's in progress is on the board; what's coming, and where a bigger contribution fits, is in `docs/roadmap.md`. Prop Loft's [roadmap](https://github.com/prop-loft/prop-loft/blob/session-17/docs/roadmap.md) is one example.

---

## Keeping it true

A board shows the truth only if it's updated as the work moves. A few habits do most of it:

- **Move your own card** when you start something, and say so in the issue ("I'm on this").
- **Write `Closes #N`** in a pull request's description. When it merges, the issue closes and its card moves to Done by itself.
- **Triage on a rhythm**, using whatever way of noticing new issues you chose in §2.
- **Re-plan when a milestone slips.** Move the issues that won't make it, update the roadmap, and write one line about what you learned. A moved date with a reason is fine. A plan that quietly stops matching the work misleads everyone who reads it.

---

## When something doesn't look right

- **Issues are missing from the board.** Auto-add only catches new items. Add older ones from the board's **+ Add item** row (type `#` to search the repository), or check the workflow's filter.
- **Others can't see the board.** It's still private: **⋯** → **Settings** → **Visibility**.
- **The repository has no Projects tab.** Turn it on in the repository's **Settings** → **General** → **Features** → **Projects**.
- **A merged pull request didn't close its issue.** The description has to say `Closes #N` (or `Fixes`/`Resolves`), and the pull request has to merge into the default branch.
- **An issue filed through a form is missing a label.** The label doesn't exist in the repository, or its name in the form's `labels:` line doesn't match exactly. Create it (or fix the spelling) and add it to the issue by hand; the form applies it from then on.
- **There's no Create sub-issue button.** It sits at the bottom of the issue's *description*, not its comments. Scroll up.

---

## Going further

- GitHub Docs — [*Best practices for Projects*](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects): the reasoning behind this page (break big issues down, keep one source of truth, let automation update status).
- GitHub Docs — [*Quickstart for Projects*](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/quickstart-for-projects): the full tour, including iteration fields, roadmap views, and charts. It's built for a larger team than yours. Take what helps.
- GitHub Docs — [*Adding sub-issues*](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues), [*About milestones*](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones), [*Using the built-in automations*](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations), and [*Syntax for issue forms*](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms).
