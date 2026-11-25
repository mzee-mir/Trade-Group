/* Home page hero. Edit here, or in Sanity (Home page). Fields left empty in Sanity keep these. */

export type Hero = {
  eyebrow: string
  line1: string
  highlight: string
  line3: string
  intro: string
  primaryLabel: string
  whatsappLabel: string
  whatsappMessage: string
  /** Photo URLs; without them the labelled placeholders are shown. */
  mainPhoto?: string
  mainPhotoAlt?: string
  mainPhotoPlaceholder: string
  secondPhoto?: string
  secondPhotoAlt?: string
  secondPhotoPlaceholder: string
  statLabel: string
  statValue: string
  badgeTitle: string
  badgeText: string
}

export const HERO: Hero = {
  eyebrow: "Trusted across Somalia since 1992",
  line1: "Quality goods.",
  highlight: "Delivered",
  line3: "nationwide.",
  intro: "One of Somalia's leading distributors of foodstuff, building materials, engine oil, furniture and electronics — sourcing from Dubai, Oman and China.",
  primaryLabel: "Explore departments",
  whatsappLabel: "WhatsApp sales",
  whatsappMessage: "Hello Tawfiiq sales team, I'd like a price list.",
  mainPhotoPlaceholder: "[PHOTO: warehouse or trucks, Bosaso]",
  secondPhotoPlaceholder: "[PHOTO: products on shelves]",
  statLabel: "Offices in",
  statValue: "5 countries",
  badgeTitle: "Sole distributor",
  badgeText: "for several leading brands",
}
