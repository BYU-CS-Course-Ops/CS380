### Goal

A search that finds nothing says so, instead of showing an empty page that looks broken.

### Context

Part of #{{E1}}. Needs #{{SEARCH}} first.

### Acceptance criteria

- [ ] When nothing matches, the list shows *No items match "…"* with the search text.
- [ ] The message includes a link that clears the search.
- [ ] A test checks the message for a search with no matches.

### Where to start (optional)

This is a good first issue. The item list template is `catalog/templates/catalog/item_list.html`; Django's `{% empty %}` clause on the `{% for %}` loop is the whole trick. Copy a test from `ItemListTests` in `catalog/tests.py`.
