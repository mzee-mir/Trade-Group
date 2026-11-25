import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { WhatsAppIcon } from "@/components/icons"
import { Wrap } from "@/components/section"
import { useOrder } from "@/components/order/order-context"
import { useContent } from "@/content/content"
import { waLink } from "@/data/site"
import { cn } from "@/lib/utils"

export function Footer({ full = false }: { full?: boolean }) {
  const { departments, site } = useContent()
  const { social, email: EMAIL, phoneDisplay: PHONE_DISPLAY, whatsapp: WHATSAPP } = site
  const link = "inline-flex min-h-11 items-center text-[#c9d4ec] hover:text-white"

  return (
    <footer className="on-dark bg-navy text-sm text-[#c9d4ec]">
      {full ? (
        <>
          <Wrap className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-3 font-heading text-[19px] font-extrabold text-white">TAWFIIQ GROUP</div>
              <p>Towfiiq General Trading Company. Trusted supplier across Somalia since 1992.</p>
            </div>
            <div>
              <h2 className="mb-2 font-heading text-[15px] text-white">Departments</h2>
              <ul>{departments.map((d) => <li key={d.slug}><Link className={link} to={`/departments/${d.slug}`}>{d.name}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="mb-2 font-heading text-[15px] text-white">Contact</h2>
              <ul>
                <li className="flex min-h-11 items-center">Gaaca, Bosaso, Somalia</li>
                <li><a className={link} href={`tel:+${WHATSAPP}`}>{PHONE_DISPLAY}</a></li>
                <li><a className={link} href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              </ul>
            </div>
            {social.length > 0 && (
              <div>
                <h2 className="mb-2 font-heading text-[15px] text-white">Follow us</h2>
                <ul>{social.map(([name, url]) => <li key={name}><a className={link} href={url} target="_blank" rel="noopener">{name}</a></li>)}</ul>
              </div>
            )}
          </Wrap>
          <Wrap className="border-t border-white/10 py-5 text-[13px]">© 2026 Towfiiq General Trading Company. All rights reserved.</Wrap>
        </>
      ) : (
        <Wrap className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-5">
          <span>© 2026 Towfiiq General Trading Company</span>
          <span className="flex flex-wrap items-center gap-x-1.5">
            Gaaca, Bosaso · <a className="inline-flex min-h-11 items-center text-white hover:underline" href={`tel:+${WHATSAPP}`}>{PHONE_DISPLAY}</a> ·
            <a className="inline-flex min-h-11 items-center text-white hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </span>
          {social.length > 0 && (
            <span className="flex gap-3.5">{social.map(([name, url]) => <a key={name} className="inline-flex min-h-11 items-center text-white underline underline-offset-4" href={url} target="_blank" rel="noopener">{name}</a>)}</span>
          )}
        </Wrap>
      )}
    </footer>
  )
}

/** Floating WhatsApp button. Moves up (desktop) or hides (phones) while the order bar is showing. */
export function WhatsAppFloat() {
  const { items } = useOrder()
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 300], [0.85, 1])
  const hasOrder = items.length > 0
  return (
    <motion.a
      style={{ scale }}
      href={waLink("Hello Tawfiiq, I'd like to ask about your products.")}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed right-4 z-40 grid size-[52px] place-items-center rounded-full bg-whatsapp text-white shadow-[0_0_0_10px_rgb(21_127_61/.15),0_12px_28px_rgb(0_0_0/.2)] transition-[bottom] sm:right-6 sm:size-[60px]",
        hasOrder ? "bottom-[104px] max-sm:hidden" : "bottom-4 sm:bottom-6",
      )}
    >
      <WhatsAppIcon className="size-7" />
    </motion.a>
  )
}
