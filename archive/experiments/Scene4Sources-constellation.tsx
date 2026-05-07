import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SCENE_DURATIONS } from "../constants";
import { clamp, fadeIn, slideIn, springIn } from "../utils/animations";
import { AnalysisCard } from "./AnalysisCard";
import { SceneContainer } from "./SceneContainer";

// ─── Preview components ───────────────────────────────────────────────────────

/** Proportional vote bars for SCRUTIN card */
const ScrutinPreview: React.FC = () => (
  <div>
    <div style={{ display: "flex", gap: 3, marginBottom: 7, height: 6 }}>
      <div style={{ flex: 247, height: 6, backgroundColor: "rgba(74,222,128,0.48)", borderRadius: 2 }} />
      <div style={{ flex: 234, height: 6, backgroundColor: "rgba(248,113,113,0.48)", borderRadius: 2 }} />
      <div style={{ flex: 93,  height: 6, backgroundColor: "rgba(252,211,77,0.42)",  borderRadius: 2 }} />
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      {[
        { label: "247 pour",    color: "rgba(74,222,128,0.85)"  },
        { label: "234 contre",  color: "rgba(248,113,113,0.85)" },
        { label: "93 abs.",     color: "rgba(252,211,77,0.80)"  },
      ].map(({ label, color }) => (
        <span key={label} style={{ fontFamily: FONTS.family, fontSize: 11, fontWeight: 600, color, letterSpacing: "-0.005em" }}>
          {label}
        </span>
      ))}
    </div>
  </div>
);

/** Three colored circles for POSITIONS card */
const PositionsPreview: React.FC = () => (
  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
    {[
      { label: "Pour",    fill: "rgba(74,222,128,0.70)",  border: "rgba(74,222,128,0.55)"  },
      { label: "Contre",  fill: "rgba(248,113,113,0.70)", border: "rgba(248,113,113,0.55)" },
      { label: "Abstention", fill: "rgba(252,211,77,0.65)",  border: "rgba(252,211,77,0.50)"  },
    ].map(({ label, fill, border }) => (
      <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: fill, border: `1.5px solid ${border}` }} />
        <span style={{ fontFamily: FONTS.family, fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: "-0.005em" }}>
          {label}
        </span>
      </div>
    ))}
  </div>
);

/** Document lines for DOSSIER card */
const DossierPreview: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {[100, 82, 95, 68].map((w, i) => (
      <div key={i} style={{ width: `${w}%`, height: 3, backgroundColor: "rgba(255,255,255,0.20)", borderRadius: 1.5 }} />
    ))}
  </div>
);

/** Grouped colored dots for GROUPES card */
const GroupesPreview: React.FC = () => (
  <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
    {[
      { color: "#3B82F6", dots: 3 },
      { color: "#EF4444", dots: 2 },
      { color: "#16A34A", dots: 2 },
      { color: "#8B5CF6", dots: 1 },
      { color: "#F59E0B", dots: 1 },
    ].map(({ color, dots }, gi) => (
      <div key={gi} style={{ display: "flex", flexDirection: "column-reverse", gap: 3 }}>
        {Array.from({ length: dots }).map((_, di) => (
          <div key={di} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color, opacity: 0.72 }} />
        ))}
      </div>
    ))}
  </div>
);

/** Minimal hemicycle arc for ASSEMBLÉE card */
const AssembleePreview: React.FC = () => (
  <svg width="88" height="44" viewBox="0 0 88 44" fill="none">
    <path d="M 6 40 A 38 38 0 0 1 82 40" stroke="rgba(75,139,245,0.55)" strokeWidth="1.5" strokeLinecap="round" />
    {[
      [20, 30], [32, 20], [44, 16], [56, 20], [68, 30],
      [26, 22], [38, 12], [56, 12], [62, 22],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2.8"
        fill={
          i % 3 === 0 ? "rgba(75,139,245,0.65)"
          : i % 3 === 1 ? "rgba(248,113,113,0.55)"
          : "rgba(255,255,255,0.35)"
        }
      />
    ))}
  </svg>
);

/** { } brackets for JSON card */
const JsonPreview: React.FC = () => (
  <div style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(75,139,245,0.72)", letterSpacing: "0.05em" }}>
    {"{ … }"}
  </div>
);

/** Tree lines for NESTED card */
const NestedPreview: React.FC = () => (
  <svg width="64" height="36" viewBox="0 0 64 36" fill="none">
    <line x1="8" y1="4" x2="8" y2="32" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="14" x2="30" y2="14" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="26" x2="30" y2="26" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="14" x2="30" y2="26" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
    <line x1="30" y1="20" x2="52" y2="20" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
    <circle cx="8" cy="4" r="2.5" fill="rgba(75,139,245,0.70)" />
    <circle cx="30" cy="14" r="2" fill="rgba(255,255,255,0.50)" />
    <circle cx="30" cy="26" r="2" fill="rgba(255,255,255,0.50)" />
    <circle cx="52" cy="20" r="2" fill="rgba(255,255,255,0.38)" />
  </svg>
);

/** Grid dots for SCHÉMAS card */
const SchemaPreview: React.FC = () => (
  <svg width="56" height="28" viewBox="0 0 56 28" fill="none">
    {[0, 1, 2, 3].map(col =>
      [0, 1, 2].map(row => (
        <circle
          key={`${col}-${row}`}
          cx={col * 16 + 4}
          cy={row * 12 + 4}
          r="2.5"
          fill={`rgba(75,139,245,${0.28 + (col + row) * 0.07})`}
        />
      ))
    )}
  </svg>
);

/** Stacked progress bars for LOAD card */
const LoadPreview: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {[72, 52, 36].map((w, i) => (
      <div key={i} style={{ width: w, height: 4, backgroundColor: `rgba(75,139,245,${0.55 - i * 0.12})`, borderRadius: 2 }} />
    ))}
  </div>
);

/** Link/chain for RÉFÉRENTIELS card */
const RefPreview: React.FC = () => (
  <svg width="50" height="22" viewBox="0 0 50 22" fill="none">
    <rect x="0" y="6" width="18" height="10" rx="5" stroke="rgba(75,139,245,0.60)" strokeWidth="1.5" />
    <rect x="32" y="6" width="18" height="10" rx="5" stroke="rgba(75,139,245,0.60)" strokeWidth="1.5" />
    <line x1="18" y1="11" x2="32" y2="11" stroke="rgba(75,139,245,0.55)" strokeWidth="1.5" />
  </svg>
);

// ─── Card data ────────────────────────────────────────────────────────────────

interface FgCardDef {
  label: string; title: string; sub: string | null;
  preview: React.ReactNode;
  x: number; y: number; width: number;
  enterDX: number; enterDY: number;
  seed: number; freqX: number; freqY: number; ampX: number; ampY: number;
}

interface BgCardDef {
  label: string; title: string;
  preview: React.ReactNode;
  x: number; y: number; width: number;
  enterDX: number; enterDY: number;
  seed: number; freqX: number; freqY: number; ampX: number; ampY: number;
  blur: number; baseOpacity: number;
}

const FG_CARDS: FgCardDef[] = [
  {
    label: "SCRUTIN PUBLIC",
    title: "n°4696",
    sub: "9 décembre 2025",
    preview: <ScrutinPreview />,
    x: 56, y: 152, width: 388,
    enterDX: -80, enterDY: -24,
    seed: 0,   freqX: 0.020, freqY: 0.015, ampX: 4, ampY: 3,
  },
  {
    label: "POSITIONS INDIVIDUELLES",
    title: "Pour · Contre · Abstention",
    sub: "577 députés",
    preview: <PositionsPreview />,
    x: 568, y: 218, width: 404,
    enterDX: 84, enterDY: -28,
    seed: 37,  freqX: 0.018, freqY: 0.022, ampX: 3, ampY: 4,
  },
  {
    label: "DOSSIER LÉGISLATIF",
    title: "PLFSS 2026",
    sub: "Texte officiel & amendements",
    preview: <DossierPreview />,
    x: 16, y: 488, width: 392,
    enterDX: -90, enterDY: 8,
    seed: 74,  freqX: 0.016, freqY: 0.019, ampX: 3, ampY: 5,
  },
  {
    label: "GROUPES POLITIQUES",
    title: "Alignements & positions",
    sub: null,
    preview: <GroupesPreview />,
    x: 596, y: 582, width: 390,
    enterDX: 82, enterDY: 18,
    seed: 111, freqX: 0.022, freqY: 0.017, ampX: 4, ampY: 3,
  },
  {
    label: "ASSEMBLÉE NATIONALE",
    title: "Source officielle",
    sub: "Données ouvertes",
    preview: <AssembleePreview />,
    x: 80, y: 924, width: 380,
    enterDX: -64, enterDY: 56,
    seed: 148, freqX: 0.019, freqY: 0.021, ampX: 3, ampY: 4,
  },
];

const BG_CARDS: BgCardDef[] = [
  {
    label: "JSON",
    title: "Données brutes",
    preview: <JsonPreview />,
    x: 722, y: 44, width: 272,
    enterDX: 88, enterDY: -36,
    seed: 185, freqX: 0.014, freqY: 0.011, ampX: 2, ampY: 3,
    blur: 2.0, baseOpacity: 0.55,
  },
  {
    label: "DONNÉES NESTED",
    title: "Structures imbriquées",
    preview: <NestedPreview />,
    x: -66, y: 104, width: 280,
    enterDX: -82, enterDY: -22,
    seed: 222, freqX: 0.016, freqY: 0.013, ampX: 2, ampY: 2,
    blur: 2.5, baseOpacity: 0.50,
  },
  {
    label: "SCHÉMAS ÉVOLUTIFS",
    title: "Adaptation continue",
    preview: <SchemaPreview />,
    x: 696, y: 788, width: 274,
    enterDX: 90, enterDY: 28,
    seed: 259, freqX: 0.013, freqY: 0.018, ampX: 2, ampY: 3,
    blur: 3.0, baseOpacity: 0.45,
  },
  {
    label: "LOAD INCRÉMENTAL",
    title: "Efficace & fiable",
    preview: <LoadPreview />,
    x: -50, y: 1068, width: 268,
    enterDX: -76, enterDY: 52,
    seed: 296, freqX: 0.017, freqY: 0.015, ampX: 2, ampY: 2,
    blur: 2.5, baseOpacity: 0.50,
  },
  {
    label: "RÉFÉRENTIELS & CLÉS",
    title: "Intégrité des données",
    preview: <RefPreview />,
    x: 566, y: 1116, width: 276,
    enterDX: 72, enterDY: 52,
    seed: 333, freqX: 0.015, freqY: 0.016, ampX: 2, ampY: 3,
    blur: 3.0, baseOpacity: 0.45,
  },
];

// ─── Timing (frames @ 30 fps, scene = 150 frames = 5 s) ──────────────────────
const T = {
  bgGlowIn:    0,
  titleIn:    12,
  fgStart:    [24, 34, 44, 54, 64] as const,
  bgStart:    [42, 52, 62, 72, 82] as const,
  analyseStart: [96, 102, 108, 114, 120] as const,
  pillIn:     129,
  dimStart:   118,
};

// Spring config — gentle, premium
const CARD_SPRING = { damping: 22, stiffness: 85, mass: 1.0 };
const BG_SPRING   = { damping: 26, stiffness: 65, mass: 1.2 };

// ─── Scene ────────────────────────────────────────────────────────────────────
export const Scene4Sources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Background glow ──
  const bgGlowOpacity = fadeIn(frame, T.bgGlowIn, T.bgGlowIn + 18);

  // ── Title + subtitle ──
  const titleOpacity = fadeIn(frame, T.titleIn, T.titleIn + 18);
  const title1Y      = slideIn(frame, T.titleIn, T.titleIn + 18, 22);
  const title2Y      = slideIn(frame, T.titleIn + 8, T.titleIn + 26, 20);
  const subOpacity   = fadeIn(frame, T.titleIn + 18, T.titleIn + 34);
  const subY         = slideIn(frame, T.titleIn + 18, T.titleIn + 34, 14);

  // ── Final dim of all cards ──
  const cardDimFactor = 1 - interpolate(frame, [T.dimStart, T.pillIn], [0, 0.30], clamp);

  // ── Pill ──
  const pillOpacity = fadeIn(frame, T.pillIn, T.pillIn + 14);
  const pillSpring  = springIn(frame, fps, T.pillIn, { damping: 20, stiffness: 130, mass: 0.75 });
  const pillScale   = interpolate(pillSpring, [0, 1], [0.86, 1], clamp);

  // ── Helper: compute fg card animation values ──
  const fgAnims = FG_CARDS.map((card, i) => {
    const startFrame = T.fgStart[i];
    const sp = springIn(frame, fps, startFrame, CARD_SPRING);
    const entranceX = interpolate(sp, [0, 1], [card.enterDX, 0], clamp);
    const entranceY = interpolate(sp, [0, 1], [card.enterDY, 0], clamp);
    const driftX = Math.sin((frame + card.seed) * card.freqX) * card.ampX;
    const driftY = Math.cos((frame + card.seed) * card.freqY) * card.ampY;
    const opacity  = fadeIn(frame, startFrame, startFrame + 16) * cardDimFactor;
    const analyseOpacity = fadeIn(frame, T.analyseStart[i], T.analyseStart[i] + 12);
    return {
      opacity,
      offsetTransform: `translateX(${entranceX + driftX}px) translateY(${entranceY + driftY}px)`,
      analyseOpacity,
    };
  });

  // ── Helper: compute bg card animation values ──
  const bgAnims = BG_CARDS.map((card, i) => {
    const startFrame = T.bgStart[i];
    const sp = springIn(frame, fps, startFrame, BG_SPRING);
    const entranceX = interpolate(sp, [0, 1], [card.enterDX, 0], clamp);
    const entranceY = interpolate(sp, [0, 1], [card.enterDY, 0], clamp);
    const driftX = Math.sin((frame + card.seed) * card.freqX) * card.ampX;
    const driftY = Math.cos((frame + card.seed) * card.freqY) * card.ampY;
    const opacity = fadeIn(frame, startFrame, startFrame + 20) * card.baseOpacity * cardDimFactor;
    return {
      opacity,
      offsetTransform: `translateX(${entranceX + driftX}px) translateY(${entranceY + driftY}px)`,
      cssFilter: `blur(${card.blur}px)`,
    };
  });

  return (
    <SceneContainer durationInFrames={SCENE_DURATIONS.scene4}>

      {/* ── Background: dark navy ── */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse 85% 50% at 50% 102%, rgba(20, 50, 110, 0.55) 0%, transparent 65%),
            linear-gradient(160deg, #06101e 0%, #0a1a35 45%, #08121f 100%)
          `,
          overflow: "hidden",
        }}
      />

      {/* ── Grain ── */}
      <svg
        width="1080"
        height="1350"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      >
        <filter id="scene4sNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#scene4sNoise)" />
      </svg>

      {/* ── Central radial glow ── */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: (1080 - 860) / 2,
          width: 860,
          height: 480,
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.20) 0%, rgba(20, 60, 180, 0.08) 40%, transparent 70%)",
          opacity: bgGlowOpacity,
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />

      {/* ── Background technical cards (render first = lowest z) ── */}
      {BG_CARDS.map((card, i) => (
        <AnalysisCard
          key={`bg-${i}`}
          label={card.label}
          title={card.title}
          sub={null}
          preview={card.preview}
          width={card.width}
          x={card.x}
          y={card.y}
          opacity={bgAnims[i].opacity}
          offsetTransform={bgAnims[i].offsetTransform}
          cssFilter={bgAnims[i].cssFilter}
          analyseOpacity={0}
          isBackground
        />
      ))}

      {/* ── Foreground official cards ── */}
      {FG_CARDS.map((card, i) => (
        <AnalysisCard
          key={`fg-${i}`}
          label={card.label}
          title={card.title}
          sub={card.sub}
          preview={card.preview}
          width={card.width}
          x={card.x}
          y={card.y}
          opacity={fgAnims[i].opacity}
          offsetTransform={fgAnims[i].offsetTransform}
          analyseOpacity={fgAnims[i].analyseOpacity}
        />
      ))}

      {/* ── Central title — rendered after cards so it stays on top ── */}
      <div
        style={{
          position: "absolute",
          top: 514,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `translateY(${title1Y}px)`,
            fontFamily: FONTS.family,
            fontSize: 52,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: "-0.038em",
            lineHeight: 1.08,
            marginBottom: 4,
          }}
        >
          Les sources officielles,
        </div>
        <div
          style={{
            transform: `translateY(${title2Y}px)`,
            fontFamily: FONTS.family,
            fontSize: 52,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: "-0.038em",
            lineHeight: 1.08,
          }}
        >
          analysées pour vous.
        </div>
      </div>

      {/* ── Subtitle ── */}
      <div
        style={{
          position: "absolute",
          top: 692,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subOpacity * titleOpacity,
          transform: `translateY(${subY}px)`,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.family,
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.48)",
            letterSpacing: "-0.01em",
          }}
        >
          Scrutin n°4696&nbsp;·&nbsp;PLFSS 2026&nbsp;·&nbsp;Assemblée nationale
        </span>
      </div>

      {/* ── Final "Réponse vérifiée" pill ── */}
      <div
        style={{
          position: "absolute",
          top: 1210,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: pillOpacity,
          transform: `scale(${pillScale})`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: COLORS.accent,
            borderRadius: 100,
            padding: "14px 36px",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 16px 48px rgba(37,99,235,0.45)",
          }}
        >
          {/* Check circle */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <path d="M6.5 10.2l2.5 2.5 5-5.5" stroke="#4ADE80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: 22,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Réponse vérifiée
          </span>
        </div>
      </div>

    </SceneContainer>
  );
};
