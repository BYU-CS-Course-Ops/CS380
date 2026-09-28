#!/usr/bin/env bash
#
# print-md.sh — render a course Markdown page to a printable, markable PDF.
#
# For handouts whose source of truth is a Canvas page (readings, samples) and
# that also need to exist on paper. Hand-authored worksheets stay hand-authored
# HTML; this is for prose.
#
#   tools/print-md.sh <in.md> <out.pdf> "<Title>" ["<Kicker>"]
#
# PRINT_MD_EXTRA_CSS, if set, is appended after print-md.css: a per-document
# nudge (e.g. to pull a one-line orphan page back) without touching the shared
# stylesheet.
#
# Pipeline: strip mdxcanvas tags -> pandoc to HTML with the course print CSS ->
# headless Chrome to PDF. Chrome needs Windows paths, so the output must live
# under /mnt/<drive>/... LibreOffice is not installed and is not needed.
#
# <course-link ...>text</course-link> becomes plain text, and any line carrying a
# <file .../> is dropped whole (it's the page's "Printable copy" link, which
# means nothing on paper).
set -euo pipefail

IN="${1:-}"; OUT="${2:-}"; TITLE="${3:-}"; KICKER="${4:-CS 301R · Software Engineering Studio I}"
if [[ -z "$IN" || -z "$OUT" || -z "$TITLE" ]]; then
  echo "usage: tools/print-md.sh <in.md> <out.pdf> \"<Title>\" [\"<Kicker>\"]" >&2; exit 2
fi
[[ -f "$IN" ]] || { echo "no such file: $IN" >&2; exit 1; }

HERE="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# 1. strip the mdxcanvas-only tags
sed -E -e '/<file[^>]*\/>/d' -e 's:<course-link[^>]*>::g' -e 's:</course-link>::g' "$IN" > "$TMP/body.md"

# 2. markdown -> html fragment
pandoc "$TMP/body.md" -f markdown -t html --wrap=none > "$TMP/body.html"

# 3. wrap in the print shell
HTML="$TMP/page.html"
{
  cat <<HEAD
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>$TITLE</title><style>
HEAD
  cat "$HERE/print-md.css"
  printf '%s\n' "${PRINT_MD_EXTRA_CSS:-}"
  cat <<HEAD
</style></head><body>
<div class="head"><p class="kicker">$KICKER</p><h1>$TITLE</h1></div>
HEAD
  cat "$TMP/body.html"
  echo '</body></html>'
} > "$HTML"

# 4. html -> pdf via Windows Chrome (both paths must be Windows-style)
win_path() { local p; p="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
  case "$p" in /mnt/?/*) printf '%s:\\%s' "$(echo "${p:5:1}" | tr a-z A-Z)" "$(echo "${p:7}" | tr / '\\')" ;;
  *) echo "must live under /mnt/<drive>/…: $1" >&2; exit 1 ;; esac; }

cp "$HTML" "$(dirname "$OUT")/.print-md-tmp.html"
SRC="$(dirname "$OUT")/.print-md-tmp.html"
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$(win_path "$OUT")" "file:///$(win_path "$SRC" | tr '\\' /)" 2>/dev/null || true
sleep 2
rm -f "$SRC"
[[ -f "$OUT" ]] || { echo "chrome did not write $OUT" >&2; exit 1; }
python3 - "$OUT" <<'PY'
import sys, fitz
d = fitz.open(sys.argv[1])
sizes = {tuple(round(v) for v in p.rect) for p in d}
print(f"WROTE {sys.argv[1]}: {len(d)} page(s), {sizes}")
PY
