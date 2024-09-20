import React, { FC } from 'react'
import { IRoom } from 'src/@core/domain/Room'
import { cn } from 'src/@core/framework/lib/utils'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'
import { RoomSkeleton } from 'src/@core/presentation/ui_shared/Skeleton'

export const Rooms: FC<{ rooms: IRoom[], isLogged: boolean }> = ({ rooms, isLogged }) => {
  const appStore = useAppStore()

  const title = isLogged ? 'Outras salas' : 'Salas'

  return (
    <section className='flex-1'>
      <SectionTitle>{title}:</SectionTitle>

      <RoomWrapper>
        {appStore.loading || !rooms.length
          ? (
            <>
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
            </>
          ) : (
            rooms.map(room =>
              <Room key={room.id} {...room} />
            )
          )}
      </RoomWrapper>
    </section >
  )
}

const RoomWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 overflow-auto'>{children}</div>
}
const Room: FC<IRoom> = ({ name, ownerId }) => {
  const appStore = useAppStore()

  const ownerName = appStore.principal.users.find(user => user.id === ownerId)!.displayName

  return (
    <button
      className={cn(
        'px-3 py-5 w-full min-h-24 border-[1px]',
        'border-gray-200 rounded-md shadow-md',
        'duration-150 hover:border-gray-400 hover:shadow-lg hover:text-gray-800',
      )}
      onClick={() => {
        alert("em breve!")
      }}
    >
      <div className='truncate text-left text-xs text-gray-400 leading-none -mt-1 mb-1'>{ownerName}</div>
      <div className='truncate text-left text-lg text-gray-600 leading-8 uppercase font-bold'>{name}</div>
    </button >
  )
}