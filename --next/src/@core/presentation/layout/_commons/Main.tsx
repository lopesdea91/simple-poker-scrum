import React from 'react'
import { cn } from '@core/framework/utils'

interface MainProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Main({ className, children, ...props }: MainProps) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'rounded shadow shadow-gray-200 p-4',
        'min-h-[calc(100vh-50%)]',
      )}
    >
      {children}
    </div>
  )
}
