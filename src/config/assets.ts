import { staticFile } from "remotion";

// Single source of truth for all static file paths.
// Import ASSETS in scene files instead of calling staticFile() inline.
export const ASSETS = {
  logos: {
    primary: staticFile("assets/logos/monelu-logo.png"),
  },
  images: {
    assembleeNationale: staticFile("assets/images/assemblee-nationale.jpg"),
    websiteScreenshot:  staticFile("assets/images/website-screenshot.png"),
  },
  scene4: {
    image1: staticFile("assets/scene4/image-1.png"),
    image2: staticFile("assets/scene4/image-2.png"),
    image3: staticFile("assets/scene4/image-3.png"),
    image4: staticFile("assets/scene4/image-4.png"),
    image5: staticFile("assets/scene4/image-5.png"),
  },
} as const;
