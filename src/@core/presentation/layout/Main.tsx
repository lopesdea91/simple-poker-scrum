import React, { FC, ReactNode, useEffect } from 'react'

export const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className='md:flex-1 md:overflow-hidden p-2 md:mx-auto md:w-full md:max-w-screen-md'>{children}</main>
  )
}
