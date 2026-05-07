import { interpolate } from "remotion";
import { clamp, fadeIn, slideIn, springIn } from "../utils/animation";

interface EntranceOptions {
  delay?: number;
  fadeDuration?: number;
  slideOffset?: number;
  springConfig?: { damping: number; stiffness: number; mass: number };
}

/**
 * Returns opacity + translateY for a standard fade+slide entrance.
 * Uses ease-out-quad for opacity and ease-out-cubic for position.
 */
export const useFadeSlide = (
  frame: number,
  delay = 0,
  opts: EntranceOptions = {}
) => {
  const { fadeDuration = 16, slideOffset = 18 } = opts;
  return {
    opacity: fadeIn(frame, delay, delay + fadeDuration),
    translateY: slideIn(frame, delay, delay + fadeDuration, slideOffset),
  };
};

/**
 * Returns opacity + scale for a spring pop-in entrance.
 */
export const useSpringPop = (
  frame: number,
  fps: number,
  delay = 0,
  opts: EntranceOptions = {}
) => {
  const { springConfig = { damping: 18, stiffness: 115, mass: 0.85 }, fadeDuration = 16 } = opts;
  const sp = springIn(frame, fps, delay, springConfig);
  return {
    opacity: fadeIn(frame, delay, delay + fadeDuration),
    scale: interpolate(sp, [0, 1], [0.92, 1], clamp),
    translateY: interpolate(sp, [0, 1], [16, 0], clamp),
  };
};
