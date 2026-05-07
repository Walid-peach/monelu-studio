export const FONTS = {
  // System stack gives Inter on macOS; fallback to Segoe UI on Windows.
  family:
    "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif",
  sizes: {
    xs: 18,
    sm: 22,
    md: 28,
    lg: 36,
    xl: 48,
    xxl: 58,
    hero: 68,
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
