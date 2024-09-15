import React from "react"

import { cn } from "src/@core/framework/lib/utils"

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-muted", className)}
      {...props}
    />
  )
}
