import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { COPY } from "../../../config/copy";
import { FONTS } from "../../../config/typography";
import { ASSETS } from "../../../config/assets";
import { clamp, fadeIn, slideIn } from "../../../utils/animation";
import { MoneluLogo } from "../../../components/branding/MoneluLogo";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { SCENE_DURATIONS } from "../config";

// ─── Timing (frames @ 30 fps) ─────────────────────────────────────────────────
const T = {
  logo:   4,
  title:  10,
  hook:   34,
  strip:  56,
  source: 70,
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const bgScale = interpolate(frame, [0, SCENE_DURATIONS.scene1], [1.06, 1.0], clamp);

  const logoOpacity   = fadeIn(frame, T.logo,   T.logo   + 14);
  const titleOpacity  = fadeIn(frame, T.title,  T.title  + 18);
  const titleY        = slideIn(frame, T.title, T.title  + 18, 22);
  const hookOpacity   = fadeIn(frame, T.hook,   T.hook   + 16);
  const hookY         = slideIn(frame, T.hook,  T.hook   + 16, 16);
  const stripOpacity  = fadeIn(frame, T.strip,  T.strip  + 16);
  const stripY        = slideIn(frame, T.strip, T.strip  + 16, 12);
  const sourceOpacity = fadeIn(frame, T.source, T.source + 14);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene1}>

      {/* Full-screen parliament photo */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={ASSETS.images.assembleeNationale}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 38%",
            transform: `scale(${bgScale})`,
            transformOrigin: "center center",
          }}
        />
      </AbsoluteFill>

      {/* Gradient overlay — breathes at top, darkens toward bottom */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            180deg,
            rgba(13, 31, 60, 0.05) 0%,
            rgba(13, 31, 60, 0.18) 30%,
            rgba(13, 31, 60, 0.68) 52%,
            rgba(13, 31, 60, 0.90) 72%,
            rgba(13, 31, 60, 0.96) 100%
          )`,
        }}
      />

      {/* MonÉlu logo — top left */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 56,
          opacity: logoOpacity * 0.85,
        }}
      >
        <MoneluLogo variant="light" width={330} />
      </div>

      {/* Text content block — bottom-anchored */}
      <div
        style={{
          position: "absolute",
          bottom: 112,
          left: 72,
          right: 72,
        }}
      >
        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.family,
              fontSize: FONTS.sizes.xxl,
              fontWeight: FONTS.weights.bold,
              color: "rgba(255,255,255,0.97)",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            Le budget de la Sécu 2026
            <br />
            a été{" "}
            <span style={{ color: "#4ADE80" }}>adopté.</span>
          </div>
        </div>

        {/* Hook line */}
        <div
          style={{
            opacity: hookOpacity,
            transform: `translateY(${hookY}px)`,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.family,
              fontSize: FONTS.sizes.xl,
              fontWeight: FONTS.weights.semibold,
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            Mais qui a voté quoi&nbsp;?
          </div>
        </div>

        {/* Vote number strip */}
        <div
          style={{
            opacity: stripOpacity,
            transform: `translateY(${stripY}px)`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "stretch",
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {(
              [
                { label: "247 pour",       color: "#4ADE80", bg: "rgba(74,222,128,0.12)"  },
                { label: "234 contre",     color: "#F87171", bg: "rgba(248,113,113,0.12)" },
                { label: "93 abstentions", color: "#FCD34D", bg: "rgba(252,211,77,0.10)"  },
              ] as const
            ).map(({ label, color, bg }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <div style={{ width: 1, alignSelf: "stretch", backgroundColor: "rgba(255,255,255,0.10)" }} />
                )}
                <div style={{ padding: "13px 26px", backgroundColor: bg }}>
                  <span
                    style={{
                      fontFamily: FONTS.family,
                      fontSize: FONTS.sizes.sm,
                      fontWeight: FONTS.weights.semibold,
                      color,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Source attribution */}
        <div style={{ opacity: sourceOpacity }}>
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: FONTS.sizes.xs,
              fontWeight: FONTS.weights.medium,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Scrutin public {COPY.voteId} · {COPY.voteDate}
          </span>
        </div>
      </div>

    </SceneContainer>
  );
};
