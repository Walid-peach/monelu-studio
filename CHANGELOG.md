# Changelog

All notable changes to MonÉlu Studio are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [2.0.0] — 2026-05-07

### Added — Studio refactor

- `src/config/` — split monolithic `constants.ts` into `colors.ts`, `typography.ts`, `brand.ts`, `motion.ts`, `copy.ts`, `assets.ts`
- `src/components/branding/` — `MoneluLogo` (PNG), `MoneluWordmark` (inline SVG hemicycle)
- `src/components/cinematic/` — `NoiseOverlay`, `RadialBackground`, `Glow`
- `src/components/ui/` — `FeatureChip`, `AnalysisCard`, `BrowserMockup`, `GlassCard`, `GradientButton`
- `src/components/layout/` — `SceneContainer`, `SafeArea`, `GridOverlay`
- `src/hooks/` — `useFloat`, `useEntrance` (`useFadeSlide`, `useSpringPop`), `useGlowPulse`
- `src/utils/` — `animation.ts` (renamed from `animations.ts`), `easing.ts`, `layout.ts`, `remotion.ts`
- `src/types/` — `video.ts`, `scene.ts`
- `src/videos/_template/` — reusable starter template (`config.ts`, `composition.tsx`, `scenes/Scene1.tsx`)
- `src/styles/globals.css`
- `scripts/render.sh`, `scripts/clean-exports.sh`, `scripts/generate-thumbnail.sh`
- `.github/workflows/ci.yml` — TypeScript type-check on push
- `.github/workflows/render.yml` — manual render via `workflow_dispatch`
- `docs/storyboard.md`, `docs/production-notes.md`, `docs/visual-language.md`, `docs/design-system.md`, `docs/assets-guide.md`
- `docs/prompts/` — AI-assisted workflow templates (Claude Code, Remotion, image generation, LinkedIn)
- `README.md`, `CHANGELOG.md`, `.gitignore`, `.env.example`
- `archive/experiments/` — archived unused scene variants
- `public/assets/` — organized into `logos/`, `images/`, `scene4/`, `exports/`, `textures/`

### Changed

- `src/videos/phase2-launch/` — Phase 2 video moved from flat `src/components/` structure
- `Scene2DeputyQuestion` → `Scene2Questions`
- `Scene4DataAnalysis` → `Scene4Sources`
- `BrowserMockup` extracted from `Scene6Outro` into `src/components/ui/`
- `Logo.tsx` → `MoneluWordmark.tsx` (branding category)
- All `staticFile()` calls centralized into `src/config/assets.ts`
- `package.json` — renamed project to `monelu-studio`, added `lint` script (`tsc --noEmit`)
- `tsconfig.json` — added `archive/` to `exclude`

### Removed

- `src/constants.ts` — replaced by `src/config/`
- `src/MoneluPhase2.tsx` — replaced by `src/videos/phase2-launch/composition.tsx`
- `src/utils/animations.ts` — replaced by `src/utils/animation.ts`
- Duplicate `clamp` definition in `Scene4DataAnalysis.tsx`
- `src/components/Scene*.tsx` (all flat scene files)
- `src/components/{Logo,MoneluLogo,FeatureChip,AnalysisCard,SceneContainer}.tsx`
- Stray image files from `src/` — moved to `public/assets/`

---

## [1.0.0] — 2026-05-07

### Added — Phase 2 launch video

- Initial Remotion 4 project — 30 s LinkedIn video (1080×1350, 30 fps)
- Six scenes: Hook · Question constellation · MonÉlu reveal · Sources universe · Sourced answer · Outro
- `src/constants.ts` — single source of truth for colors, fonts, spacing, copy, timing
- `src/utils/animations.ts` — `fadeIn`, `fadeOut`, `slideIn`, `reveal`, `springIn`, `scaleIn`
- `src/components/SceneContainer.tsx` — 8-frame cross-dissolve wrapper
- Published on LinkedIn — [Phase 2 Launch](https://www.linkedin.com/posts/walid-elkhoukh_monelu-dataengineering-opendata-ugcPost-7458104231019950080-N6Yt)
