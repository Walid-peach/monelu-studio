import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../config/colors";
import { FONTS } from "../../../config/typography";
import { clamp, fadeIn, slideIn, springIn } from "../../../utils/animation";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { NoiseOverlay } from "../../../components/cinematic/NoiseOverlay";
import { SCENE_DURATIONS } from "../config";
import { OrbitCard } from "../../../types/scene";

// ─── Timing (frames @ 30 fps) ─────────────────────────────────────────────────
const T = {
  titleIn:     6,
  cardsStart:  12,
  cardStagger: 7,
  selectedIn:  18,
  bottomIn:    36,
  selectStart: 96,
  zoomStart:   126,
  zoomEnd:     150,
};

const SEL_W    = 960;
const SEL_LEFT = (1080 - SEL_W) / 2; // 60
const SEL_TOP  = 570;

const ORBIT_CARDS: OrbitCard[] = [
  { text: "Qui a voté pour le budget de la Sécu ?", x: 60,  y: 190, width: 720, rotation: -2.5, enterDX: -64, enterDY: 0,  driftSeed: 0,   baseOpacity: 0.76 },
  { text: "Quels députés ont voté contre ?",         x: 440, y: 295, width: 630, rotation:  2.0, enterDX:  64, enterDY: 0,  driftSeed: 38,  baseOpacity: 0.62, blurDepth: 1.2 },
  { text: "Qui s'est abstenu ?",                     x: 10,  y: 445, width: 510, rotation: -1.5, enterDX: -56, enterDY: 0,  driftSeed: 76,  baseOpacity: 0.58, blurDepth: 1.8 },
  { text: "Mon député était-il présent ?",           x: 600, y: 940, width: 460, rotation:  2.0, enterDX:  56, enterDY: 44, driftSeed: 114, baseOpacity: 0.80 },
  { text: "Quels groupes ont soutenu le texte ?",    x: 20,  y: 850, width: 560, rotation: -2.5, enterDX: -36, enterDY: 44, driftSeed: 152, baseOpacity: 0.68 },
];

const QuestionCard: React.FC<{ text: string; width: number }> = ({ text, width }) => (
  <div
    style={{
      width,
      backgroundColor: "rgba(255, 255, 255, 0.09)",
      border: "1px solid rgba(255, 255, 255, 0.14)",
      borderRadius: 28,
      padding: "33px 42px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.22)",
      backdropFilter: "blur(12px)",
    }}
  >
    <span
      style={{
        fontFamily: FONTS.family,
        fontSize: 30,
        fontWeight: 500,
        color: "rgba(255, 255, 255, 0.82)",
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
        display: "block",
      }}
    >
      {text}
    </span>
  </div>
);

const SelectedCard: React.FC<{ focusProgress: number }> = ({ focusProgress }) => {
  const borderAlpha = 0.55 + focusProgress * 0.30;
  const innerRingA  = 0.15 + focusProgress * 0.10;
  const blueGlowA   = 0.18 + focusProgress * 0.10;

  return (
    <div
      style={{
        width: SEL_W,
        backgroundColor: "#F8FAFF",
        border: `1px solid rgba(80, 140, 255, ${borderAlpha})`,
        borderRadius: 36,
        padding: "56px 66px",
        boxShadow: [
          `0 0 0 1px rgba(80, 140, 255, ${innerRingA})`,
          `0 30px 90px rgba(37, 99, 235, ${blueGlowA})`,
          "0 50px 120px rgba(0, 0, 0, 0.35)",
        ].join(", "),
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: FONTS.family,
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: "0.12em",
          color: "#2563EB",
          marginBottom: 21,
        }}
      >
        QUESTION
      </span>
      <span
        style={{
          display: "block",
          fontFamily: FONTS.family,
          fontSize: 56,
          fontWeight: 750,
          lineHeight: 1.18,
          letterSpacing: "-0.035em",
          color: COLORS.primary,
        }}
      >
        Est-ce que Gabriel Attal a voté
        <br />
        pour le PLFSS 2026&nbsp;?
      </span>
    </div>
  );
};

export const Scene2Questions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, T.titleIn, T.titleIn + 18);
  const titleY       = slideIn(frame, T.titleIn, T.titleIn + 18, 12);

  const glowFadeIn  = fadeIn(frame, 0, 21);
  const glowFocus   = interpolate(frame, [T.selectStart, T.selectStart + 30], [0.45, 1.0], clamp);
  const glowOpacity = glowFadeIn * glowFocus;

  const selEntrance  = springIn(frame, fps, T.selectedIn, { damping: 20, stiffness: 110, mass: 0.85 });
  const focusSpring  = springIn(frame, fps, T.selectStart, { damping: 22, stiffness: 100, mass: 0.90 });
  const zoomProgress = interpolate(frame, [T.zoomStart, T.zoomEnd], [0, 1], clamp);
  const entranceOp   = fadeIn(frame, T.selectedIn, T.selectedIn + 18);
  const selOpacity   = entranceOp * (0.92 + focusSpring * 0.08);
  const selScale =
    interpolate(selEntrance,   [0, 1], [0.92, 0.96]) +
    interpolate(focusSpring,   [0, 1], [0, 0.04]) +
    interpolate(zoomProgress,  [0, 1], [0, 0.04]);

  const dimProgress  = interpolate(frame, [T.selectStart, T.selectStart + 30], [0, 1], clamp);
  const cardDimAlpha = 1 - dimProgress * 0.65;
  const cardDimBlur  = dimProgress * 1.0;

  const bottomOpacity = fadeIn(frame, T.bottomIn, T.bottomIn + 20);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene2}>

      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse 85% 50% at 50% 102%, rgba(20, 50, 110, 0.55) 0%, transparent 65%),
            linear-gradient(160deg, #06101e 0%, #0a1a35 45%, #08121f 100%)
          `,
          overflow: "hidden",
        }}
      />

      <NoiseOverlay filterId="scene2Noise" opacity={0.05} />

      {/* Radial blue glow behind selected card */}
      <div
        style={{
          position: "absolute",
          top: SEL_TOP - 160,
          left: SEL_LEFT - 180,
          width: SEL_W + 360,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(80, 140, 255, 0.42) 0%, rgba(37, 99, 235, 0.18) 38%, transparent 70%)",
          opacity: glowOpacity,
          pointerEvents: "none",
          filter: "blur(10px)",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 72,
          right: 72,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.family,
            fontSize: 34,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.92)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          Une question en cache souvent d'autres.
        </span>
      </div>

      {/* Orbit cards */}
      {ORBIT_CARDS.map((card, i) => {
        const start = T.cardsStart + i * T.cardStagger;
        const sp = springIn(frame, fps, start, { damping: 20, stiffness: 115, mass: 0.85 });
        const op = fadeIn(frame, start, start + 14);
        const tx = interpolate(sp, [0, 1], [card.enterDX, 0]);
        const ty = interpolate(sp, [0, 1], [card.enterDY, 0]);
        const driftX = Math.sin((frame + card.driftSeed) * 0.025) * 3;
        const driftY = Math.cos((frame + card.driftSeed) * 0.018) * 4;
        const rotSettle = interpolate(sp, [0, 1], [card.rotation * 0.55, card.rotation]);
        const finalOpacity = op * cardDimAlpha * card.baseOpacity;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: card.y,
              left: card.x,
              opacity: finalOpacity,
              transform: `translateX(${tx + driftX}px) translateY(${ty + driftY}px) rotate(${rotSettle}deg)`,
              filter: (() => {
                const totalBlur = (card.blurDepth ?? 0) + cardDimBlur;
                return totalBlur > 0.05 ? `blur(${totalBlur.toFixed(2)}px)` : undefined;
              })(),
              willChange: "transform, opacity",
            }}
          >
            <QuestionCard text={card.text} width={card.width} />
          </div>
        );
      })}

      {/* Selected card */}
      <div
        style={{
          position: "absolute",
          top: SEL_TOP,
          left: SEL_LEFT,
          opacity: selOpacity,
          transform: `scale(${selScale})`,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        <SelectedCard focusProgress={focusSpring} />
      </div>

      {/* Bottom helper text */}
      <div
        style={{
          position: "absolute",
          top: 1210,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.family,
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.62)",
            letterSpacing: "-0.005em",
          }}
        >
          MonÉlu retrouve la réponse dans les données officielles.
        </span>
      </div>

    </SceneContainer>
  );
};
