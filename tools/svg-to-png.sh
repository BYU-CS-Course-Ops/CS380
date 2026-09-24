#!/usr/bin/env bash
#
# svg-to-png.sh — rasterize an SVG through Windows Chrome at 2x.
#
# librsvg on this box only has DejaVu, so sharp/rsvg renders course diagrams in
# the wrong typeface. Chrome has the real Calibri, so we screenshot instead.
#
#   tools/svg-to-png.sh <in.svg> [more.svg ...]
#
# Writes <name>.png beside each input. Both paths must live under /mnt/<drive>/.
set -euo pipefail
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
win_path() { local p; p="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
  case "$p" in /mnt/?/*) printf '%s:\\%s' "$(echo "${p:5:1}" | tr a-z A-Z)" "$(echo "${p:7}" | tr / '\\')" ;;
  *) echo "must live under /mnt/<drive>/…: $1" >&2; exit 1 ;; esac; }

for SVG in "$@"; do
  [[ -f "$SVG" ]] || { echo "no such file: $SVG" >&2; exit 1; }
  DIR="$(cd "$(dirname "$SVG")" && pwd)"; BASE="$(basename "$SVG" .svg)"
  W=$(grep -o 'width="[0-9]*"' "$SVG" | head -1 | grep -o '[0-9]*')
  H=$(grep -o 'height="[0-9]*"' "$SVG" | head -1 | grep -o '[0-9]*')
  [[ -n "$W" && -n "$H" ]] || { echo "no width/height on root <svg>: $SVG" >&2; exit 1; }
  HTML="$DIR/.svg2png-$BASE.html"
  printf '<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#fff}svg{display:block}</style>' > "$HTML"
  cat "$SVG" >> "$HTML"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --screenshot="$(win_path "$DIR/$BASE.png")" --window-size="$W,$H" \
    "file:///$(win_path "$HTML" | tr '\\' /)" 2>/dev/null || true
  sleep 1; rm -f "$HTML"
  [[ -f "$DIR/$BASE.png" ]] || { echo "chrome did not write $BASE.png" >&2; exit 1; }
  python3 -c "
import sys;from PIL import Image
im=Image.open(sys.argv[1]);print('WROTE',sys.argv[1].split('/')[-1],im.size)
" "$DIR/$BASE.png" 2>/dev/null || echo "WROTE $BASE.png"
done
