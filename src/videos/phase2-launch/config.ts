import { VIDEO_FPS } from "../../config/brand";

// ─── Scene durations (frames @ 30 fps) ───────────────────────────────────────
export const SCENE_DURATIONS = {
  scene1: 4 * VIDEO_FPS,   // 120 — Hook
  scene2: 5 * VIDEO_FPS,   // 150 — Question constellation
  scene3: 4 * VIDEO_FPS,   // 120 — MonÉlu reveal
  scene4: 5 * VIDEO_FPS,   // 150 — Official sources universe
  scene5: 7 * VIDEO_FPS,   // 210 — Sourced answer reveal
  scene6: 6 * VIDEO_FPS,   // 180 — Phase 2 outro
};

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0
); // 930 frames = 31 s

// Derived start frames — do not edit directly, change SCENE_DURATIONS above.
export const SCENE_STARTS = (() => {
  const d = SCENE_DURATIONS;
  return {
    scene1: 0,
    scene2: d.scene1,
    scene3: d.scene1 + d.scene2,
    scene4: d.scene1 + d.scene2 + d.scene3,
    scene5: d.scene1 + d.scene2 + d.scene3 + d.scene4,
    scene6: d.scene1 + d.scene2 + d.scene3 + d.scene4 + d.scene5,
  };
})();
