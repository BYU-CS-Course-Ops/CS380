## Problem

A volunteer on the shop floor needs to answer "do we own this?" fast. Right now the catalog is one long list, so finding a costume means scrolling.

## Approach

Search by item name only, which is the first step of the design's core flow (docs/design.md §4). A plain GET form, so a search is a URL you can bookmark. The match is a case-insensitive "contains," so "bustle" finds "Bustle skirt, black."

Category and size search are deliberately left out of this PR to keep it small.

## What to look at first

1. `catalog/views.py`: the whole behavior change is four lines.
2. `catalog/tests.py`: do these cover what a volunteer would actually type?

## How to try it

`python manage.py runserver`, add a couple of items in the admin, and search from the home page.
