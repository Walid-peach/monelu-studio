// Types used by scene components.

export interface SceneProps {
  durationInFrames: number;
}

export interface CardDef {
  label: string;
  title: string;
  sub?: string | null;
  x: number;
  y: number;
  width: number;
  enterDX: number;
  enterDY: number;
  seed: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
}

export interface OrbitCard {
  text: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  enterDX: number;
  enterDY: number;
  driftSeed: number;
  baseOpacity: number;
  blurDepth?: number;
}
