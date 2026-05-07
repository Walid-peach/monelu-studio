import React from "react";
import { FONTS } from "../../config/typography";
import { COLORS } from "../../config/colors";

interface GradientButtonProps {
  label: string;
  /** Optional right-side arrow icon */
  showArrow?: boolean;
  style?: React.CSSProperties;
}

// CTA button with blue gradient and subtle glow. Used in outros and CTA scenes.
export const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  showArrow = true,
  style,
}) => (
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
      ...style,
    }}
  >
    <span
      style={{
        fontFamily: FONTS.family,
        fontSize: 28,
        fontWeight: FONTS.weights.bold,
        color: "#FFFFFF",
        letterSpacing: "-0.02em",
      }}
    >
      {label}
    </span>
    {showArrow && (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M4 11h14M12 5l6 6-6 6"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);
