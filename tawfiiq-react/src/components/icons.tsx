import type { SVGProps } from "react"
import type { Department } from "@/data/departments"

/** WhatsApp logo (Lucide has no brand icons). */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
    </svg>
  )
}

const DEPT_PATHS: Record<Department["icon"], string[]> = {
  food: ["M3 11h18a9 9 0 0 1-18 0Z", "M8 7c0-1.5 1-2 1-3M12 7c0-1.5 1-2 1-3M16 7c0-1.5 1-2 1-3"],
  build: ["M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", "M3 9.5h18M3 15h18M9 4v5.5M15 9.5V15M9 15v5"],
  oil: ["M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"],
  furniture: ["M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3", "M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v5H3Z", "M5 18v2M19 18v2"],
  bakery: ["M4 20h16M5 20v-6h14v6M8 14v-3h8v3M12 11V8M12 5v.5"],
}

export function DeptIcon({ icon, ...props }: { icon: Department["icon"] } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {DEPT_PATHS[icon].map((d) => <path key={d} d={d} />)}
    </svg>
  )
}
