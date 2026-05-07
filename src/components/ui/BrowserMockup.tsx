import React from "react";
import { Img } from "remotion";
import { FONTS } from "../../config/typography";
import { ASSETS } from "../../config/assets";

interface BrowserMockupProps {
  zoom: number;
  chatGlow: number;
  url?: string;
}

// Browser chrome mockup with a real product screenshot.
// zoom: scale factor applied to the screenshot (1.0–1.10 for Ken-Burns effect)
// chatGlow: 0–1 opacity of the blue glow overlay on the chat area
export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  zoom,
  chatGlow,
  url = "monelu-production.up.railway.app",
}) => (
  <div
    style={{
      borderRadius: 20,
      overflow: "hidden",
      width: "100%",
      boxShadow: `
        0 40px 100px rgba(0,0,0,0.46),
        0 0 70px rgba(37,99,235,0.22),
        0 1px 0 rgba(255,255,255,0.08)
      `,
      border: "1px solid rgba(148,163,184,0.14)",
    }}
  >
    {/* Chrome title bar */}
    <div
      style={{
        backgroundColor: "#13182A",
        padding: "11px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
        {(["#FF5F57", "#FFBD2E", "#28C840"] as const).map((c) => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: c }} />
        ))}
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(255,255,255,0.055)",
          borderRadius: 9,
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
          <rect x="1" y="5" width="8" height="7" rx="1.5"
            stroke="rgba(148,163,184,0.65)" strokeWidth="1.2" fill="none" />
          <path d="M2.5 5V3.5a2.5 2.5 0 015 0V5"
            stroke="rgba(148,163,184,0.65)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
        <span
          style={{
            fontFamily: FONTS.family,
            fontSize: 13,
            color: "rgba(203,213,225,0.75)",
            letterSpacing: "0.005em",
          }}
        >
          {url}
        </span>
      </div>
    </div>

    {/* Product screenshot with optional zoom + glow */}
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "center 38%" }}>
        <Img
          src={ASSETS.images.websiteScreenshot}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 38% at 50% 58%, rgba(37,99,235,0.22) 0%, transparent 72%)",
          opacity: chatGlow,
          pointerEvents: "none",
        }}
      />
    </div>
  </div>
);
