/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useMemo } from 'react'
import { faCopy, faDice, faEdit, faEnvelope, faHourglassHalf, faRightToBracket, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRoom } from '@core/domain/Rooms'
import { Button } from '@core/presentation/ui/button'
import { useNavigate } from 'react-router-dom'
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
  const handleClickCopy = () => {
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
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

      {!userIsParticipant && (
        <Button variant='outline' size="sm" className='h-min py-1 px-2 text-gray-600 border-gray-100' title="Enviar convite para ter acesso" onClick={handleClickSendInvite}>
          <FontAwesomeIcon icon={faEnvelope} />
        </Button>
      )}

      {(showButtonCopy && !userIsPendingInvite) && (
        <Button variant='outline' size="sm" className='h-min py-1 px-2 text-gray-600 border-gray-100' title="Copiar endereço da sala" onClick={handleClickCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      )}

      {userIsOwnerRoom && (
        <div className='w-full sm:w-max sm:ml-auto lg:mt-1 lg:ml-0 flex flex-wrap items-center gap-1'>
          <Button
            variant='outline'
            size="sm"
            className='h-min py-1 px-2 text-gray-600 border-gray-100 sm:ml-auto'
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

          <Button
            variant='outline'
            size="sm"
            className='h-min py-1 px-2 text-gray-600 border-gray-100 relative border-none shadow-sm hover:bg-transparent hover:shadow-none'
            title="Convites pendentes"
          >
            <FontAwesomeIcon icon={faUserAlt} className='text-black/50' />
            <span className='absolute -top-1 right-0.5 text-[10px] text-black'>{room.playersPending.length}</span>
          </Button>

          <Button
            variant='outline'
            size="sm"
            className='h-min py-1 px-2 text-gray-600 border-gray-100 relative border-none shadow-sm hover:bg-transparent hover:shadow-none'
            title="Usuários"
          >
            <FontAwesomeIcon icon={faUserAlt} className='text-black/50' />
            <span className='absolute -top-1 right-0.5 text-[10px] text-black'>{room.playersVisiting.length}</span>
          </Button>

          <Button
            variant='outline'
            size="sm"
            className='h-min py-1 px-2 text-gray-600 border-gray-100 relative border-none shadow-sm hover:bg-transparent hover:shadow-none'
            title="Usuários jogando"
          >
            <FontAwesomeIcon icon={faUserAlt} className='text-black/50' />
            <span className='absolute -top-1 right-0.5 text-[10px] text-black'>{room.players.length}</span>
          </Button>
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
    <h3 className='text-lg lg:text-2xl leading-10 w-full truncate text-blue-900 font-semibold font-mono mb-1'>
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

