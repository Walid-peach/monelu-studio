// Spring presets shared across scenes.
// Pass as the `config` argument to springIn() / spring().
export const SPRINGS = {
  gentle:   { damping: 16, stiffness: 120, mass: 0.80 },
  standard: { damping: 18, stiffness: 115, mass: 0.85 },
  stiff:    { damping: 22, stiffness: 130, mass: 0.75 },
  heavy:    { damping: 24, stiffness: 100, mass: 1.00 },
  snappy:   { damping: 15, stiffness: 150, mass: 0.70 },
  card:     { damping: 22, stiffness:  85, mass: 1.00 },
  bgCard:   { damping: 26, stiffness:  65, mass: 1.20 },
} as const;
