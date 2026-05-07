import React from "react";
import { FONTS } from "../../config/typography";

export interface AnalysisCardProps {
  label: string;
  title: string;
  sub?: string | null;
  preview?: React.ReactNode;
  width: number;
  x: number;
  y: number;
  opacity: number;
  offsetTransform: string;
  cssFilter?: string;
  analyseOpacity: number;
  isBackground?: boolean;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  label,
  title,
  sub,
  preview,
  width,
  x,
  y,
  opacity,
  offsetTransform,
  cssFilter,
  analyseOpacity,
  isBackground = false,
}) => {
  const pad        = isBackground ? "14px 18px" : "22px 26px";
  const radius     = isBackground ? 18 : 22;
  const bgAlpha    = isBackground ? 0.04 : 0.08;
  const borderAlpha = isBackground ? 0.09 : 0.15;
  const shadow     = isBackground
    ? "0 8px 24px rgba(0,0,0,0.18)"
    : "0 20px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)";

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width,
        opacity,
        transform: offsetTransform,
        filter: cssFilter,
        willChange: "transform, opacity",
        backgroundColor: `rgba(255, 255, 255, ${bgAlpha})`,
        border: `1px solid rgba(255, 255, 255, ${borderAlpha})`,
        borderRadius: radius,
        padding: pad,
        boxShadow: shadow,
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: isBackground ? 10 : 11,
          fontWeight: 700,
          color: "rgba(75, 139, 245, 0.88)",
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          marginBottom: isBackground ? 6 : 10,
        }}
      >
        {label}
      </div>

      {preview && (
        <div style={{ marginBottom: isBackground ? 8 : 12 }}>{preview}</div>
      )}

      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: isBackground ? 15 : 21,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.90)",
          letterSpacing: "-0.02em",
          lineHeight: 1.28,
          marginBottom: sub ? 5 : 0,
        }}
      >
        {title}
      </div>

      {sub && (
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: isBackground ? 12 : 15,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.50)",
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
          }}
        >
          {sub}
        </div>
      )}

      {!isBackground && (
        <div
          style={{
            marginTop: 14,
            opacity: analyseOpacity,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#4ADE80",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: 11,
              fontWeight: 700,
              color: "#4ADE80",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Analysé
          </span>
        </div>
      )}
    </div>
  );
};
