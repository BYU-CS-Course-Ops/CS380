#!/usr/bin/env bash
# One-time: ship the locally built Prop Loft states to the canonical repo.
#
# Each local branch below holds one commit. For each, in order, this script
# replays the commit onto the current origin/main, pushes it, opens a pull
# request with the matching body from pr-bodies/, squash-merges it (the
# project's own git standards), and then tags main where a session state is
# complete. The seed issues are created once the front door is merged, so the
# setup-guide pull request can close its issue. The plan (epics, milestones,
# the board) is seeded once the roadmap is merged; that stage needs the gh
# token's project scope (gh auth refresh -s project).
#
#   ./publish.sh              # from anywhere; works in $CANONICAL_CLONE
#   ./publish.sh session-16   # stop once that tag is placed; later branches stay local
#
# Safe to stop and rerun: a branch whose commit is already on main is skipped,
# and existing tags are left alone.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
CLONE="${CANONICAL_CLONE:-$HOME/repos/prop-loft}"
REPO=prop-loft/prop-loft

# branch | tag to place on main after it merges ("" for none)
STACK=(
  "docs/course-tags|"
  "docs/git-standards|session-14"
  "docs/code-of-conduct|"
  "docs/communication-norms|"
  "chore/issue-and-pr-templates|"
  "docs/contributing|"
  "docs/readme-front-door|session-16"
  "chore/task-form|"
  "docs/roadmap|session-17"
  "docs/setup-guide|session-20"
)
declare -A TAG_MSG=(
  [session-14]="CS 301R Sessions 14-15: git standards (docs/git-standards.md)"
  [session-16]="CS 301R Session 16: the front door (CONTRIBUTING, code of conduct, templates, communication norms)"
  [session-17]="CS 301R Sessions 17-19: the plan (task form, docs/roadmap.md; on GitHub: epics, milestones, project board)"
  [session-20]="CS 301R Session 20 on: the setup guide (docs/setup.md)"
)

THROUGH="${1:-}"
if [[ -n "$THROUGH" ]] && ! grep -qx ".*|$THROUGH" <<<"$(printf "%s\n" "${STACK[@]}")"; then
  echo "no state tagged $THROUGH in the stack" >&2; exit 1
fi

cd "$CLONE"
[[ -z "$(git status --porcelain)" ]] || { echo "working tree in $CLONE is dirty" >&2; exit 1; }
git fetch -q origin

echo "==> tags for the states already on main"
git push -q origin session-11 session-13

SETUP_ISSUE=""
for entry in "${STACK[@]}"; do
  BRANCH="${entry%%|*}"; TAG="${entry#*|}"
  COMMIT=$(git rev-parse "$BRANCH")
  SUBJECT=$(git log -1 --format=%s "$COMMIT")

  # (Capture first: under pipefail, grep -q closing the pipe early fails git log.)
  ON_MAIN=$(git log --format=%s origin/main)
  if grep -qxF -- "$SUBJECT" <<<"$ON_MAIN" || grep -qF -- "$SUBJECT (#" <<<"$ON_MAIN"; then
    echo "==> $BRANCH: already on main, skipping"
  else
    echo "==> $BRANCH: $SUBJECT"
    git switch -q -C "publish/$BRANCH" origin/main
    git cherry-pick "$COMMIT" >/dev/null
    git push -q -f origin "HEAD:refs/heads/$BRANCH"

    BODY="$HERE/pr-bodies/${BRANCH//\//__}.md"
    if [[ "$BRANCH" == docs/setup-guide ]]; then
      [[ -n "$SETUP_ISSUE" ]] || SETUP_ISSUE=$(gh issue list -R "$REPO" --state all \
        --search "in:title Write a setup guide" --json number --jq '.[0].number')
      [[ -n "$SETUP_ISSUE" ]] || { echo "can't find the setup-guide issue" >&2; exit 1; }
      sed "s/#SETUP_ISSUE/#$SETUP_ISSUE/" "$BODY" > "$BODY.tmp"; BODY="$BODY.tmp"
    fi
    PR=$(gh pr create -R "$REPO" --base main --head "$BRANCH" --title "$SUBJECT" --body-file "$BODY" | sed 's#.*/##')
    rm -f "$HERE"/pr-bodies/*.tmp
    gh pr merge "$PR" -R "$REPO" --squash --delete-branch \
      --subject "$SUBJECT (#$PR)" --body "$(git log -1 --format=%b "$COMMIT")"
    git fetch -q --prune origin
    git switch -q --detach origin/main
    git branch -q -D "publish/$BRANCH"
    echo "    merged as #$PR"
  fi

  if [[ -n "$TAG" ]] && ! git ls-remote --exit-code --tags origin "refs/tags/$TAG" >/dev/null; then
    git tag -a -f "$TAG" origin/main -m "${TAG_MSG[$TAG]}"
    git push -q origin "$TAG"
    echo "    tagged $TAG"
  fi

  # The seed issues follow the front door: the templates now exist.
  if [[ "$TAG" == session-16 ]]; then
    if [[ -n "$(gh issue list -R "$REPO" --state all --search "in:title Write a setup guide" --json number --jq '.[0].number')" ]]; then
      echo "==> seed issues already exist"
    else
      OUT=$(mktemp); SEED_OUT="$OUT" "$HERE/seed.sh" "$REPO" session-16
      source "$OUT"; rm -f "$OUT"
    fi
  fi

  # The plan follows the roadmap: the task form and docs/roadmap.md now exist.
  if [[ "$TAG" == session-17 ]]; then
    SEED_FROM=17 "$HERE/seed.sh" "$REPO" session-17
  fi

  [[ -n "$THROUGH" && "$TAG" == "$THROUGH" ]] && break
done

git switch -q main
git merge -q --ff-only origin/main
echo "==> done: main is $(git log -1 --format='%h %s'); tags: $(git tag -l 'session-*' | tr '\n' ' ')"
