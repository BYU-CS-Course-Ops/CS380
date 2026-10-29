#!/usr/bin/env bash
# Recreate Prop Loft's GitHub-side state (labels, issues, milestones, board)
# for a session tag.
#
# A tag captures the files, but labels, issues, milestones, and projects live
# on GitHub, not in git. When you build a repo from a tag (say, a disposable
# class copy), run this to give it the tracker that matches.
#
#   ./seed.sh <owner/repo> <tag>
#   ./seed.sh prop-loft/prop-loft-demo session-17
#
# Stages, each for the first tag that has it:
#   16  the needs-triage label and the three seed issues
#   17  the plan: epic label, milestones M1/M2, five epics, their tasks as
#       sub-issues, the seed issues triaged into tasks, and a public project
#       board linked to the repo (needs the gh token's `project` scope:
#       gh auth refresh -s project)
#   20  closes the setup-guide issue
#
# SEED_FROM=17 skips the stages before 17 (publish.sh uses it: by then the
# seed issues exist, and stage 17 finds them by title). M1_DUE and M2_DUE
# (YYYY-MM-DD) override the milestone dates. SKIP_BOARD=1 stops stage 17
# before the project board and prints each card's column, to build it by hand.
#
# Prints the number of each issue it creates. Not idempotent within a stage:
# stage 17 skips itself if the repo already has an epic.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="${1:?usage: seed.sh <owner/repo> <tag>}"
TAG="${2:?usage: seed.sh <owner/repo> <tag>}"
N="${TAG#session-}"
[[ "$N" =~ ^[0-9]+$ ]] || { echo "tag must look like session-NN, got: $TAG" >&2; exit 1; }
N=$((10#$N))
FROM="${SEED_FROM:-0}"
OWNER="${REPO%%/*}"
M1_DUE="${M1_DUE:-2026-11-18}"
M2_DUE="${M2_DUE:-2026-12-02}"
M1="M1 · Demo-able core"
M2="M2 · MVP complete"

if (( N < 16 )); then
  echo "==> $TAG: nothing to seed (labels and issues start at session-16)"
  exit 0
fi

# ------------------------------------------------------------------ stage 16
SEARCH="" DETAIL="" SETUP=""

# file -> title, labels
issue() {
  gh issue create -R "$REPO" --title "$2" --label "$3" --body-file "$HERE/issues/$1" | sed 's#.*/##'
}

if (( FROM <= 16 )); then
  echo "==> labels on $REPO"
  gh label create "needs triage" -R "$REPO" --color fbca04 \
    --description "New, and not yet read by a maintainer" --force
  # GitHub's defaults, which a repo created through the API doesn't get.
  gh label create enhancement        -R "$REPO" --color a2eeef --description "New feature or request" --force
  gh label create documentation      -R "$REPO" --color 0075ca --description "Improvements or additions to documentation" --force
  gh label create question           -R "$REPO" --color d876e3 --description "Further information is requested" --force
  gh label create "good first issue" -R "$REPO" --color 7057ff --description "Good for newcomers" --force

  echo "==> seed issues on $REPO"
  SEARCH=$(issue 1-item-search.md "Search items by name, category, and size" "enhancement")
  DETAIL=$(issue 2-item-detail.md "Show an item's detail page" "enhancement,good first issue")
  SETUP=$(issue 3-setup-guide.md "Write a setup guide a newcomer can follow cold" "documentation")
  echo "    #$SEARCH search · #$DETAIL detail · #$SETUP setup guide"
fi

# ------------------------------------------------------------------ stage 17
# The issue numbers every body can refer to, as {{NAME}}.
VARS=(SEARCH DETAIL SETUP E1 E2 E3 E4 E5 FILTER EMPTY MODEL CHECKOUT SHOWOUT RETURNS OVERDUE ADD PHOTO HEIC)

# file -> the body with {{NAME}} replaced by its issue number
fill() {
  local s v
  s=$(<"$HERE/issues/$1")
  for v in "${VARS[@]}"; do s=${s//\{\{$v\}\}/${!v:-}}; done
  [[ "$s" != *"{{"* ]] || { echo "unfilled placeholder in $1" >&2; exit 1; }
  printf '%s\n' "$s"
}

# parent, child: make child a sub-issue of parent
sub() {
  local id
  id=$(gh api "repos/$REPO/issues/$2" --jq .id)
  gh api -X POST "repos/$REPO/issues/$1/sub_issues" -F sub_issue_id="$id" >/dev/null
}

# file, title, labels ("" for none), milestone ("" for none), parent ("" for none)
task() {
  local body args n
  body=$(fill "$1") || exit 1
  args=(-R "$REPO" --title "$2" --body "$body")
  [[ -n "$3" ]] && args+=(--label "$3")
  [[ -n "$4" ]] && args+=(--milestone "$4")
  n=$(gh issue create "${args[@]}" | sed 's#.*/##')
  [[ -n "$5" ]] && sub "$5" "$n"
  echo "$n"
}

# number, file, milestone, parent, [new title]: append the triage note, file it
triage() {
  local body note args
  body=$(gh issue view "$1" -R "$REPO" --json body --jq .body)
  note=$(fill "$2") || exit 1
  args=(-R "$REPO" --body "$body"$'\n'"$note" --milestone "$3")
  [[ -n "${5:-}" ]] && args+=(--title "$5")
  gh issue edit "$1" "${args[@]}" >/dev/null
  sub "$4" "$1"
}

# title -> number of the first issue with exactly that title
find_issue() {
  gh issue list -R "$REPO" --state all --search "in:title \"$1\"" --json number,title \
    --jq "map(select(.title == \"$1\")) | .[0].number // empty"
}

if (( N >= 17 && FROM <= 17 )); then
  if [[ -n "$(gh issue list -R "$REPO" --state all --label epic --json number --jq '.[0].number // empty')" ]]; then
    echo "==> $REPO already has epics; skipping the plan (stage 17)"
  else
    [[ -n "$SEARCH" ]] || SEARCH=$(find_issue "Search items by name, category, and size")
    [[ -n "$DETAIL" ]] || DETAIL=$(find_issue "Show an item's detail page")
    [[ -n "$SETUP"  ]] || SETUP=$(find_issue "Write a setup guide a newcomer can follow cold")
    [[ -n "$SEARCH" && -n "$DETAIL" && -n "$SETUP" ]] || { echo "can't find the seed issues on $REPO" >&2; exit 1; }

    echo "==> label and milestones on $REPO"
    gh label create epic -R "$REPO" --color 3e4b9e \
      --description "User-visible value too big for one pull request; its sub-issues are the work" --force
    gh api -X POST "repos/$REPO/milestones" -f title="$M1" -f due_on="${M1_DUE}T23:59:59Z" \
      -f description="Find an item by name, open it, check it out, see it marked out. The progress demo." >/dev/null
    gh api -X POST "repos/$REPO/milestones" -f title="$M2" -f due_on="${M2_DUE}T23:59:59Z" \
      -f description="Returns and the overdue list; add an item with a photo; filters." >/dev/null

    echo "==> epics"
    E1=$(task 17-epic-find.md     "Epic: Find an item"            epic "" "")
    E2=$(task 17-epic-checkout.md "Epic: Check out and return"    epic "" "")
    E3=$(task 17-epic-add.md      "Epic: Add an item"             epic "" "")
    E4=$(task 17-epic-roles.md    "Epic: Roles and phone layout"  epic "" "")
    E5=$(task 17-epic-theater.md  "Epic: Run it at the theater"   epic "" "")
    echo "    #$E1 find · #$E2 checkout · #$E3 add · #$E4 roles · #$E5 theater"

    echo "==> tasks"
    FILTER=$(task   17-filter.md         "Filter items by category and size"              enhancement "$M2" "$E1")
    EMPTY=$(task    17-empty-search.md   "Say so when a search finds nothing"             "enhancement,good first issue" "$M2" "$E1")
    MODEL=$(task    17-checkout-model.md "Record checkouts, at most one open per item"    enhancement "$M1" "$E2")
    CHECKOUT=$(task 17-checkout-form.md  "Check an item out from its page"                enhancement "$M1" "$E2")
    SHOWOUT=$(task  17-show-out.md       "Show who has an item and when it's due back"    enhancement "$M1" "$E2")
    RETURNS=$(task  17-returns.md        "Record a return"                                enhancement "$M2" "$E2")
    OVERDUE=$(task  17-overdue.md        "List overdue items for the wardrobe lead"       enhancement "$M2" "$E2")
    ADD=$(task      17-add-item.md       "Add an item from a phone"                       enhancement "$M2" "$E3")
    PHOTO=$(task    17-photo.md          "Attach a photo, downscaled in the browser"      enhancement "$M2" "$E3")
    HEIC=$(task     17-heic.md           "Test iPhone (HEIC) photos end to end"           question    "$M2" "$E3")
    echo "    M1: #$MODEL #$CHECKOUT #$SHOWOUT · M2: #$FILTER #$EMPTY #$RETURNS #$OVERDUE #$ADD #$PHOTO #$HEIC"

    echo "==> triage the seed issues into tasks"
    triage "$SEARCH" 17-triage-search.md "$M1" "$E1" "Search items by name"
    triage "$DETAIL" 17-triage-detail.md "$M1" "$E1"
    triage "$SETUP"  17-triage-setup.md  "$M1" "$E5"
    gh issue edit "$SEARCH" -R "$REPO" --add-assignee "@me" >/dev/null
    echo "    #$SEARCH retitled, split, assigned · #$DETAIL · #$SETUP"

    if [[ -n "${SKIP_BOARD:-}" ]]; then
      echo "==> SKIP_BOARD set; build the board by hand (Setting Up Your Board). Cards:"
      echo "    In progress: #$SEARCH, epics #$E1 #$E2"
      echo "    Ready:       #$DETAIL #$MODEL #$SETUP"
      echo "    Backlog:     #$CHECKOUT #$SHOWOUT #$FILTER #$EMPTY #$RETURNS #$OVERDUE #$ADD #$PHOTO #$HEIC, epics #$E3 #$E4 #$E5"
    elif ! gh auth status 2>&1 | grep -q "'project'"; then
      echo "!! the gh token lacks the project scope; skipping the board." >&2
      echo "   Run: gh auth refresh -s project   then build the board by hand (Setting Up Your Board)." >&2
    else
      echo "==> project board"
      if [[ "$REPO" == prop-loft/prop-loft ]]; then TITLE="Prop Loft"; else TITLE="Prop Loft (${REPO#*/})"; fi
      PNUM=$(gh project create --owner "$OWNER" --title "$TITLE" --format json --jq .number)
      gh project edit "$PNUM" --owner "$OWNER" --visibility PUBLIC \
        --description "What's next, what's in progress, and what's waiting for review." >/dev/null
      gh project link "$PNUM" --owner "$OWNER" --repo "$REPO" >/dev/null
      PID=$(gh project view "$PNUM" --owner "$OWNER" --format json --jq .id)
      SF=$(gh project field-list "$PNUM" --owner "$OWNER" --format json --jq '.fields[] | select(.name == "Status") | .id')

      # The board's columns are the Status field's options.
      OPTS=$(gh api graphql -f f="$SF" -f query='
        mutation($f: ID!) { updateProjectV2Field(input: { fieldId: $f, singleSelectOptions: [
          { name: "Backlog",     color: GRAY,   description: "Decided, but not ready to start" },
          { name: "Ready",       color: BLUE,   description: "Acceptance criteria written; anyone can pick it up" },
          { name: "In progress", color: YELLOW, description: "Someone has said they are on it" },
          { name: "In review",   color: PURPLE, description: "A pull request is open and waiting for review" },
          { name: "Done",        color: GREEN,  description: "Merged and closed, per the definition of done" } ] })
          { projectV2Field { ... on ProjectV2SingleSelectField { options { id name } } } } }' \
        --jq '.data.updateProjectV2Field.projectV2Field.options[] | "\(.name)=\(.id)"')
      declare -A OPT
      while IFS='=' read -r k v; do OPT[$k]=$v; done <<<"$OPTS"

      # number, status
      card() {
        local item
        item=$(gh project item-add "$PNUM" --owner "$OWNER" --url "https://github.com/$REPO/issues/$1" --format json --jq .id)
        gh project item-edit --id "$item" --project-id "$PID" --field-id "$SF" --single-select-option-id "${OPT[$2]}" >/dev/null
      }
      card "$SEARCH" "In progress"
      for n in "$DETAIL" "$MODEL" "$SETUP"; do card "$n" Ready; done
      for n in "$CHECKOUT" "$SHOWOUT" "$FILTER" "$EMPTY" "$RETURNS" "$OVERDUE" "$ADD" "$PHOTO" "$HEIC"; do card "$n" Backlog; done
      card "$E1" "In progress"; card "$E2" "In progress"
      for n in "$E3" "$E4" "$E5"; do card "$n" Backlog; done
      echo "    https://github.com/orgs/$OWNER/projects/$PNUM (public, linked to $REPO)"
      echo "   By hand, in the project (the API can't set these; turn off any other workflow that starts on):"
      echo "     Workflows → Auto-add to project: repo ${REPO#*/}, filter  is:issue is:open  → enable; Item added to project → Backlog"
      echo "     New view → Board, View → Swimlanes: Milestone, named \"By milestone\"; another by Parent issue, \"By epic\"; save each"
    fi
  fi
fi

# ------------------------------------------------------------------ stage 20
if (( N >= 20 && FROM <= 20 )); then
  [[ -n "$SETUP" ]] || SETUP=$(find_issue "Write a setup guide a newcomer can follow cold")
  gh issue close "$SETUP" -R "$REPO" --reason completed \
    --comment "Done: the setup guide is in docs/setup.md (tag session-20)."
  echo "    closed #$SETUP (the setup guide exists at $TAG)"
fi

# For publish.sh: the setup issue's number.
echo "SETUP_ISSUE=$SETUP" > "${SEED_OUT:-/dev/null}"
