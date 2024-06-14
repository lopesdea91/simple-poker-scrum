import { cn } from 'lib/utils'
import React from 'react'

interface AppTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export default function AppTitle({ children, className, ...props }: AppTitleProps) {
  return (
    <h2
      className={cn(className, 'app-title')}
      {...props}
    >
      {children}
    </h2>
  )
}
