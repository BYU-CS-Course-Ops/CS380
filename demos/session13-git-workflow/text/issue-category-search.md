The design (docs/design.md §4) says Catalog searches "by name, category, and size." Name search landed in the search PR. Category and size were deliberately left out to keep that PR small.

**What's wanted:** let a volunteer narrow the list by category (costume, prop, set piece) and by size label, alone or combined with a name search.

**Where to start:** `catalog/views.py`, `item_list`, where the name filter lives. The search form is in `catalog/templates/catalog/item_list.html`.
