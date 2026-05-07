import { VIDEO_FPS } from "../../config/brand";

// ─── Scene durations ──────────────────────────────────────────────────────────
// One entry per scene. Rename keys to match your scene names.
// TOTAL_DURATION and SCENE_STARTS derive automatically — never edit them directly.
export const SCENE_DURATIONS = {
  scene1: 5 * VIDEO_FPS,   // 150 frames = 5 s
  // scene2: 5 * VIDEO_FPS,
  // scene3: 5 * VIDEO_FPS,
};

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0
);

export const SCENE_STARTS = (() => {
  const d = SCENE_DURATIONS;
  return {
    scene1: 0,
    // scene2: d.scene1,
    // scene3: d.scene1 + d.scene2,
  };
})();
