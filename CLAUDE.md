# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Remotion Studio at http://localhost:3000 (hot-reload)
npm run render       # Render final MP4 → out/monelu-phase2.mp4
npm run render:hq    # Same, higher JPEG quality, 4 parallel workers
npm run lint         # TypeScript type check (tsc --noEmit)
npm run upgrade      # Upgrade all @remotion/* packages together
```

There is no test suite and no ESLint configured. Type safety is enforced by `tsc --noEmit`.

## Architecture

This is a **Remotion 4 TypeScript project** that renders LinkedIn videos (1080×1350, 30 fps) for the MonÉlu civic data platform.

### Entry point & composition tree

```
src/index.ts                           → registerRoot(Root)
src/Root.tsx                           → registers all <Composition> elements
src/videos/phase2-launch/composition.tsx → MoneluPhase2: six <Sequence> blocks
src/videos/phase2-launch/scenes/       → each scene is self-contained
```

`composition.tsx` is the only place that controls scene ordering and visibility windows. Each `<Sequence from={SCENE_STARTS.sceneN} durationInFrames={SCENE_DURATIONS.sceneN}>` gives its child a **local frame counter starting at 0**, so scenes are fully independent.

### Single sources of truth

| Config file | Exports | Contents |
|-------------|---------|----------|
| `src/config/colors.ts` | `COLORS` | Full color palette |
| `src/config/typography.ts` | `FONTS` | Font family, size scale, weights |
| `src/config/brand.ts` | `VIDEO_WIDTH/HEIGHT/FPS`, `SPACING` | Format, spacing |
| `src/config/motion.ts` | `SPRINGS` | Spring physics presets |
| `src/config/copy.ts` | `COPY` | All French-language copy |
| `src/config/assets.ts` | `ASSETS` | All `staticFile()` paths |
| `src/videos/phase2-launch/config.ts` | `SCENE_DURATIONS`, `SCENE_STARTS`, `TOTAL_DURATION` | Per-video timing |

Change a scene duration in `config.ts` and `TOTAL_DURATION` + `SCENE_STARTS` update automatically via a derived IIFE.

### Animation utilities: `src/utils/animation.ts`

All return plain numbers; combine with `interpolate()` for derived values.

- `fadeIn(frame, from, to)` — opacity 0→1 (ease-out-quad)
- `fadeOut(frame, from, to)` — opacity 1→0 (ease-in-quad)
- `slideIn(frame, from, to, offset?)` — translateY `offset`→0 (ease-out-cubic)
- `reveal(frame, from, to)` — progress 0→1 (ease-out-cubic); for line/underline draws
- `springIn(frame, fps, delay?, config?)` — spring 0→1 with optional delay
- `scaleIn(frame, fps, delay?, from?, config?)` — spring scale `from`→1
- `clamp` — standard extrapolation options `{ extrapolateLeft: "clamp", ... }`

### Hooks: `src/hooks/`

- `useFloat(frame, seed, ampX, ampY, freqX, freqY)` → `{ driftX, driftY }` — organic float
- `useFadeSlide(frame, delay, opts)` → `{ opacity, translateY }` — fade+slide entrance
- `useSpringPop(frame, fps, delay, opts)` → `{ opacity, scale, translateY }` — spring pop-in
- `useGlowPulse(frame, phase, period, amplitude)` → number 0→1 — pulsing glow

### Scene structure pattern

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Compute animation values from frame
const opacity = fadeIn(frame, 5, 20);
const progress = springIn(frame, fps, 10);

return (
  <SceneContainer durationInFrames={SCENE_DURATIONS.sceneN}>
    {/* inline styles using computed values */}
  </SceneContainer>
);
```

All styles are inline objects — no CSS files, no external UI libraries.

### Components

```
src/components/branding/    → MoneluLogo (PNG), MoneluWordmark (inline SVG)
src/components/cinematic/   → NoiseOverlay, RadialBackground, Glow
src/components/ui/          → FeatureChip, AnalysisCard, BrowserMockup, GlassCard, GradientButton
src/components/layout/      → SceneContainer, SafeArea, GridOverlay
```

### Assets

All static files are under `public/assets/`. Always reference via `ASSETS` from `src/config/assets.ts` — never use `staticFile()` inline in scene files.

### Adding a new video

1. Create `src/videos/[name]/config.ts`, `composition.tsx`, `index.tsx`, `scenes/`
2. Register in `src/Root.tsx` as a new `<Composition>`

### Render output

The `out/` directory is the render target. `Config.setOverwriteOutput(true)` is set in `remotion.config.ts` so re-renders never prompt.
