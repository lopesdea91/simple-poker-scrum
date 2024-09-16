import React, { FC, FormEvent, useState } from 'react'

import { IRoom } from 'src/@core/domain/Room'
import { cn } from 'src/@core/framework/lib/utils'
import { useAppStore } from 'src/@core/framework/store/appStore'
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

export const RoomsCreated: FC = () => {
  const appStore = useAppStore()

  return (
    <section>
      <SectionTitle>Minhas salas:</SectionTitle>

      <div className='grid grid-cols-2 gap-3 p-2 mb-2'>
        <ButtonCreateRoom room={appStore.principal.myRooms?.[0] ?? null} />
        <ButtonCreateRoom room={appStore.principal.myRooms?.[1] ?? null} />
      </div>
    </section>
  )
}


const ButtonCreateRoom: FC<{ room: IRoom | null }> = ({ room }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const appStore = useAppStore()

  const createRoom = !room?.id

  const handleCreateRoom = () => {
    setModalOpen(true)
    console.log('...')
  }
  const handleOpenRoom = () => {
    alert(' ... handleOpenRoom')
  }
  const handleSubmit = async (values: { name: string }) => {

    try {
      appStore.setLoading(true)

      await new Promise((res) => setTimeout(res, 2000))

      console.log(' ... handleSubmit', values)
    } catch (error) {
      console.log(error)
    } finally {
      appStore.setLoading(false)
    }
  }

  return (
    <div>
      <Sheet open={modalOpen} onOpenChange={setModalOpen} >
        <SheetTrigger asChild>
          <button
            className={cn(
              'w-full  min-h-24 border-[1px]',
              'text-sm text-gray-500 uppercase font-thin',
              'border-gray-300 rounded-md shadow-md',
              'duration-150 hover:border-gray-400 hover:shadow-lg hover:text-gray-800 hover:font-normal'
            )}
            onClick={() => createRoom ? handleCreateRoom() : handleOpenRoom()}
          >
            {createRoom ? 'Criar Sala' : 'Sala X'}
          </button>
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