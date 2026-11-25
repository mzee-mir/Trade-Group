import { Suspense, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./header"
import { Footer, WhatsAppFloat } from "./footer"
import { OrderBar } from "@/components/order/order-bar"
import { useOrder } from "@/components/order/order-context"
import { ArticleDialog } from "@/components/news/article-dialog"

/** On page change: jump to the #hash target if there is one, otherwise to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash && !hash.startsWith("#article-")) {
      // The target may be on a page that's still loading: keep looking for up to ~2s.
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      let timer = 0
      const find = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ block: "start" })
        else if (tries++ < 40) timer = window.setTimeout(find, 50)
      }
      find()
      return () => clearTimeout(timer)
    }
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [pathname, hash])
  return null
}

const TITLES: Record<string, string> = {
  "/": "Tawfiiq Group — Quality goods, delivered nationwide",
  "/about": "About us — Tawfiiq Group",
  "/partners": "Partners & Projects — Tawfiiq Group",
  "/news": "News & Gallery — Tawfiiq Group",
  "/contact": "Branches & Contact — Tawfiiq Group",
}

export function Layout() {
  const { pathname } = useLocation()
  const { items } = useOrder()
  useEffect(() => { if (TITLES[pathname]) document.title = TITLES[pathname] }, [pathname])

  return (
    <div className={items.length ? "pb-24" : undefined}>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer full={pathname === "/"} />
      <WhatsAppFloat />
      <OrderBar />
      <ArticleDialog />
    </div>
  )
}
