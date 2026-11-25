import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { Eyebrow, H2, Hl, PageHero, Ph, Photo, Wrap } from "@/components/section"
import { useContent } from "@/content/content"
import { cn } from "@/lib/utils"

const BAR = { green: "bg-green", yellow: "bg-yellow", navy: "bg-navy" }

export function AboutPage() {
  const { stats: STATS, values: VALUES, team } = useContent()
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
        title={<>A modern Somali company <Hl>since 1992</Hl></>}
        intro="From one of the first modern business organizations in Somalia to one of the country's leading trading groups."
      />

      <section className="pt-14 pb-10 sm:pt-[88px]">
        <Wrap className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.06}
              className={i === 3 ? "on-dark rounded-[20px] bg-green px-7 py-[30px] text-white shadow-card" : "rounded-[20px] border border-line px-7 py-[30px] shadow-card"}>
              <strong className={cn("block font-heading text-[clamp(36px,4vw,50px)] leading-[1.05] font-extrabold tabular-nums", i === 3 ? "text-white" : "text-navy")}>{s.value}</strong>
              <span className={cn("mt-2 block text-sm", i === 3 ? "text-white" : "text-muted-foreground")}>{s.long}</span>
            </Reveal>
          ))}
        </Wrap>
      </section>

      <section className="py-14 sm:py-[88px]">
        <Wrap className="grid items-center gap-14 min-[901px]:grid-cols-2">
          <Reveal><Ph className="min-h-[300px] min-[901px]:min-h-[380px]">[PHOTO: founders or the original 1992 shop]</Ph></Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Our story</Eyebrow>
            <H2 className="mb-[18px]">From a single company to a trading group</H2>
            <p>Tawfiiq was founded in Bosaso in 1992 as one of the first businesses in Somalia organized as a modern company. At the time, most businesses were sole proprietorships or family-owned.</p>
            <p className="mt-3.5">Today Tawfiiq is one of Somalia's main foodstuff distributors and a leading supplier of building materials, electronics, furniture and general merchandise. We are the sole distributor for several producers and a co-investor in Salalah Macaroni Company.</p>
          </Reveal>
        </Wrap>
      </section>

      <section className="pb-14 sm:pb-[88px]">
        <Wrap className="grid gap-4 min-[901px]:grid-cols-2">
          <Reveal className="on-dark rounded-[20px] bg-navy px-[34px] py-9">
            <small className="mb-3 block text-xs font-bold tracking-[0.12em] text-yellow">OUR MISSION</small>
            <p className="font-heading text-[clamp(20px,2.2vw,25px)] leading-snug font-bold text-white">Excellent customer service, creativity and accountability — on our way to becoming the leading trading company in Somalia.</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[20px] bg-yellow px-[34px] py-9">
            <small className="mb-3 block text-xs font-bold tracking-[0.12em] text-navy">OUR VISION</small>
            <p className="font-heading text-[clamp(20px,2.2vw,25px)] leading-snug font-bold text-navy">To stay the leader in high-quality products and services by exceeding what our customers expect.</p>
          </Reveal>
        </Wrap>
      </section>

      <section className="pb-14 sm:pb-[88px]">
        <Wrap>
          <Eyebrow>Our values</Eyebrow>
          <H2>What we stand for</H2>
          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.04} className="rounded-[14px] border border-line px-[22px] py-6">
                <span className={cn("mb-3.5 block h-[5px] w-7 rounded", BAR[v.tone])} aria-hidden="true" />
                <h3 className="font-sans text-[17px] font-bold tracking-[-0.01em]">{v.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="pb-14 sm:pb-[88px]">
        <Wrap>
          <Eyebrow>Leadership</Eyebrow>
          <H2>The people behind Tawfiiq</H2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={`${m.name}-${i}`} delay={i * 0.05}>
                <Photo src={m.photo} alt={m.alt ?? `Portrait of ${m.name}`} className="aspect-[1/0.88] w-full">[PHOTO]</Photo>
                <h3 className="mt-3.5 font-sans text-[17px] font-bold">{m.name}</h3>
                <span className="text-sm text-muted-foreground">{m.role}</span>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="pb-14 sm:pb-[88px]">
        <Wrap>
          <Reveal className="on-dark flex flex-col items-start justify-between gap-8 rounded-[28px] bg-green px-8 py-10 text-white min-[901px]:flex-row min-[901px]:items-center min-[901px]:px-14 min-[901px]:py-[52px]">
            <div>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-extrabold text-white">Work with Tawfiiq</h2>
              <p className="mt-2.5 max-w-[520px] text-[#dff0e6]">Customers, suppliers and partners — our offices from Bosaso to China are ready to help.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="yellow"><Link to="/contact">Find an office</Link></Button>
              <Button asChild variant="white"><Link to="/partners">Our partners</Link></Button>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  )
}
