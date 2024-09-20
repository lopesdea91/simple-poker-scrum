import React, { forwardRef } from 'react'
import { cn } from 'src/@core/framework/lib/utils'

export const RoomBase = {
  Root: forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
    const { children, className, ...rest } = props
    return <button
      data-animate="animate-content"
      ref={ref}
      className={cn(
        'px-3 py-5 w-full min-h-24 border-[1px] uppercase leading-8 text-lg',
        'border-gray-200 rounded-md shadow-md',
        'duration-150 hover:border-gray-400 hover:shadow-lg hover:text-gray-800',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  }),
  Title: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => {
    return <div
      ref={ref}
      className={cn('truncate text-left text-lg text-gray-600 leading-8 uppercase font-bold', className)}
      {...rest}
    />
  }),
  Owner: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => {
    return <div
      ref={ref}
      className={cn('truncate text-left text-xs text-gray-400 leading-none -mt-1 mb-1', className)}
      {...rest}
    />
  }),
}

//   < ButtonTrigger className = {
//     cn(
//       room? 'text-gray-600 border-gray-300 shadow-md font-bold' : 'text-gray-400 underline'
//     )
//   } >
//     { room? room.name : 'Criar Sala'}
// </ButtonTrigger >