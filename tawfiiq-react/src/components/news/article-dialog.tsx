import { useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { WhatsAppIcon } from "@/components/icons"
import { Photo } from "@/components/section"
import { useContent } from "@/content/content"
import type { Article } from "@/data/news"
import { waLink } from "@/data/site"
import { cn } from "@/lib/utils"

const PREFIX = "#article-"

/** Link that opens an article in the pop-up (keeps the current page underneath). */
export function ArticleLink({ article, className, children }: { article: Article; className?: string; children: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <Link to={{ pathname, hash: `article-${article.key}` }} state={{ article: true }} preventScrollReset className={className}>
      {children}
    </Link>
  )
}

/** Global article pop-up. Open state lives in the URL hash, so articles can be shared,
    and Back closes the pop-up instead of leaving the page. */
export function ArticleDialog() {
  const location = useLocation()
  const navigate = useNavigate()
  const key = location.hash.startsWith(PREFIX) ? location.hash.slice(PREFIX.length) : null
  const { news } = useContent()
  const article = news.find((a) => a.key === key)
  const openedInApp = (location.state as { article?: boolean } | null)?.article

  // Remember what had focus when the article opened (normally the card), to return to it on close.
  const returnTo = useRef<HTMLElement | null>(null)
  if (article && !returnTo.current && typeof document !== "undefined") {
    returnTo.current = document.activeElement as HTMLElement | null
  }

  useEffect(() => {
    if (!article) return
    const prev = document.title
    document.title = `${article.title} — Tawfiiq Group`
    return () => { document.title = prev }
  }, [article])

  const close = () => {
    if (openedInApp) navigate(-1) // step back out of the entry we added
    else navigate({ pathname: location.pathname, hash: "" }, { replace: true, preventScrollReset: true })
  }

  return (
    <Dialog open={!!article} onOpenChange={(o) => { if (!o) close() }}>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
          const el = returnTo.current
          returnTo.current = null
          if (el?.isConnected && el !== document.body) el.focus()
          else document.getElementById("main")?.focus()
        }}
        className={cn(
          "gap-0 overflow-y-auto p-0 sm:max-w-[760px] sm:rounded-3xl",
          "max-sm:h-dvh max-sm:max-h-dvh max-sm:w-screen max-sm:max-w-none max-sm:rounded-none",
          "sm:max-h-[90vh] [&>button:last-child]:size-11 [&>button:last-child]:rounded-full [&>button:last-child]:bg-white [&>button:last-child]:shadow-md",
        )}
      >
        {article && (
          <article>
            <Photo src={article.image} className="aspect-[2/1] w-full rounded-none border-0">{article.photo}</Photo>
            <div className="px-5 pt-6 pb-8 sm:px-10 sm:pt-7 sm:pb-9">
              <span className="text-[13px] text-muted-foreground">{article.date} · {article.cat}</span>
              <DialogTitle className="mt-2 mb-3.5 font-heading text-[clamp(26px,4vw,36px)] leading-tight font-extrabold text-ink">{article.title}</DialogTitle>
              <DialogDescription className="text-[19px] font-medium text-ink">{article.summary}</DialogDescription>
              <div className="mt-3.5 max-w-[62ch] space-y-3.5 text-[17px] leading-[1.7]">
                {article.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5 border-t pt-6">
                {article.link && (
                  <Button asChild className="max-sm:w-full">
                    <Link to={article.link[0]}>{article.link[1]} <ArrowRight /></Link>
                  </Button>
                )}
                <Button asChild variant="outline" className="max-sm:w-full">
                  <a href={waLink(`Hello Tawfiiq, I read "${article.title}" and would like to know more.`)} target="_blank" rel="noopener">
                    <WhatsAppIcon /> Ask about this on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  )
}
