import React from 'react'

import { Outlet } from 'react-router-dom'

export default function LayoutAuth() {

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Outlet />
    </div>
  )
}
