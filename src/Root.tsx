import React from "react";
import { Composition } from "remotion";
import { MoneluPhase2, TOTAL_DURATION } from "./videos/phase2-launch";
import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./config/brand";

// Register all compositions here.
// Add new videos by importing their component and config, then registering below.
export const Root: React.FC = () => (
  <>
    <Composition
      id="MoneluPhase2"
      component={MoneluPhase2}
      durationInFrames={TOTAL_DURATION}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  </>
);
