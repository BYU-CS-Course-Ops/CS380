#!/usr/bin/env bash
#
# One-time setup of the Session 13 demo on a teaching computer.
#
#   demos/session13-git-workflow/setup.sh
#
# Clones prop-loft/prop-loft into $CLONE (see demo.conf), builds its Python
# environment and .env, and links $CLONE/.demo to this kit, so the kit's
# files stay in the course repo. Safe to rerun: it skips what already exists.
#
# Then create the demo upstream:  $CLONE/.demo/demo-upstream.sh create
set -euo pipefail

KIT="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
# shellcheck source=demo.conf
source "$KIT/demo.conf"

if [[ -d "$CLONE/.git" ]]; then
  echo "==> $CLONE already exists; keeping it"
else
  echo "==> cloning $CANONICAL into $CLONE"
  mkdir -p "$(dirname "$CLONE")"
  gh repo clone "$CANONICAL" "$CLONE" -- -q
fi
cd "$CLONE"

if [[ -L .demo ]]; then
  echo "==> .demo already links to $(readlink .demo)"
elif [[ -e .demo ]]; then
  echo "!! $CLONE/.demo exists and is not a link. Move it aside, then rerun." >&2
  exit 1
else
  ln -s "$KIT" .demo
  echo "==> linked .demo -> $KIT"
fi
grep -qxF '.demo' .git/info/exclude || echo '.demo' >> .git/info/exclude

if [[ ! -x .venv/bin/python ]]; then
  echo "==> creating .venv and installing requirements"
  python3 -m venv .venv
  .venv/bin/pip install -q -r requirements.txt
fi

if [[ ! -f .env ]]; then
  echo "==> writing .env for local development"
  sed "s/^DJANGO_SECRET_KEY=.*/DJANGO_SECRET_KEY=local-dev-only-$(openssl rand -hex 16)/" .env.example > .env
fi

echo
echo "Setup done. Next:"
echo "  $CLONE/.demo/demo-upstream.sh create    # or 'reset' if $DEMO_REPO already exists"
echo "  then follow DEMO-SCRIPT.md, part A"
