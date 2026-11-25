/* News articles. Each opens in a pop-up and has its own link: /news#article-<key>
   body: one string per paragraph. link: [path, label] for a related page, or null. */

export type Article = {
  key: string
  date: string
  cat: string
  title: string
  photo: string
  summary: string
  body: string[]
  link: [string, string] | null
  /** Photo URL (from Sanity). Without it the placeholder text in `photo` is shown. */
  image?: string
}

const PLACEHOLDER = "[FULL ARTICLE TEXT — paste the complete article here. Each paragraph goes in its own quoted line in src/data/news.ts.]"

export const NEWS: Article[] = [
  {
    key: "performax-hdx8",
    date: "5 Nov 2026",
    cat: "Engine Oil",
    title: "Saliidda National Performax HDX8",
    photo: "[PHOTO: Performax HDX8]",
    summary: "Performance-tested engine oil for diesel and petrol vehicles.",
    body: [PLACEHOLDER],
    link: ["/departments/engine-oil", "See our engine oils"],
  },
  {
    key: "non-woven-bags",
    date: "5 Nov 2026",
    cat: "Products",
    title: "Non-Woven Bags ama Sallada Suufka ah",
    photo: "[PHOTO: non-woven bags]",
    summary: "A greener alternative to plastic bags for shops and markets.",
    body: [PLACEHOLDER],
    link: null,
  },
  {
    key: "speedx-perfomax",
    date: "5 Nov 2026",
    cat: "Engine Oil",
    title: "Saliidda SPEEDX iyo PERFOMAX",
    photo: "[PHOTO: Speedx & Perfomax]",
    summary: "Why regular oil changes with Speedx and Perfomax protect your engine.",
    body: [PLACEHOLDER],
    link: ["/departments/engine-oil", "See our engine oils"],
  },
]

export const getArticle = (key?: string | null) => NEWS.find((a) => a.key === key)
