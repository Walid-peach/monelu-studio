# MonÉlu Video — Project Summary

**Date:** May 2026  
**Tool:** Remotion 4 + TypeScript  
**Output:** 30-second LinkedIn video (1080×1350 portrait, 30 fps)

---

## What We Built

A fully animated promotional video for **MonÉlu** — a French civic data platform that indexes every vote, law, and deputy in the National Assembly. The video was designed for LinkedIn (portrait 4:5 format) and renders to a self-contained MP4 via Remotion.

---

## Video Structure — 6 Scenes

| Scene | Name | Duration | What it shows |
|-------|------|----------|---------------|
| 1 | Hook | 4 s | Full-screen Assemblée Nationale photo with Ken Burns zoom. Vote result for PLFSS 2026 (247 pour / 234 contre / 93 abstentions) appears over a dark gradient. Opens with the question "Mais qui a voté quoi ?" |
| 2 | Deputy Question | 5 s | Deputy selector UI — shows a list of real deputies (Attal, Le Pen, Panot, etc.) being browsed |
| 3 | Solution | 4 s | Introduces MonÉlu as the answer — brand-forward scene |
| 4 | Data Analysis | 5 s | Shows the data pipeline / analysis cards — communicates depth and sourcing |
| 5 | Chat Answer | 7 s | Simulates a French-language chatbot answering a question about a deputy's vote |
| 6 | Outro | 6 s | Dark navy end card with browser mockup of the live site, CTA button ("Essayez maintenant"), then cross-fades to a brand signature (logo + tagline) |

Total: **900 frames = 30 seconds**

---

## Architecture Decisions

### Single source of truth
All content, colors, fonts, and timing live in `src/constants.ts`. Change a scene duration there and the rest of the timeline updates automatically via a derived IIFE (`SCENE_STARTS`).

### Scene isolation
Each scene is a `<Sequence>` in `MoneluPhase2.tsx`. Remotion resets `useCurrentFrame()` to 0 at the start of each sequence, so scenes are completely independent — no shared frame math between them.

### Animation library (`src/utils/animations.ts`)
Built a small set of thin wrappers around Remotion's `interpolate()` and `spring()`:
- `fadeIn / fadeOut` — opacity with ease-out/in-quad
- `slideIn` — translateY with ease-out-cubic
- `reveal` — 0→1 progress for drawing lines/underlines
- `springIn` — spring entrance with optional delay
- `scaleIn` — pop-in scale with spring physics

### No CSS files — all inline styles
Every visual element is an inline style object or an inline `<svg>`. No external UI libraries, no CSS modules.

### `SceneContainer`
Shared wrapper that adds an 8-frame fade-in and fade-out to each scene for smooth cross-dissolves.

---

## Design System

| Token | Value |
|-------|-------|
| Brand navy | `#0D1F3C` |
| Brand red ("Élu" accent) | `#C9302C` |
| Interactive blue | `#2563EB` |
| Background | `#F7F8FA` |
| Font stack | Inter → Segoe UI → Helvetica |
| Font sizes | xs(18) → sm(22) → md(28) → lg(36) → xl(48) → xxl(58) → hero(68) |

---

## Key Files

```
src/constants.ts          — all tokens, copy, and timing
src/MoneluPhase2.tsx      — composition root, sequence ordering
src/utils/animations.ts   — animation helpers
src/components/Scene*.tsx — one file per scene
src/components/Logo.tsx   — MonÉlu wordmark (size: sm | md | lg)
src/components/SceneContainer.tsx — cross-dissolve wrapper
remotion.config.ts        — overwrite output enabled
```

---

## Render Commands

```bash
npm run dev        # Remotion Studio at localhost:3000 (hot-reload preview)
npm run render     # Render → out/monelu-phase2.mp4
npm run render:hq  # Higher JPEG quality, 4 parallel workers
```

---

## Content

All French-language copy — tagline ("Chaque loi. Chaque vote. En clair."), deputy names, vote metadata for PLFSS 2026 (scrutin n°4696, 9 décembre 2025), and platform stats — is centralised in `COPY` inside `constants.ts` for easy updates.
