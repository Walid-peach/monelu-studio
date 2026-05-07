# Assets Guide

All static files served by Remotion live under `public/`. Reference them via `ASSETS` from `src/config/assets.ts` — never call `staticFile()` directly in scene files.

---

## Directory layout

```
public/assets/
├── logos/
│   ├── monelu-logo.png          ← primary PNG logo (used by MoneluLogo component)
│   └── monelu-logo-alt.png      ← alternate export
│
├── images/
│   ├── assemblee-nationale.jpg  ← Scene 1 hero photo
│   ├── website-screenshot.png   ← Scene 6 browser mockup screenshot
│   └── parliament-front.png     ← Parliament exterior (alternate angle)
│
├── scene4/
│   ├── image-1.png              ← Scrutin public n°4696
│   ├── image-2.png              ← Positions individuelles
│   ├── image-3.png              ← Dossier législatif PLFSS 2026
│   ├── image-4.png              ← Groupes politiques
│   └── image-5.png              ← Assemblée nationale source
│
├── exports/                     ← rendered MP4 outputs (git-ignored)
│   └── .gitkeep
│
└── textures/                    ← grain, particles (future use)
    └── .gitkeep
```

---

## Adding new assets

1. Place the file in the appropriate subfolder under `public/assets/`
2. Add a new entry to `src/config/assets.ts`:
   ```ts
   export const ASSETS = {
     // ...existing entries...
     myNewImage: staticFile("assets/images/my-new-image.jpg"),
   };
   ```
3. Import `ASSETS` in your scene file and reference `ASSETS.myNewImage`

Never call `staticFile()` inline in a scene. Centralized paths make find-and-replace safe and prevent typos.

---

## Image sizing recommendations

| Usage | Recommended resolution | Format |
|-------|------------------------|--------|
| Full-bleed photo | 1080×1350 or larger | JPG, quality 85+ |
| Product screenshot | 1080px wide minimum | PNG (crisp UI) |
| Logo | Any SVG preferred, or 500px+ PNG | SVG / PNG |
| Texture/grain | Tileable, 512×512 | PNG |

Remotion uses Chromium for rendering — images are scaled in CSS. Use the highest quality you have.
