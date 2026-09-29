*A short, practical guide written for CS 301R. It covers the first hour of a project's public life: giving it a home, putting the minimum in the front window, and letting your teammates in. Everything past that minimum — branching rules, review policy, contribution templates — gets its own sessions, so this page stops short on purpose.*

---

## Why the repository comes first

Every project that outlives its first month has a home that doesn't belong to any one person's laptop. Until then, the "project" is a few files on someone's machine and a group chat — and if that someone gets busy, graduates, or leaves, the project goes with them.

That is why the first concrete act of founding is **creating the place the work lives**, and creating it so it can outlast any single contributor, the founder included. Open-source projects that last almost never live under one person's account for long. They move to an **organization**: a shared owner the project can belong to, with more than one person holding the keys.

You're going to start there, rather than migrating later the way most projects do. *(In this course, that happens at your team's first meeting, the week teams are announced — and your design document is the first real thing you commit.)*

---

## The decisions, and the defaults we're using

**Where it lives: an organization per project.** Create a free GitHub organization named for your *project*, not for you or your team. An organization lets ownership be shared, survives any one member leaving, and signals to a stranger that this is a project rather than someone's homework. Personal-account repositories can be transferred to an organization later, but every link, clone, and bookmark then has to follow — cheaper to start in the right place.

**Who holds the keys: at least two owners.** A project with one owner is one lost password away from being orphaned. Make the founder an owner and name a **second owner** from the team. Everyone else joins as a member with write access. *(Working solo? You're the only owner for now. Adding a second owner is one of the first things you'd do when a contributor proves themselves.)*

**Who can see it: public, from the first commit.** Building in the open means the history is visible from day one — the design arguments, the false starts, the decisions that got reversed. That's the point: a future contributor who can read *why* the project is shaped the way it is can join it far more easily. It also means two things you must get right immediately, both covered below: **a license**, and **nothing private in the repo, ever.**

**What it's called: decide deliberately, but don't agonize.** The organization and repository names become your project's URL. A working name is fine. Check that it's free on GitHub, and avoid anything that collides with an existing well-known project.

---

## Setting it up

The founder does steps 1–3 with the team watching; everyone does step 4.

1. **Create the organization.** On GitHub: the **+** menu → **New organization** → the **Free** plan. Name it for the project. When it asks who the organization belongs to, choose your personal account.
2. **Invite the team.** In the organization's **People** tab, invite each teammate. Make one of them an **Owner** alongside you; the rest can be members.
3. **Create the repository** inside the organization, set to **Public**, with three things added at creation time — GitHub offers all three on the form:
   - **a README.** One paragraph for now: what the project is, who it's for, and a line saying it's early (*"Design in progress"*). It will grow into the project's front door.
   - **a `.gitignore`** for the language or framework you expect to use. This is your first guard against committing things that don't belong.
   - **a license.** Use your team's working choice — whichever of your license recommendations the team agrees on (the <course-link type="page" id="pg-license-cheat-sheet">License Cheat Sheet</course-link> has the trade-offs). A public repository with no license is legally *all rights reserved*: anyone can look, but no one may reuse it. Changing the license is cheap now, while you're the only authors. It gets much harder once outside contributors have code in the project, because their contributions came in under the old terms. *(In this course you confirm or change the choice in the license clinic a few weeks from now.)*
4. **Everyone clones it and pushes once.** Accepting the invitation isn't the same as having access working. Set your git identity (`user.name` and `user.email`) on the machine you'll use, clone the repository, and push one small commit — adding your name to a *Maintainers* line in the README is the usual first one. If the push works, you're in.

Then make the first real commit: **`docs/design.md`** — the <course-link type="page" id="pg-design-doc-template">Design Document Template</course-link>, copied in, ready for your team's draft. A design document is a project artifact in the fullest sense: it's the first thing a future contributor will look for when they ask why the project is shaped the way it is.

That's the whole setup. If it took more than an hour, something is being overbuilt.

---

## What never goes in a public repository

A public repository is **public forever**. Deleting a file removes it from the current version, not from history, and public repositories are scanned by automated bots within minutes of a push. So, from the very first commit:

- **No secrets.** API keys, passwords, tokens, database connection strings, `.env` files. Put them in environment variables and add the file that holds them to `.gitignore` *before* you create it. If one slips in anyway, treat it as leaked: revoke and replace the key first, then clean up the history.
- **No one else's personal information.** Your discovery interviews were conducted under a promise of confidentiality. Interview notes, names, contact details, and recordings stay out of the repository entirely. The *findings*, written up without identifying anyone, can go in. *(See <course-link type="page" id="pg-interview-ethics">Interview Ethics for Students</course-link>.)*
- **Nothing you'd be embarrassed to have a future employer read.** Commit messages and issue comments are part of the public record too.

---

## What stays out, even though it's yours

Not everything the team writes belongs in the project. A **team charter** or working agreement — who covers what, how fast you answer each other, what happens when someone slips — is internal: promises among the people already inside, and usually amended after a hard week. Teams keep documents like that on an internal wiki or a shared drive, not in the public codebase. The parts of it a stranger needs — who maintains the project, how decisions get made, where the project talks — do go public, rewritten for outsiders, as the project's governance and contributing documents. *(In this course, that's the Infrastructure Package.)*

The test: **would a future contributor need this to understand or join the project?** If yes, it belongs in the repository. If it's about how the current team works together, it belongs with the team.

---

## What this page deliberately doesn't cover

Branch protection, review requirements, pull request and issue templates, `CONTRIBUTING.md`, and a real README are the next few weeks of the course: first how your team works in the repository (git workflow and your team's git standards), then what a stranger finds when they arrive (the project's front door). Setting them up now, before you've decided how you want to work, mostly means setting them up twice.

Until then, one working rule: **commit with care, even before the rules exist.** Small commits, clear messages, nothing private. Those habits cost nothing now and are expensive to retrofit.

---

## What to hand in

The URL of the repository — for example, `https://github.com/your-project/your-project`. *(In this course, it goes in section 1 of your <course-link type="assignment" id="charter">Team Charter</course-link>. Your instructor needs nothing but the URL: the repository is public.)*
