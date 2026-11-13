import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority";
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[0.625rem] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[oklch(0.704_0.191_22.216)]/50 aria-invalid:ring-3 aria-invalid:ring-[oklch(0.704_0.191_22.216)]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[#5c53fe] text-[#ffffff] hover:bg-[#5c53fe]/80",
        outline:
          "border-[#ffffff26] bg-[#ffffff26]/30 hover:bg-[#ffffff26]/50 hover:text-[oklch(0.985_0_0)] aria-expanded:bg-[oklch(0.269_0_0)] aria-expanded:text-[oklch(0.985_0_0)]",
        secondary:
          "bg-[oklch(0.269_0_0)] text-[oklch(0.985_0_0)] hover:bg-[color-mix(in_oklch,oklch(0.269_0_0)_95%,oklch(0.985_0_0)_5%)] aria-expanded:bg-[oklch(0.269_0_0)] aria-expanded:text-[oklch(0.985_0_0)]",
        ghost:
          "hover:bg-[oklch(0.269_0_0)]/50 hover:text-[oklch(0.985_0_0)] aria-expanded:bg-[oklch(0.269_0_0)] aria-expanded:text-[oklch(0.985_0_0)]",
        destructive:
          "bg-[oklch(0.704_0.191_22.216)]/20 text-[oklch(0.704_0.191_22.216)] hover:bg-[oklch(0.704_0.191_22.216)]/30 focus-visible:border-[oklch(0.704_0.191_22.216)]/40 focus-visible:ring-[oklch(0.704_0.191_22.216)]/40",
        link: "text-[#5c53fe] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[0.5rem] px-2 text-xs in-data-[slot=button-group]:rounded-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[0.5rem] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[0.5rem] in-data-[slot=button-group]:rounded-[0.625rem] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[0.5rem] in-data-[slot=button-group]:rounded-[0.625rem]",
        "icon-lg": "size-9",
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
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
