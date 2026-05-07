import React from "react";
import { Img } from "remotion";
import { ASSETS } from "../../config/assets";

interface MoneluLogoProps {
  variant?: "dark" | "light";
  width?: number;
  opacity?: number;
  style?: React.CSSProperties;
}

// PNG-based logo asset.
// Both dark/light variants use the same PNG; scenes that need a white version
// pass style={{ filter: "brightness(0) invert(1)" }}.
export const MoneluLogo: React.FC<MoneluLogoProps> = ({
  width = 160,
  opacity = 1,
  style,
}) => (
  <Img
    src={ASSETS.logos.primary}
    style={{
      width,
      height: "auto",
      display: "block",
      opacity,
      flexShrink: 0,
      ...style,
    }}
  />
);
