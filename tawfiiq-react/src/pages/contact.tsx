import { useState, type FormEvent } from "react"
import { useLocation } from "react-router-dom"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppIcon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { Eyebrow, H2, Wrap } from "@/components/section"
import { useContent } from "@/content/content"
import { waLink } from "@/data/site"
import { cn } from "@/lib/utils"

type Field = "name" | "phone"
const RULES: Record<Field, (v: string) => string> = {
  name: (v) => (v.trim().length >= 2 ? "" : "Enter your full name."),
  phone: (v) => (v.replace(/\D/g, "").length >= 7 ? "" : "Enter a phone or WhatsApp number with at least 7 digits."),
}

function EnquiryForm() {
  const { departments, site } = useContent()
  const EMAIL = site.email
  const TOPICS = [...departments.map((d) => d.name), "Partnership / supplier"]
  const [values, setValues] = useState({ name: "", phone: "", city: "", department: TOPICS[0], message: "" })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null)

  const set = (k: keyof typeof values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (k in RULES && errors[k as Field]) setErrors((e) => ({ ...e, [k]: RULES[k as Field](v) })) // re-check once flagged
  }
  const check = (k: Field) => setErrors((e) => ({ ...e, [k]: RULES[k](values[k]) }))

  const validate = () => {
    const next = { name: RULES.name(values.name), phone: RULES.phone(values.phone) }
    setErrors(next)
    const bad = (Object.keys(next) as Field[]).filter((k) => next[k])
    if (bad.length) {
      setNote({ ok: false, text: `Please fix the highlighted field${bad.length > 1 ? "s" : ""}.` })
      document.getElementById(`f-${bad[0]}`)?.focus()
    }
    return !bad.length
  }
  const message = () =>
    `Enquiry from ${values.name} (${values.phone}${values.city ? ", " + values.city : ""})\nDepartment: ${values.department}\n\n${values.message}`
  const done = (how: string) => setNote({ ok: true, text: `Thanks — ${how} is opening with your enquiry. If nothing opens, call +252 907 090 025.` })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    window.open(waLink(message()), "_blank", "noopener")
    done("WhatsApp")
  }
  const onEmail = () => {
    if (!validate()) return
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${values.department}`)}&body=${encodeURIComponent(message())}`
    done("your email app")
  }

  const req = <span className="text-destructive" aria-hidden="true">*</span>
  const err = (k: Field) => errors[k] && <p id={`e-${k}`} className="mt-1.5 text-sm font-semibold text-destructive">⚠ {errors[k]}</p>
  const field = "h-12 rounded-xl border-field bg-white px-4 text-base md:text-base aria-invalid:border-2"

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-[18px]">
      <p className="text-sm text-muted-foreground">Fields marked {req} are required.</p>
      <div className="grid gap-2">
        <Label htmlFor="f-name">Full name {req}</Label>
        <Input id="f-name" autoComplete="name" required value={values.name} onChange={(e) => set("name")(e.target.value)} onBlur={() => values.name && check("name")}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} className={field} />
        {err("name")}
      </div>
      <div className="grid gap-[18px] sm:grid-cols-2 sm:gap-4">
        <div className="grid content-start gap-2">
          <Label htmlFor="f-phone">Phone / WhatsApp {req}</Label>
          <Input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={(e) => set("phone")(e.target.value)} onBlur={() => values.phone && check("phone")}
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} className={field} />
          {err("phone")}
        </div>
        <div className="grid content-start gap-2">
          <Label htmlFor="f-city">City</Label>
          <Input id="f-city" autoComplete="address-level2" value={values.city} onChange={(e) => set("city")(e.target.value)} className={field} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="f-dept">Department</Label>
        <Select value={values.department} onValueChange={set("department")} name="department">
          <SelectTrigger id="f-dept" className={cn(field, "w-full data-[size=default]:h-12")}><SelectValue /></SelectTrigger>
          <SelectContent>{TOPICS.map((t) => <SelectItem key={t} value={t} className="min-h-11">{t}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="f-msg">Message</Label>
        <Textarea id="f-msg" value={values.message} onChange={(e) => set("message")(e.target.value)} className="min-h-28 rounded-xl border-field px-4 py-3 text-base md:text-base" />
      </div>
      <div className="grid gap-2.5">
        <Button type="submit" size="lg" className="w-full"><WhatsAppIcon /> Send enquiry on WhatsApp</Button>
        <Button type="button" variant="outline" className="w-full" onClick={onEmail}>No WhatsApp? Send by email</Button>
      </div>
      <p role="status" className={cn("min-h-[1.2em] text-[15px] font-semibold", note?.ok ? "text-green" : "text-destructive")}>{note?.text}</p>
    </form>
  )
}

export function ContactPage() {
  const { offices: OFFICES, site } = useContent()
  const { email: EMAIL, whatsapp: WHATSAPP } = site
  const { hash } = useLocation()
  const target = hash.slice(1)
  const item = "flex items-start gap-4"
  const ic = "grid size-10 shrink-0 place-items-center rounded-[10px] bg-navy-3 text-yellow"

  return (
    <>
      <section className="pt-14 pb-10 sm:pt-[72px]">
        <Wrap>
          <Eyebrow>Contact us</Eyebrow>
          <h1 className="text-[clamp(42px,6.5vw,80px)] font-extrabold tracking-[-0.045em]">Talk to the right office.</h1>
          <p className="mt-[18px] max-w-[620px] text-lg">Seven offices in five countries. For the fastest answer, message our sales team on WhatsApp.</p>
        </Wrap>
      </section>

      <section className="pb-14 sm:pb-[88px]">
        <Wrap className="grid gap-5 min-[901px]:grid-cols-2">
          <Reveal className="on-dark dots flex flex-col rounded-[28px] bg-navy p-6 text-white sm:p-10">
            <span className="self-start rounded-full bg-yellow px-3 py-1 text-xs font-extrabold tracking-[0.1em] text-navy">HEADQUARTERS</span>
            <h2 className="mt-2.5 mb-6 text-[34px] font-extrabold text-white">Bosaso, Somalia</h2>
            <ul className="grid gap-[18px] text-base">
              <li className={item}><span className={ic}><MapPin className="size-[18px]" /></span><div className="pt-2">Gaaca area, Bosaso</div></li>
              <li className={item}><span className={ic}><Phone className="size-[18px]" /></span><div className="pt-2"><a href={`tel:+${WHATSAPP}`} className="hover:underline">+252 907 090 025</a> (WhatsApp)<br />Office: +2525 825055 / 825056</div></li>
              <li className={item}><span className={ic}><Mail className="size-[18px]" /></span><div className="pt-2"><a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a><br /><a href="mailto:HQBossaso@tawfiiqgroup.com" className="hover:underline">HQBossaso@tawfiiqgroup.com</a></div></li>
              <li className={item}><span className={ic}><Clock className="size-[18px]" /></span><div className="pt-2">[OPENING HOURS]</div></li>
            </ul>
            <div className="mt-7 mb-[22px] min-h-[200px] flex-1 overflow-hidden rounded-[14px] border border-dashed border-white/25 bg-navy-2">
              <iframe title="Map of Bosaso" loading="lazy" src="https://www.google.com/maps?q=Bosaso,+Somalia&output=embed" className="size-full min-h-[200px] border-0" />
            </div>
            <Button asChild variant="yellow" className="w-full"><a href={waLink("Hello Tawfiiq sales team")} target="_blank" rel="noopener">Chat with sales on WhatsApp</a></Button>
          </Reveal>

          <Reveal delay={0.08} className="scroll-mt-24 rounded-[28px] border border-line p-6 sm:p-10" id="enquiry">
            <h2 className="text-[32px] font-extrabold">Send an enquiry</h2>
            <p className="mt-3 mb-5">Wholesale orders, partnerships or supplier enquiries. We reply within one working day.</p>
            <EnquiryForm />
          </Reveal>
        </Wrap>
      </section>

      <section id="offices" className="scroll-mt-20 pb-14 sm:pb-[88px]">
        <Wrap>
          <H2>Our offices</H2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <div key={o.id} id={`office-${o.id}`}
                className={cn("scroll-mt-24 rounded-[20px] border border-line px-7 py-[26px] transition-shadow",
                  target === `office-${o.id}` && "border-green shadow-[0_0_0_3px_var(--color-green-soft),var(--shadow-lift)]")}>
                <small className="text-xs font-bold tracking-[0.12em] text-green uppercase">{o.country}{o.sourcing && " · Sourcing"}</small>
                <h3 className="mt-1 mb-1.5 text-[22px] font-bold">{o.name}</h3>
                <p className="text-[15px] text-muted-foreground">
                  {o.address ?? "[ADDRESS]"}<br />
                  {o.phone ? <a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">{o.phone}</a> : "[PHONE]"}
                  {" · "}
                  {o.email ? <a href={`mailto:${o.email}`} className="hover:underline">{o.email}</a> : "[EMAIL]"}
                </p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  )
}
