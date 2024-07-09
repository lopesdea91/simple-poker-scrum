/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useMemo } from 'react'
import { faCopy, faDice, faEdit, faEnvelope, faHourglassHalf, faRightToBracket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRoom } from '@core/domain/Rooms'
import { Button } from '@core/presentation/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@core/framework/utils'
import roomsApi from '@core/infra/api/rooms'
import geteway from '@core/infra/gateway'
import { useStore } from '@core/framework/hooks/useStore'

interface RoomItemProps {
  room: IRoom
}
export const RoomItem: FC<RoomItemProps> = ({ room }) => {
  return (
    <RoomItemWrapper>
      <RoomItemTitle name={room.name} />
      <RoomItemIconGame status={room.roomInGame === 1} />
      <RoomItemActions room={room} />
    </RoomItemWrapper>
  )
}

interface RoomItemActionsProps {
  room: IRoom
}
const RoomItemActions: FC<RoomItemActionsProps> = ({ room }) => {
  const location = useLocation()
  const navigate = useNavigate()

  

  const store = useStore()
  const user = store.user

  const userIsParticipant = useMemo<boolean>(() => {
    return !![...room.playersPending, ...room.playersVisiting, ...room.players].find(e => e.uid === user.uid!)
  }, [room])

  const userIsOwnerRoom = useMemo<boolean>(() => {
    return room.userOwnerId === user.uid!
  }, [room])

  const userIsPendingInvite = useMemo<boolean>(() => {
    return !!room.playersPending.find(data => data.uid === user.uid!)
  }, [room])

  const showButtonCopy = useMemo<boolean>(() => {
    return userIsOwnerRoom || userIsParticipant ? true : false
  }, [userIsOwnerRoom, userIsParticipant])

  // const userIsParticipant: boolean = !![...room.playersPending, ...room.playersVisiting, ...room.players].find(e => e.uid === user.uid!)

  // const userIsOwnerRoom: boolean = room.userOwnerId === user.uid!

  // const userIsPendingInvite: boolean = !!room.playersPending.find(data => data.uid === user.uid!)

  // const showButtonCopy: boolean = userIsOwnerRoom || userIsParticipant ? true : false


  const handleClickEnterRoom = () => {
    navigate(`/room/${room.id}`)
  }
  const handleClickEditRoom = () => {
    navigate(`/room-register/${room.id}`)
  }
  const handleClickDeleteRoom = async () => {
    const confirmEvent = window.confirm("Esta é uma ação irreversível, deseja continuar?")

    if (!confirmEvent) return

    try {
      await roomsApi(geteway).delete(room.id)

      window.alert('Sala removida com sucesso!')

    } catch (error) {
      console.log('... handleClickDeleteRoom error', (error as Error).message);
    }
  }
  const handleClickSendInvite = async () => {
    try {
      const userData = {
        uid: user.uid!,
        displayName: user.displayName!,
        photoURL: user.photoURL!
      }
      const playersPending: IRoom['playersPending'] = [
        ...room.playersPending,
        userData
      ]
      const userPlayersIds: IRoom['userPlayersIds'] = [
        ...room.userPlayersIds,
        userData.uid
      ]
      const body: Omit<IRoom, 'id'> = {
        ...room,
        playersPending,
        userPlayersIds,
      }
      await roomsApi(geteway).update(room.id, body)

      window.alert('Convite enviado, agora aguarde!')

      // navigate('/rooms')
    } catch (error) {
      console.log('... onsubmit error', (error as Error).message);
    }
  }
  const handleClickCopy = async () => {
    await window.navigator.clipboard.writeText(window.location.origin +'/room/'+ room.id);
    alert("Copied");
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        {userIsPendingInvite && (
          <Button variant='outline' size="sm" className='h-min py-1 px-2 text-gray-600 border-gray-100 hover:bg-transparent' title="Convite pendente">
            <FontAwesomeIcon icon={faHourglassHalf} />
          </Button>
        )}

        {(!userIsPendingInvite && (userIsParticipant || userIsOwnerRoom)) && (
          <Button variant='outline' size="sm" className='h-min py-1 px-2 text-gray-600 border-gray-100' title="Entrar na sala" onClick={handleClickEnterRoom}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </Button>
        )}

        {(!userIsPendingInvite && showButtonCopy) && (
          <Button variant='outline' size="sm" className='h-min py-1 px-2 text-gray-600 border-gray-100' title="Copiar endereço da sala" onClick={handleClickCopy}>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        )}

        {room.userOwnerId !== user.uid && !userIsParticipant && (
          <Button variant='outline' size="sm" className='h-min py-1 px-2 text-gray-600 border-gray-100' title="Enviar convite para ter acesso" onClick={handleClickSendInvite}>
            <FontAwesomeIcon icon={faEnvelope} />
          </Button>
        )}

        {userIsOwnerRoom && (
          <>
            <Button
              variant='outline'
              size="sm"
              className='h-min py-1 px-2 text-gray-600 border-gray-100'
              onClick={handleClickEditRoom}
              disabled={!!room.roomInGame}
              title={room.roomInGame ? "Não é possivel editar a sala durante o jogo" : "Editar sala"}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>

            <Button
              variant='outline'
              size="sm"
              className='h-min py-1 px-2 text-gray-600 border-gray-100'
              onClick={handleClickDeleteRoom}
              disabled={!!room.roomInGame}
              title={room.roomInGame ? "Não é possivel deletar a sala durante o jogo" : "Deletar sala"}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </div>

      {userIsOwnerRoom && (
        <div className='flex flex-col items-center gap-1 mt-2'>
          <span
            className='inline-block min-w-[130px] h-min py-1 px-2 text-[10px] text-gray-700 shadow-sm shadow-gray-200 leading-4'
            title="Convites pendentes"
          >
            {/* <FontAwesomeIcon icon={faUserAlt} className='text-black/50' /> */}
            <span>{room.playersPending.length} - Convites pendentes</span>
          </span>

          <span
            className='inline-block min-w-[130px] h-min py-1 px-2 text-[10px] text-gray-700 shadow-sm shadow-gray-200 leading-4'
            title="Usuários"
          >
            {/* <FontAwesomeIcon icon={faUserAlt} className='text-black/50' /> */}
            <span>{room.playersVisiting.length} - Usuários</span>
          </span>

          <span
            className='inline-block min-w-[130px] h-min py-1 px-2 text-[10px] text-gray-700 shadow-sm shadow-gray-200 leading-4'
            title="Usuários jogando"
          >
            {/* <FontAwesomeIcon icon={faUserAlt} className='text-black/50' /> */}
            <span>{room.players.length} - Usuários jogando</span>
          </span>
        </div>
      )}
    </div>
  )
}

interface RoomItemIconGameProps {
  status: boolean
}
const RoomItemIconGame: FC<RoomItemIconGameProps> = ({ status }) => {
  return (
    <span
      className={cn(
        'absolute top-0 right-2',
        status ? 'text-blue-800' : 'text-gray-300'
      )}
      title={status ? 'sala em jogo' : 'sala fora de jogo'}
    >
      <FontAwesomeIcon icon={faDice} />
    </span>
  )
}

interface RoomItemTitleProps {
  name: string
}
const RoomItemTitle: FC<RoomItemTitleProps> = ({ name }) => {
  return (
    <h3 className='text-lg lg:text-2xl leading-10 w-full truncate text-blue-900 font-semibold font-mono mb-2 text-center'>
      {name}
    </h3>
  )
}

interface RoomItemWrapperProps {
  children: ReactNode
}
const RoomItemWrapper: FC<RoomItemWrapperProps> = ({ children }) => {
  return (
    <div className='p-2 lg:py-3 border-[1px] border-gray-200 rounded relative'>
      {children}
    </div>
  )
}

