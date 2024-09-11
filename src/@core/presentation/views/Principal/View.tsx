import React from 'react'
import { RoomsCreated } from './_components/RoomsCreated'
import { Rooms } from './_components/Rooms'
import { Users } from './_components/Users'

export const PrincipalView = () => {
  return (
    <div className='sm:flex sm:gap-2'>
      <div className='shadow-md sm:flex-[2.5]'>
        <RoomsCreated />
        <Rooms />
      </div>
      <div className='shadow-md sm:flex-1'>
        <Users />
      </div>
    </div>
  )
}
