# Phase 2 Launch — Storyboard

**File:** `src/videos/phase2-launch/`  
**Format:** 1080×1350 · 30 fps · 30 seconds  
**Composition ID:** `MoneluPhase2`

---

## Scene 1 — PLFSS Hook (4 s · frames 0–119)

**Visual:** Full-screen photograph of the Assemblée Nationale (exterior) with a slow Ken Burns zoom-out. A dark navy gradient darkens the lower two-thirds. The MonÉlu logo appears top-left.

**Motion:**
- Background: scale 1.06 → 1.00 over the full scene duration (reverse Ken Burns — starts tight, zooms out)
- Logo: fade in at frame 4
- Title ("Le budget de la Sécu 2026 a été adopté."): fade+slide from frame 10
- Hook question ("Mais qui a voté quoi ?"): fade+slide from frame 34
- Vote strip (247 pour / 234 contre / 93 abstentions): fade+slide from frame 56
- Source attribution: fade in from frame 70

**Emotion:** Gravitas, civic weight. Sets up the question.

---

## Scene 2 — Question Constellation (5 s · frames 120–269)

**Visual:** Dark navy background. Five semi-transparent glass question cards float in a loose orbit pattern. One prominent white card ("QUESTION — Est-ce que Gabriel Attal a voté pour le PLFSS 2026 ?") sits center-screen. At 3.2 s into the scene, the secondary cards dim and blur while the selected card glows blue and scales up.

**Motion:**
- Cards enter with spring physics from their respective edge directions
- Continuous slow organic drift (sin/cos oscillation with per-card phase seeds)
- At `T.selectStart` (frame 96): secondary cards dim to 35% opacity, selected card glow intensifies
- Zoom toward selected card from frame 126

**Emotion:** Information overload resolved into a single clear question.

---

## Scene 3 — MonÉlu Reveal (4 s · frames 270–389)

**Visual:** Light off-white background with a very subtle blue radial glow. Three lines of large text center-aligned: "Nous avons" / "**la solution**" / "pour vous." Then the MonÉlu logo (full PNG) fades in, centered, very large. Slogan appears below.

**Motion:**
- "Nous avons": fade+slide at frame 8
- "la solution": spring pop-in scale 0.88→1 at frame 20 (the hero line, accent blue)
- "pour vous.": fade+slide at frame 33
- Logo: spring entrance at frame 48, scale 0.92→1
- Slogan: fade+slide at frame 64

**Emotion:** Brand reveal moment. Clean, confident, premium.

---

## Scene 4 — Official Sources Universe (5 s · frames 390–539)

**Visual:** Dark navy. Five screenshot cards of official parliamentary data sources orbit a central elliptical path. Cards continuously rotate around the center point at a slow steady speed. At 4.2 s, cards decelerate and a "Réponse vérifiée" pill scales up in the center.

**Motion:**
- Cards orbit on an ellipse (rx=345, ry=435, center at 540×650) at 1 full revolution per 300 frames
- Each card: spring entrance + continuous orbital motion + subtle scale "breath" (±1.2%)
- Individual blue glow pulses on each card (per-card phase offset)
- At frame 126: orbit decelerates to 35% speed, center pill scales 1.0→1.08, glow intensifies

**Emotion:** Data depth, official sourcing, the pipeline working.

---

## Scene 5 — Sourced Answer Reveal (7 s · frames 540–749)

**Visual:** Dark navy. A blue message bubble slides in from the right ("Est-ce que Gabriel Attal a voté pour le PLFSS 2026 ?"). A white answer card springs up below it — contains the MonÉlu logo, the answer "Gabriel Attal a voté **POUR** le PLFSS 2026.", three sourced references with green check icons. Three feature chips fade in at the bottom.

**Motion:**
- Bubble: spring slide-in from right at frame 12
- Card: spring scale 0.96→1 at frame 38
- "Gabriel Attal a voté": fade+slide at frame 64
- "POUR" badge: spring pop-in 0.76→1 with green glow that pulses with the spring at frame 78
- "le PLFSS 2026.": fade+slide at frame 90
- Sources: staggered slide-in from left (frames 108, 124, 140)
- Feature chips: staggered fade+slide (frames 154, 166, 178)

**Emotion:** The payoff. Clear, sourced, instant.

---

## Scene 6 — Phase 2 Outro (6 s · frames 750–929)

**Visual:** Dark navy. Large headline "Phase 2 terminée." and subline. A browser mockup of the live MonÉlu site slowly zooms in. CTA button and URL below. At frame 118, everything fades out. After a half-second silence, the MonÉlu logo appears centered with the tagline — clean brand signature hold until the end.

**Motion:**
- Headline: spring entrance at frame 9
- Subline: fade+slide at frame 22
- Browser: spring slide-up at frame 30
- Browser zoom: 1.0→1.058 between frames 66–114 (Ken Burns into the chat UI)
- Chat area blue glow: pulses with a sine wave during the zoom
- CTA + URL: fade+slide from frames 116, 128
- Main content: fades out frames 118–136
- End-card logo: spring entrance at frame 151
- End-card slogan: fade+slide at frame 162

**Emotion:** Completion, pride, invitation.
