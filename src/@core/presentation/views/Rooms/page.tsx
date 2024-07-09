import { useEffect, useMemo, useRef, useState } from 'react'

import { IRoom } from '@core/domain/Rooms'
import roomsApi from '@core/infra/api/rooms'
import geteway from '@core/infra/gateway'
import { useStore } from '@core/framework/hooks/useStore'
import { useAuth } from '@core/framework/hooks/useAuth'
import AppTitle from '@core/presentation/shared/AppTitle'

import { RoomList } from './_components/RoomList'
import { RoomItem } from './_components/RoomItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@core/presentation/ui/link'

export default function RoomsPage() {
  const isMounted = useRef(false)

  const auth = useAuth()
  const store = useStore()

  const [rooms, setRooms] = useState<IRoom[]>([])

  const dataPage = useMemo(() => {
    const myRooms = rooms.filter(room => room?.userOwnerId === store.user.uid)
    const otherRooms = rooms.filter(room => room?.userOwnerId !== store.user.uid)

    return [
      {
        title: 'Minhas Salas',
        showButtonAdd: true,
        messageLoading: 'Buscando salas ...',
        messageEmptyRooms: !myRooms.length ? 'Você não possui salas ainda' : null,
        rooms: myRooms
      },
      {
        title: 'Salas Disponíveis',
        showButtonAdd: false,
        messageLoading: 'Buscando salas ...',
        messageEmptyRooms: !otherRooms.length ? 'Não foi encontrado outras salas no momento' : null,
        rooms: otherRooms
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms])

  useEffect(() => {
    auth.isAuthenticated()

    if (isMounted.current) return

    roomsApi(geteway).syncList(async (data) => {
      try {
        store.setLoading(true)

        // await delay(250)

        setRooms(data)

      } catch (error) {
        console.log('... error', (error as Error).message);
      } finally {
        store.setLoading(false)
      }
    })

    return () => {
      isMounted.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {dataPage.map(data => (
        <div key={data.title}>
          <div className="flex items-center mb-2">
            <AppTitle className='mb-0'>{data.title}</AppTitle>

            {data.showButtonAdd && (
              <Link to='/room-register/new' variant="outline" size='sm' className='ml-auto shadow-none border-0'>
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            )}
          </div>

          <RoomList
            className='mb-6'
            loading={store.loading ? data.messageLoading : null}
            message={data.messageEmptyRooms}
          >
            {data.rooms.map(room => <RoomItem key={`${data.title}-${room.id}`} room={room} />)}
          </RoomList>
        </div>
      ))}
    </>
  )
}
