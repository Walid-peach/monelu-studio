# Claude Code — Refactor Prompts

Use these prompt templates when asking Claude Code to refactor or extend this repository.

---

## Add a new scene to an existing video

```
I want to add a new scene to the Phase 2 launch video.
Insert it between Scene 3 and Scene 4.

Scene description:
- Duration: 4 seconds
- Visual: [describe]
- Motion: [describe entrance, any floating elements, timing beats]
- Copy: [text content]

Rules:
- Follow the same pattern as existing scenes in src/videos/phase2-launch/scenes/
- Import config from ../config, utils from ../../../utils/animation, components from ../../../components/
- Add the new duration to SCENE_DURATIONS in src/videos/phase2-launch/config.ts
- Add the Sequence to src/videos/phase2-launch/composition.tsx
- Do not change any other scenes
```

---

## Create a new video

```
Create a new video in this Remotion studio.

Video details:
- Name: [e.g. "feature-announcement"]
- Duration: [e.g. 20 seconds]
- Format: same as Phase 2 (1080×1350, 30 fps)
- Scenes: [list scene names and durations]

Structure it under src/videos/[video-name]/ following the same pattern as phase2-launch/:
- config.ts (scene durations, starts, total)
- composition.tsx (MoneluVideoName component)
- index.tsx (re-exports)
- scenes/Scene1*.tsx through SceneN*.tsx

Register the new Composition in src/Root.tsx.
Use existing components from src/components/ wherever possible.
```

---

## Extract a reusable component

```
Extract the [component name] from [scene file path:line] into a standalone reusable component.

Target location: src/components/[category]/[ComponentName].tsx
Category options: branding | cinematic | ui | layout

Requirements:
- Accept the visual variations as typed props
- Import config from src/config/
- Export the component as a named export
- Update all existing usages to import from the new location
```
