import { cn } from "cn"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-[0.5rem] bg-[oklch(0.269_0_0)]", className)}
      {...props}
    />
  )
}

export { Skeleton }
