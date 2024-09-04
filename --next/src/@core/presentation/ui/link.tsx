import * as React from "react"
import { Link as LinkRouterDom } from "react-router-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@core/framework/utils"

const linkVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm ring-offset-white transition-colors shadow-sm hover:shadow-md shadow-zinc-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300"
  ],
  {
    variants: {
      variant: {
        default: "bg-zinc-700 text-zinc-50 hover:bg-zinc-700/90 dark:bg-zinc-50 dark:text-zinc-700 dark:hover:bg-zinc-50/90",
        destructive:
          "bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-700 dark:text-stone-50 dark:hover:bg-red-700/90",
        outline:
          "border border-stone-200 bg-white hover:bg-stone-100 hover:text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        secondary:
          "bg-stone-100 text-stone-700 hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80",
        ghost: "hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-50",
        link: "text-stone-700 underline-offset-4 hover:underline dark:text-stone-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

export interface LinkProps
  extends React.RefAttributes<HTMLAnchorElement>,
  VariantProps<typeof linkVariants> {
  children: React.ReactNode
  to: string
  className?: string
  title?: string
  disabled?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, disabled, ...props }, ref) => {
    
    return disabled
      ? (
        <span
          className={cn(linkVariants({ variant, size, className }))}
          {...props}
        />
      )
      : (
        <LinkRouterDom
          className={cn(linkVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }
