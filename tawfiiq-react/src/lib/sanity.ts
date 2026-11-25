import { createClient } from "@sanity/client"
import { createImageUrlBuilder } from "@sanity/image-url"

/* Sanity connection. Set these in .env.local (see .env.example):
     VITE_SANITY_PROJECT_ID=abc123
     VITE_SANITY_DATASET=production
   Without a project ID the site uses its built-in content (src/data). */

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production"

export const sanityEnabled = !!projectId && projectId !== "your-project-id"

export const sanity = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion: "2025-02-19", useCdn: true, perspective: "published" })
  : null

const builder = sanity ? createImageUrlBuilder(sanity) : null

/** Image URL for a Sanity image field, resized for the web. */
export const imageUrl = (source: unknown, width = 1600): string | undefined => {
  if (!builder || !source || typeof source !== "object" || !("asset" in source)) return undefined
  return builder.image(source).width(width).fit("max").auto("format").url()
}
