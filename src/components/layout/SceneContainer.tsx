import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../config/colors";
import { clamp } from "../../utils/animation";

const FADE_FRAMES = 8;

// Wraps every scene with an 8-frame fade-in and fade-out for cross-dissolves.
// Pass the scene's own durationInFrames from the video config.
export const SceneContainer: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    clamp
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, opacity }}>
      {children}
    </AbsoluteFill>
  );
};
