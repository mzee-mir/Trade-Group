/* Builds seed/content.ndjson from the React app's built-in content (tawfiiq-react/src/data),
   so Sanity starts with exactly what the site shows today.

   Run:     npm run seed        (writes seed/content.ndjson)
   Import:  npm run import:new  (adds only documents not in Sanity yet — never overwrites your edits)
            npm run import      (replaces ALL these documents with the built-in versions — undoes edits)

   Document IDs are fixed (e.g. "department-engine-oil"). They must not contain dots: Sanity treats
   dotted IDs as private, so the public website could not read them, so re-running the import updates
   the same documents instead of creating duplicates. */

import { writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const app = resolve(here, "../../tawfiiq-react")
const load = (f: string) => import(pathToFileURL(resolve(app, "src/data", f)).href)

const { DEPARTMENTS } = await load("departments.ts")
const { NEWS } = await load("news.ts")
const { OFFICES, PARTNERS, STATS, VALUES, BRAND_CHIPS, TEAM } = await load("company.ts")
const { WHATSAPP, PHONE_DISPLAY, EMAIL, SOCIAL } = await load("site.ts")
const { HERO } = await load("home.ts")

type Doc = Record<string, unknown> & { _id: string; _type: string }
const docs: Doc[] = []
const key = (prefix: string, i: number) => `${prefix}${i}`
// Image from the React app's public/ folder, uploaded by `sanity dataset import`.
const image = (publicPath: string) => ({
  _type: "image",
  _sanityAsset: `image@${pathToFileURL(resolve(app, "public", publicPath.replace(/^\//, ""))).href}`,
})
const slug = (current: string) => ({ _type: "slug", current })
const MONTHS: Record<string, string> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" }
const isoDate = (d: string) => {
  const [day, mon, year] = d.split(" ")
  return `${year}-${MONTHS[mon]}-${day.padStart(2, "0")}`
}

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  whatsapp: WHATSAPP,
  phoneDisplay: PHONE_DISPLAY,
  email: EMAIL,
  social: { facebook: SOCIAL.Facebook || undefined, instagram: SOCIAL.Instagram || undefined, tiktok: SOCIAL.TikTok || undefined },
  stats: STATS.map((s: object, i: number) => ({ _key: key("stat", i), _type: "stat", ...s })),
  values: VALUES.map((v: object, i: number) => ({ _key: key("value", i), _type: "value", ...v })),
  brandChips: BRAND_CHIPS,
})

// Home page hero (text only; add the photos in the Studio)
docs.push({
  _id: "homePage",
  _type: "homePage",
  hero: {
    eyebrow: HERO.eyebrow, line1: HERO.line1, highlight: HERO.highlight, line3: HERO.line3, intro: HERO.intro,
    primaryLabel: HERO.primaryLabel, whatsappLabel: HERO.whatsappLabel, whatsappMessage: HERO.whatsappMessage,
    statLabel: HERO.statLabel, statValue: HERO.statValue, badgeTitle: HERO.badgeTitle, badgeText: HERO.badgeText,
  },
})

DEPARTMENTS.forEach((d: any, i: number) => {
  const id = `department-${d.slug}`
  docs.push({
    _id: id,
    _type: "department",
    name: d.name,
    slug: slug(d.slug),
    order: (i + 1) * 10,
    title: { before: d.title[0], highlight: d.title[1], after: d.title[2] },
    short: d.short,
    intro: d.intro,
    icon: d.icon,
    image: image(d.image),
    filters: d.filters,
    cards: d.cards.map(([title, text]: [string, string], j: number) => ({ _key: key("card", j), _type: "infoCard", title, text })),
  })
  d.products.forEach((p: any, j: number) => {
    docs.push({
      _id: `product-${d.slug}-${j}`,
      _type: "product",
      department: { _type: "reference", _ref: id },
      category: p.cat,
      size: p.size,
      ...(p.name ? { name: p.name } : {}),
      ...(p.price ? { price: p.price } : {}),
      order: (j + 1) * 10,
    })
  })
})

NEWS.forEach((a: any) => {
  docs.push({
    _id: `article-${a.key}`,
    _type: "article",
    title: a.title,
    slug: slug(a.key),
    date: isoDate(a.date),
    category: a.cat,
    summary: a.summary,
    body: a.body.map((text: string, i: number) => ({
      _key: key("b", i),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: key("s", i), _type: "span", text, marks: [] }],
    })),
    ...(a.link ? { related: { href: a.link[0], label: a.link[1] } } : {}),
  })
})

const NETWORK_IMAGES: Record<string, string> = {
  dubai: "/images/network/dubai.svg",
  salalah: "/images/network/salalah.svg",
  china: "/images/network/china.svg",
}
OFFICES.forEach((o: any, i: number) => {
  docs.push({
    _id: `office-${o.id}`,
    _type: "office",
    name: o.name,
    slug: slug(o.id),
    country: o.country,
    sourcing: !!o.sourcing,
    order: (i + 1) * 10,
    ...(NETWORK_IMAGES[o.id] ? { image: image(NETWORK_IMAGES[o.id]) } : {}),
  })
})

PARTNERS.forEach((p: any, i: number) => {
  docs.push({
    _id: `partner-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    _type: "partner",
    name: p.name,
    location: p.loc,
    tag: p.tag,
    description: p.text,
    featured: false,
    order: (i + 1) * 10,
  })
})
docs.push({
  _id: "partner-salalah-macaroni",
  _type: "partner",
  name: "Salalah Macaroni Company",
  location: "Oman",
  description: "Tawfiiq is a co-investor in Salalah Macaroni Company in Oman.",
  featured: true,
  order: 999,
})

TEAM.forEach((m: any, i: number) => {
  docs.push({ _id: `team-${i + 1}`, _type: "teamMember", name: m.name, role: m.role, order: (i + 1) * 10 })
})

const out = resolve(here, "content.ndjson")
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n")
const counts = docs.reduce<Record<string, number>>((m, d) => ({ ...m, [d._type]: (m[d._type] || 0) + 1 }), {})
console.log(`Wrote ${docs.length} documents to ${out}`)
console.log(counts)
