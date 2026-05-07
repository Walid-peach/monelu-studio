import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../../config/typography";
import { COLORS } from "../../../config/colors";
import { clamp, fadeIn, slideIn, springIn } from "../../../utils/animation";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { NoiseOverlay } from "../../../components/cinematic/NoiseOverlay";
import { BrowserMockup } from "../../../components/ui/BrowserMockup";
import { MoneluLogo } from "../../../components/branding/MoneluLogo";
import { SCENE_DURATIONS } from "../config";

const LIVE_URL = "monelu-production.up.railway.app";

// ─── Timing (frames @ 30 fps, scene = 180 frames = 6 s) ─────────────────────
const T = {
  headlineIn:  9,
  sublineIn:   22,
  browserIn:   30,
  zoomStart:   66,
  zoomEnd:     114,
  taglineIn:   108,
  ctaIn:       116,
  urlIn:       128,
  ecFadeStart: 118,
  ecFadeEnd:   136,
  ecLogoIn:    151,
  ecSloganIn:  162,
};

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineSpring  = springIn(frame, fps, T.headlineIn, { damping: 22, stiffness: 115, mass: 0.85 });
  const headlineOpacity = fadeIn(frame, T.headlineIn, T.headlineIn + 16);
  const headlineY       = interpolate(headlineSpring, [0, 1], [22, 0], clamp);

  const sublineOpacity = fadeIn(frame, T.sublineIn, T.sublineIn + 16);
  const sublineY       = slideIn(frame, T.sublineIn, T.sublineIn + 16, 16);

  const browserSpring  = springIn(frame, fps, T.browserIn, { damping: 18, stiffness: 110, mass: 0.90 });
  const browserOpacity = fadeIn(frame, T.browserIn, T.browserIn + 22);
  const browserSlideY  = interpolate(browserSpring, [0, 1], [32, 0], clamp);

  const browserZoom = interpolate(frame, [T.zoomStart, T.zoomEnd], [1.0, 1.058], clamp);

  const glowBase  = interpolate(
    frame,
    [T.zoomStart, T.zoomStart + 14, T.zoomEnd - 14, T.zoomEnd],
    [0, 1, 1, 0],
    clamp
  );
  const glowPulse = 0.72 + Math.sin((frame - T.zoomStart) / 18) * 0.28;
  const chatGlow  = glowBase * glowPulse;

  const taglineOpacity = fadeIn(frame, T.taglineIn, T.taglineIn + 14);
  const taglineY       = slideIn(frame, T.taglineIn, T.taglineIn + 14, 12);

  const ctaSpring  = springIn(frame, fps, T.ctaIn, { damping: 20, stiffness: 130, mass: 0.85 });
  const ctaOpacity = fadeIn(frame, T.ctaIn, T.ctaIn + 14);
  const ctaScale   = interpolate(ctaSpring, [0, 1], [0.94, 1], clamp);

  const urlOpacity = fadeIn(frame, T.urlIn, T.urlIn + 14);
  const urlY       = slideIn(frame, T.urlIn, T.urlIn + 14, 12);

  // Main content dims out, then brand end-card appears
  const mainFade = interpolate(frame, [T.ecFadeStart, T.ecFadeEnd], [1, 0], clamp);

  const ecLogoSpring  = springIn(frame, fps, T.ecLogoIn, { damping: 22, stiffness: 110, mass: 0.90 });
  const ecLogoOpacity = fadeIn(frame, T.ecLogoIn, T.ecLogoIn + 16);
  const ecLogoScale   = interpolate(ecLogoSpring, [0, 1], [0.96, 1], clamp);

  const ecSloganOpacity = fadeIn(frame, T.ecSloganIn, T.ecSloganIn + 14);
  const ecSloganY       = slideIn(frame, T.ecSloganIn, T.ecSloganIn + 14, 10);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene6}>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 48%, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.07) 30%, transparent 54%),
            linear-gradient(160deg, #06101E 0%, #0A1A35 45%, #08121F 100%)
          `,
        }}
      />

      <NoiseOverlay filterId="s6Grain" opacity={0.038} />

      {/* "Phase 2 terminée." */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headlineOpacity * mainFade,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 66,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.052em",
            lineHeight: 1.06,
          }}
        >
          Phase 2 terminée.
        </div>
      </div>

      {/* Subheadline */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: sublineOpacity * mainFade,
          transform: `translateY(${sublineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 32,
            fontWeight: 400,
            color: "rgba(203,213,225,0.76)",
            letterSpacing: "-0.025em",
            lineHeight: 1.44,
          }}
        >
          MonÉlu répond maintenant
          <br />
          à vos questions en français.
        </div>
      </div>

      {/* Browser mockup */}
      <div
        style={{
          position: "absolute",
          top: 352,
          left: 100,
          width: 880,
          opacity: browserOpacity * mainFade,
          transform: `translateY(${browserSlideY}px)`,
        }}
      >
        <BrowserMockup zoom={browserZoom} chatGlow={chatGlow} url={LIVE_URL} />
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          top: 1012,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: taglineOpacity * mainFade,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.family,
            fontSize: 19,
            fontWeight: 500,
            color: "rgba(148,163,184,0.68)",
            letterSpacing: "0.008em",
          }}
        >
          Réponses sourcées · Données officielles · Accessible à tous
        </span>
      </div>

      {/* CTA button */}
      <div
        style={{
          position: "absolute",
          top: 1092,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: ctaOpacity * mainFade,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: COLORS.accent,
            borderRadius: 18,
            padding: "16px 46px",
            boxShadow: "0 8px 36px rgba(37,99,235,0.52), inset 0 1px 0 rgba(255,255,255,0.14)",
            border: "1px solid rgba(96,165,250,0.28)",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: 28,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Essayez maintenant
          </span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11h14M12 5l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          top: 1172,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: urlOpacity * mainFade,
          transform: `translateY(${urlY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.family,
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(148,163,184,0.68)",
            letterSpacing: "0.005em",
          }}
        >
          {LIVE_URL}
        </span>
      </div>

      {/* End-card brand signature */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            opacity: ecLogoOpacity,
            transform: `scale(${ecLogoScale})`,
            marginBottom: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MoneluLogo
            variant="dark"
            width={1200}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div
          style={{
            opacity: ecSloganOpacity,
            transform: `translateY(${ecSloganY}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: 34,
              fontWeight: 400,
              color: "rgba(203,213,225,0.68)",
              letterSpacing: "-0.022em",
              lineHeight: 1.48,
            }}
          >
            Chaque loi. Chaque vote.
            <br />
            En clair.
          </span>
        </div>
      </div>

    </SceneContainer>
  );
};
