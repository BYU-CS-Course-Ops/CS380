#!/usr/bin/env bash
# Recreate Prop Loft's GitHub-side state (labels and issues) for a session tag.
#
# A tag captures the files, but labels and issues live on GitHub, not in git.
# When you build a repo from a tag (say, a disposable class copy), run this to
# give it the tracker that matches.
#
#   ./seed.sh <owner/repo> <tag>
#   ./seed.sh prop-loft/prop-loft-demo session-16
#
# Prints the number of each issue it creates. Tags before session-16 have no
# seed issues, so it does nothing for them.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="${1:?usage: seed.sh <owner/repo> <tag>}"
TAG="${2:?usage: seed.sh <owner/repo> <tag>}"
N="${TAG#session-}"
[[ "$N" =~ ^[0-9]+$ ]] || { echo "tag must look like session-NN, got: $TAG" >&2; exit 1; }
N=$((10#$N))

if (( N < 16 )); then
  echo "==> $TAG: nothing to seed (labels and issues start at session-16)"
  exit 0
fi

echo "==> labels on $REPO"
gh label create "needs triage" -R "$REPO" --color fbca04 \
  --description "New, and not yet read by a maintainer" --force

# file -> title, labels
issue() {
  gh issue create -R "$REPO" --title "$2" --label "$3" --body-file "$HERE/issues/$1" | sed 's#.*/##'
}

echo "==> seed issues on $REPO"
SEARCH=$(issue 1-item-search.md "Search items by name, category, and size" "enhancement")
DETAIL=$(issue 2-item-detail.md "Show an item's detail page" "enhancement,good first issue")
SETUP=$(issue 3-setup-guide.md "Write a setup guide a newcomer can follow cold" "documentation")
echo "    #$SEARCH search · #$DETAIL detail · #$SETUP setup guide"

if (( N >= 20 )); then
  gh issue close "$SETUP" -R "$REPO" --reason completed \
    --comment "Done: the setup guide is in docs/setup.md (tag session-20)."
  echo "    closed #$SETUP (the setup guide exists at $TAG)"
fi

# For publish.sh: the setup issue's number.
echo "SETUP_ISSUE=$SETUP" > "${SEED_OUT:-/dev/null}"
