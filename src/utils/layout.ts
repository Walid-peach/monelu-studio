import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../config/brand";

/** Center a block horizontally given its width. */
export const centerX = (width: number): number => (VIDEO_WIDTH - width) / 2;

/** Center a block vertically given its height. */
export const centerY = (height: number): number => (VIDEO_HEIGHT - height) / 2;

/** Clamp a value between min and max. */
export const clampValue = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
