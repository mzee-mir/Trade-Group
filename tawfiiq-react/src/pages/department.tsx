import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlowGroup } from "@/components/ui/spotlight-card"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/reveal"
import { Hl, PageHero, Wrap } from "@/components/section"
import { useContent, useDepartment } from "@/content/content"
import { waLink } from "@/data/site"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "./not-found"

export function DepartmentPage() {
  const { slug } = useParams()
  const dept = useDepartment(slug)
  const { departments } = useContent()
  const [cat, setCat] = useState("All")
  const [query, setQuery] = useState("")

  // Reset filters when switching department
  useEffect(() => { setCat("All"); setQuery("") }, [slug])
  useEffect(() => { if (dept) document.title = `${dept.name} — Tawfiiq Group` }, [dept])

  const visible = useMemo(() => {
    if (!dept) return []
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    return dept.products
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => (cat === "All" || p.cat === cat) &&
        terms.every((t) => `${p.name ?? ""} ${p.size} ${p.cat}`.toLowerCase().includes(t)))
  }, [dept, cat, query])

  if (!dept) return <NotFoundPage />
  const [before, hl, after] = dept.title
  const tones = ["on-dark bg-green border-green text-white", "border-line", "bg-yellow border-yellow"]

  return (
    <>
      <PageHero
        image={dept.image}
        crumbs={[{ label: "Home", to: "/" }, { label: "Departments", to: "/#departments" }, { label: dept.name }]}
        title={<>{before}<Hl>{hl}</Hl>{after}</>}
        intro={dept.intro}
      />

      <section aria-labelledby="products-h" className="pt-10 pb-14 sm:pb-[88px]">
        <Wrap>
          <h2 id="products-h" className="sr-only">Products</h2>
          <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="relative w-full min-[901px]:w-[280px]">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <label htmlFor="q" className="sr-only">Search {dept.name}</label>
              <Input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or sizes" autoComplete="off"
                className="h-12 rounded-full border-field bg-white pl-11 text-base md:text-base" />
            </div>
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 sm:gap-1 sm:rounded-full sm:border sm:border-line sm:p-1">
              {["All", ...dept.filters].map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={cat === f}
                  onClick={() => setCat(f)}
                  className={cn(
                    "relative min-h-11 rounded-full border border-field px-4 text-sm font-semibold whitespace-nowrap text-[#1a2235] transition-colors sm:border-0 sm:px-[18px]",
                    cat === f ? "border-navy text-white" : "hover:bg-soft",
                  )}
                >
                  {cat === f && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
            <span role="status" className="basis-full text-sm text-muted-foreground sm:ml-auto sm:basis-auto">{visible.length} product{visible.length === 1 ? "" : "s"}</span>
          </div>

          <GlowGroup className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map(({ p, index }) => <ProductCard key={`${dept.slug}-${index}`} dept={dept} product={p} index={index} />)}
            </AnimatePresence>
          </GlowGroup>

          {visible.length === 0 && (
            <div className="rounded-[20px] border border-dashed border-field px-6 py-12 text-center">
              <p className="mb-4 font-semibold text-ink">No products match your search.</p>
              <Button asChild><a href={waLink(`Hello Tawfiiq, I'm looking for a product in ${dept.name}:`)} target="_blank" rel="noopener">Ask us on WhatsApp</a></Button>
            </div>
          )}

          <h2 className="sr-only">Buying from {dept.name}</h2>
          <div className="mt-10 grid gap-4 sm:mt-16 md:grid-cols-3">
            {dept.cards.map(([h, text], i) => (
              <Reveal key={h} delay={i * 0.06} className={cn("rounded-[20px] border px-8 py-[30px]", tones[i])}>
                <h3 className={cn("mb-2 text-[21px] font-bold", i === 0 && "text-white")}>{h}</h3>
                <p className={cn("text-[15px]", i === 0 && "text-white", i === 2 && "text-navy")}>{text}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 sm:mt-16">
            <h2 className="mb-3 font-sans text-xs font-bold tracking-[0.12em] text-green uppercase">Other departments</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {departments.filter((d) => d.slug !== dept.slug).map((d) => (
                <Link key={d.slug} to={`/departments/${d.slug}`} className="flex min-h-14 items-center justify-between rounded-[14px] border border-line px-[22px] font-heading font-bold text-navy shadow-card transition-colors hover:border-navy hover:bg-soft">
                  {d.name} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </Wrap>
      </section>
    </>
  )
}
