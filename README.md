# MonÉlu Studio

**The motion design and creative media layer for [MonÉlu](https://monelu.fr) — a civic-tech platform that makes French parliamentary data accessible through dashboards and natural-language search.**

[![Phase 2 Launch — Live on LinkedIn](https://img.shields.io/badge/Phase%202%20Launch-Live%20on%20LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/posts/walid-elkhoukh_monelu-dataengineering-opendata-ugcPost-7458104231019950080-N6Yt)

---

## What is MonÉlu Studio?

MonÉlu Studio is a [Remotion](https://remotion.dev) + TypeScript repository for creating, maintaining, and rendering all video content around the MonÉlu product. It is designed to grow over time — from a single launch video into a full creative studio supporting:

- Product launch videos
- Social media assets (LinkedIn, Twitter/X)
- Feature demo videos
- Civic-tech explainers
- Motion design experiments
- AI-assisted creative workflows

---

## Why this repository exists

MonÉlu communicates with data-literate, civic-minded audiences. The visual language needs to be:

- **Premium** — cinematic dark navy, glass morphism, spring physics
- **Trustworthy** — official sources, data-grounded, no hype
- **Maintainable** — changing copy or timing should take minutes, not days
- **Version-controlled** — the video is code, just like the product

Remotion makes video a first-class engineering artifact. This repository is structured to support an AI-assisted creative workflow using Claude Code.

---

## Folder structure

```
monelu-studio/
├── src/
│   ├── Root.tsx                    ← Composition registry (add new videos here)
│   ├── index.ts                    ← registerRoot entry point
│   │
│   ├── videos/
│   │   └── phase2-launch/          ← Phase 2 launch video
│   │       ├── config.ts           ← Scene durations & start frames
│   │       ├── composition.tsx     ← MoneluPhase2 component
│   │       ├── index.tsx           ← Re-exports
│   │       └── scenes/             ← One file per scene
│   │
│   ├── components/
│   │   ├── branding/               ← MoneluLogo, MoneluWordmark
│   │   ├── cinematic/              ← NoiseOverlay, RadialBackground, Glow
│   │   ├── ui/                     ← FeatureChip, AnalysisCard, BrowserMockup, etc.
│   │   └── layout/                 ← SceneContainer, SafeArea, GridOverlay
│   │
│   ├── config/
│   │   ├── colors.ts               ← COLORS design tokens
│   │   ├── typography.ts           ← FONTS (family, sizes, weights)
│   │   ├── brand.ts                ← VIDEO dimensions, SPACING
│   │   ├── motion.ts               ← SPRINGS presets
│   │   ├── copy.ts                 ← All user-facing text (COPY)
│   │   └── assets.ts               ← All staticFile() paths (ASSETS)
│   │
│   ├── utils/
│   │   ├── animation.ts            ← fadeIn, slideIn, springIn, scaleIn, clamp
│   │   ├── easing.ts               ← Named easing functions
│   │   ├── layout.ts               ← centerX, centerY helpers
│   │   └── remotion.ts             ← Remotion re-exports
│   │
│   ├── hooks/
│   │   ├── useFloat.ts             ← Organic drift (sin/cos)
│   │   ├── useEntrance.ts          ← useFadeSlide, useSpringPop
│   │   └── useGlowPulse.ts         ← Pulsing glow intensity
│   │
│   ├── types/
│   │   ├── video.ts                ← VideoConfig, SceneDurations types
│   │   └── scene.ts                ← CardDef, OrbitCard types
│   │
│   └── styles/
│       └── globals.css             ← Studio wrapper styles only
│
├── public/assets/
│   ├── logos/                      ← MonÉlu logo files
│   ├── images/                     ← Photos and screenshots
│   ├── scene4/                     ← Scene 4 orbit images
│   ├── exports/                    ← Rendered outputs (git-ignored)
│   └── textures/                   ← Grain, particles
│
├── docs/                           ← Storyboard, production notes, design system
├── scripts/                        ← render.sh, clean-exports.sh, generate-thumbnail.sh
├── archive/experiments/            ← Unused scene variants, old experiments
└── .github/workflows/              ← CI (type-check) and manual render workflow
```

---

## How to run locally

```bash
npm install
npm run dev          # Remotion Studio at http://localhost:3000
```

Open `http://localhost:3000` in your browser. Use the timeline scrubber to preview any frame.

---

## How to render a video

```bash
# Standard render
npm run render

# High quality (JPEG 95, 4 workers)
npm run render:hq

# Custom composition or output path
./scripts/render.sh MoneluPhase2 out/my-output.mp4

# Render a still (thumbnail)
./scripts/generate-thumbnail.sh MoneluPhase2 15
```

Output: `out/monelu-phase2.mp4`

---

## How to create a new video

1. Create a new directory: `src/videos/my-video-name/`
2. Add `config.ts` — define `SCENE_DURATIONS`, `TOTAL_DURATION`, `SCENE_STARTS`
3. Add `scenes/Scene1*.tsx` through `SceneN*.tsx` — import from `src/config/`, `src/utils/`, `src/components/`
4. Add `composition.tsx` — assemble scenes with `<Sequence>`
5. Add `index.tsx` — re-export the component and config
6. Register in `src/Root.tsx`:
   ```tsx
   import { MyVideo, TOTAL_DURATION as MY_TOTAL } from "./videos/my-video-name";
   // ...
   <Composition
     id="MyVideo"
     component={MyVideo}
     durationInFrames={MY_TOTAL}
     fps={VIDEO_FPS}
     width={VIDEO_WIDTH}
     height={VIDEO_HEIGHT}
   />;
   ```

See `docs/prompts/claude-code-refactor.md` for AI-assisted templates.

---

## AI-assisted workflow

This repository is designed to work with [Claude Code](https://claude.ai/code). Every architectural decision has been made to make AI-assisted iteration fast and reliable:

- **Single source of truth** — all copy, timing, and tokens live in `src/config/`. Describe a change to Claude Code, it edits one file.
- **Scene isolation** — each scene file is self-contained. Claude Code can modify one scene without touching others.
- **Typed components** — strict TypeScript ensures Claude Code's generated code is structurally correct.
- **Prompt library** — `docs/prompts/` contains templates for common tasks: adding scenes, extracting components, creating new videos.

Recommended workflow: run `npm run dev`, describe the change you want, review it in Remotion Studio, iterate.

---

## Assets workflow

All static files live under `public/assets/`. Reference them via `ASSETS` from `src/config/assets.ts`:

```ts
import { ASSETS } from "../../../config/assets";
// Then use:
<Img src={ASSETS.images.assembleeNationale} />
```

Never call `staticFile()` directly in scene files. See `docs/assets-guide.md` for the full asset directory layout.

---

## Motion design principles

See `docs/visual-language.md` for the full reference. Key principles:

- **Spring physics** for all entrances — tuned presets in `src/config/motion.ts`
- **Fade + slide** as the default entrance pattern
- **Staggered reveals** — never show multiple elements simultaneously
- **Organic drift** — floating elements use slow sinusoidal oscillation
- **Glow as focus indicator** — not decoration; always animated in
- **Cross-dissolves** — 8-frame fade-in/out on every scene via `SceneContainer`

---

## Quality checks

Every commit is automatically checked by a pre-commit hook (Husky + lint-staged). Only staged files are processed — the full render is never triggered on commit.

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run lint`         | TypeScript type-check + ESLint on `src/` |
| `npm run format`       | Prettier write on all TS/TSX/MD/JSON/CSS |
| `npm run format:check` | Prettier check (CI-safe, no writes)      |

**On every `git commit`**, lint-staged runs on staged files only:

- `*.ts / *.tsx` → `eslint --fix` then `prettier --write`
- `*.json / *.md / *.css` → `prettier --write`

ESLint is configured in `eslint.config.cjs` (ESLint v9 flat config). Rules are intentionally non-blocking — only `react-hooks/rules-of-hooks` is an error; everything else is a warning that gets auto-fixed or surfaced without stopping the commit.

To run the hook manually without committing:

```bash
npx lint-staged
```

---

## License

Private — MonÉlu internal use only.
