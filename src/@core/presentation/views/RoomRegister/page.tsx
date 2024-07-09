import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IRoom } from '@core/domain/Rooms'
import roomsApi from '@core/infra/api/rooms'
import geteway from '@core/infra/gateway'
import { useAuth } from '@core/framework/hooks/useAuth'
import { useStore } from '@core/framework/hooks/useStore'
import AppSection from '@core/presentation/shared/AppSection'
import { Input } from '@core/presentation/ui/input'
import { Label } from '@core/presentation/ui/label'
import { Link } from '@core/presentation/ui/link'
import { Button } from '@core/presentation/ui/button'
import delay from '@core/utils/delay'

import { useFormFields } from './page.hook'

export default function RoomRegisterPage() {
  const isMounted = useRef(false)
  const [currentRoom, setCurrentRoom] = useState<Partial<IRoom>>({})

  const navigate = useNavigate()

  const auth = useAuth()
  const store = useStore()
  const { id: currentId } = useParams<{ id: string }>()

  const formData = useFormFields()
  const isEdit = !!formData.values.id

  const handleSubmit = async () => {
    try {
      const { values } = formData

      const body: Omit<IRoom, 'id'> = {
        name: values.name,
        roomInGame: currentRoom.roomInGame!,
        roomLogs: currentRoom.roomLogs!,
        roomShowCards: currentRoom.roomShowCards!,
        players: currentRoom.players!,
        playersPending: currentRoom.playersPending!,
        playersVisiting: currentRoom.playersVisiting!,
        userOwnerId: String(isEdit ? currentRoom.userOwnerId! : store.user.uid!),
        userPlayersIds: isEdit ? currentRoom.userPlayersIds! : [store.user.uid!],
      }
      isEdit
        ? await roomsApi(geteway).update(values.id, body)
        : await roomsApi(geteway).create(body)

      alert(isEdit ? 'Sala atualizada com sucesso!' : 'Sala criada com sucesso!')

      navigate('/rooms')
    } catch (error) {
      console.log('... onsubmit error', (error as Error).message);
    }
  }

  const getData = async () => {
    try {
      store.setLoading(true)

      await delay(250)

      const room = await roomsApi(geteway).getId(currentId!)

      if (!room) {
        navigate('/rooms?code=204')
        return
      }
      if (room.userOwnerId !== store.getUserId()) {
        navigate('/rooms?code=401')
        return
      }

      formData.setValue('id', room.id)
      formData.setValue('name', room.name)

      setCurrentRoom({
        roomInGame: room.roomInGame,
        roomShowCards: room.roomShowCards,
        players: room.players,
        playersPending: room.playersPending,
        playersVisiting: room.playersVisiting,
        userOwnerId: room.userOwnerId,
        userPlayersIds: room.userPlayersIds,
      })
    } catch (error) {
      console.log('... getData error', (error as Error).message);
    } finally {
      store.setInitialApp(false)
    }
  }

  useEffect(() => {
    auth.isAuthenticated()

    if (!isMounted.current && currentId !== 'new') {
      getData()
    }
    return () => {
      isMounted.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <form
        onSubmit={formData.handleSubmit(handleSubmit)}
        className=''
      >
        <AppSection>
          <span className='inline-block text-lg mb-2'>Sala</span>

          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            <Input.Root>
              <Label htmlFor='name'>Nome da sala</Label>
              <Input.Content
                id="name"
                value={formData.values?.name}
                onChange={(e) => formData.setValue('name', e.target.value)}
                disabled={store.loading}
              />
              <Input.Error>{formData.errors.name?.message}</Input.Error>
            </Input.Root>
          </div>
        </AppSection>

        <div className='flex justify-end gap-1'>
          <Link to='/rooms' variant='outline' disabled={store.loading}>
            {isEdit ? 'Cancelar' : 'Voltar'}
          </Link>
          <Button type='submit' disabled={store.loading}>
            {isEdit ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  )
}

