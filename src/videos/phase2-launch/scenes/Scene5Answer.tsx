import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../config/colors";
import { FONTS } from "../../../config/typography";
import { clamp, fadeIn, slideIn, springIn } from "../../../utils/animation";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { NoiseOverlay } from "../../../components/cinematic/NoiseOverlay";
import { MoneluLogo } from "../../../components/branding/MoneluLogo";
import { SCENE_DURATIONS } from "../config";

const USER_QUESTION = "Est-ce que Gabriel Attal a voté pour le PLFSS 2026 ?";

const SOURCES = [
  "Scrutin public n°4696 — 9 décembre 2025",
  "Assemblée nationale",
  "Dossier législatif PLFSS 2026",
];

const CHIPS = [
  { label: "Réponse sourcée",    dot: "#60A5FA" },
  { label: "En langage naturel", dot: "#A78BFA" },
  { label: "Instantané",         dot: "#34D399" },
];

// ─── Timing (frames @ 30 fps, scene = 210 frames = 7 s) ─────────────────────
const T = {
  bubbleIn:   12,
  cardIn:     38,
  line1In:    64,
  pourIn:     78,
  line3In:    90,
  srcLabelIn: 100,
  src1In:     108,
  src2In:     124,
  src3In:     140,
  chip0In:    154,
  chip1In:    166,
  chip2In:    178,
};

const CheckCircle: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" style={{ flexShrink: 0 }}>
    <circle cx="14" cy="14" r="14" fill="rgba(22,163,74,0.13)" />
    <path
      d="M9 14l3.8 3.8 6.4-6.4"
      stroke={COLORS.green}
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Scene5Answer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbleOpacity = fadeIn(frame, T.bubbleIn, T.bubbleIn + 18);
  const bubbleSpring  = springIn(frame, fps, T.bubbleIn, { damping: 20, stiffness: 115, mass: 0.85 });
  const bubbleSlideX  = interpolate(bubbleSpring, [0, 1], [72, 0], clamp);

  const cardSpring  = springIn(frame, fps, T.cardIn, { damping: 18, stiffness: 115, mass: 0.85 });
  const cardOpacity = fadeIn(frame, T.cardIn, T.cardIn + 20);
  const cardScale   = interpolate(cardSpring, [0, 1], [0.96, 1], clamp);

  const line1Opacity = fadeIn(frame, T.line1In, T.line1In + 16);
  const line1Y       = slideIn(frame, T.line1In, T.line1In + 16, 14);

  const pourSpring   = springIn(frame, fps, T.pourIn, { damping: 15, stiffness: 150, mass: 0.70 });
  const pourOpacity  = fadeIn(frame, T.pourIn, T.pourIn + 14);
  const pourScale    = interpolate(pourSpring, [0, 1], [0.76, 1], clamp);
  const pourGlow     = interpolate(pourSpring, [0, 1], [0, 1], clamp);

  const line3Opacity = fadeIn(frame, T.line3In, T.line3In + 16);
  const line3Y       = slideIn(frame, T.line3In, T.line3In + 16, 12);

  const srcLabelOpacity = fadeIn(frame, T.srcLabelIn, T.srcLabelIn + 14);
  const srcOp = (t: number) => fadeIn(frame, t, t + 14);
  const srcX  = (t: number) => interpolate(frame, [t, t + 20], [22, 0], clamp);

  const chipOp = (t: number) => fadeIn(frame, t, t + 14);
  const chipY  = (t: number) => slideIn(frame, t, t + 14, 16);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene5}>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 52%, rgba(37,99,235,0.26) 0%, rgba(37,99,235,0.08) 28%, transparent 55%),
            linear-gradient(160deg, #06101E 0%, #0A1A35 45%, #08121F 100%)
          `,
        }}
      />

      <NoiseOverlay filterId="s5Grain" opacity={0.038} />

      {/* Radial glow behind answer card */}
      <div
        style={{
          position: "absolute",
          left: 540 - 520,
          top: 356 + 180,
          width: 1040,
          height: 560,
          background:
            "radial-gradient(ellipse 55% 50% at 50% 42%, rgba(37,99,235,0.34) 0%, rgba(37,99,235,0.10) 52%, transparent 72%)",
          opacity: cardOpacity,
          pointerEvents: "none",
        }}
      />

      {/* User question bubble */}
      <div
        style={{
          position: "absolute",
          top: 158,
          left: 268,
          width: 692,
          opacity: bubbleOpacity,
          transform: `translateX(${bubbleSlideX}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#1D4ED8",
            borderRadius: "28px 28px 6px 28px",
            padding: "20px 30px",
            boxShadow:
              "0 10px 40px rgba(37,99,235,0.50), 0 2px 8px rgba(37,99,235,0.30), inset 0 1px 0 rgba(255,255,255,0.14)",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: 29,
              fontWeight: 500,
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.46,
              letterSpacing: "-0.018em",
            }}
          >
            {USER_QUESTION}
          </span>
          <div
            style={{
              position: "absolute",
              bottom: 4,
              right: -9,
              width: 0,
              height: 0,
              borderTop: "11px solid #1D4ED8",
              borderRight: "10px solid transparent",
            }}
          />
        </div>
      </div>

      {/* Answer card */}
      <div
        style={{
          position: "absolute",
          top: 356,
          left: 110,
          width: 860,
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          transformOrigin: "center top",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 28,
            padding: "44px 56px",
            boxShadow: `
              0 36px 90px rgba(0,0,0,0.30),
              0 8px 24px rgba(0,0,0,0.14),
              0 0 0 1px rgba(96,165,250,0.22)
            `,
            border: "1px solid rgba(96,165,250,0.22)",
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <MoneluLogo variant="dark" width={180} />
          </div>

          <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)", marginBottom: 28 }} />

          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                opacity: line1Opacity,
                transform: `translateY(${line1Y}px)`,
                fontFamily: FONTS.family,
                fontSize: 44,
                fontWeight: 700,
                color: "#0F172A",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 10,
              }}
            >
              Gabriel Attal a voté
            </div>

            <div
              style={{
                opacity: pourOpacity,
                transform: `scale(${pourScale})`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.green,
                borderRadius: 16,
                padding: "10px 36px",
                marginBottom: 10,
                boxShadow: `0 0 ${18 + pourGlow * 32}px rgba(22,163,74,${0.26 + pourGlow * 0.30})`,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.family,
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "0.05em",
                }}
              >
                POUR
              </span>
            </div>

            <div
              style={{
                opacity: line3Opacity,
                transform: `translateY(${line3Y}px)`,
                fontFamily: FONTS.family,
                fontSize: 44,
                fontWeight: 700,
                color: "#0F172A",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              le PLFSS 2026.
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)", marginBottom: 22 }} />

          <div
            style={{
              opacity: srcLabelOpacity,
              fontFamily: FONTS.family,
              fontSize: 15,
              fontWeight: 700,
              color: "#94A3B8",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Sources vérifiées
          </div>

          {[T.src1In, T.src2In, T.src3In].map((t, i) => (
            <div
              key={SOURCES[i]}
              style={{
                opacity: srcOp(t),
                transform: `translateX(${srcX(t)}px)`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: i < 2 ? 12 : 0,
              }}
            >
              <CheckCircle />
              <span
                style={{
                  fontFamily: FONTS.family,
                  fontSize: 26,
                  fontWeight: 500,
                  color: "#334155",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.35,
                }}
              >
                {SOURCES[i]}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* Feature chips */}
      <div
        style={{
          position: "absolute",
          top: 1068,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {CHIPS.map((chip, i) => {
          const t = [T.chip0In, T.chip1In, T.chip2In][i];
          return (
            <div
              key={chip.label}
              style={{
                opacity: chipOp(t),
                transform: `translateY(${chipY(t)}px)`,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 100,
                padding: "13px 26px",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: chip.dot,
                  boxShadow: `0 0 8px ${chip.dot}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.family,
                  fontSize: 24,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.90)",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {chip.label}
              </span>
            </div>
          );
        })}
      </div>

    </SceneContainer>
  );
};
