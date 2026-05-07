# Production Notes — Phase 2 Launch Video

## Published

**LinkedIn:** https://www.linkedin.com/posts/walid-elkhoukh_monelu-dataengineering-opendata-ugcPost-7458104231019950080-N6Yt

Published May 2026. This is the canonical reference linking this codebase to its live artifact.

---

## Overview

This video was created in May 2026 to announce MonÉlu's Phase 2: a RAG-powered natural language interface over official French parliamentary data. It was built entirely using Remotion 4 and TypeScript, with Claude Code as the primary coding co-pilot, in a single collaborative session.

---

## Workflow

### 1. Direction

The design direction was defined by the product owner before any code was written:
- Dark navy cinematic aesthetic matching the MonÉlu brand
- LinkedIn portrait format (1080×1350)
- 30-second runtime, 6 scenes
- No external CSS or UI libraries — everything inline
- Motion philosophy: spring physics, soft glass morphism, premium civic-tech feel

### 2. AI-assisted coding with Claude Code

Claude Code was used for:
- Writing all Remotion component code from scene descriptions
- Animation math (spring configs, interpolate ranges, timing constants)
- SVG construction (parliament hemicycle icon, browser chrome, check circles)
- Iterative refinement of timing and visual details based on feedback
- Refactoring the codebase into this modular studio structure

The workflow was conversational: describe what a scene should look, feel, and move like, then review the result in Remotion Studio, then give targeted feedback ("the POUR badge needs to pop harder", "the orbit is too fast"). No visual design tools were used — all design decisions were made by reading the rendered output.

### 3. Asset creation

All assets were created or sourced manually:
- `assemblee-nationale.jpg` — sourced photograph of the Assemblée Nationale exterior
- `website-screenshot.png` — actual screenshot of the live MonÉlu production site
- `scene4/image-{1-5}.png` — screenshots of real parliamentary data pages (scrutin, positions, dossier, groupes, AN)
- `monelu-logo.png` — exported from the MonÉlu production website

The hemicycle SVG icon (`MoneluWordmark.tsx`) was hand-coded in SVG, precisely replicating the production website's favicon.

### 4. Remotion Studio preview loop

The preview loop was:
1. `npm run dev` → Remotion Studio at localhost:3000
2. Review scene in the timeline scrubber
3. Adjust timing constants or animation parameters
4. Hard-refresh to see changes

No storyboard frames or motion design software (After Effects, Figma, etc.) were used at any point. The code IS the design.

### 5. Render

Final render: `npm run render:hq` → `out/monelu-phase2.mp4` (JPEG quality 95, 4 parallel workers, ~3 minutes on M-series Mac).

---

## Key decisions

**Why Remotion?** React-based, TypeScript-native, no video editing required, Git-friendly, fully programmable. Perfect for a data-driven product that will need to update its videos as the product evolves.

**Why no CSS files?** All styles are inline objects. This keeps each scene fully self-contained — no class name collisions, no cascade issues, easy to read and adjust.

**Why a single `constants.ts` (original) → split config?** The original monolithic constants file worked fine for one video. The refactor split it into `colors.ts`, `typography.ts`, `brand.ts`, `motion.ts`, `copy.ts`, and `assets.ts` so that future videos can import only what they need and override what they don't.

**Why scene isolation matters?** Each `<Sequence>` gives its child a local frame counter starting at 0. This means scenes never need to know their absolute position in the timeline — change durations freely.
