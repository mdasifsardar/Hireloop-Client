import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority";
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[1.625rem] border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-[#5c53fe] focus-visible:ring-[3px] focus-visible:ring-[#5c53fe]/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-[oklch(0.704_0.191_22.216)]/20 aria-invalid:ring-[oklch(0.704_0.191_22.216)]/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[#5c53fe] text-[#ffffff] [a]:hover:bg-[#5c53fe]/80",
        secondary:
          "bg-[oklch(0.269_0_0)] text-[oklch(0.985_0_0)] [a]:hover:bg-[oklch(0.269_0_0)]/80",
        destructive:
          "bg-[oklch(0.704_0.191_22.216)]/20 text-[oklch(0.704_0.191_22.216)] focus-visible:ring-[oklch(0.704_0.191_22.216)]/40 [a]:hover:bg-[oklch(0.704_0.191_22.216)]/20",
        outline:
          "border-[#ffffff1a] text-[oklch(0.985_0_0)] [a]:hover:bg-[oklch(0.269_0_0)] [a]:hover:text-[oklch(0.708_0_0)]",
        ghost:
          "hover:bg-[oklch(0.269_0_0)]/50 hover:text-[oklch(0.708_0_0)]",
        link: "text-[#5c53fe] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps({
      className: cn(badgeVariants({ variant }), className),
    }, props),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants }
