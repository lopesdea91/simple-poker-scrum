import React, { FC } from 'react'
import { cn } from 'src/@core/framework/lib/utils'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'

export const Rooms: FC = () => {
  const items = Array(10).fill(1).map((_, i) => i + 1)

  return (
    <section className='flex-1'>
      <SectionTitle>Outras salas:</SectionTitle>

      <RoomWrapper>
        {items.map(i => (
          <Room key={i} />
        ))}
      </RoomWrapper>
    </section>
  )
}

const RoomWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 overflow-auto'>{children}</div>
}

const Room: FC = () => {
  return (
    <button className={
      cn(
        'px-3 py-5 border-[1px]',
        'border-gray-200 rounded-md shadow-md',
        'duration-200 hover:border-gray-400 hover:shadow-lg hover:text-gray-800 hover:font-normal'
      )
    }
      onClick={() => { }}
    >
      <div className='truncate text-left text-xs leading-none text-gray-400'>Anderson Lopes</div>
      <div className='truncate text-left text-lg leading-8'>Lorem ipsum dolor sit amet.</div>
    </button >
  )
}