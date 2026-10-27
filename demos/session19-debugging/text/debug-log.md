**Debug log**

- **What I saw:** after checking out one item (the black Victorian waistcoat, to Sam, due Dec 5), every item in the list read "Out · due Dec 5."
- **What I suspected:** first, that the admin had saved more than one checkout. It hadn't: the admin lists one. Then, that the template printed the marker whatever the data said. It didn't: a log line in the view showed Dec 5 arriving for every item. That left the query.
- **What it was:** the subquery that finds an item's open checkout wasn't tied to the item, so every row got the first open checkout in the whole table. Fixed by filtering on `item=OuterRef("pk")`. The tests had only ever put one item in the database at a time, so a new test lists an item that's in next to one that's out.
