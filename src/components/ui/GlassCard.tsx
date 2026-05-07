import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  /** "dark" = white-on-dark glass (default), "light" = dark-on-light card */
  variant?: "dark" | "light";
}

// Generic glass morphism card for dark-navy backgrounds.
// Extend with custom styles via the style prop.
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = "dark",
}) => {
  const isDark = variant === "dark";

  return (
    <div
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)"}`,
        borderRadius: 24,
        backdropFilter: "blur(14px)",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.28)"
          : "0 8px 32px rgba(0,0,0,0.10)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
