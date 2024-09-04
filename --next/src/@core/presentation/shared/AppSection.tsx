import { cn } from '@core/framework/utils'
import React from 'react'

interface AppSectionProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function AppSection({ children, className, ...props }: AppSectionProps) {
  return (
    <div
      className={cn('app-section p-3 md:p-4 mb-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}
