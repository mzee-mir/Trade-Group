import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Wrap } from "@/components/section"

export function NotFoundPage() {
  return (
    <section className="py-24">
      <Wrap className="text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.12em] text-green uppercase">Page not found</p>
        <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold">We couldn't find that page.</h1>
        <p className="mx-auto mt-4 max-w-md">It may have moved. Try the home page, or ask our sales team on WhatsApp.</p>
        <Button asChild className="mt-8"><Link to="/">Back to the home page</Link></Button>
      </Wrap>
    </section>
  )
}
