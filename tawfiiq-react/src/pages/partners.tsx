import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { Eyebrow, H2, Hl, PageHero, Ph, Wrap } from "@/components/section"
import { useContent } from "@/content/content"

export function PartnersPage() {
  const { partners } = useContent()
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Partners & Projects" }]}
        title={<>Partners we <Hl>grow with</Hl></>}
        intro="Long-term partnerships with manufacturers and trading groups across the Gulf and the Horn of Africa."
      />

      <section className="py-14 sm:py-[88px]">
        <Wrap>
          <Eyebrow>Our partners</Eyebrow>
          <H2>Trusted names behind our products</H2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) =>
              p.featured ? (
                <Reveal key={p.name} delay={i * 0.05} className="flex flex-col justify-center rounded-[20px] bg-yellow p-7">
                  <h3 className="text-[22px] font-bold">{p.name}</h3>
                  <p className="mt-2.5 text-[15px] text-navy">{p.text}</p>
                </Reveal>
              ) : (
                <Reveal key={p.name} delay={i * 0.05} className="rounded-[20px] border border-line p-7 shadow-card">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    {p.logo
                      ? <img src={p.logo} alt={`${p.name} logo`} loading="lazy" className="h-14 w-auto max-w-[160px] object-contain" />
                      : <div className="grid h-14 w-[120px] place-items-center rounded-[10px] border border-[#e1e8f3] bg-ph text-xs text-muted-foreground">[LOGO]</div>}
                    {p.tag && <span className="rounded-full bg-green-soft px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-green uppercase">{p.tag}</span>}
                  </div>
                  <h3 className="text-[22px] font-bold">{p.name}</h3>
                  <div className="mt-1.5 mb-3 text-[13px] font-semibold text-green">{p.loc}</div>
                  <p className="text-[15px]">{p.text}</p>
                </Reveal>
              ),
            )}
          </div>
        </Wrap>
      </section>

      <section className="border-y border-line bg-soft py-14 sm:py-[88px]">
        <Wrap>
          <div className="mb-8 flex flex-col items-start justify-between gap-5 min-[901px]:flex-row min-[901px]:items-end">
            <div><Eyebrow>Projects</Eyebrow><H2>Projects we have supplied</H2></div>
            <p className="max-w-[380px]">[Add Tawfiiq's real projects here — construction supply, investments and community work.]</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 0.06} className="overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
                <Ph className="min-h-[210px] rounded-none border-0">[PROJECT PHOTO]</Ph>
                <div className="px-6 pt-5 pb-6">
                  <span className="text-xs font-semibold text-green">[LOCATION] · [YEAR]</span>
                  <h3 className="mt-2 text-[19px] font-bold">[PROJECT NAME]</h3>
                  <p className="mt-2 text-sm">[What Tawfiiq supplied or built]</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="py-14 sm:py-[88px]">
        <Wrap>
          <Reveal className="on-dark dots flex flex-col items-start justify-between gap-8 rounded-[28px] bg-navy px-8 py-10 text-white min-[901px]:flex-row min-[901px]:items-center min-[901px]:px-14 min-[901px]:py-[52px]">
            <div>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-extrabold text-white">Become a Tawfiiq partner</h2>
              <p className="mt-2.5 max-w-[520px] text-[#dbe3f4]">Manufacturers looking for distribution in Somalia — talk to our partnerships team.</p>
            </div>
            <Button asChild variant="yellow"><Link to="/contact#enquiry">Contact us</Link></Button>
          </Reveal>
        </Wrap>
      </section>
    </>
  )
}
