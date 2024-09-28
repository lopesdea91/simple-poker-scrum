import React, { FC, FormEvent, forwardRef, useState } from 'react'

import { IRoom } from 'src/@core/domain/Room'
import { useToast } from 'src/@core/framework/hooks/toast'
import { cn } from 'src/@core/framework/lib/utils'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { geteway } from 'src/@core/infra/gateway'
import { Button } from 'src/@core/presentation/ui/Button'
import { Input, InputControl } from 'src/@core/presentation/ui/Input'
import { Label } from 'src/@core/presentation/ui/Label'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'src/@core/presentation/ui/Sheet'
import { RoomSkeleton } from 'src/@core/presentation/ui_shared/Skeleton'
import { CreateRoomService } from 'src/@core/services/CreateRoomService'
import { UpdateRoomService } from 'src/@core/services/UpdateRoomService'
import { sleep } from 'src/@core/utils/sleep'

export const RoomsByUser: FC<{ rooms: IRoom[], isLogged: boolean }> = ({ rooms, isLogged }) => {
  const appStore = useAppStore()

  return (
    <section
      className={cn(
        'px-2 bg-gray-50 overflow-hidden duration-150',
        'border-[1px] ',
        isLogged ? "h-[155px] opacity-100 border-gray-300 mb-4 py-2" : 'h-0 opacity-0 border-transparent'
      )}
    >
      <SectionTitle>Minhas salas:</SectionTitle>

      <RoomWrapper>
        {appStore.loading && (
          <>
            <RoomSkeleton />
            <RoomSkeleton />
          </>
        )}

        {!appStore.loading && (
          <>
            <RoomManageRegister room={rooms[0] ?? null} />
            <RoomManageRegister room={rooms[1] ?? null} />
          </>
        )}
      </RoomWrapper>
    </section >
  )
}
const RoomWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className='grid grid-cols-2 gap-2 p-2 overflow-auto'>{children}</div>
}

interface IRoomManageRegister {
  room: IRoom | null
}
const RoomManageRegister: FC<IRoomManageRegister> = ({ room }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const createRoom = !room?.id

  return (
    <Sheet open={modalOpen} onOpenChange={setModalOpen}>
      <SheetTrigger asChild>
        <ButtonTrigger
          onClick={() => setModalOpen(p => !p)}
          className={cn(
            room?.name ? 'text-gray-600 border-gray-300 shadow-md font-bold' : 'text-gray-400 underline'
          )}
        >
          {room?.name ? room?.name : 'Criar Sala'}
        </ButtonTrigger>
      </SheetTrigger>

      <SheetContent>
        <SheetDescription />

        <SheetTitle className="block border-b-[1px] pb-2 mb-4">
          {createRoom ? 'Criar Sala' : 'Editar Sala'}
        </SheetTitle>

        <RoomManageRegisterContent room={room} />
      </SheetContent>
    </Sheet>
  )
}

interface IButtonTrigger extends HTMLButtonElement {
  /** */
}
const ButtonTrigger = forwardRef<IButtonTrigger, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'px-3 py-5 w-full min-h-24 border-[1px] uppercase leading-8 text-lg',
        'bg-white border-gray-200 rounded-md shadow-md',
        'duration-150 hover:border-gray-400 hover:shadow-lg hover:text-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

interface IRoomManageRegisterContent {
  room?: IRoom | null
}
const RoomManageRegisterContent: FC<IRoomManageRegisterContent> = (
  { room }
) => {
  const appStore = useAppStore()

  const toast = useToast()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      appStore.setDisabled(true)

      const name: string = inputRef.current?.value ?? ''

      await sleep(500)

      !!room?.id
        ? await UpdateRoomService(geteway)({
          ...room,
          name
        })
        : await CreateRoomService(geteway)({
          name,
          ownerId: appStore.auth!.id
        })

      const messageToast = `Sala ${!!room?.id ? "atualizada" : 'criada'} com sucesso!`

      toast.success(messageToast)

    } catch (error) {
      toast.error(error)
    } finally {
      appStore.setDisabled(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='w-full'>
      <InputControl>
        <Label htmlFor='name'>Nome</Label>
        <Input id='name' placeholder='Nome da sala' required ref={inputRef} disabled={appStore.disabled} defaultValue={room?.name} />
      </InputControl>

      <div className="flex justify-end p-2">
        <Button type='submit' size='sm' disabled={appStore.disabled}>Salvar</Button>
      </div>
    </form>
  )
}