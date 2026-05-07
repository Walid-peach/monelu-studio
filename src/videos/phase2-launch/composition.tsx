import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "../../config/colors";
import { SCENE_DURATIONS, SCENE_STARTS } from "./config";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Questions } from "./scenes/Scene2Questions";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { Scene4Sources } from "./scenes/Scene4Sources";
import { Scene5Answer } from "./scenes/Scene5Answer";
import { Scene6Outro } from "./scenes/Scene6Outro";

// Phase 2 launch video — 30 s, 1080×1350, 30 fps.
// Scenes are fully independent: useCurrentFrame() resets to 0 inside each Sequence.
export const MoneluPhase2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
    <Sequence from={SCENE_STARTS.scene1} durationInFrames={SCENE_DURATIONS.scene1}>
      <Scene1Hook />
    </Sequence>

    <Sequence from={SCENE_STARTS.scene2} durationInFrames={SCENE_DURATIONS.scene2}>
      <Scene2Questions />
    </Sequence>

    <Sequence from={SCENE_STARTS.scene3} durationInFrames={SCENE_DURATIONS.scene3}>
      <Scene3Solution />
    </Sequence>

    <Sequence from={SCENE_STARTS.scene4} durationInFrames={SCENE_DURATIONS.scene4}>
      <Scene4Sources />
    </Sequence>

    <Sequence from={SCENE_STARTS.scene5} durationInFrames={SCENE_DURATIONS.scene5}>
      <Scene5Answer />
    </Sequence>

    <Sequence from={SCENE_STARTS.scene6} durationInFrames={SCENE_DURATIONS.scene6}>
      <Scene6Outro />
    </Sequence>
  </AbsoluteFill>
);
