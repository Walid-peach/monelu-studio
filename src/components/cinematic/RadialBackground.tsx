import React from "react";
import { AbsoluteFill } from "remotion";

interface RadialBackgroundProps {
  /** CSS gradient string, or an array of gradient strings that are layered. */
  gradient: string | string[];
}

// Dark cinematic background with one or more layered radial/linear gradients.
// Used by all dark-navy scenes (2, 4, 5, 6).
export const RadialBackground: React.FC<RadialBackgroundProps> = ({
  gradient,
}) => {
  const background = Array.isArray(gradient) ? gradient.join(", ") : gradient;
  return (
    <AbsoluteFill style={{ background, overflow: "hidden" }} />
  );
};
