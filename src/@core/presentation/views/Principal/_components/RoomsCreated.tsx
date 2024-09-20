import React, { FC, FormEvent, forwardRef, useState } from 'react'

import { IRoom } from 'src/@core/domain/Room'
import { useToast } from 'src/@core/framework/hooks/toast'
import { cn } from 'src/@core/framework/lib/utils'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { geteway } from 'src/@core/infra/gateway'
import { Button } from 'src/@core/presentation/ui/Button'
import { Input } from 'src/@core/presentation/ui/Imput'
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

export const RoomsCreated: FC<{ rooms: IRoom[], isLogged: boolean }> = ({ rooms, isLogged }) => {
  const appStore = useAppStore()

  return (
    <section>
      <SectionTitle>Minhas salas:</SectionTitle>

      <div className='grid grid-cols-2 gap-3 p-2 mb-2'>
        {appStore.loading || !rooms.length
          ? (
            <>
              <RoomSkeleton />
              <RoomSkeleton />
            </>
          )
          : (
            <>
              <ButtonCreateRoom room={rooms[0] ?? null} />
              <ButtonCreateRoom room={rooms[1] ?? null} />
            </>
          )}
      </div>
    </section >
  )
}


const ButtonCreateRoom: FC<{ room: IRoom | null }> = ({ room }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const appStore = useAppStore()

  const toast = useToast()

  const createRoom = !room?.id

  const handleCreateRoom = () => {
    setModalOpen(true)
  }
  const handleSubmit = async (values: { name: string }) => {
    try {
      appStore.setLoading(true)

      await new Promise((res) => setTimeout(res, 500))

      !!room?.id
        ? await UpdateRoomService(geteway)({
          ...room,
          name: values.name
        })
        : await CreateRoomService(geteway)({
          name: values.name,
          ownerId: appStore.auth!.id
        })

      const messageToast = `Sala ${!!room?.id ? "atualziada" : 'criada'} com sucesso!`

      toast.success(messageToast)

    } catch (error) {
      toast.error(error)
    } finally {
      appStore.setLoading(false)
    }
  }

  return (
    <div>
      <Sheet open={modalOpen} onOpenChange={setModalOpen}>
        <SheetTrigger asChild>
          <ButtonTrigger className={cn(
            room ? 'text-gray-600 border-gray-300 shadow-md font-bold' : 'text-gray-400 underline'
          )}>
            {room ? room.name : 'Criar Sala'}
          </ButtonTrigger>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {createRoom ? 'Criar Sala' : 'Editar Sala'}
            </SheetTitle>

            <SheetDescription hidden>
              {createRoom ? 'Criar Sala' : 'Editar Sala'}
            </SheetDescription>

            <span className="block border-t-[1px] pb-4" />

            <FormRoom
              handleSubmit={handleSubmit}
              defaultValue={room?.name}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const ButtonTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'px-3 py-5 w-full min-h-24 border-[1px] uppercase leading-8 text-lg',
        'border-gray-200 rounded-md shadow-md',
        'duration-150 hover:border-gray-400 hover:shadow-lg hover:text-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

const FormRoom: FC<{
  handleSubmit: (values: { name: string }) => void
  defaultValue?: string
}> = ({ handleSubmit, ...props }) => {
  const appStore = useAppStore()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSubmit({ name: inputRef.current?.value ?? '' })
  }

  return (
    <form onSubmit={onSubmit} className='w-full'>
      <div className='flex flex-col gap-2 mb-3'>
        <Label htmlFor='name'>Nome</Label>
        <Input id='name' placeholder='Nome da sala' required ref={inputRef} disabled={appStore.loading} {...props} />
      </div>

      <div className="flex justify-end">
        <Button type='submit' size='sm' disabled={appStore.loading}>Salvar</Button>
      </div>
    </form>
  )
}