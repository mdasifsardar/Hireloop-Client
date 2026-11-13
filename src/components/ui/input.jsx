import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-[0.625rem] border border-[#ffffff26] bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[oklch(0.985_0_0)] placeholder:text-[oklch(0.708_0_0)] focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#ffffff26]/50 disabled:opacity-50 aria-invalid:border-[oklch(0.704_0.191_22.216)] aria-invalid:ring-3 aria-invalid:ring-[oklch(0.704_0.191_22.216)]/20 md:text-sm bg-[#ffffff26]/30 disabled:bg-[#ffffff26]/80 aria-invalid:border-[oklch(0.704_0.191_22.216)]/50 aria-invalid:ring-[oklch(0.704_0.191_22.216)]/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
