#!/usr/bin/env bash
#
# render-deck.sh — export a .pptx to per-slide PNGs using the installed Windows
# PowerPoint via WSL↔Windows interop. No LibreOffice needed.
#
# This is the "faithful pixels" QA path (Option 2): PowerPoint is the same app
# the decks are reviewed in, so what it renders is ground truth. Use it for the
# occasional visual pass — overlap, tables, overall polish — that the render-free
# linter (verify-deck.js) intentionally doesn't do.
#
# Run with PowerPoint CLOSED (the helper refuses otherwise, to avoid closing an
# open review session). The deck must live under a Windows drive (/mnt/<drive>/…)
# so PowerPoint can open it.
#
# Usage:
#   tools/render-deck.sh <deck.pptx> [out_dir]     # export PNGs
#   tools/render-deck.sh --dry-run <deck.pptx>     # show resolved paths, don't launch
#
set -euo pipefail

DRY=0
if [[ "${1:-}" == "--dry-run" ]]; then DRY=1; shift; fi

PPTX="${1:-}"
if [[ -z "$PPTX" || ! -f "$PPTX" ]]; then
  echo "usage: $(basename "$0") [--dry-run] <deck.pptx> [out_dir]" >&2
  exit 2
fi
command -v powershell.exe >/dev/null || { echo "powershell.exe not reachable (need WSL↔Windows interop)" >&2; exit 2; }
command -v wslpath        >/dev/null || { echo "wslpath missing" >&2; exit 2; }

PPTX_ABS="$(readlink -f "$PPTX")"
case "$PPTX_ABS" in
  /mnt/[a-z]/*) ;;
  *) echo "Deck must be under a Windows drive (/mnt/<drive>/...) so PowerPoint can open it. Got: $PPTX_ABS" >&2; exit 2;;
esac

OUT_DIR="${2:-${PPTX_ABS%.pptx}-png}"
mkdir -p "$OUT_DIR"

SELF_DIR="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
PS1="$SELF_DIR/export-pptx-png.ps1"
[[ -f "$PS1" ]] || { echo "missing helper: $PS1" >&2; exit 2; }

PS1_WIN="$(wslpath -w "$PS1")"
IN_WIN="$(wslpath -w "$PPTX_ABS")"
OUT_WIN="$(wslpath -w "$OUT_DIR")"

if [[ "$DRY" == "1" ]]; then
  echo "[dry-run] deck   : $PPTX_ABS"
  echo "[dry-run]   (win): $IN_WIN"
  echo "[dry-run] outdir : $OUT_DIR"
  echo "[dry-run]   (win): $OUT_WIN"
  echo "[dry-run] helper : $PS1_WIN"
  echo "[dry-run] would run: powershell.exe -NoProfile -ExecutionPolicy Bypass -File \"$PS1_WIN\" -InPath \"$IN_WIN\" -OutDir \"$OUT_WIN\""
  exit 0
fi

echo "Rendering $(basename "$PPTX_ABS") → $OUT_DIR  (Windows PowerPoint; run with PowerPoint closed)"
set +e
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$PS1_WIN" -InPath "$IN_WIN" -OutDir "$OUT_WIN" 2>&1 | tr -d '\r'
rc=${PIPESTATUS[0]}
set -e
if [[ "$rc" -ne 0 ]]; then
  echo "PowerPoint export failed (exit $rc). If it reported PowerPoint is already running, close it and retry." >&2
  exit "$rc"
fi

shopt -s nullglob nocaseglob
pngs=("$OUT_DIR"/*.png)
echo "PNGs written: ${#pngs[@]} in $OUT_DIR"
