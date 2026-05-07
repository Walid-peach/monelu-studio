# MonÉlu Studio — Design System

Component and token reference for building new videos and assets.

---

## Config tokens

| File | Exports | Use when |
|------|---------|----------|
| `src/config/colors.ts` | `COLORS` | Background, text, brand colors |
| `src/config/typography.ts` | `FONTS` | Font family, size scale, weights |
| `src/config/brand.ts` | `VIDEO_WIDTH/HEIGHT/FPS`, `SPACING` | Canvas dimensions, spacing scale |
| `src/config/motion.ts` | `SPRINGS` | Spring physics presets |
| `src/config/copy.ts` | `COPY` | All user-facing text |
| `src/config/assets.ts` | `ASSETS` | All staticFile() paths |

---

## Components

### Branding

| Component | Props | Notes |
|-----------|-------|-------|
| `MoneluLogo` | `variant`, `width`, `opacity`, `style` | PNG-based logo. Pass `style={{ filter: "brightness(0) invert(1)" }}` for white version |
| `MoneluWordmark` | `size` (sm/md/lg), `theme` (light/dark) | Inline SVG wordmark. Use when PNG is unavailable or resolution is critical |

### Layout

| Component | Props | Notes |
|-----------|-------|-------|
| `SceneContainer` | `durationInFrames` | Required wrapper for every scene. Adds 8-frame cross-dissolves |
| `SafeArea` | `horizontal`, `top`, `bottom` | Consistent edge padding |
| `GridOverlay` | — | Dev-only alignment aid, remove before rendering |

### Cinematic

| Component | Props | Notes |
|-----------|-------|-------|
| `NoiseOverlay` | `filterId`, `opacity` | Film grain. Use unique `filterId` per scene |
| `RadialBackground` | `gradient` | AbsoluteFill with gradient background |
| `Glow` | `top`, `left`, `width`, `height`, `color`, `opacity`, `blur` | Soft radial glow div |

### UI

| Component | Props | Notes |
|-----------|-------|-------|
| `FeatureChip` | `label`, `dotColor`, `variant` | Pill chip with colored dot |
| `AnalysisCard` | full props interface | Floating glass data card |
| `BrowserMockup` | `zoom`, `chatGlow`, `url` | Browser chrome + screenshot |
| `GlassCard` | `children`, `style`, `variant` | Generic glass card container |
| `GradientButton` | `label`, `showArrow`, `style` | CTA button with blue gradient |

---

## Animation utilities

All from `src/utils/animation.ts`:

```ts
fadeIn(frame, from, to)        → opacity 0→1
fadeOut(frame, from, to)       → opacity 1→0
slideIn(frame, from, to, offset) → translateY offset→0
reveal(frame, from, to)        → progress 0→1 (line draws)
springIn(frame, fps, delay, config) → spring 0→1
scaleIn(frame, fps, delay, from, config) → scale from→1
clamp                           → { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
```

---

## Hooks

| Hook | Arguments | Returns |
|------|-----------|---------|
| `useFloat` | `frame, seed, ampX, ampY, freqX, freqY` | `{ driftX, driftY }` |
| `useFadeSlide` | `frame, delay, opts` | `{ opacity, translateY }` |
| `useSpringPop` | `frame, fps, delay, opts` | `{ opacity, scale, translateY }` |
| `useGlowPulse` | `frame, phase, period, amplitude` | number 0→1 |
