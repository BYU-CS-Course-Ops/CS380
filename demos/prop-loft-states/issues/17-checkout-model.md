### Goal

Prop Loft records who has an item, for which show, and when it's due back, and never lets one item be checked out twice.

### Context

Design §4, Checkout; §5, the checkout record. Part of #{{E2}}. The rest of the epic builds on this.

### Acceptance criteria

- [ ] A `Checkout` model with item, actor, show, due date, and an optional returned date, registered in the admin.
- [ ] The database refuses a second open checkout for the same item (a constraint, not just a form check).
- [ ] Tests cover a first checkout, a refused second one, and a second one after a return.
