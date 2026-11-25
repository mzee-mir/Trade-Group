import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

/* Order list: collect products across departments, send as one WhatsApp message.
   Saved in the browser (localStorage) so it survives page changes and reloads. */

export type OrderItem = { id: string; name: string; cat: string; size: string; dept: string; qty: number }

type OrderState = {
  items: OrderItem[]
  qtyOf: (id: string) => number
  setQty: (item: Omit<OrderItem, "qty">, qty: number) => void
  clear: () => void
  totalUnits: number
  /** Latest screen-reader announcement (one shared polite live region). */
  status: string
  announce: (msg: string) => void
}

const KEY = "tawfiiq-order"
const OrderContext = createContext<OrderState | null>(null)

const read = (): OrderItem[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") } catch { return [] }
}
const write = (items: OrderItem[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* private mode: keep in memory only */ }
}

export const summary = (items: OrderItem[]) => {
  const units = items.reduce((s, it) => s + it.qty, 0)
  return `${items.length} item${items.length === 1 ? "" : "s"} · ${units} unit${units === 1 ? "" : "s"}`
}

export const orderMessage = (items: OrderItem[], note: string) =>
  `Hello Tawfiiq, I'd like to order:\n${items
    .map((it, i) => `${i + 1}. ${it.qty} × ${it.name} — ${it.cat}, ${it.size} (${it.dept})`)
    .join("\n")}${note ? `\n\nNote: ${note}` : ""}`

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>(read)
  const [status, setStatus] = useState("")
  const itemsRef = useRef(items)
  itemsRef.current = items

  // Keep tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) setItems(read()) }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const setQty = useCallback((item: Omit<OrderItem, "qty">, qty: number) => {
    const prev = itemsRef.current
    const exists = prev.some((it) => it.id === item.id)
    const next =
      qty <= 0 ? prev.filter((it) => it.id !== item.id)
      : exists ? prev.map((it) => (it.id === item.id ? { ...it, qty } : it))
      : [...prev, { ...item, qty }]
    write(next)
    setItems(next)
    setStatus(qty > 0
      ? `${item.cat}, ${item.size}: ${qty} in your order list. ${summary(next)}.`
      : `${item.cat}, ${item.size} removed. ${next.length ? summary(next) : "Order list is empty"}.`)
  }, [])

  const clear = useCallback(() => { write([]); setItems([]); setStatus("Order list cleared.") }, [])

  const value = useMemo<OrderState>(() => ({
    items,
    qtyOf: (id) => items.find((it) => it.id === id)?.qty ?? 0,
    setQty,
    clear,
    totalUnits: items.reduce((s, it) => s + it.qty, 0),
    status,
    announce: setStatus,
  }), [items, setQty, clear, status])

  return (
    <OrderContext.Provider value={value}>
      {children}
      <div className="sr-only" role="status" aria-live="polite">{status}</div>
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>")
  return ctx
}
