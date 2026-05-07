import React from "react";

interface SafeAreaProps {
  children: React.ReactNode;
  horizontal?: number;
  top?: number;
  bottom?: number;
}

// Applies consistent safe-area padding around scene content.
// Prevents text from touching the edges of the 1080×1350 canvas.
export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  horizontal = 72,
  top = 0,
  bottom = 0,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      paddingLeft: horizontal,
      paddingRight: horizontal,
      paddingTop: top,
      paddingBottom: bottom,
    }}
  >
    {children}
  </div>
);
