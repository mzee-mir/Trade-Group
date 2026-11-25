/* Offices, partners, values and other company content. */

export type Office = { id: string; country: string; name: string; sourcing?: boolean; address?: string; phone?: string; email?: string }

export type Partner = { name: string; loc: string; tag?: string; text: string; logo?: string; featured?: boolean }

export const OFFICES: Office[] = [
  { id: "mogadishu", country: "Somalia", name: "Mogadishu" },
  { id: "sabawanaag", country: "Somalia", name: "Sabawanaag" },
  { id: "djibouti", country: "Djibouti", name: "Djibouti office" },
  { id: "salalah", country: "Oman", name: "Salalah", sourcing: true },
  { id: "dubai", country: "UAE", name: "Dubai office", sourcing: true },
  { id: "china", country: "China", name: "China office", sourcing: true },
]

/** Slides in the "Our network" band: sourcing offices only. */
export const SOURCING_SLIDES = [
  { src: "/images/network/dubai.svg", href: "/contact#office-dubai", label: "Dubai sourcing office" },
  { src: "/images/network/salalah.svg", href: "/contact#office-salalah", label: "Salalah sourcing office, Oman" },
  { src: "/images/network/china.svg", href: "/contact#office-china", label: "China sourcing office" },
]

export const STATS = [
  { value: "1992", label: "Founded in Bosaso", long: "Founded in Bosaso" },
  { value: "10,000+", label: "Permanent employees", long: "Permanent employees, plus hundreds of temporary workers" },
  { value: "5", label: "Trading departments", long: "Trading departments" },
  { value: "7", label: "Offices worldwide", long: "Offices in Somalia, Djibouti, Oman, UAE and China" },
]

export const VALUES: { name: string; text: string; tone: "green" | "yellow" | "navy" }[] = [
  { name: "Sharia Compliant", text: "Every deal follows Islamic principles of fair trade.", tone: "green" },
  { name: "Integrity", text: "We keep our word with customers and partners.", tone: "yellow" },
  { name: "Honesty", text: "Clear prices, real products, no surprises.", tone: "navy" },
  { name: "Social Responsibility", text: "We invest in the communities we serve.", tone: "green" },
  { name: "Respect for Others", text: "Every customer, employee and partner is treated with respect.", tone: "yellow" },
  { name: "Safety", text: "Safe workplaces and safe products.", tone: "navy" },
  { name: "Inclusion", text: "Opportunity for everyone who works with us.", tone: "green" },
]

export const PARTNERS: Partner[] = [
  { name: "Technolube LLC", loc: "Dubai, UAE", tag: "Engine oil", text: "Lubricant manufacturer founded in 2007 and managed by Petromin Corporation. Makers of the Petromin, National, Crown and Challenger brands for automotive, industrial and marine use." },
  { name: "Xayi Steel", loc: "Salalah, Oman", tag: "Steel", text: "Privately owned producer of reinforcement steel bars to international standards, using a European-technology rolling mill." },
  { name: "Guul Group", loc: "Djibouti", tag: "Consumer goods", text: "Import and export group with operations in Somalia, Ethiopia, Eritrea and Kenya, bringing global consumer brands to the Horn of Africa for over 20 years." },
  { name: "Som Cement Company", loc: "Somalia", tag: "Cement", text: "Founded in 2001 to supply quality cement across Somalia and Djibouti." },
]

export const BRAND_CHIPS = ["Technolube · Petromin", "Xayi Steel", "Guul Group", "Som Cement", "Salalah Macaroni"]

/** "The people behind Tawfiiq" on the About page. Replace with real people, or manage them in Sanity. */
export type TeamMember = { name: string; role: string; photo?: string; alt?: string }

export const TEAM: TeamMember[] = [
  { name: "[NAME]", role: "[ROLE]" },
  { name: "[NAME]", role: "[ROLE]" },
  { name: "[NAME]", role: "[ROLE]" },
  { name: "[NAME]", role: "[ROLE]" },
]
