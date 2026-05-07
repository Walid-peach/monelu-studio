import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../config/colors";
import { FONTS } from "../../../config/typography";
import { fadeIn, slideIn, springIn } from "../../../utils/animation";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { SCENE_DURATIONS } from "../config";

// ─── Timing (frames @ 30 fps) ─────────────────────────────────────────────────
const T = {
  titleIn: 10,
  subIn:   24,
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, T.titleIn, T.titleIn + 18);
  const titleY       = slideIn(frame, T.titleIn, T.titleIn + 18, 20);

  const subOpacity = fadeIn(frame, T.subIn, T.subIn + 16);
  const subY       = slideIn(frame, T.subIn, T.subIn + 16, 16);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene1}>

      {/* Background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, #06101E 0%, #0A1A35 45%, #08121F 100%)`,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: FONTS.family,
            fontSize: FONTS.sizes.xxl,
            fontWeight: FONTS.weights.bold,
            color: COLORS.white,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Titre de la scène
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontFamily: FONTS.family,
            fontSize: FONTS.sizes.md,
            fontWeight: FONTS.weights.medium,
            color: "rgba(255,255,255,0.60)",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Sous-titre ou accroche
        </div>
      </AbsoluteFill>

    </SceneContainer>
  );
};
