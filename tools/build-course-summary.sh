#!/usr/bin/env bash
# Rebuild CS301R-Course-Summary.docx from its markdown source.
#
#   tools/build-course-summary.sh
#
# The markdown file is the source of truth; the .docx is generated. Edit the .md,
# rerun this, and commit both. Styling comes from tools/course-summary-reference.docx
# (pandoc's default reference doc, re-themed to the course palette: navy 14233A
# headings/title, teal 0E6E6D section heads, Cambria headings / Calibri body,
# shaded repeating table headers).
set -euo pipefail
cd "$(dirname "$0")/.."
pandoc CS301R-Course-Summary.md \
  -o CS301R-Course-Summary.docx \
  --reference-doc=tools/course-summary-reference.docx
echo "Wrote CS301R-Course-Summary.docx"
