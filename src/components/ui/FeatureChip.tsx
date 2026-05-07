import React from "react";
import { COLORS } from "../../config/colors";
import { FONTS } from "../../config/typography";

interface FeatureChipProps {
  label: string;
  dotColor?: string;
  /** "default" = white card, "accent" = pale blue, "ghost" = transparent */
  variant?: "default" | "accent" | "ghost";
}

export const FeatureChip: React.FC<FeatureChipProps> = ({
  label,
  dotColor = COLORS.accent,
  variant = "default",
}) => {
  const bg =
    variant === "accent"
      ? COLORS.accentLight
      : variant === "ghost"
      ? "transparent"
      : COLORS.white;

  const borderColor = variant === "accent" ? COLORS.accent : COLORS.border;
  const textColor   = variant === "accent" ? COLORS.accent : COLORS.text;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        backgroundColor: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 100,
        padding: "10px 22px",
        boxShadow: variant === "default" ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: dotColor,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: FONTS.sizes.sm,
          fontWeight: FONTS.weights.medium,
          color: textColor,
          fontFamily: FONTS.family,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
};
