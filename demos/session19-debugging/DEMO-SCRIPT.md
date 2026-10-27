# Session 19 debugging vignette — run sheet

The live part of `lectures/Session19-Nov09-Outline.md` §5, about **six minutes**. The point isn't the bug. It's watching someone run the loop calmly: name the failure, list more than one hypothesis, test the **cheapest** one first, be wrong out loud, let evidence decide, pin the defect with a failing test, fix it, check the fix didn't break the slice, write three lines.

Commands assume the clone at `~/repos/prop-loft-debug` (see `demo.conf`). Talking points are in *italics*.

---

## A. Before class

1. **Reset the demo:** `demos/session19-debugging/setup.sh`. Expect `OK` from the tests at the end (eleven of them).
2. **Start the server** in a terminal you'll keep visible (its log is part of the evidence):
   ```sh
   cd ~/repos/prop-loft-debug && .venv/bin/python manage.py runserver
   ```
3. **Open in the browser:** the list, `http://127.0.0.1:8000/`, and the admin, `http://127.0.0.1:8000/admin/`, logged in (`maintainer` / `local-demo-only`). Leave the admin on **Catalog → Checkouts → Add**.
4. **Open in the editor:** `catalog/views.py` and `catalog/tests.py` (scrolled to `OutMarkerTests`).
5. **Font size up** in the terminal, editor, and browser: the back row has to read a date.
6. A second terminal in the clone, for `git` and `manage.py test`.
7. **The deck** open in presenter view on slide 14. Each step below says which slide and click goes with it; slides 15–18 are the vignette. Practice the switch between the deck, the browser, and the terminal once (Alt-Tab, or a second screen for the deck).

---

## B. The vignette (~6 min)

### 1. Walk the slice and see the failure (~45 s)

> **Deck:** slide 15 up, no clicks yet; its bar reads *every row, and the same date*. Switch to the browser for the walk, back to the slide to name the failure.

In the admin, add a checkout: **Item** *Victorian waistcoat, black* · **Person** *Sam Ellis* · **Show** *The Importance of Being Earnest* · **Due date** *2026-12-05* · **Save**. Switch to the list tab and reload.

Every row reads **Out · due Dec 5**.

*"One item is out. The list says five are. Before I touch anything, I say the failure exactly, because the description is the first piece of evidence: every item, out, **and all with the same date.**"* Write *same date on every row* on the board.

### 2. Hypotheses: more than one (~45 s)

> **Deck:** slide 15, **click 1**: the three hypotheses appear. Write them on the board too if you like; the slide is the record.

On the board, three, each naming where the fault could be:

1. **The data:** the admin save made a checkout for every item.
2. **The display:** the template prints the marker whatever it's given.
3. **The query:** the view hands every item the same due date.

*"Which do I believe? Honestly, the first: I've fat-fingered admin forms before. But I don't test the one I believe first. I test the one that's cheapest to check, and that happens to be the same one."*

### 3. Test the cheapest one: wrong, out loud (~30 s)

> **Deck:** after the admin shows one row, slide 15 **click 2**: *Wrong: the admin lists one.*

Admin → **Checkouts**. One row.

*"Wrong. There's one checkout. That cost thirty seconds, and it took the data off the table. A dead hypothesis is progress: say so, and move on."* Cross out hypothesis 1.

### 4. One log line splits the other two (~1 min)

> **Deck:** after the server log shows Dec 5 for every item, slide 15 **click 3**: the display guess dies and the query guess stands.

In `catalog/views.py`, just before `return render(...)`, paste `text/print-line.txt`:

```python
    print([(item.name, item.due_back) for item in items])
```

Save (the dev server reloads itself), reload the list, and point at the server's terminal: every item, `datetime.date(2026, 12, 5)`.

*"The template is innocent: it's printing exactly what it's handed. The view hands every item Dec 5. That's the third hypothesis, and now it has evidence, not just my belief."* Cross out hypothesis 2.

### 5. Isolate the defect (~1 min)

> **Deck:** stay in the editor. Slide 17 recaps this chain after the fix, so a quick version is enough here.

Second terminal: `git log --oneline -3`. The newest commit is *Mark checked-out items in the list*, the one that added `due_back`. Read the two lines in `views.py` aloud:

```python
    open_checkouts = Checkout.objects.filter(returned_date__isnull=True)
    ...due_back=Subquery(open_checkouts.values("due_date")[:1])
```

*"Open checkouts... of what? Of anything. Nothing ties this to the row's item, so every row gets the first open checkout in the whole table. That's why the date was the same everywhere."* Point back at the board.

Walk Session 15's chain backward, the way an investigation does: the **failure** is what we saw (every row out); the **fault** is what goes wrong at runtime (the subquery returns the first open checkout's date, for every row); the **defect** is the line that causes it (a subquery not tied to its item); the **error** was mine (I wrote the filter and forgot the item). *"The hypotheses were guesses about where along that chain the defect was."*

### 6. Pin it with a failing test before fixing it (~1 min)

> **Deck:** slide 16 shows the failing test's output and *Why the tests missed it* with no clicks, as a backup if the terminal is hard to read from the back.

*"Why didn't the tests catch it?"* Scroll `OutMarkerTests`: one test checks an item that's out, alone; one checks an item that's in, alone. **Never one of each.** The bug only exists when both are in the database.

Apply the test (typing it takes too long):

```sh
git apply .demo/patches/regression-test.patch
.venv/bin/python manage.py test catalog.tests.OutMarkerTests
```

*(`.demo` is the clone's link back to this kit; `setup.sh` makes it.)*

It **fails**, and the diff says it plainly: `'Bowler hat': datetime.date(2026, 12, 5)` where `None` was expected. *"Now the bug is pinned. A test that fails for the right reason is the best evidence there is, and it stays in the suite, so this bug can't come back quietly."*

### 7. Fix, verify, check the slice (~45 s)

> **Deck:** slide 16 **click 1** when the fix is in (the diff and *Run everything*), **click 2** after the waistcoat search (*Did it break the slice?*).

In `views.py`: import `OuterRef` beside `Subquery`, and filter on the item:

```python
from django.db.models import OuterRef, Subquery
...
    open_checkouts = Checkout.objects.filter(item=OuterRef("pk"), returned_date__isnull=True)
```

Delete the `print` line. Run the whole suite: `.venv/bin/python manage.py test` → **12 tests, OK.** Reload the list: only the black waistcoat is out.

*"Last step of the loop: did the fix break the slice?"* Search **waistcoat**: both waistcoats listed, the black one *Out · due Dec 5*, the gold one *In*. The slice still walks.

### 8. Three lines (~30 s)

> **Deck:** slide 17 (the chain, one click per step back, then the bar), then slide 18 (the log; click 1 *where it goes*, click 2 *when it's required*).

Show `text/debug-log.md` (or the slide with it):

- **What I saw** · **What I suspected** · **What it was**

*"Three lines. This bug was on my own branch before review, so they go in the pull request's description. If someone had reported it, they'd go in their issue. Either way, the next person who sees every row marked out finds this in one search, and so do I, at the retrospective."*

---

## Contingencies

- **The room calls the query right away.** Good: *"Maybe. Which test is cheapest?"* Run step 3 anyway. The lesson is the ordering, cheapest first, and that a confident guess still gets tested.
- **The admin form fights you** (a date widget, a typo): the dev server's database is local; `setup.sh` resets it in under a minute if needed. Or create the checkout from the shell:
  ```sh
  .venv/bin/python manage.py shell -c "from datetime import date; from catalog.models import *; Checkout.objects.create(item_id=1, person_id=1, show_id=1, due_date=date(2026, 12, 5))"
  ```
- **The live edit goes wrong:** `git checkout -- catalog && git apply .demo/patches/fix.patch`, then run the tests. It's the test and the fix together.
- **The server won't start or the projector fails:** narrate it from the slides; the failing test's output and the two lines of `views.py` carry the story without a browser.
- **Running long:** cut step 7's slice check to one sentence. Never cut step 3: the wrong hypothesis is the realistic part.

## After class

Nothing to clean up: nothing was pushed. Run `setup.sh` again before the next rehearsal or section.
