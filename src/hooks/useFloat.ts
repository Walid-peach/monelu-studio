/**
 * Returns x/y drift offsets that produce a slow organic float.
 * Designed for use with translateX/translateY on floating cards.
 *
 * @param frame  - current frame from useCurrentFrame()
 * @param seed   - per-element phase offset so elements drift independently
 * @param ampX   - horizontal amplitude in pixels (default 4)
 * @param ampY   - vertical amplitude in pixels (default 5)
 * @param freqX  - horizontal cycle frequency (default 0.020)
 * @param freqY  - vertical cycle frequency (default 0.015)
 */
export const useFloat = (
  frame: number,
  seed = 0,
  ampX = 4,
  ampY = 5,
  freqX = 0.020,
  freqY = 0.015
): { driftX: number; driftY: number } => ({
  driftX: Math.sin((frame + seed) * freqX) * ampX,
  driftY: Math.cos((frame + seed) * freqY) * ampY,
});
