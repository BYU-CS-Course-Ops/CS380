#!/usr/bin/env bash
#
# Builds (or resets) the Session 19 debugging demo.
#
#   demos/session19-debugging/setup.sh
#
# Clones $SOURCE into $CLONE the first time (see demo.conf), with a Python
# environment and .env. Every run then puts the clone back in the demo's
# starting state: branch $BRANCH rebuilt from the patches, a fresh database
# with the demo data and an admin login, and no checkouts yet. Run it once
# before class and again to rehearse. Nothing is pushed anywhere.
set -euo pipefail

KIT="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
# shellcheck source=demo.conf
source "$KIT/demo.conf"

if [[ -d "$CLONE/.git" ]]; then
  echo "==> $CLONE already exists; resetting it"
else
  echo "==> cloning $SOURCE into $CLONE"
  mkdir -p "$(dirname "$CLONE")"
  git clone -q "$SOURCE" "$CLONE"
fi
cd "$CLONE"
git fetch -q --tags origin

# .demo links back to this kit, so the run sheet's commands can name its patches.
[[ -L .demo ]] || ln -s "$KIT" .demo
grep -qxF '.demo' .git/info/exclude || echo '.demo' >> .git/info/exclude

base="$BASE"
if ! git rev-parse -q --verify "$base^{commit}" >/dev/null; then
  base="origin/$BASE_FALLBACK"
  echo "==> $BASE doesn't exist yet; building on $BASE_FALLBACK"
fi

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "==> discarding uncommitted changes from the last run"
  git reset -q --hard
fi
git switch -q -C "$BRANCH" "$base"
git -c user.name="Tom Stephens" -c user.email="tstephen@cs.byu.edu" \
  am -q --committer-date-is-author-date "$KIT"/patches/branch/*.patch
echo "==> $BRANCH: $(git log --oneline -1)"

if [[ ! -x .venv/bin/python ]]; then
  echo "==> creating .venv and installing requirements"
  python3 -m venv .venv
  .venv/bin/pip install -q -r requirements.txt
fi
if [[ ! -f .env ]]; then
  echo "==> writing .env for local development"
  sed "s/^DJANGO_SECRET_KEY=.*/DJANGO_SECRET_KEY=local-dev-only-$(openssl rand -hex 16)/" .env.example > .env
fi

echo "==> fresh database with the demo data"
rm -f db.sqlite3
.venv/bin/python manage.py migrate -v0
.venv/bin/python manage.py loaddata "$KIT/fixtures/demo-data.json"
DJANGO_SUPERUSER_PASSWORD="$ADMIN_PASSWORD" .venv/bin/python manage.py \
  createsuperuser --noinput --username "$ADMIN_USER" --email "$ADMIN_USER@example.com" >/dev/null

echo "==> the tests (expect OK: the bug gets past them)"
.venv/bin/python manage.py test 2>&1 | grep -E '^(Ran|OK|FAILED)'

echo
echo "Ready. In $CLONE:"
echo "  .venv/bin/python manage.py runserver"
echo "  admin: http://127.0.0.1:8000/admin/  ($ADMIN_USER / $ADMIN_PASSWORD)"
echo "Then follow DEMO-SCRIPT.md, part B."
