# MonÉlu Studio — Visual Language

This document defines the aesthetic vocabulary that should be consistent across all MonÉlu videos and motion assets.

---

## Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Brand Navy | `#0D1F3C` | Primary text, logo, civic weight scenes |
| Brand Red | `#C9302C` | "Élu" italic accent, brand moments only |
| Interactive Blue | `#2563EB` | CTAs, highlights, glow source |
| Background Light | `#F7F8FA` | Clean scenes (Scene 3 reveal) |
| Night Navy | `#06101E → #0A1A35 → #08121F` | Dark gradient backgrounds |
| Accent Green | `#4ADE80` | Vote results (pour), success states |
| Vote Red | `#F87171` | Vote results (contre) |
| Vote Yellow | `#FCD34D` | Abstentions |

Dark scenes use a layered gradient:
```css
linear-gradient(160deg, #06101E 0%, #0A1A35 45%, #08121F 100%)
```
Optionally layered with a blue radial glow at the center or bottom edge.

---

## Typography

**Font stack:** `-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif`

This gives Inter on macOS, Segoe UI on Windows, and a clean sans-serif fallback everywhere else. No web font loading — renders identically on any machine.

**Type scale:**

| Name | Size | Usage |
|------|------|-------|
| hero | 68px | Scene headers (Phase 2 terminée.) |
| xxl | 58px | Large body text |
| xl | 48px | Sub-hero text |
| lg | 36px | Labels, secondary headlines |
| md | 28px | Body text |
| sm | 22px | Chips, secondary text |
| xs | 18px | Captions, attribution |

**Letter-spacing philosophy:** Tight tracking (-0.03em to -0.055em) for headlines. Slightly negative (-0.01em) for body. Expanded (+0.06em to +0.12em) only for caps labels (SCRUTIN, QUESTION, ANALYSÉ).

**Weight hierarchy:** Captions = 400–500. Body = 500–600. Headlines = 700–800. Accent labels = 700–800.

---

## Glass Morphism

Glass cards are used on dark backgrounds to suggest depth layers. The recipe:

```css
background-color: rgba(255, 255, 255, 0.08);  /* 8% white */
border: 1px solid rgba(255, 255, 255, 0.14);   /* 14% white border */
border-radius: 22-36px;
backdrop-filter: blur(12-14px);
box-shadow: 0 20px 60px rgba(0,0,0,0.28);
```

Background cards (further from camera): lower alpha (4%), less blur (2px applied to the container).

The white card (selected/answer): full white `#F8FAFF` or `#FFFFFF`, blue border tinting `rgba(80, 140, 255, ...)`, blue glow shadow.

---

## Glow Usage

Glow is used sparingly as a focus indicator, not decoration:
- **Blue glow** (`rgba(37, 99, 235, ...)`) — appears behind active/selected cards, intensifies as focus increases
- **Green glow** (`rgba(22, 163, 74, ...)`) — appears on the POUR badge as it scales in
- **Radial background glow** — a large, very soft radial gradient at scene center to create depth and warmth

Never use glow at full opacity from the start. It should always animate in (either via `interpolate` or `spring`) so it feels earned.

---

## Cinematic Spacing

Content never touches the canvas edge. Minimum safe-area margins:
- Horizontal: 56–72px
- Top: 56–110px
- Bottom: 80–112px

Large headlines are center-aligned for impact. Multi-line text should be left-aligned for readability. Bottom-anchored text blocks create a "news ticker" reading rhythm.

---

## Motion Philosophy

**Spring physics over linear easing.** All entrances use Remotion's `spring()` with tuned damping/stiffness. This produces the organic, premium feel that distinguishes this work from standard transitions.

Preset springs (from `src/config/motion.ts`):
- `gentle` — slow, heavy elements
- `standard` — most card entrances
- `stiff` — CTAs and badges that need to feel snappy
- `snappy` — pop-in moments (POUR badge)

**Drift.** Floating elements use sine/cosine oscillation with per-element phase offsets to prevent synchronization. Amplitudes are small (3–5px) and frequencies are slow (period ~7–10 seconds) so the effect reads as organic, not jittery.

**Staggered reveals.** Multiple elements in a row always enter with a frame stagger (6–12 frames between items). Never have everything appear simultaneously.

**Fade + slide = standard entrance.** The default pattern: opacity 0→1 (ease-out-quad) combined with translateY `offset`→0 (ease-out-cubic). Use `fadeIn()` + `slideIn()` from `src/utils/animation.ts`.

**Cross-dissolves.** Every scene uses `SceneContainer` which applies an 8-frame fade-in and fade-out. This produces smooth transitions without any hard cuts.
