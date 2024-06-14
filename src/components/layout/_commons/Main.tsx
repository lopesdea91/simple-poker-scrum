import React from 'react'
import { cn } from 'lib/utils'

interface MainProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Main({ className, children, ...props }: MainProps) {
  return (
    <div {...props} className={cn(className, 'app-container h-[calc(100vh-64px-24px-12px)] shadow-sm shadow-gray-300')}>
      {children}
    </div>
  )
}
