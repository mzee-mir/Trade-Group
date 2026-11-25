import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Set this before `npm run deploy` to choose the Studio's web address (<name>.sanity.studio)
  // studioHost: "tawfiiq",
})
