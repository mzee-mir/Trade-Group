import { forwardRef } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = { qty: number; label: string; onDec: () => void; onInc: () => void; className?: string }

/** − qty + control. The + button is forwardRef'd so focus can move to it after "Add". */
export const Stepper = forwardRef<HTMLButtonElement, Props>(function Stepper({ qty, label, onDec, onInc, className }, incRef) {
  const btn = "grid size-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow-[0_1px_2px_rgb(11_42_102/.15)] transition-colors hover:bg-navy hover:text-white"
  return (
    <div className={cn("flex items-center justify-between gap-2 rounded-full border border-green bg-green-soft p-0.5", className)}>
      <button type="button" className={btn} onClick={onDec} aria-label={`One less ${label}`}><Minus className="size-5" /></button>
      <span className="min-w-[2ch] text-center font-heading text-lg font-extrabold text-green tabular-nums" aria-hidden="true">{qty}</span>
      <button type="button" ref={incRef} className={btn} onClick={onInc} aria-label={`One more ${label}`}><Plus className="size-5" /></button>
    </div>
  )
})
