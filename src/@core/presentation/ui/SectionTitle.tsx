import React, { FC } from 'react'

export const SectionTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children }) => {
  return (
    <h2 className='font-bold text-sm mb-1'>{children}</h2>
  )
}
