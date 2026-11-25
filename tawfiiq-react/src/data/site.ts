/* Contact details and links used across the whole site. */

export const WHATSAPP = "252907090025"
export const PHONE_DISPLAY = "+252 907 090 025"
export const EMAIL = "info@tawfiiqgroup.com"

/** Paste profile URLs here. Empty ones are hidden everywhere. */
export const SOCIAL: Record<"Facebook" | "Instagram" | "TikTok", string> = {
  Facebook: "",
  Instagram: "",
  TikTok: "",
}

export const socialLinks = () =>
  (Object.entries(SOCIAL) as [string, string][]).filter(([, url]) => url)

// The number can be replaced at runtime by the CMS (see src/content/content.tsx).
let whatsappNumber = WHATSAPP
export const setWhatsAppNumber = (n: string) => { if (/^\d{8,15}$/.test(n)) whatsappNumber = n }

export const waLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
