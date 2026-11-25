import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppIcon } from "@/components/icons"
import { waLink } from "@/data/site"
import { orderMessage, summary, useOrder } from "./order-context"
import { Stepper } from "./stepper"

/** Bottom bar (appears once something is in the list) + the review dialog. */
export function OrderBar() {
  const { items, setQty, clear, announce } = useOrder()
  const [open, setOpen] = useState(false)
  const viewRef = useRef<HTMLButtonElement>(null)
  const [note, setNote] = useState("")
  const href = waLink(orderMessage(items, note.trim()))
  const onSend = () => announce("Opening WhatsApp with your order list.")

  return (
    <>
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            role="region"
            aria-label="Order list"
            initial={{ y: 80, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 80, opacity: 0, x: "-50%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="on-dark fixed bottom-2.5 left-1/2 z-40 flex w-[calc(100%-20px)] max-w-[620px] items-center justify-between gap-2 rounded-[18px] bg-navy p-2 text-white shadow-[0_18px_40px_rgb(11_42_102/.35)] sm:bottom-4"
          >
            <button
              ref={viewRef}
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
              className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 text-left text-[15px] font-semibold hover:bg-white/10"
            >
              <ListChecks className="size-5 shrink-0 text-yellow" aria-hidden="true" />
              <span className="truncate">{summary(items)} — view list</span>
            </button>
            <Button asChild variant="yellow" className="px-4 sm:px-6">
              <a href={href} target="_blank" rel="noopener" onClick={onSend}>Send on WhatsApp</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-h-[85vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[560px]"
          // No DialogTrigger here, so return focus to the bar button ourselves (or the page if the list was cleared)
          onCloseAutoFocus={(e) => { e.preventDefault(); (viewRef.current ?? document.getElementById("main"))?.focus() }}
        >
          <DialogHeader className="sticky top-0 z-10 border-b bg-white px-6 pt-5 pb-4 text-left">
            <DialogTitle className="font-heading text-2xl font-extrabold text-ink">Your order list</DialogTitle>
            <DialogDescription>{items.length ? summary(items) : "Nothing added yet"}</DialogDescription>
          </DialogHeader>

          <ul className="px-6 py-2">
            {items.length === 0 && <li className="py-6 text-center text-muted-foreground">Your list is empty. Add products from any department.</li>}
            {items.map((it) => {
              const label = `${it.cat} ${it.size}`
              return (
                <li key={it.id} className="flex items-center justify-between gap-4 border-b py-3.5">
                  <div className="min-w-0">
                    <b className="block text-ink">{it.name}</b>
                    <span className="text-sm text-muted-foreground">{it.cat} · {it.size} · {it.dept}</span>
                  </div>
                  <Stepper qty={it.qty} label={label} className="shrink-0"
                    onDec={() => setQty(it, it.qty - 1)} onInc={() => setQty(it, it.qty + 1)} />
                </li>
              )
            })}
          </ul>

          <div className="grid gap-2 px-6 pt-2">
            <Label htmlFor="order-note">Note for our sales team (optional)</Label>
            <Textarea id="order-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Delivery city, preferred brand, deadline…" className="min-h-24 border-field" />
          </div>

          <div className="sticky bottom-0 flex flex-wrap justify-between gap-3 bg-white px-6 pt-4 pb-6">
            <Button
              variant="outline"
              disabled={!items.length}
              onClick={() => { if (confirm("Remove every item from your order list?")) { clear(); setOpen(false) } }}
            >
              Clear list
            </Button>
            <Button asChild variant="green" className="flex-1">
              <a href={href} target="_blank" rel="noopener" onClick={onSend}><WhatsAppIcon /> Send on WhatsApp</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
