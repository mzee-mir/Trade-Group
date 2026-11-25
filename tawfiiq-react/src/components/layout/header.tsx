import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { WhatsAppIcon } from "@/components/icons"
import { Wrap } from "@/components/section"
import { useContent } from "@/content/content"
import { waLink } from "@/data/site"
import { cn } from "@/lib/utils"

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/partners", label: "Partners" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
]

const navCls = ({ isActive }: { isActive: boolean }) =>
  cn("py-3 text-[15px] font-medium text-[#1a2235] transition-colors hover:text-green", isActive && "font-bold text-green")

function Brand() {
  return (
    <Link to="/" className="flex min-h-11 items-center gap-3" aria-label="Tawfiiq Group, home">
      <span aria-hidden="true" className="grid size-[42px] place-items-center rounded-[10px] bg-green font-heading text-xl font-extrabold text-white">T</span>
      <span className="leading-tight">
        <span className="block font-heading text-[19px] font-extrabold tracking-[-0.01em] text-navy">TAWFIIQ GROUP</span>
        <span className="hidden text-xs text-muted-foreground sm:block">General Trading · Since 1992</span>
      </span>
    </Link>
  )
}

export function Header() {
  const { departments } = useContent()
  const { pathname } = useLocation()
  const inDepartments = pathname.startsWith("/departments")
  const [open, setOpen] = useState(false)
  const quote = waLink("Hello Tawfiiq sales team, I'd like a quote.")

  return (
    <>
      <a href="#main" className="absolute -top-24 left-4 z-[100] rounded-lg bg-navy px-5 py-3 font-bold text-white focus:top-3 on-dark">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <Wrap className="flex h-[72px] items-center justify-between">
          <Brand />

          {/* Desktop */}
          <nav aria-label="Main" className="hidden items-center gap-6 min-[901px]:flex">
            {LINKS.slice(0, 2).map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={navCls}>{l.label}</NavLink>)}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navCls({ isActive: inDepartments }), "flex items-center gap-1 outline-none [&[data-state=open]>svg]:rotate-180")}>
                Departments <ChevronDown className="size-3.5 transition-transform" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl p-2">
                <DropdownMenuItem asChild className="min-h-11 rounded-lg px-3.5 font-bold text-navy">
                  <Link to="/#departments">All departments</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {departments.map((d) => {
                  const current = pathname === `/departments/${d.slug}`
                  return (
                    <DropdownMenuItem key={d.slug} asChild className={cn("min-h-11 rounded-lg px-3.5 text-[15px]", current && "bg-green-soft font-bold text-green")}>
                      <Link to={`/departments/${d.slug}`} aria-current={current ? "page" : undefined}>{d.name}</Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            {LINKS.slice(2).map((l) => <NavLink key={l.to} to={l.to} className={navCls}>{l.label}</NavLink>)}
            <Button asChild variant="yellow" size="sm" className="px-5">
              <a href={quote} target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp sales</a>
            </Button>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 min-[901px]:hidden">
            <a href={waLink("Hello Tawfiiq sales team")} target="_blank" rel="noopener" aria-label="Chat with sales on WhatsApp"
              className="grid size-11 place-items-center rounded-full bg-whatsapp text-white">
              <WhatsAppIcon className="size-[22px]" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu"><Menu className="size-6" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86%] overflow-y-auto px-6 pt-4">
                <SheetHeader className="px-0">
                  <SheetTitle className="font-heading text-navy">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </SheetHeader>
                <nav aria-label="Main" className="flex flex-col" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false) }}>
                  {LINKS.slice(0, 2).map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={(s) => cn(navCls(s), "border-b border-line")}>{l.label}</NavLink>)}
                  <p className="border-b border-line py-3 text-[15px] font-bold text-navy">Departments</p>
                  <ul className="border-b border-line py-1 pl-3">
                    {departments.map((d) => (
                      <li key={d.slug}>
                        <NavLink to={`/departments/${d.slug}`} className={({ isActive }) => cn("flex min-h-11 items-center text-[15px]", isActive ? "font-bold text-green" : "text-[#1a2235]")}>{d.name}</NavLink>
                      </li>
                    ))}
                  </ul>
                  {LINKS.slice(2).map((l) => <NavLink key={l.to} to={l.to} className={(s) => cn(navCls(s), "border-b border-line")}>{l.label}</NavLink>)}
                  <Button asChild variant="yellow" className="mt-5">
                    <a href={quote} target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp sales</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </Wrap>
      </header>
    </>
  )
}
