#!/usr/bin/env bash
# Render a single still frame as a thumbnail.
# Usage: ./scripts/generate-thumbnail.sh [COMPOSITION_ID] [FRAME]

set -euo pipefail

COMPOSITION="${1:-MoneluPhase2}"
FRAME="${2:-15}"
OUTPUT="out/${COMPOSITION}-thumbnail.png"

echo "→ Rendering still at frame ${FRAME} for ${COMPOSITION}"
npx remotion still "${COMPOSITION}" "${OUTPUT}" --frame="${FRAME}"

echo "✓ Thumbnail saved: ${OUTPUT}"
