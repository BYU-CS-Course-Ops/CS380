*A reference written for CS 301R: where GitHub's issue and pull request templates live, the two formats issue templates come in, a copy-ready skeleton for each, and three real projects' versions to compare. Copy a skeleton, then make every line about your project.*

---

## Why templates

Every project that takes reports from people it doesn't know ends up asking the same questions in every thread: *what did you do, what did you expect, what happened instead, what version?* A template asks them once, in advance, every time. Whatever your template asks for is what you'll get, so it's where your reporting norms stop being advice and become the default.

The same goes for pull requests. The description a reviewer needs (the problem, the approach, where to look first) and the checks your project requires before merging (tests pass, docs updated) can sit in the box every author starts from, instead of in a document they may not have read.

Templates are cheap to set up early and awkward to retrofit after a hundred issues have arrived in a hundred shapes.

---

## Where the files go

All of it lives in a `.github/` folder at the root of your repository, and none of it takes effect until it's merged to your **default branch** (usually `main`).

| File | What it does |
|---|---|
| `.github/ISSUE_TEMPLATE/bug_report.md` or `.yml` | One issue template. Each file in this folder becomes a choice when someone clicks **New issue**. Name the files whatever you like. |
| `.github/ISSUE_TEMPLATE/config.yml` | Controls the chooser itself: whether a blank issue is allowed, and extra links (for example, "report a conduct problem privately"). Optional. |
| `.github/pull_request_template.md` | Pre-fills the description of every new pull request. |

GitHub also accepts the PR template at the repository root or in `docs/`, but `.github/` keeps all of this in one place.

---

## Issue templates: two formats

| | Markdown template (`.md`) | Issue form (`.yml`) |
|---|---|---|
| What the reporter sees | One text box, pre-filled with your headings and hints | Separate labeled fields: text areas, one-line inputs, checkboxes, dropdowns |
| Can a reporter skip a part? | Yes: they can delete anything | Not if the field is `required: true` |
| How the issue reads | Whatever they left in the box | Your field labels as headings, their answers under each |
| Effort to write | A few minutes | A bit more: it's YAML, and indentation matters |
| Good when | You want light guidance, or you're starting out | A missing step or version costs you a round trip every time |

Both formats can apply labels automatically, and you can mix them: a form for bugs, Markdown for everything else. **Create every label before a template names it.** GitHub's documentation says a form silently skips a label the repository doesn't have; creating labels first avoids the question for either format.

### A Markdown bug template

`.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Something doesn't work the way it should
title: ""
labels: bug
assignees: ""
---

<!-- One problem per report, please. Delete these hints as you fill it in. -->

**Steps to reproduce**
1.
2.
3.

**What you expected to happen**

**What actually happened**
Include the exact error message, if there was one.

**Environment**
Your OS and browser, and the version or commit you're running.

**Anything else**
Logs, screenshots, how often it happens.
```

The block between the `---` lines is front matter: `name` and `about` are what the chooser shows, and `labels` are applied to every issue filed from it. Text inside `<!-- -->` is a comment: the reporter sees it while writing, and it doesn't show in the posted issue.

### The same bug template as a form

`.github/ISSUE_TEMPLATE/bug_report.yml`:

```yaml
name: Bug report
description: Something doesn't work the way it should.
labels: ["bug"]
body:
  - type: checkboxes
    id: searched
    attributes:
      label: Before you file
      options:
        - label: I searched the open and closed issues, and this hasn't been reported.
          required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: Numbered, starting from somewhere a stranger can get to.
      placeholder: |
        1. Go to ...
        2. Click ...
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: What you expected to happen
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: What actually happened
      description: Include the exact error message, if there was one.
    validations:
      required: true
  - type: input
    id: environment
    attributes:
      label: Environment
      placeholder: Firefox 131 on Windows 11, v0.2.0
    validations:
      required: true
  - type: textarea
    id: evidence
    attributes:
      label: Anything else
      description: Logs, screenshots, how often it happens.
```

Each item under `body` is one field. `textarea` is a multi-line box, `input` is one line, `checkboxes` is a list of boxes, `dropdown` is a fixed set of choices, and `markdown` is text the reporter reads but doesn't fill in. A field with `validations: required: true` must be filled before the issue can be submitted.

### A feature-request form

A feature request has its own anatomy: **the problem, who has it, and what they do today**, with any proposed solution last. Starting from the problem keeps a request from becoming a solution order you have to reverse-engineer.

`.github/ISSUE_TEMPLATE/feature_request.yml`:

```yaml
name: Feature request
description: Suggest something the project should do.
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: Start with the problem, not the solution. A clear problem can be solved several ways.
  - type: textarea
    id: need
    attributes:
      label: The problem
      description: What are you trying to do, and what gets in the way?
    validations:
      required: true
  - type: input
    id: who
    attributes:
      label: Who has this problem
    validations:
      required: true
  - type: textarea
    id: workaround
    attributes:
      label: What you do today instead
      description: The workaround tells us how much this costs you now.
    validations:
      required: true
  - type: textarea
    id: idea
    attributes:
      label: An idea for how it could work (optional)
```

### The chooser: `config.yml`

`.github/ISSUE_TEMPLATE/config.yml`:

```yaml
blank_issues_enabled: true
contact_links:
  - name: Report a code of conduct problem
    url: https://github.com/YOUR-ORG/YOUR-REPO/blob/main/CODE_OF_CONDUCT.md
    about: Conduct reports are private. Please don't file them as issues.
```

`blank_issues_enabled: false` hides the "blank issue" option from people outside the project, so every report starts from a template. Leaving it `true` is reasonable while a project is small, so nothing that doesn't fit a template gets turned away. A contact link sends one kind of report somewhere other than a public issue.

### A shortcut for Markdown templates

GitHub can write a starter for you: **Settings → General → Features → Issues → Set up templates**, then add a bug report or feature request, edit it, and commit it through a pull request. The starter is generic on purpose, so edit it: it asks every project, including a command-line tool, which smartphone the reporter was using. *Adapt, don't adopt* is the rule for anything a stranger wrote for every project at once.

---

## The pull request template

There's no form version for pull requests: the template is Markdown, and its text pre-fills the description box when someone opens a pull request. Two halves do the work:

1. **The description a reviewer needs.** What the change fixes or adds, how, where to start reading, and how it was tested. This is the description you've been writing by hand.
2. **Your project's checks, as a checklist.** Copy them from your git standards (your definition of done), so the author confirms each one before asking for review.

`.github/pull_request_template.md`:

```markdown
<!-- Thanks for contributing! Fill in each section; delete the hints. -->

**Problem.** What does this change fix or add? Closes #

**Approach.** How you solved it, and anything you considered and rejected.

**Where to look first.** The file or function a reviewer should start with.

**How you tested it.**

### Checklist (from our [git standards](https://github.com/YOUR-ORG/YOUR-REPO/blob/main/docs/git-standards.md))

- [ ] One logical change, small enough to review in one sitting
- [ ] Commit messages follow our conventions
- [ ] The tests pass
- [ ] Docs updated if behavior changed
```

Use a full URL for links in the template (a relative link may not resolve in a pull request description). `Closes #12` in a pull request's description closes issue 12 when the pull request merges. Leaving `Closes #` in the template reminds the author to link one.

*Your template is your review policy, made unavoidable: every author sees your checklist before they ask for a review. In this course, the checklist is your git standards' definition of done.*

---

## Check that it works

1. Merge the templates to your default branch. Until then, nothing changes.
2. Click **New issue**. The chooser should list each template, plus any contact links.
3. File one test issue through each template, and check that its labels landed. Then close it.
4. Open a draft pull request from any branch, and check that the description box arrives pre-filled. Close it without merging.

---

## Three real projects to compare

- **Prop Loft** (the course's worked example) — [`.github/` at tag `session-16`](https://github.com/prop-loft/prop-loft/tree/session-16/.github): issue **forms** for bugs and feature requests, both applying a `needs triage` label so new issues are easy to find; a `config.yml` that sends conduct reports to the code of conduct instead of a public issue; and a PR template whose checklist links its git standards.
- **Rich** (a popular Python library) — [`.github/`](https://github.com/Textualize/rich/tree/main/.github): **Markdown** templates that do a lot. The bug template opens with "I searched the docs and closed issues" checkboxes and asks for the output of a diagnostic command, which captures the environment in one paste. Both the bug template and the PR template say, in a comment, that the project isn't accepting new features: saying no once, in writing, instead of in every thread.
- **mdx-canvas** (a BYU course-tools project) — [`.github/ISSUE_TEMPLATE/`](https://github.com/BYU-CS-Course-Ops/mdx-canvas/tree/main/.github/ISSUE_TEMPLATE): **Markdown** templates that are GitHub's generated starters, unchanged. They work, and they show what a starter looks like before anyone adapts it, including the smartphone section a command-line tool doesn't need.

---

## Common mistakes

- **The templates live on a branch.** They do nothing until they're merged to the default branch.
- **A label the template names doesn't exist.** Create labels first.
- **The starter, unedited.** A template that asks the wrong questions trains reporters to ignore it.
- **Too many required fields.** Every required field is a reason for someone to give up and not report at all. Require what you can't act without.
- **A PR checklist nobody can check.** "Code is good" isn't checkable; "`python manage.py test` passes" is.

---

## References

- GitHub Docs — [*Configuring issue templates for your repository*](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) (Markdown templates, the template builder, `config.yml`)
- GitHub Docs — [*Syntax for issue forms*](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms) and [*Syntax for GitHub's form schema*](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema) (every field type and option)
- GitHub Docs — [*Creating a pull request template for your repository*](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)
- GitHub Docs — [*Managing labels*](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
