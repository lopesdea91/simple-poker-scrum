import React, { FC } from 'react'
import { cn } from 'src/@core/framework/lib/utils'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'

export const RoomsCreated: FC = () => {
  return (
    <section>
      <SectionTitle>Minhas salas:</SectionTitle>

      <div className='flex gap-3 p-2 mb-2'>
        <ButtonCreateRoom />
        <ButtonCreateRoom />
      </div>
    </section>
  )
}


const ButtonCreateRoom = () => {
  const createRoom = true

  const handleCreateRoom = () => {
    alert(' ... handleCreateRoom')
  }
  const handleOpenRoom = () => {
    alert(' ... handleOpenRoom')
  }

  return (
    <button
      className={cn(
        'flex min-h-24 flex-1 border-[1px]',
        'text-sm text-gray-500 uppercase font-thin',
        'border-gray-300 rounded-md shadow-md',
        'duration-200 hover:border-gray-400 hover:shadow-lg hover:text-gray-800 hover:font-normal'
      )}
      onClick={() => createRoom ? handleCreateRoom() : handleOpenRoom()}
    >
      <span className='m-auto'>
        {createRoom ? 'Criar Sala' : 'Sala X'}
      </span>
    </button>
  )
}