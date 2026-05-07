import { Easing } from "remotion";

// Named easing functions for consistent motion feel across all videos.
export const ease = {
  outQuad:   Easing.out(Easing.quad),
  inQuad:    Easing.in(Easing.quad),
  outCubic:  Easing.out(Easing.cubic),
  inCubic:   Easing.in(Easing.cubic),
  inOutCubic: Easing.inOut(Easing.cubic),
  outExpo:   Easing.out(Easing.exp),
  outBack:   Easing.out(Easing.back(1.7)),
} as const;
