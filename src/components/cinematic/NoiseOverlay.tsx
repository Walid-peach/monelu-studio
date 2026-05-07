import React from "react";

interface NoiseOverlayProps {
  /** SVG filter ID — must be unique per page to avoid cross-scene bleed */
  filterId: string;
  opacity?: number;
}

// Film grain overlay using an SVG fractal-noise filter.
// Render once per scene with a unique filterId to avoid CSS filter collisions.
export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  filterId,
  opacity = 0.04,
}) => (
  <svg
    width="1080"
    height="1350"
    style={{
      position: "absolute",
      inset: 0,
      opacity,
      pointerEvents: "none",
      mixBlendMode: "overlay",
    }}
  >
    <filter id={filterId}>
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.85"
        numOctaves="2"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter={`url(#${filterId})`} />
  </svg>
);
