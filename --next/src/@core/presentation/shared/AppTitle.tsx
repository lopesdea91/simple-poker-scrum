import { cn } from '@core/framework/utils'
import React from 'react'

interface AppTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export default function AppTitle({ children, className, ...props }: AppTitleProps) {
  return (
    <h2
      className={cn('app-title mb-2', className)}
      {...props}
    >
      {children}
    </h2>
  )
}
