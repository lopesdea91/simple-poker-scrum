import React from 'react'

export const Header = () => {
  return (
    <header className='mb-3 md:mb-5 mx-3'>
      <div className='p-2 mx-auto w-full max-w-screen-md border-b-[1px] shadow-sm flex items-center justify-between'>
        <h1 className='text-xs text-sky-900 font-bold m-0 p-0 leading-0'>SIMPLE-POKER</h1>

        <button>LOGIN</button>
      </div>
    </header>
  )
}
