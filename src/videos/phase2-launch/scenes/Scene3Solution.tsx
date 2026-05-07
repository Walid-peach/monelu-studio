import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../config/colors";
import { FONTS } from "../../../config/typography";
import { clamp, fadeIn, slideIn, springIn } from "../../../utils/animation";
import { MoneluLogo } from "../../../components/branding/MoneluLogo";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { SCENE_DURATIONS } from "../config";

// ─── Timing (frames @ 30 fps) ─────────────────────────────────────────────────
const T = {
  line1In:  8,
  line2In: 20,
  line3In: 33,
  logoIn:  48,
  sloganIn: 64,
};

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = fadeIn(frame, T.line1In, T.line1In + 14);
  const line1Y       = slideIn(frame, T.line1In, T.line1In + 14, 20);

  const line2Spring  = springIn(frame, fps, T.line2In, { damping: 24, stiffness: 130, mass: 0.80 });
  const line2Opacity = fadeIn(frame, T.line2In, T.line2In + 14);
  const line2Scale   = interpolate(line2Spring, [0, 1], [0.88, 1], clamp);
  const line2Y       = interpolate(line2Spring, [0, 1], [16, 0], clamp);

  const line3Opacity = fadeIn(frame, T.line3In, T.line3In + 14);
  const line3Y       = slideIn(frame, T.line3In, T.line3In + 14, 18);

  const logoSpring  = springIn(frame, fps, T.logoIn, { damping: 20, stiffness: 110, mass: 0.85 });
  const logoOpacity = fadeIn(frame, T.logoIn, T.logoIn + 18);
  const logoScale   = interpolate(logoSpring, [0, 1], [0.92, 1], clamp);

  const sloganOpacity = fadeIn(frame, T.sloganIn, T.sloganIn + 18);
  const sloganY       = slideIn(frame, T.sloganIn, T.sloganIn + 18, 16);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene3}>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 45% at 50% 52%, rgba(37, 99, 235, 0.06) 0%, transparent 65%),
            ${COLORS.background}
          `,
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontFamily: FONTS.family,
            fontSize: 58,
            fontWeight: 700,
            color: COLORS.primary,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            marginBottom: 2,
          }}
        >
          Nous avons
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px) scale(${line2Scale})`,
            fontFamily: FONTS.family,
            fontSize: 96,
            fontWeight: 800,
            color: COLORS.accent,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: 2,
          }}
        >
          la solution
        </div>

        <div
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
            fontFamily: FONTS.family,
            fontSize: 58,
            fontWeight: 700,
            color: COLORS.primary,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
          }}
        >
          pour vous.
        </div>
      </div>

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: 305,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <MoneluLogo variant="dark" width={1200} />
      </div>

      {/* Slogan */}
      <div
        style={{
          position: "absolute",
          top: 980,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: sloganOpacity,
          transform: `translateY(${sloganY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 34,
            fontWeight: FONTS.weights.medium,
            color: COLORS.textSecondary,
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
          }}
        >
          Chaque loi. Chaque vote.
          <br />
          En clair.
        </div>
      </div>

    </SceneContainer>
  );
};
