import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/ui/spotlight-card"
import { Photo } from "@/components/section"
import { Stepper } from "@/components/order/stepper"
import { useOrder } from "@/components/order/order-context"
import type { Department, Product } from "@/data/departments"
import { cn } from "@/lib/utils"

export function ProductCard({ dept, product, index }: { dept: Department; product: Product; index: number }) {
  const { qtyOf, setQty } = useOrder()
  const item = {
    id: `${dept.slug}-${index}`,
    name: product.name ?? "[PRODUCT NAME]",
    cat: product.cat,
    size: product.size,
    dept: dept.name,
  }
  const qty = qtyOf(item.id)
  const label = `${product.cat} ${product.size}`
  const incRef = useRef<HTMLButtonElement>(null)
  const addRef = useRef<HTMLButtonElement>(null)
  // After Add / last −, the button that had focus disappears; move focus to its replacement
  // once React has committed the swap.
  const focusNext = useRef<"inc" | "add" | null>(null)
  useEffect(() => {
    const target = focusNext.current === "inc" ? incRef.current : focusNext.current === "add" ? addRef.current : null
    focusNext.current = null
    target?.focus()
  }, [qty])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
    >
      <GlowCard
        className={cn(
          "flex h-full flex-col rounded-[20px] border border-line bg-white p-1.5 pb-3 shadow-card sm:p-2 sm:pb-5",
          qty > 0 && "border-green shadow-[0_0_0_1px_var(--color-green),var(--shadow-card)]",
        )}
      >
        <Photo src={product.image} alt={item.name === "[PRODUCT NAME]" ? `${product.cat}, ${product.size}` : item.name} className="aspect-square w-full rounded-xl p-2 text-[11px] sm:aspect-[4/3] sm:rounded-[14px] sm:text-[13px]">[PRODUCT PHOTO]</Photo>
        <div className="flex flex-1 flex-col px-1.5 pt-2.5 sm:px-3 sm:pt-[18px]">
          <span className="self-start rounded-full bg-green-soft px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-green uppercase sm:text-[11px]">{product.cat}</span>
          <h3 className="mt-2 font-sans text-[15px] font-bold tracking-[-0.01em] sm:mt-2.5 sm:text-[17px]">{item.name}</h3>
          <span className="text-xs text-muted-foreground sm:text-[13px]">{product.size}</span>
          {product.price
            ? <div className="mt-2 mb-2.5 font-heading text-[17px] font-extrabold text-green sm:text-xl">{product.price}</div>
            : <div className="mt-2 mb-2.5 text-[13px] font-semibold text-muted-foreground sm:text-[15px]">Price on request</div>}
          <div className="mt-auto">
            {qty === 0 ? (
              <Button
                ref={addRef}
                className="w-full px-2.5 text-[13px] sm:text-sm"
                onClick={() => { focusNext.current = "inc"; setQty(item, 1) }}
              >
                Add to order
              </Button>
            ) : (
              <Stepper
                ref={incRef}
                qty={qty}
                label={label}
                onInc={() => setQty(item, qty + 1)}
                onDec={() => {
                  if (qty - 1 <= 0) focusNext.current = "add"
                  setQty(item, qty - 1)
                }}
              />
            )}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
