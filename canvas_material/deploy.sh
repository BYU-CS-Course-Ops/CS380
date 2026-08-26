#!/usr/bin/env bash
#
# Deploy CS 301R course content to Canvas.
#
#   ./canvas_material/deploy.sh sandbox    # rehearse
#   ./canvas_material/deploy.sh fall26     # live
#
# Run from the repo root. Needs CANVAS_API_TOKEN in the environment.
#
# NOTE: mdxcanvas' --dryrun still deploys. Do not reach for it as a safety net;
# rehearse against the sandbox target or not at all.
set -euo pipefail

CM="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-}"

usage() {
    echo "usage: $0 <target> [extra mdxcanvas args...]" >&2
    echo "" >&2
    echo "targets:" >&2
    for f in "$CM"/course_info/cs301r_*.json; do
        name="$(basename "$f" .json)"; name="${name#cs301r_}"
        id="$(grep -o '"CANVAS_COURSE_ID"[^,]*' "$f" | grep -o '[0-9]\+' || echo '?')"
        echo "  $name  (course $id)" >&2
    done
    exit 1
}

[[ -n "$TARGET" ]] || usage
shift

COURSE_INFO="$CM/course_info/cs301r_${TARGET}.json"
GLOBAL_ARGS="$CM/course_info/global_args_${TARGET}.json"

[[ -f "$COURSE_INFO" ]] || { echo "no course_info for target '$TARGET'" >&2; usage; }
[[ -f "$GLOBAL_ARGS" ]] || { echo "no global_args for target '$TARGET'" >&2; usage; }
[[ -n "${CANVAS_API_TOKEN:-}" ]] || { echo "CANVAS_API_TOKEN is not set" >&2; exit 1; }

COURSE_ID="$(grep -o '"CANVAS_COURSE_ID"[^,]*' "$COURSE_INFO" | grep -o '[0-9]\+')"

echo "==> validating"
python3 "$CM/validate_canvas_material.py" --target "$TARGET"

# --cleanup deletes Canvas resources that are not in the content file. That is
# what makes this repo the source of truth, and it is the intended behavior of
# naming a target.
echo "==> deploying to course $COURSE_ID (--cleanup: resources absent from course_content are removed)"
mdxcanvas \
    --course-info "$COURSE_INFO" \
    --global-args "$GLOBAL_ARGS" \
    --css "$CM/canvas.css" \
    --templates "$CM" \
    --cleanup \
    "$@" \
    "$CM/course_content.canvas.md.xml.jinja"
