import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { setWhatsAppNumber } from "@/data/site"
import { imageUrl, sanity, sanityEnabled } from "@/lib/sanity"
import { fromSanity, LOCAL, QUERY, type Content } from "./model"

export type { Content, Slide, Stat, Value } from "./model"

/* All site content in one place.
   - Without Sanity configured: the built-in content in src/data.
   - With Sanity: fetched once per visit. Any section that is empty in Sanity falls back to the
     built-in version, and the last response is cached so repeat visits show it immediately. */

const CACHE_KEY = "tawfiiq-content-v1"
const readCache = (): Content | null => {
  if (!sanityEnabled) return null
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null")
    // Fill in sections added since the cache was saved (e.g. hero, team), so an old cache never breaks a page.
    return c ? { ...LOCAL, ...c, site: { ...LOCAL.site, ...c.site }, source: "sanity-cache" } : null
  } catch { return null }
}

const ContentContext = createContext<Content>(LOCAL)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(() => {
    const c = readCache() ?? LOCAL
    setWhatsAppNumber(c.site.whatsapp)
    return c
  })

  useEffect(() => {
    if (!sanity) return
    let cancelled = false
    sanity.fetch<Record<string, unknown>>(QUERY)
      .then((raw) => {
        if (cancelled) return
        const next = fromSanity(raw, imageUrl)
        setWhatsAppNumber(next.site.whatsapp)
        setContent(next)
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)) } catch { /* storage full or blocked */ }
      })
      .catch((err: unknown) => console.warn("[content] Sanity fetch failed; keeping the current content.", err))
    return () => { cancelled = true }
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export const useContent = () => useContext(ContentContext)
export const useDepartment = (slug?: string) => useContent().departments.find((d) => d.slug === slug)
