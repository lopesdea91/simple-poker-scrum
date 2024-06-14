import React from 'react'
import { Link } from 'react-router-dom'

import AppTitle from 'components/AppTitle'
import AppSection from 'components/AppSection'
import { IRooms } from 'domain/Rooms'

export default function HomePage() {
  const rooms: IRooms[] = Array(20).fill('').map((_, index) => ({ id: String(index), name: `name ${index}` }))

  return (
    <>
      <AppSection>
        <AppTitle>Minhas Salas</AppTitle>

        <ul className='gap-3 grid sm:grid-cols-2 lg:grid-cols-3'>
          {rooms.map(room => (
            <Link
              key={room.id}
              className='text-lg font-thin p-2 rounded border-[1px] border-gray-100 cursor-pointer duration-300 hover:bg-gray-100'
              to={`/room/${room.id}`}
            >
              {room.name}
            </Link>
          ))}
        </ul>
      </AppSection>
    </>
  )
}
