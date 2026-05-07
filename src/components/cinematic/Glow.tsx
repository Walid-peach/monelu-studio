import React from "react";

interface GlowProps {
  top: number;
  left: number;
  width: number;
  height: number;
  color?: string;
  opacity?: number;
  blur?: number;
}

// A soft radial glow div. Positioned absolutely — place behind the element
// that should appear illuminated.
export const Glow: React.FC<GlowProps> = ({
  top,
  left,
  width,
  height,
  color = "rgba(37, 99, 235, 0.35)",
  opacity = 1,
  blur = 10,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      width,
      height,
      background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
      opacity,
      pointerEvents: "none",
      filter: `blur(${blur}px)`,
    }}
  />
);
