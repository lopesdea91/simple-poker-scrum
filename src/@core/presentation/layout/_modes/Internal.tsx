import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../_commons/Header'
import Main from '../_commons/Main'

export default function LayoutInternal() {
  return (
    <div className='mx-auto max-w-screen-md h-screen'>
      <Header />

      <Main>
        <Outlet />
      </Main>
    </div>
  )
}