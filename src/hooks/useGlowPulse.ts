/**
 * Returns a pulsing glow intensity value between 0 and 1.
 * Intended for box-shadow or opacity on glow overlays.
 *
 * @param frame      - current frame from useCurrentFrame()
 * @param phase      - per-element phase offset so elements pulse independently
 * @param period     - pulse period in frames (default 55)
 * @param amplitude  - pulse swing ±amplitude around 0.5 (default 0.5)
 */
export const useGlowPulse = (
  frame: number,
  phase = 0,
  period = 55,
  amplitude = 0.5
): number =>
  Math.sin(frame / period + phase) * amplitude + (1 - amplitude);
