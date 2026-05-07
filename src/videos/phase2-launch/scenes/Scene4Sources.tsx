import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "../../../config/typography";
import { ASSETS } from "../../../config/assets";
import { clamp } from "../../../utils/animation";
import { SceneContainer } from "../../../components/layout/SceneContainer";
import { NoiseOverlay } from "../../../components/cinematic/NoiseOverlay";
import { SCENE_DURATIONS } from "../config";

const DEG = Math.PI / 180;

const ORBIT_CX = 540;
const ORBIT_CY = 650;
const ORBIT_RX = 345;
const ORBIT_RY = 435;
const ORBIT_SPEED = (2 * Math.PI) / 300;

type ImageCard = {
  src: string;
  width: number;
  initialAngle: number;
  baseRotate: number;
  delay: number;
  glowPhase: number;
};

const CARDS: ImageCard[] = [
  { src: ASSETS.scene4.image1, width: 330, initialAngle: 225 * DEG, baseRotate: -8, delay: 24, glowPhase: 0   },
  { src: ASSETS.scene4.image3, width: 330, initialAngle: 315 * DEG, baseRotate:  7, delay: 34, glowPhase: 1.3 },
  { src: ASSETS.scene4.image2, width: 340, initialAngle: 160 * DEG, baseRotate:  6, delay: 44, glowPhase: 2.5 },
  { src: ASSETS.scene4.image4, width: 340, initialAngle:  20 * DEG, baseRotate: -5, delay: 54, glowPhase: 3.7 },
  { src: ASSETS.scene4.image5, width: 360, initialAngle:  90 * DEG, baseRotate:  8, delay: 64, glowPhase: 4.9 },
];

const FloatingCardImage: React.FC<{
  card: ImageCard;
  frame: number;
  fps: number;
  lateDim: number;
}> = ({ card, frame, fps, lateDim }) => {
  const local = Math.max(0, frame - card.delay);

  const entrance = spring({ frame: local, fps, config: { damping: 22, stiffness: 100, mass: 0.9 } });
  const opacity  = interpolate(local, [0, 22], [0, 1], clamp) * lateDim;
  const entScale = interpolate(entrance, [0, 1], [0.88, 1], clamp);

  // Orbit decelerates after 4.2 s (126 f) so the pill takes focus
  const orbitFrame = frame < 126 ? frame : 126 + (frame - 126) * 0.35;
  const angle = card.initialAngle + ORBIT_SPEED * orbitFrame;

  const cx = ORBIT_CX + ORBIT_RX * Math.cos(angle);
  const cy = ORBIT_CY + ORBIT_RY * Math.sin(angle);

  const bank        = Math.sin(angle) * 4;
  const finalRotate = card.baseRotate + bank;
  const breath      = 1 + Math.sin((frame + card.glowPhase * 8) / 48) * 0.012;
  const glowPulse   = Math.sin((frame / 55) + card.glowPhase) * 0.5 + 0.5;

  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        width: card.width,
        opacity,
        // translate(-50%,-50%) centers the div on the orbit point
        transform: `translate(-50%, -50%) rotate(${finalRotate}deg) scale(${entScale * breath})`,
        borderRadius: 18,
        boxShadow: `
          0 28px 72px rgba(0,0,0,0.46),
          0 0 ${16 + glowPulse * 26}px rgba(37,99,235,${0.08 + glowPulse * 0.18}),
          inset 0 1px 0 rgba(255,255,255,0.10)
        `,
        border: "1px solid rgba(148,163,184,0.18)",
        overflow: "hidden",
        willChange: "transform, opacity",
      }}
    >
      <Img src={card.src} style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
};

export const Scene4Sources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lateDim = interpolate(frame, [126, 150], [1, 0.78], clamp);

  const titleSpring   = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 22, stiffness: 105 } });
  const titleOpacity  = interpolate(frame, [12, 32], [0, 1], clamp);
  const titleY        = interpolate(titleSpring, [0, 1], [24, 0], clamp);
  const subtitleOpacity = interpolate(frame, [27, 47], [0, 1], clamp);

  const pillOpacity = interpolate(frame, [36, 54], [0, 1], clamp);
  const pillScale   = interpolate(frame, [126, 150], [1, 1.08], clamp);
  const pillGlow    = interpolate(frame, [126, 150], [0.22, 0.55], clamp);
  const centerLift  = interpolate(frame, [126, 150], [1, 1.03], clamp);

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene4}>

      <AbsoluteFill
        style={{
          background: `
            radial-gradient(circle at 50% 52%, rgba(37,99,235,0.30) 0%, rgba(37,99,235,0.09) 28%, transparent 55%),
            radial-gradient(circle at 72% 14%, rgba(59,130,246,0.15) 0%, transparent 32%),
            linear-gradient(160deg, #06101E 0%, #0A1A35 45%, #08121F 100%)
          `,
          overflow: "hidden",
        }}
      />

      <NoiseOverlay filterId="s4Grain" opacity={0.042} />

      {CARDS.map((card) => (
        <FloatingCardImage key={card.src} card={card} frame={frame} fps={fps} lateDim={lateDim} />
      ))}

      {/* Center content — title, subtitle, pill */}
      <div
        style={{
          position: "absolute",
          left: 255,
          top: 520,
          width: 570,
          textAlign: "center",
          transform: `scale(${centerLift})`,
          transformOrigin: "center top",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: "0 18px 60px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.family,
              fontSize: 54,
              fontWeight: 850,
              lineHeight: 1.06,
              letterSpacing: "-0.055em",
              color: "#F8FAFC",
            }}
          >
            Les sources officielles,
            <br />
            analysées pour vous.
          </div>
        </div>

        <div
          style={{
            marginTop: 26,
            opacity: subtitleOpacity,
            fontFamily: FONTS.family,
            fontSize: 19,
            fontWeight: 500,
            color: "rgba(203,213,225,0.62)",
            letterSpacing: "-0.018em",
            lineHeight: 1.4,
          }}
        >
          Scrutin n°4696 · PLFSS 2026 · Assemblée nationale
        </div>

        <div
          style={{
            margin: "30px auto 0",
            opacity: pillOpacity,
            transform: `scale(${pillScale})`,
            width: 236,
            height: 52,
            borderRadius: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "rgba(37,99,235,0.20)",
            border: "1px solid rgba(96,165,250,0.42)",
            boxShadow: `0 0 ${28 + pillGlow * 38}px rgba(37,99,235,${pillGlow})`,
            color: "#DBEAFE",
            fontFamily: FONTS.family,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#60A5FA", fontSize: 15 }}>✓</span>
          Réponse vérifiée
        </div>
      </div>

    </SceneContainer>
  );
};
