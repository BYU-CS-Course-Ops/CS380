### The problem

The item list shows each item's name and bin, but nothing else. A volunteer deciding whether a costume will work needs its size and condition too, and there's no page that shows one item in full.

### Who has this problem

Wardrobe volunteers choosing between similar items.

### What you do today instead

Open the item in the Django admin, which volunteers shouldn't need access to.

### An idea for how it could work (optional)

A detail page at `/items/<id>/` showing name, category, size, condition, and bin, linked from each row of the item list.

**Where to start** (this is a good first issue):

- Add a view next to `item_list` in `catalog/views.py`, using `get_object_or_404`.
- Add its URL in `catalog/urls.py`, and a template beside `catalog/templates/catalog/item_list.html`.
- Add a test in `catalog/tests.py`, modeled on `ItemListTests`: create an item, request its page, and check that its fields appear. Also test that a missing item returns 404.
