import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "../../config/colors";
import { SCENE_DURATIONS, SCENE_STARTS } from "./config";
import { Scene1 } from "./scenes/Scene1";

// ─── Composition ─────────────────────────────────────────────────────────────
// Rename this component and the Composition id in Root.tsx when you copy this
// template to a real video (e.g. MyNewVideo).
export const TemplateVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
    <Sequence from={SCENE_STARTS.scene1} durationInFrames={SCENE_DURATIONS.scene1}>
      <Scene1 />
    </Sequence>

    {/* Add more sequences as you add scenes:
    <Sequence from={SCENE_STARTS.scene2} durationInFrames={SCENE_DURATIONS.scene2}>
      <Scene2 />
    </Sequence>
    */}
  </AbsoluteFill>
);
