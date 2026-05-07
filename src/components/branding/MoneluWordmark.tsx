import React from "react";
import { FONTS } from "../../config/typography";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, { icon: number; text: number; gap: number }> = {
  sm: { icon: 32, text: 28, gap: 10 },
  md: { icon: 48, text: 40, gap: 13 },
  lg: { icon: 68, text: 56, gap: 16 },
};

// The MonÉlu hemicycle icon — exact SVG from the production website.
const HemicycleIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
    <g transform="translate(6.15 33.50) rotate(-70)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(9.45 27.79) rotate(-50)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#C9302C" /></g>
    <g transform="translate(14.50 23.55) rotate(-30)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(20.70 21.29) rotate(-10)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#C9302C" /></g>
    <g transform="translate(27.30 21.29) rotate(10)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(33.50 23.55) rotate(30)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#C9302C" /></g>
    <g transform="translate(38.55 27.79) rotate(50)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(41.85 33.50) rotate(70)"><rect x="-2" y="-1.5" width="4" height="3" rx="0.5" fill="#C9302C" /></g>
    <g transform="translate(13.35 32.54) rotate(-55)"><rect x="-1.75" y="-1.25" width="3.5" height="2.5" rx="0.5" fill="#9CA3AF" /></g>
    <g transform="translate(16.92 29.10) rotate(-33)"><rect x="-1.75" y="-1.25" width="3.5" height="2.5" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(21.52 27.24) rotate(-11)"><rect x="-1.75" y="-1.25" width="3.5" height="2.5" rx="0.5" fill="#9CA3AF" /></g>
    <g transform="translate(26.48 27.24) rotate(11)"><rect x="-1.75" y="-1.25" width="3.5" height="2.5" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(31.08 29.10) rotate(33)"><rect x="-1.75" y="-1.25" width="3.5" height="2.5" rx="0.5" fill="#9CA3AF" /></g>
    <g transform="translate(34.65 32.54) rotate(55)"><rect x="-1.75" y="-1.25" width="3.5" height="2.5" rx="0.5" fill="#0D1F3C" /></g>
    <g transform="translate(18.34 34.34) rotate(-45)"><rect x="-1.25" y="-1" width="2.5" height="2" rx="0.4" fill="#C9302C" /></g>
    <g transform="translate(21.93 32.27) rotate(-15)"><rect x="-1.25" y="-1" width="2.5" height="2" rx="0.4" fill="#9CA3AF" /></g>
    <g transform="translate(26.07 32.27) rotate(15)"><rect x="-1.25" y="-1" width="2.5" height="2" rx="0.4" fill="#C9302C" /></g>
    <g transform="translate(29.66 34.34) rotate(45)"><rect x="-1.25" y="-1" width="2.5" height="2" rx="0.4" fill="#9CA3AF" /></g>
    <circle cx="24" cy="40.5" r="1.8" fill="#0D1F3C" />
    <rect x="20" y="43" width="8" height="4" rx="1" fill="#0D1F3C" />
  </svg>
);

interface MoneluWordmarkProps {
  size?: LogoSize;
  /** "light" = dark text on light bg, "dark" = white text on dark bg */
  theme?: "light" | "dark";
}

export const MoneluWordmark: React.FC<MoneluWordmarkProps> = ({
  size = "md",
  theme = "light",
}) => {
  const s = sizes[size];
  const nameColor = theme === "dark" ? "#FFFFFF" : "#0D1F3C";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: s.gap }}>
      <HemicycleIcon size={s.icon} />
      <span
        style={{
          fontSize: s.text,
          fontWeight: FONTS.weights.bold,
          fontFamily: FONTS.family,
          letterSpacing: "-0.025em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: nameColor }}>Mon</span>
        <span style={{ color: "#C9302C", fontStyle: "italic" }}>Élu</span>
      </span>
    </div>
  );
};
