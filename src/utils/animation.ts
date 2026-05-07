import { Easing, interpolate, spring } from "remotion";

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// ─── Easing presets ───────────────────────────────────────────────────────────
const easeOutCubic = Easing.out(Easing.cubic);
const easeOutQuad  = Easing.out(Easing.quad);

/** Opacity 0 → 1 with ease-out-quad. */
export const fadeIn = (frame: number, from: number, to: number): number =>
  interpolate(frame, [from, to], [0, 1], { ...clamp, easing: easeOutQuad });

/** Opacity 1 → 0 with ease-in-quad. */
export const fadeOut = (frame: number, from: number, to: number): number =>
  interpolate(frame, [from, to], [1, 0], { ...clamp, easing: Easing.in(Easing.quad) });

/** Translate `offset`px → 0 with ease-out-cubic. */
export const slideIn = (
  frame: number,
  from: number,
  to: number,
  offset = 24
): number =>
  interpolate(frame, [from, to], [offset, 0], { ...clamp, easing: easeOutCubic });

/** Progress 0 → 1 with ease-out-cubic. Use for drawing lines, underlines, etc. */
export const reveal = (frame: number, from: number, to: number): number =>
  interpolate(frame, [from, to], [0, 1], { ...clamp, easing: easeOutCubic });

/** Spring entrance 0 → 1, starting at `delay` frames. */
export const springIn = (
  frame: number,
  fps: number,
  delay = 0,
  config = { damping: 16, stiffness: 120, mass: 0.8 }
): number => spring({ frame: frame - delay, fps, config });

/** Scale from `from` → 1 via spring. Use for pop-in entrances. */
export const scaleIn = (
  frame: number,
  fps: number,
  delay = 0,
  from = 0.85,
  config = { damping: 18, stiffness: 140, mass: 0.7 }
): number => {
  const progress = spring({ frame: frame - delay, fps, config });
  return from + (1 - from) * progress;
};
