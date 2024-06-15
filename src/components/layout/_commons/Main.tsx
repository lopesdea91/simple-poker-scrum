import React from 'react'
import { cn } from 'lib/utils'
import { useStore } from 'hooks/useStore'

interface MainProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Main({ className, children, ...props }: MainProps) {
  const store = useStore()

  return (
    <div
      {...props}
      className={cn(
        className,
        'app-container shadow-sm duration-150',
        store.logged ? 'h-[calc(100vh-88px-12px)] shadow-gray-300' : 'h-[calc(100vh-88px-88px)]'
      )}
    >
      {children}
    </div>
  )
}
