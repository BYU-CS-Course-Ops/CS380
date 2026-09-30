#!/usr/bin/env bash
#
# Manage the disposable upstream for the Session 13 git demo.
#
#   .demo/demo-upstream.sh create   # create $DEMO_REPO from $BASELINE, point this clone at it, reset local state
#   .demo/demo-upstream.sh reset    # delete and recreate $DEMO_REPO (rehearse again), reset local state
#   .demo/demo-upstream.sh local    # reset local state only; leave the upstream as it is
#   .demo/demo-upstream.sh delete   # delete $DEMO_REPO (after a rehearsal, or at the end of the semester)
#
# Settings live in demo.conf, next to this script. The canonical repo ($CANONICAL) is only
# ever read from, never written to.
#
# Local starting state after create/reset/local:
#   - on main, at $BASELINE, with the search feature applied as UNCOMMITTED
#     changes (5 files) — you branch and commit them live
#   - local branches docs/readme-status (conflict sidebar) and
#     demo/item-search-committed (fallback: the 4 commits already made)
#   - no local feat/item-search branch
#
# delete and reset destroy the demo repo, including its PRs, issues, and
# reviews. Both ask you to type the repo name first. They need gh's
# delete_repo scope:  gh auth refresh -h github.com -s delete_repo
set -euo pipefail

# The kit lives in the course repo (demos/session13-git-workflow); the clone
# reaches it through its .demo symlink. Resolve the real kit directory so this
# works whichever path it's run from.
KIT="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
# shellcheck source=demo.conf
source "$KIT/demo.conf"
[[ -d "$CLONE/.git" ]] || { echo "!! No clone at $CLONE. Run $KIT/setup.sh first." >&2; exit 1; }
cd "$CLONE"

confirm() {
  local answer
  read -r -p "This permanently deletes $DEMO_REPO (PRs, issues, reviews). Type its name to confirm: " answer
  [[ $answer == "$DEMO_REPO" ]] || { echo "Not confirmed. Nothing deleted." >&2; exit 1; }
}

exists() { gh repo view "$DEMO_REPO" --json name >/dev/null 2>&1; }

use_credentials() {
  # Clone-local only: lets git push use gh's login without touching global config.
  git config --unset-all credential.helper 2>/dev/null || true
  git config --add credential.helper ''
  git config --add credential.helper '!gh auth git-credential'
}

create_upstream() {
  if exists; then
    echo "!! $DEMO_REPO already exists. Use 'reset' to recreate it, or 'local' to keep it." >&2
    exit 1
  fi
  echo "==> creating $DEMO_REPO from $BASELINE"
  gh repo create "$DEMO_REPO" --public \
    --description "Prop Loft, as used in a live git-workflow demo for CS 301R. Disposable; the real project is $CANONICAL." >/dev/null
  use_credentials
  git push -q "https://github.com/$DEMO_REPO.git" "$BASELINE:refs/heads/main"
  # Squash-merges default to the PR's title and description rather than a
  # stacked list of every branch commit (DEMO-SCRIPT.md, B11).
  gh api -X PATCH "repos/$DEMO_REPO" \
    -f squash_merge_commit_title=PR_TITLE -f squash_merge_commit_message=PR_BODY >/dev/null
}

delete_upstream() {
  if ! exists; then
    echo "==> $DEMO_REPO doesn't exist; nothing to delete"
    return
  fi
  confirm
  echo "==> deleting $DEMO_REPO"
  gh repo delete "$DEMO_REPO" --yes
}

reset_local() {
  echo "==> pointing origin at $DEMO_REPO and resetting the local clone"
  git remote set-url origin "https://github.com/$DEMO_REPO.git"
  use_credentials
  gh repo set-default "$DEMO_REPO" >/dev/null
  git fetch -q --prune origin
  git am --abort 2>/dev/null || true   # in case an earlier run stopped mid-way
  git merge --abort 2>/dev/null || true
  git switch -q -f main
  git reset -q --hard "$BASELINE"
  git branch -q -D feat/item-search 2>/dev/null || true
  # Rebuild the two prepared branches from their patch series.
  git switch -q -C demo/item-search-committed "$BASELINE"
  git am -q "$KIT"/patches/branches/item-search-committed/*.patch
  git switch -q -C docs/readme-status "$BASELINE"
  git am -q "$KIT"/patches/branches/readme-status/*.patch
  git switch -q main
  git branch -q --set-upstream-to=origin/main main
  git apply "$KIT/patches/search-feature.patch"
  echo
  git status --short --branch
  echo
  echo "Ready: on main with the search feature uncommitted. Origin: $DEMO_REPO"
  echo "       https://github.com/$DEMO_REPO"
}

case "${1:-}" in
  create) create_upstream; reset_local ;;
  reset)  delete_upstream; create_upstream; reset_local ;;
  local)  reset_local ;;
  delete)
    delete_upstream
    git remote set-url origin "https://github.com/$CANONICAL.git"
    echo "    origin now points at $CANONICAL (read-only use). Run 'create' before the next demo."
    ;;
  *) sed -n '3,9p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//' >&2; exit 1 ;;
esac
