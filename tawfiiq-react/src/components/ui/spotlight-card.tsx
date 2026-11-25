import { useEffect, useRef, type ComponentProps, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/* Spotlight / glow cards — adapted from the "GlowCard" (spotlight-card) component.

   Changes from the original, all deliberate:
   - One pointer listener per group (GlowGroup), not one per card; updates once per frame.
   - Tuned for light cards and the Tawfiiq palette (green → blue across the screen).
   - Mouse/trackpad only. The original set `touch-action: none`, which blocks scrolling
     on phones; here touch screens simply get the plain card.
   The visual rules live in index.css under ".glow-card". */

const fine = () => typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches

export function GlowGroup({ className, children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !fine()) return
    let frame = 0, x = 0, y = 0
    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty("--x", x.toFixed(1))
        el.style.setProperty("--y", y.toFixed(1))
        el.style.setProperty("--xp", (x / innerWidth).toFixed(3))
      })
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    return () => { document.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ref} className={cn("glow-group", className)} {...props}>{children}</div>
}

export function GlowCard({ className, children, ...props }: ComponentProps<"div"> & { children: ReactNode }) {
  return <div className={cn("glow-card", className)} {...props}>{children}</div>
}
