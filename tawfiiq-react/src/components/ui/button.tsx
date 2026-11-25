import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Tawfiiq buttons: pill shaped, 44px+ tall (touch-target minimum), brand variants.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition-all outline-none select-none hover:-translate-y-px hover:shadow-[0_8px_20px_rgb(11_42_102/.18)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        default: "bg-navy text-white",
        yellow: "bg-yellow text-navy",
        green: "bg-green text-white",
        white: "bg-white text-navy",
        outline: "border-field bg-white text-navy hover:bg-soft",
        ghost: "text-navy hover:bg-soft hover:shadow-none hover:translate-y-0",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-green underline underline-offset-4 hover:shadow-none hover:translate-y-0 rounded-none px-0",
      },
      size: {
        default: "min-h-11 px-6 text-[15px]",
        sm: "min-h-11 px-4 text-sm",
        lg: "min-h-12 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-11 hover:translate-y-0 hover:shadow-none", // used by dialog/sheet close buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
