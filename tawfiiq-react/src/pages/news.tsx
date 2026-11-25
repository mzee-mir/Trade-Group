import { Reveal } from "@/components/reveal"
import { ArticleLink } from "@/components/news/article-dialog"
import { Eyebrow, H2, Hl, PageHero, Ph, Photo, Wrap } from "@/components/section"
import { Button } from "@/components/ui/button"
import { useContent } from "@/content/content"
import { cn } from "@/lib/utils"

const GALLERY = [
  { n: 1, tall: true }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6, tall: true }, { n: 7 }, { n: 8 },
]
const SOCIAL_VARIANT = { Facebook: "default", Instagram: "green", TikTok: "yellow" } as const

export function NewsPage() {
  const { news, site } = useContent()
  const [feature, ...rest] = news
  const social = site.social

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "News & Gallery" }]}
        title={<>News <Hl>&amp;</Hl> Gallery</>}
        intro="Product launches, company updates and photos from Tawfiiq."
      />

      <section className="py-14 sm:py-[88px]">
        <Wrap>
          <Reveal>
            <ArticleLink article={feature} className="group mb-6 grid overflow-hidden rounded-[28px] border border-line shadow-card transition-all hover:-translate-y-1 hover:shadow-lift min-[901px]:grid-cols-2">
              <Photo src={feature.image} className="h-[260px] w-full rounded-none border-0 min-[901px]:h-full min-[901px]:min-h-[340px]">{feature.photo}</Photo>
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
                <span className="mb-3.5 self-start rounded-full bg-yellow px-3 py-1 text-[11px] font-extrabold tracking-[0.1em] text-navy">LATEST</span>
                <span className="text-[13px] text-muted-foreground">{feature.date} · {feature.cat}</span>
                <h2 className="mt-2.5 mb-3.5 text-[clamp(26px,3vw,34px)] font-extrabold group-hover:text-green">{feature.title}</h2>
                <p>{feature.summary}</p>
                <span className="mt-4 inline-flex min-h-11 items-center font-bold text-green">Read full article →</span>
              </div>
            </ArticleLink>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.06}>
                <ArticleLink article={a} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                  <Photo src={a.image} className="h-[210px] w-full rounded-none border-0">{a.photo}</Photo>
                  <div className="px-6 pt-5 pb-6">
                    <span className="text-[13px] text-muted-foreground">{a.date} · {a.cat}</span>
                    <h3 className="mt-2 text-[19px] font-bold group-hover:text-green">{a.title}</h3>
                    <p className="mt-2 text-sm">{a.summary}</p>
                  </div>
                </ArticleLink>
              </Reveal>
            ))}
            <div className="grid min-h-[300px] place-items-center rounded-[20px] border border-dashed border-field text-muted-foreground">[NEXT NEWS POST]</div>
          </div>
        </Wrap>
      </section>

      <section className="border-y border-line bg-soft py-14 sm:py-[88px]">
        <Wrap>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div><Eyebrow>Gallery</Eyebrow><H2>Inside Tawfiiq</H2></div>
            {social.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {social.map(([name, url]) => (
                  <Button key={name} asChild size="sm" variant={SOCIAL_VARIANT[name as keyof typeof SOCIAL_VARIANT]}>
                    <a href={url} target="_blank" rel="noopener">{name}</a>
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 lg:grid-cols-5">
            {GALLERY.map((g, i) => (
              <Reveal key={g.n} delay={i * 0.04} className={cn(g.tall && "row-span-2")}>
                <Ph className="h-full">[PHOTO {g.n}]</Ph>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  )
}
