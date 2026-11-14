import * as React from "react"
import { cn } from "cn"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-[0.625rem] border border-[#ffffff26] bg-[#ffffff26]/30 px-2.5 py-2 text-base transition-colors outline-none placeholder:text-[oklch(0.708_0_0)] focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/50 disabled:cursor-not-allowed disabled:bg-[#ffffff26]/80 disabled:opacity-50 aria-invalid:border-[oklch(0.704_0.191_22.216)]/50 aria-invalid:ring-[oklch(0.704_0.191_22.216)]/40 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
