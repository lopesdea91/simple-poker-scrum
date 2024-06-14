import React, { ReactNode, useEffect, useRef } from 'react'
import Header from './_commons/Header'
import Main from './_commons/Main'

export default function Layout({ children }: { children: ReactNode }) {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current)
      console.log('render layout')

  }, [])

  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
    </>
  )
}
