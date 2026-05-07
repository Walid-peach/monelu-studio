import React from "react";

// Development-only grid overlay for alignment debugging.
// Enable in Remotion Studio by rendering this component inside a scene.
export const GridOverlay: React.FC = () => (
  <svg
    width="1080"
    height="1350"
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity: 0.15,
    }}
  >
    {/* Vertical thirds */}
    {[360, 720].map((x) => (
      <line key={x} x1={x} y1="0" x2={x} y2="1350" stroke="#FF00FF" strokeWidth="1" />
    ))}
    {/* Horizontal thirds */}
    {[450, 900].map((y) => (
      <line key={y} x1="0" y1={y} x2="1080" y2={y} stroke="#FF00FF" strokeWidth="1" />
    ))}
    {/* Safe-area guides (72px horizontal) */}
    <line x1="72" y1="0" x2="72" y2="1350" stroke="#00FFFF" strokeWidth="1" strokeDasharray="8 4" />
    <line x1="1008" y1="0" x2="1008" y2="1350" stroke="#00FFFF" strokeWidth="1" strokeDasharray="8 4" />
    {/* Canvas center */}
    <line x1="540" y1="0" x2="540" y2="1350" stroke="#FFFF00" strokeWidth="1" strokeOpacity="0.6" />
    <line x1="0" y1="675" x2="1080" y2="675" stroke="#FFFF00" strokeWidth="1" strokeOpacity="0.6" />
  </svg>
);
