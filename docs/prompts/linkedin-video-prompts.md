# LinkedIn Video — Prompts & Best Practices

Reference for creating LinkedIn-optimized videos using this studio.

---

## Format requirements

| Parameter | Value |
|-----------|-------|
| Dimensions | 1080×1350 (4:5 portrait) |
| Frame rate | 30 fps |
| Duration | 15–30 seconds optimal |
| File format | MP4 (H.264) |
| File size | Under 200 MB |
| Audio | None (silent autoplay) |

---

## Copy writing prompts

### Hook line (Scene 1, first 3 seconds)

```
Write a one-line hook for a LinkedIn video about [topic].
Rules:
- State a fact, then raise a question
- Under 12 words
- No hashtags, no emoji
- Civic-tech tone: serious but accessible
Example: "Le budget de la Sécu 2026 a été adopté. Mais qui a voté quoi ?"
```

### CTA line (Scene 6)

```
Write a CTA button label for a product video.
- 3-5 words maximum
- Action verb, imperative
- French language
- Platform: [monelu.fr or staging URL]
Example: "Essayez maintenant"
```

---

## Scene structure template for 30s videos

```
Scene 1 (4s)  — Hook: state the fact, raise the question
Scene 2 (5s)  — Problem: show the complexity/question space
Scene 3 (4s)  — Solution reveal: brand moment
Scene 4 (5s)  — Proof: data depth, sourcing, pipeline
Scene 5 (7s)  — Payoff: the answer, with sources
Scene 6 (6s)  — Outro: CTA, end card, brand tagline
Total: 31s
```

Adjust scene durations in `src/videos/[video-name]/config.ts`. `TOTAL_DURATION` and `SCENE_STARTS` update automatically.
