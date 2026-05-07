# Remotion — Useful Prompts

Templates for AI-assisted Remotion development.

---

## Animate a new element with spring physics

```
Add a [element description] to [scene file].
- It should spring in at frame [N] with a snappy feel
- Use springIn() from src/utils/animation.ts with the SPRINGS.snappy config from src/config/motion.ts
- Combine with fadeIn() for opacity
- The element should [describe final position/state]
```

---

## Create a staggered list reveal

```
In [scene file], reveal [N] items as a staggered list.
- Each item should fade+slide in with a [X]-frame stagger between them
- First item enters at frame [N]
- Use fadeIn() and slideIn() from src/utils/animation.ts
- Items should slide in from [left/right/bottom]
```

---

## Add a Ken Burns effect to a photo

```
Apply a Ken Burns effect to the background photo in [scene file].
- Use interpolate() with clamp to scale the image from [1.06] to [1.0] over the full scene duration (SCENE_DURATIONS.sceneN)
- Apply as transform: `scale(${bgScale})` on the Img element
- Set transformOrigin to "center center"
```

---

## Create a floating card constellation

```
Create a scene with [N] floating glass cards that:
- Enter from different directions using spring physics (enterDX/enterDY pattern)
- Continuously drift using sin/cos oscillation with unique per-card seeds
- Use useFloat() from src/hooks/useFloat.ts
- Each card has a different baseOpacity for depth
- Cards dim from frame [N] onward as focus shifts
Follow the pattern in Scene2Questions.tsx
```
