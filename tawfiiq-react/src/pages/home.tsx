import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero"
import { DepartmentScroller } from "@/components/department-scroller"
import { ArticleLink } from "@/components/news/article-dialog"
import { Reveal } from "@/components/reveal"
import { Eyebrow, H2, Hl, Ph, Photo, Wrap } from "@/components/section"
import { useContent } from "@/content/content"
import { waLink } from "@/data/site"

const VALUES = ["Sharia Compliant", "Integrity", "Social Responsibility", "Respect", "Safety", "Inclusion"]

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function HomePage() {
  const navigate = useNavigate()
  const { hero, departments: DEPARTMENTS, news: NEWS, slides: SOURCING_SLIDES, stats: STATS, brandChips: BRAND_CHIPS } = useContent()

  return (
    <>
      {/* Hero */}
      <section className="on-dark overflow-hidden bg-navy pt-10 pb-12 text-white sm:pt-16 sm:pb-20">
        <Wrap className="grid items-center gap-14 min-[901px]:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.span {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] text-[#dbe3f4]">
              <span className="size-[7px] rounded-full bg-yellow" aria-hidden="true" /> {hero.eyebrow}
            </motion.span>
            <motion.h1 {...rise(0.08)} className="my-5 text-[clamp(44px,6.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-white sm:my-6">
              {hero.line1}<br /><Hl>{hero.highlight}</Hl><br />{hero.line3}
            </motion.h1>
            <motion.p {...rise(0.16)} className="max-w-[520px] text-[17px] text-[#dbe3f4]">
              {hero.intro}
            </motion.p>
            <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="yellow" className="max-sm:flex-1"><Link to="/#departments">{hero.primaryLabel}</Link></Button>
              <Button asChild variant="white" className="max-sm:flex-1"><a href={waLink(hero.whatsappMessage)} target="_blank" rel="noopener">{hero.whatsappLabel}</a></Button>
            </motion.div>
          </div>

          {/* Photo collage (hidden on phones so departments are reachable sooner) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[340px] grid-cols-[1.1fr_1fr] grid-rows-[1fr_1.25fr] gap-4 sm:grid min-[901px]:h-[440px]"
          >
            {hero.mainPhoto
              ? <img src={hero.mainPhoto} alt={hero.mainPhotoAlt ?? ""} fetchPriority="high" className="row-span-2 size-full rounded-[22px] border border-white/10 bg-navy-2 object-cover" />
              : <div role="img" aria-label="Photo placeholder" className="row-span-2 grid place-items-center rounded-[22px] border border-white/10 bg-navy-2 p-5 text-center text-[13px] text-[#b9c6e4]">{hero.mainPhotoPlaceholder}</div>}
            {hero.secondPhoto
              ? <img src={hero.secondPhoto} alt={hero.secondPhotoAlt ?? ""} className="size-full rounded-[22px] border border-white/10 bg-navy-2 object-cover" />
              : <div className="grid place-items-center rounded-[22px] border border-white/10 bg-navy-2 p-5 text-center text-[13px] text-[#b9c6e4]">{hero.secondPhotoPlaceholder}</div>}
            <div className="flex flex-col justify-between rounded-[22px] bg-yellow px-6 py-[22px] text-navy">
              <small className="text-[13px] font-semibold">{hero.statLabel}</small>
              <strong className="font-heading text-[clamp(24px,2.6vw,38px)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap">{hero.statValue}</strong>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute bottom-[22%] left-3 flex items-center gap-3 rounded-[14px] bg-white py-3 pr-[18px] pl-3 text-navy shadow-[0_18px_40px_rgb(0_0_0/.25)] min-[901px]:-left-[10%]"
            >
              <span className="grid size-[34px] place-items-center rounded-[9px] bg-green-soft text-green"><Check className="size-4" strokeWidth={3} /></span>
              <div><b className="block text-sm">{hero.badgeTitle}</b><span className="text-xs text-muted-foreground">{hero.badgeText}</span></div>
            </motion.div>
          </motion.div>
        </Wrap>
      </section>

      {/* Department links strip */}
      <nav aria-label="Shop by department" className="bg-yellow">
        <Wrap>
          <ul className="flex flex-wrap justify-start gap-x-1 py-2.5 sm:justify-center sm:gap-x-2">
            {DEPARTMENTS.map((d) => (
              <li key={d.slug}>
                <Link to={`/departments/${d.slug}`} className="inline-flex min-h-11 items-center rounded-full px-2.5 font-heading text-[15px] font-bold text-navy transition-colors hover:bg-navy/10 sm:px-3.5 sm:text-base">{d.name}</Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </nav>

      {/* Stats */}
      <section className="pt-14 pb-10 sm:pt-[88px]">
        <Wrap className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.06}
              className={i === 3 ? "on-dark rounded-[20px] bg-green px-7 py-[30px] text-white shadow-card" : "rounded-[20px] border border-line px-7 py-[30px] shadow-card"}>
              <strong className={`block font-heading text-[clamp(36px,4vw,50px)] leading-[1.05] font-extrabold tracking-[-0.03em] tabular-nums ${i === 3 ? "text-white" : "text-navy"}`}>{s.value}</strong>
              <span className={`mt-2 block text-sm ${i === 3 ? "text-white" : "text-muted-foreground"}`}>{s.label}</span>
            </Reveal>
          ))}
        </Wrap>
      </section>

      {/* Departments */}
      <section id="departments" className="scroll-mt-20 py-14 sm:py-[88px]">
        <Wrap>
          <div className="mb-6 flex flex-col items-start justify-between gap-6 min-[901px]:flex-row min-[901px]:items-end">
            <div><Eyebrow>What we trade</Eyebrow><H2>Five departments.<br />One trusted supplier.</H2></div>
            <p className="max-w-[380px] text-[15px]">Wholesale and retail supply for shops, contractors, garages and households across Somalia.</p>
          </div>
          <DepartmentScroller />
        </Wrap>
      </section>

      {/* Story */}
      <section className="pb-14 sm:pb-[88px]">
        <Wrap>
          <Reveal className="grid items-center gap-12 rounded-[28px] border border-line p-6 sm:p-10 min-[901px]:grid-cols-2">
            <Ph className="min-h-[260px] min-[901px]:min-h-[420px]">[PHOTO: founders, team or the original 1992 shop]</Ph>
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mb-5 text-[clamp(30px,3.4vw,40px)] font-extrabold">A modern Somali company since 1992</h2>
              <p>Founded in Bosaso in 1992, Tawfiiq was one of the first businesses in Somalia set up as a modern organization — at a time when most companies were sole proprietorships or family-run.</p>
              <p className="mt-3.5">Today we are one of the country's main foodstuff distributors, the sole distributor for several producers, and a co-investor in Salalah Macaroni Company.</p>
              <div className="my-6 flex flex-wrap gap-2">
                {VALUES.map((v) => <span key={v} className="rounded-full border border-[#cfe5d8] px-3.5 py-1.5 text-[13px] font-semibold text-green">{v}</span>)}
              </div>
              <Link to="/about" className="inline-flex min-h-11 items-center font-bold text-green underline underline-offset-4">Read our full story →</Link>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* Network: sourcing offices on the curved band */}
      <section className="on-dark bg-navy pt-14 pb-14 text-white sm:pt-[88px] sm:pb-[88px]">
        <Wrap>
          <Eyebrow className="text-yellow">Our network</Eyebrow>
          <H2 className="text-white">From Bosaso to the world</H2>
          <p className="mt-3.5 max-w-[520px] text-[#dbe3f4]">Sourcing offices abroad and distribution at home keep supply steady and prices fair.</p>
        </Wrap>
        <TiltedGridHero
          images={SOURCING_SLIDES}
          linksLabel="Sourcing offices"
          onSelect={(img) => img.href && navigate(img.href)}
          tileHeight={42}
          axis={50}
          className="mt-4 h-[clamp(240px,32vw,440px)]"
        />
      </section>

      {/* Partner strip */}
      <section className="pt-16 pb-6 text-center">
        <Wrap>
          <small className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">Partners &amp; brands we distribute</small>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {BRAND_CHIPS.map((b) => <Link key={b} to="/partners" className="inline-flex min-h-11 items-center rounded-xl border border-line px-6 text-sm font-bold text-navy transition-colors hover:border-navy">{b}</Link>)}
          </div>
        </Wrap>
      </section>

      {/* Latest news */}
      <section className="py-14 sm:py-[88px]">
        <Wrap>
          <div className="mb-8 flex flex-col items-start justify-between gap-5 min-[901px]:flex-row min-[901px]:items-end">
            <H2>Latest news</H2>
            <Link to="/news" className="inline-flex min-h-11 items-center font-bold text-green underline underline-offset-4">All news →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.06}>
                <ArticleLink article={a} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                  <Photo src={a.image} className="h-[210px] w-full rounded-none border-0">{a.photo}</Photo>
                  <div className="px-6 pt-5 pb-6">
                    <span className="text-[13px] text-muted-foreground">{a.date} · {a.cat}</span>
                    <h3 className="mt-2 text-[19px] font-bold group-hover:text-green">{a.title}</h3>
                  </div>
                </ArticleLink>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* CTA */}
      <section className="pb-14 sm:pb-[88px]">
        <Wrap>
          <Reveal className="on-dark flex flex-col items-start justify-between gap-8 rounded-[28px] bg-green px-8 py-10 text-white min-[901px]:flex-row min-[901px]:items-center min-[901px]:px-14 min-[901px]:py-[52px]">
            <div>
              <h2 className="max-w-[520px] text-[clamp(28px,3.4vw,40px)] font-extrabold text-white">Buying wholesale or for your project?</h2>
              <p className="mt-2.5 max-w-[520px] text-[#dff0e6]">Send your list on WhatsApp — our sales team replies with prices and availability.</p>
            </div>
            <Button asChild variant="yellow"><a href={waLink("Hello Tawfiiq, here is my order list:")} target="_blank" rel="noopener">Chat on WhatsApp</a></Button>
          </Reveal>
        </Wrap>
      </section>
    </>
  )
}
