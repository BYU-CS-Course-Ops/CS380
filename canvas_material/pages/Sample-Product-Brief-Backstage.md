> **This is a teaching sample.** The theater, the volunteers, and the interviews are invented for CS 301R. Read it for *shape and evidence discipline*, not as a project to copy. In your own brief, every piece of evidence must be real and yours.
>
> It is the product definition brief for the same Backstage project argued in the <course-link type="page" id="pg-sample-proposal-strong">strong sample proposal</course-link>: written earlier, before any spike or technical decision. Put the two side by side to see how a brief grows into a proposal. For what a brief like this is and isn't, see the <course-link type="page" id="pg-prd-reference">PRD reference</course-link>.
>
> **Read it for five things:**
> 1. How the user is **bounded**, with who's out stated as clearly as who's in.
> 2. How every need carries its **source**, and how the author separates evidence from guesses.
> 3. How the **ranking explains itself**, including why the most painful need is not ranked first.
> 4. How each **success criterion** could be checked by watching someone use the product.
> 5. What's **missing on purpose**: no technology, no screens, and no feature list.

---

# Backstage — Product Definition Brief

**Author:** A. Reyes · CS 301R · Product Definition Brief (CP2)

**Grounded in:** four interviews (three wardrobe leads and one props head, at three Utah County community theaters), one strike-night observation, and a persona synthesized from all four interviews. The full notes are in my Discovery Notes. **[E]** marks evidence from a real conversation or observation; **[A]** marks an assumption I haven't confirmed.

## 1. Target user

**Primary: the wardrobe or props lead at a small, volunteer-run community theater.** These are the one to three people who look after the costume and props collection year-round, decide what's kept, and get the phone call when something can't be found. [E: this role existed at all three theaters, held by one to three people] They are not technical users. Two of the four I interviewed keep their records on paper by preference, not for lack of options. [E]

**Secondary: show-time volunteers.** These are the five to ten people per production who pull, fit, and return items for about six weeks and then move on. They handle the collection but don't own it. [E that they exist and turn over; [A] for everything about their needs, because I haven't interviewed any]

**In:** volunteer-run theaters with no paid costume staff and a collection too large for anyone to hold in their head, meaning hundreds of items or more.

**Out:**
- **Professional and university theaters.** They have paid costume shops, budgets, and often an inventory system already.
- **Costume rental businesses.** Inventory is their product, and their needs (pricing, availability calendars, customers) are a different problem.
- **Box office, marketing, and other audience-facing roles** at the same theaters.
- **Actors**, except as people who borrow items.

**Persona:** *Marian, wardrobe lead at a 200-seat volunteer theater.* She is a composite of all four interviews, not a portrait of any one of them. She has run wardrobe for nine seasons and keeps the collection in a notebook and her memory. Her worst week is the one before a show opens, when every "do we have…?" question comes to her. The persona and its [E]/[A] tags are in my Discovery Notes.

## 2. The needs

Each need is something these users are trying to get done and what's in the way, not a feature.

1. **Know whether the theater already owns an item, without walking the racks.** [E: 4 of 4] Every lead described walking the racks or phoning someone at home to answer "do we have…?" One lead keeps the collection in a spiral notebook and a shoebox of printed photos. Her answer to "do we have a Victorian bustle?" was "give me twenty minutes and I'll go look."
2. **Know who has an item and when it's coming back.** [E: 3 of 4, plus the observation] Two theaters regularly lose pieces to actors who take them home for alterations, and one lead estimated "maybe fifteen things a season" come back late or not at all. At the strike I watched, three costumes were unaccounted for at the end of the night, and nobody could say who had them last.
3. **Keep what the theater knows about its collection when a volunteer leaves.** [E: 3 of 4, raised unprompted by 2] The props head inherited a storage room with no records when the previous props head moved away, and described the first season as "rediscovering our own stuff."
4. **Let show-time volunteers record what they take or add without training.** [A] This is inferred from the leads' accounts of six-week turnover. I have not talked to a single show-time volunteer, and it's the assumption I most need to check.
5. **Know whether an item will fit before a fitting.** [E: 2 of 4] This is real, but both people who raised it already have a workaround: a tape-measure reading on a tag pinned inside the garment.
6. **Borrow items from other theaters.** [E that it was requested by 3 of 4; [A] that it's a real need] It came up as "wouldn't it be cool." Nobody described a time they needed a piece, couldn't borrow it, and lost something as a result.

**Cost of the status quo.** Two of the four named a specific item they had bought twice, in one case a corset at about \$120. [E] That is real money at theaters whose costume budget for an entire show is a few hundred dollars.

## 3. Prioritized needs

The ordering rule is **strength of evidence × how often it happens × what it costs when it does.**

| Rank | Need | Priority | Why it's here |
|---|---|---|---|
| 1 | Know whether we own it | **Must** | It has the strongest evidence (4 of 4), comes up every production, and directly causes the repeat purchases. If this need isn't met, nothing else on the list matters. |
| 2 | Know who has it | **Must** | Three of four plus a direct observation, and it costs real items every season. It ranks below #1 because it bites a few times per production, not daily. |
| 3 | Keep knowledge when volunteers leave | **Must** | Rare but catastrophic, since it effectively resets the collection. It ranks third, even though it hurts the most, because meeting #1 and #2 in a form that outlives the person who wrote it down *is* meeting #3. It's an outcome of the first two, not a separate thing to build. |
| 4 | Volunteers record without training | **Must, pending verification** | If it's true, anything that needs training fails within six weeks. It stays below the evidenced needs because it's [A], and it's the first thing to confirm. |
| 5 | Fit before a fitting | Nice to have | Real, but there's a working workaround. |
| 6 | Borrow between theaters | Nice to have, later | The most-requested need and the least evidenced. It also depends on several theaters already meeting #1–#3, so revisit it once two theaters have a working catalog. |

## 4. Success criteria

Each criterion can be checked by watching real volunteers at a real theater.

1. **The twenty-minute question takes under a minute.** A wardrobe lead answers "do we own X?" for four different items from the costume shop, without walking to the racks, with a median under 60 seconds. *(Need 1. Today's baseline is up to twenty minutes.)*
2. **Nothing is lost at strike.** At the end of one production, every item that left the shop during the run is accounted for: either it's back, or the record shows who has it. *(Need 2)*
3. **A volunteer with no instruction gets it right.** A show-time volunteer who has never seen the system records a new item correctly with no verbal instruction. *(Need 4, which is also the test of that assumption.)*
4. **The record belongs to the theater, not to me.** At least 60 of the theater's real items are recorded by volunteers other than me, and a lead can find items someone else entered. *(Needs 1 and 3)*

## 5. Open questions and what I'd still verify

1. **Do show-time volunteers behave the way the leads think they do?** [A] Need 4 rests entirely on the leads' account. *Check:* interview two show-time volunteers during the next production's run, and watch one costume pull from start to finish.
2. **Will leads who prefer paper switch?** Two of four keep paper by choice. [E] If keeping records takes more effort than the notebook, they won't switch. *Check:* have both walk me through adding an item to the notebook, time it, and treat that time as the bar to beat.
3. **Can volunteers get online where the collection lives?** All three costume shops are in basements or back rooms. [E] I don't know whether a volunteer's phone gets a usable connection there. [A] *Check:* visit each shop and try it before deciding anything about the product's design.
4. **Does this hold beyond three theaters within twenty miles of each other?** [A] All my evidence is local. *Check:* send the same four interview questions to two theaters outside Utah County.

---

*Every claim above traces to my Discovery Notes (four interviews, one observation, one persona). Where I'm guessing, I said so. This brief becomes the Problem & Users and Success Criteria sections of my proposal; open question 3 became its spike.*
