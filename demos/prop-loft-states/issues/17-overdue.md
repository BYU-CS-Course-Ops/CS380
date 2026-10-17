### Goal

The wardrobe lead sees every overdue item, and who to chase, on one page.

### Context

Design §4, Checkout (an item is overdue when its due date has passed with no return). Part of #{{E2}}. Needs #{{RETURNS}}. Who can see it is #{{E4}}'s job; for now, anyone signed in.

### Acceptance criteria

- [ ] `/overdue/` lists open checkouts past their due date: item, actor, show, days overdue, oldest first.
- [ ] A returned item drops off the list.
- [ ] Tests cover an overdue item, one due today (not overdue), and a returned one.
