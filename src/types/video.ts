// Types shared across all videos in the studio.

export interface VideoConfig {
  id: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}

export interface SceneDurations {
  [key: string]: number;
}

export interface SceneStarts {
  [key: string]: number;
}
