### Goal

A volunteer checks an item out to an actor for a show, from the item's page, on a phone.

### Context

Design §4, Web UI and Checkout; §4, *The failure case* (keep form input on a failed save). Part of #{{E2}}. Needs #{{MODEL}} and #{{DETAIL}}.

### Acceptance criteria

- [ ] The item page has a check-out form: actor, show, due date.
- [ ] Checking out an item that's already out shows who has it, and saves nothing.
- [ ] A failed save keeps what the volunteer typed.
- [ ] Tests cover a checkout, an already-out item, and a failed save.
