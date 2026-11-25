import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DeptIcon } from "@/components/icons"
import { useContent } from "@/content/content"

/** Horizontal, snapping row of tall department cards with prev/next buttons. */
export function DepartmentScroller() {
  const { departments } = useContent()
  const row = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [overflows, setOverflows] = useState(true)
  const reduce = useReducedMotion()

  const update = useCallback(() => {
    const el = row.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth - 2
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= max)
    setOverflows(max > 0)
  }, [])

  useEffect(() => {
    const el = row.current
    if (!el) return
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const el = row.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const per = card ? card.getBoundingClientRect().width + gap : el.clientWidth
    const step = Math.max(per, Math.floor(el.clientWidth / per) * per)
    el.scrollBy({ left: step * dir, behavior: reduce ? "auto" : "smooth" })
  }

  // Fade whichever edge has more cards beyond it, so the row reads as "keeps going".
  const fade = `linear-gradient(to right, ${atStart ? "#000" : "transparent"} 0, #000 ${atStart ? "0" : "72px"}, #000 calc(100% - ${atEnd ? "0px" : "120px"}), ${atEnd ? "#000" : "transparent"} 100%)`

  const arrow = "grid size-12 place-items-center rounded-full border border-field bg-white text-navy transition-colors enabled:hover:border-navy enabled:hover:bg-navy enabled:hover:text-white disabled:cursor-default disabled:opacity-35"

  return (
    <>
      {overflows && (
        <div className="mb-5 flex justify-end gap-2">
          <button type="button" className={arrow} disabled={atStart} onClick={() => scroll(-1)} aria-controls="dept-row" aria-label="Scroll departments left"><ArrowLeft className="size-5" /></button>
          <button type="button" className={arrow} disabled={atEnd} onClick={() => scroll(1)} aria-controls="dept-row" aria-label="Scroll departments right"><ArrowRight className="size-5" /></button>
        </div>
      )}
      <div
        id="dept-row"
        ref={row}
        role="region"
        aria-label="Departments"
        onScroll={update}
        style={{
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
        className="no-scrollbar -mx-1 -mt-2 flex snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 pt-2 pb-5 sm:gap-4"
      >
        {departments.map((d, i) => (
          <motion.div
            key={d.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="shrink-0 basis-[74%] snap-start sm:basis-[clamp(230px,24vw,280px)]"
          >
            <Link
              to={`/departments/${d.slug}`}
              className="on-dark group relative isolate flex h-[400px] flex-col overflow-hidden rounded-3xl bg-navy p-[22px] text-white shadow-card transition-shadow hover:shadow-lift sm:h-[clamp(380px,38vw,460px)] sm:p-[26px]"
            >
              <img src={d.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* readability scrim: dark where the text sits, whatever the photo */}
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_42_102/.12)_0%,rgb(11_42_102/.3)_35%,rgb(8_24_60/.72)_55%,rgb(8_24_60/.94)_100%)]" />
              <div className="mb-auto flex items-start justify-between">
                <span className="grid size-[52px] place-items-center rounded-[14px] bg-white/95 text-green shadow-[0_6px_16px_rgb(0_0_0/.18)]"><DeptIcon icon={d.icon} className="size-6" /></span>
                <span className="rounded-full bg-navy/55 px-2.5 py-1 font-heading text-sm font-bold backdrop-blur-sm">0{i + 1}</span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-[clamp(22px,2vw,26px)] font-extrabold text-white [text-shadow:0_1px_12px_rgb(0_0_0/.25)]">{d.name}</h3>
                  <p className="text-[15px] text-[#e3e9f6]">{d.short}</p>
                </div>
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-yellow text-navy transition-transform group-hover:translate-x-1"><ArrowRight className="size-5" /></span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  )
}
