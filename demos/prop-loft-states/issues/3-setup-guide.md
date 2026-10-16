### The problem

Setup instructions are a six-command block in the README. It works for someone who already knows Django, but it says nothing about what success looks like after each step, and nothing about what to do when a step fails. The first time a newcomer hits `KeyError: 'DJANGO_SECRET_KEY'`, they have no idea what it means.

### Who has this problem

Anyone setting up Prop Loft for the first time: a new contributor, or a theater volunteer trying it out.

### What you do today instead

Ask the maintainer, or give up.

### An idea for how it could work (optional)

A `docs/setup.md` guide: prerequisites with versions, numbered steps, a "you should see" checkpoint after each step that can quietly fail, how to run the tests, and the common failures with their fixes. Keep a short quickstart in the README that links to it. Once it's written, someone who didn't write it should follow it cold, from a fresh clone, and every place they get stuck should be filed as an issue.
