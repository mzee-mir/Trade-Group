import { BRAND_CHIPS, OFFICES, PARTNERS, SOURCING_SLIDES, STATS, TEAM, VALUES, type Office, type Partner, type TeamMember } from "@/data/company"
import { DEPARTMENTS, type Department } from "@/data/departments"
import { HERO, type Hero } from "@/data/home"
import { NEWS, type Article } from "@/data/news"
import { EMAIL, PHONE_DISPLAY, SOCIAL, WHATSAPP } from "@/data/site"

/* The site's content model, the built-in content, and how Sanity's data maps onto it.
   Kept free of React and of Vite-only APIs so it can be tested on its own. */

export type Slide = { src: string; href?: string; label?: string }
export type Stat = { value: string; label: string; long: string }
export type Value = { name: string; text: string; tone: "green" | "yellow" | "navy" }

export type Content = {
  hero: Hero
  departments: Department[]
  news: Article[]
  offices: Office[]
  slides: Slide[]
  stats: Stat[]
  values: Value[]
  partners: Partner[]
  team: TeamMember[]
  brandChips: string[]
  site: { whatsapp: string; phoneDisplay: string; email: string; social: [string, string][] }
  source: "built-in" | "sanity" | "sanity-cache"
}

export const LOCAL: Content = {
  hero: HERO,
  departments: DEPARTMENTS,
  news: NEWS,
  offices: OFFICES,
  slides: SOURCING_SLIDES,
  stats: STATS,
  values: VALUES,
  partners: [
    ...PARTNERS,
    { name: "Salalah Macaroni Company", loc: "Oman", text: "Tawfiiq is a co-investor in Salalah Macaroni Company in Oman.", featured: true },
  ],
  team: TEAM,
  brandChips: BRAND_CHIPS,
  site: {
    whatsapp: WHATSAPP,
    phoneDisplay: PHONE_DISPLAY,
    email: EMAIL,
    social: (Object.entries(SOCIAL) as [string, string][]).filter(([, url]) => url),
  },
  source: "built-in",
}

/** One GROQ query for everything the site shows. */
export const QUERY = `{
  "site": *[_id == "siteSettings"][0]{ whatsapp, phoneDisplay, email, social, stats[]{ value, label, long }, values[]{ name, text, tone }, brandChips },
  "departments": *[_type == "department" && defined(slug.current)] | order(order asc) {
    _id, name, "slug": slug.current, title, short, intro, icon, image, filters, cards[]{ title, text },
    "products": *[_type == "product" && references(^._id)] | order(order asc) { category, size, name, price, image }
  },
  "news": *[_type == "article" && defined(slug.current)] | order(date desc) {
    title, "key": slug.current, date, category, image, summary, body, related
  },
  "offices": *[_type == "office" && defined(slug.current)] | order(order asc) {
    name, "id": slug.current, country, sourcing, address, phone, email, image
  },
  "partners": *[_type == "partner"] | order(order asc) { name, location, tag, description, logo, featured },
  "team": *[_type == "teamMember"] | order(order asc) { name, role, photo },
  "hero": *[_id == "homePage"][0].hero
}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = Record<string, any>
export type ImageUrl = (source: unknown, width?: number) => string | undefined

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
/** "2026-11-05" → "5 Nov 2026" (no time zone involved, so it never shifts a day). */
export const fmtDate = (iso?: string) => {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : ""
}
const blocksToParagraphs = (body?: Raw[]) =>
  (body ?? []).filter((b) => b._type === "block").map((b) => (b.children ?? []).map((c: Raw) => c.text ?? "").join("")).filter(Boolean)

const nonEmpty = <T,>(list: T[] | undefined, fallback: T[]) => (list && list.length ? list : fallback)

/** Sanity response → site content. Empty sections fall back to the built-in content. */
export function fromSanity(raw: Raw, imageUrl: ImageUrl): Content {
  const site = raw.site ?? {}

  const departments: Department[] = (raw.departments ?? []).map((d: Raw, i: number) => {
    const local = LOCAL.departments.find((l) => l.slug === d.slug)
    return {
      slug: d.slug,
      name: d.name ?? local?.name ?? d.slug,
      title: [d.title?.before ?? d.name ?? "", d.title?.highlight ?? "", d.title?.after ?? ""],
      short: d.short ?? local?.short ?? "",
      intro: d.intro ?? local?.intro ?? "",
      icon: d.icon ?? local?.icon ?? (["food", "build", "oil", "furniture", "bakery"] as const)[i % 5],
      image: imageUrl(d.image) ?? local?.image ?? "",
      filters: d.filters ?? [],
      products: (d.products ?? []).map((p: Raw) => ({
        cat: p.category ?? "",
        size: p.size ?? "",
        name: p.name || undefined,
        price: p.price || undefined,
        image: imageUrl(p.image, 800),
      })),
      cards: (d.cards ?? []).map((c: Raw) => [c.title ?? "", c.text ?? ""] as [string, string]),
    }
  })

  const news: Article[] = (raw.news ?? []).map((a: Raw) => ({
    key: a.key,
    date: fmtDate(a.date),
    cat: a.category ?? "",
    title: a.title ?? "",
    photo: `[PHOTO: ${a.title ?? ""}]`,
    image: imageUrl(a.image),
    summary: a.summary ?? "",
    body: blocksToParagraphs(a.body),
    link: a.related?.href ? [a.related.href, a.related.label || "Learn more"] : null,
  }))

  const offices: Office[] = (raw.offices ?? []).map((o: Raw) => ({
    id: o.id, name: o.name ?? "", country: o.country ?? "", sourcing: !!o.sourcing,
    address: o.address || undefined, phone: o.phone || undefined, email: o.email || undefined,
  }))
  const slides: Slide[] = (raw.offices ?? [])
    .filter((o: Raw) => o.sourcing && imageUrl(o.image))
    .map((o: Raw) => ({ src: imageUrl(o.image, 1600)!, href: `/contact#office-${o.id}`, label: `${o.name} (${o.country})` }))

  const partners: Partner[] = (raw.partners ?? []).map((p: Raw) => ({
    name: p.name ?? "", loc: p.location ?? "", tag: p.tag || undefined, text: p.description ?? "",
    logo: imageUrl(p.logo, 400), featured: !!p.featured,
  }))

  const team: TeamMember[] = (raw.team ?? []).map((m: Raw) => ({
    name: m.name ?? "", role: m.role ?? "", photo: imageUrl(m.photo, 700), alt: m.photo?.alt || undefined,
  }))

  // Hero: field by field, so anything left empty in Sanity keeps the built-in text.
  const h = raw.hero ?? {}
  const text = (v: unknown, fallback: string) => (typeof v === "string" && v.trim() ? v : fallback)
  const hero: Hero = {
    ...LOCAL.hero,
    eyebrow: text(h.eyebrow, LOCAL.hero.eyebrow),
    line1: text(h.line1, LOCAL.hero.line1),
    highlight: text(h.highlight, LOCAL.hero.highlight),
    line3: text(h.line3, LOCAL.hero.line3),
    intro: text(h.intro, LOCAL.hero.intro),
    primaryLabel: text(h.primaryLabel, LOCAL.hero.primaryLabel),
    whatsappLabel: text(h.whatsappLabel, LOCAL.hero.whatsappLabel),
    whatsappMessage: text(h.whatsappMessage, LOCAL.hero.whatsappMessage),
    mainPhoto: imageUrl(h.mainPhoto, 1200) ?? LOCAL.hero.mainPhoto,
    mainPhotoAlt: h.mainPhoto?.alt?.trim() || LOCAL.hero.mainPhotoAlt,
    secondPhoto: imageUrl(h.secondPhoto, 900) ?? LOCAL.hero.secondPhoto,
    secondPhotoAlt: h.secondPhoto?.alt?.trim() || LOCAL.hero.secondPhotoAlt,
    statLabel: text(h.statLabel, LOCAL.hero.statLabel),
    statValue: text(h.statValue, LOCAL.hero.statValue),
    badgeTitle: text(h.badgeTitle, LOCAL.hero.badgeTitle),
    badgeText: text(h.badgeText, LOCAL.hero.badgeText),
  }

  const social = Object.entries({ Facebook: site.social?.facebook, Instagram: site.social?.instagram, TikTok: site.social?.tiktok })
    .filter(([, url]) => !!url) as [string, string][]

  return {
    hero,
    departments: nonEmpty(departments, LOCAL.departments),
    news: nonEmpty(news, LOCAL.news),
    offices: nonEmpty(offices, LOCAL.offices),
    slides: nonEmpty(slides, LOCAL.slides),
    stats: nonEmpty(site.stats, LOCAL.stats),
    values: nonEmpty(site.values, LOCAL.values),
    partners: nonEmpty(partners, LOCAL.partners),
    team: nonEmpty(team, LOCAL.team),
    brandChips: nonEmpty(site.brandChips, LOCAL.brandChips),
    site: {
      whatsapp: site.whatsapp || LOCAL.site.whatsapp,
      phoneDisplay: site.phoneDisplay || LOCAL.site.phoneDisplay,
      email: site.email || LOCAL.site.email,
      social: site.social ? social : LOCAL.site.social,
    },
    source: "sanity",
  }
}
