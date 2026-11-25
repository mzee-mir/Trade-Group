import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-4 sm:px-6", className)}>{children}</div>
}

export function Eyebrow({ className, children, as: As = "span" }: { className?: string; children: ReactNode; as?: "span" | "h2" }) {
  return <As className={cn("mb-3 block font-sans text-xs font-bold tracking-[0.12em] text-green uppercase", className)}>{children}</As>
}

export function H2({ className, children, id }: { className?: string; children: ReactNode; id?: string }) {
  return <h2 id={id} className={cn("text-[clamp(30px,4vw,44px)] font-extrabold", className)}>{children}</h2>
}

/** Placeholder block for photos that haven't been supplied yet. */
export function Ph({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("grid place-items-center rounded-2xl border border-[#e1e8f3] bg-ph p-5 text-center text-sm text-muted-foreground", className)}>
      {children}
    </div>
  )
}

/** A real photo when one is set (e.g. from Sanity), otherwise the labelled placeholder. */
export function Photo({ src, alt = "", className, children }: { src?: string; alt?: string; className?: string; children: ReactNode }) {
  if (!src) return <Ph className={className}>{children}</Ph>
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={cn("rounded-2xl bg-ph object-cover", className, "p-0")} />
}

/** Navy page header with breadcrumb, used by inner pages. */
export function PageHero({ crumbs, title, intro, image }: {
  crumbs: { label: string; to?: string }[]
  title: ReactNode
  intro?: ReactNode
  image?: string
}) {
  return (
    <section className="on-dark dots relative isolate overflow-hidden bg-navy pt-12 pb-16 text-white sm:pt-14 sm:pb-[72px]">
      {image && (
        <img
          src={image}
          alt=""
          className={cn(
            "absolute inset-y-0 right-0 -z-10 h-full object-cover",
            // desktop: image on the right, fading left into the navy; small screens: faint texture
            "w-full opacity-[.18] min-[1101px]:w-[min(56%,860px)] min-[1101px]:opacity-100",
            "min-[1101px]:[mask-image:linear-gradient(to_left,#000_0%,#000_20%,rgb(0_0_0/.5)_45%,transparent_72%)]",
          )}
        />
      )}
      <Wrap>
        <nav aria-label="Breadcrumb" className="mb-[18px] text-sm text-[#b9c6e4]">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span className="mx-2" aria-hidden="true">/</span>}
              {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white" aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-[clamp(38px,6vw,64px)] font-extrabold tracking-[-0.035em] text-white">{title}</h1>
        {intro && <p className="mt-[18px] max-w-[620px] text-base text-[#dbe3f4] sm:text-[17px]">{intro}</p>}
      </Wrap>
    </section>
  )
}

export const Hl = ({ children }: { children: ReactNode }) => <span className="text-yellow">{children}</span>
