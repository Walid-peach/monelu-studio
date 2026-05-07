#!/usr/bin/env bash
# Render the specified composition (default: MoneluPhase2) to the out/ directory.
# Usage: ./scripts/render.sh [COMPOSITION_ID] [OUTPUT_FILENAME]

set -euo pipefail

COMPOSITION="${1:-MoneluPhase2}"
OUTPUT="${2:-out/${COMPOSITION}.mp4}"

echo "→ Rendering ${COMPOSITION} to ${OUTPUT}"
npx remotion render "${COMPOSITION}" "${OUTPUT}" --jpeg-quality=95 --concurrency=4

echo "✓ Done: ${OUTPUT}"
