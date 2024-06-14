import { cn } from 'lib/utils'
import React from 'react'

interface AppSectionProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function AppSection({ children, className, ...props }: AppSectionProps) {
  return (
    <div
      className={cn(className, 'app-section')}
      {...props}
    >
      {children}
    </div>
  )
}
