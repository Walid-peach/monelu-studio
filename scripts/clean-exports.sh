#!/usr/bin/env bash
# Delete all rendered MP4 files from the out/ directory.
# Usage: ./scripts/clean-exports.sh

set -euo pipefail

OUT_DIR="out"

if [ ! -d "${OUT_DIR}" ]; then
  echo "No ${OUT_DIR}/ directory found."
  exit 0
fi

count=$(find "${OUT_DIR}" -name "*.mp4" | wc -l | tr -d ' ')

if [ "${count}" -eq 0 ]; then
  echo "No MP4 files to clean in ${OUT_DIR}/."
  exit 0
fi

echo "→ Removing ${count} MP4 file(s) from ${OUT_DIR}/"
find "${OUT_DIR}" -name "*.mp4" -delete
echo "✓ Done."
