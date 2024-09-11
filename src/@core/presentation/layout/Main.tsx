import React, { FC, ReactNode } from 'react'

export const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='p-2 mx-auto w-full max-w-screen-md'>{children}</div>
  )
}
