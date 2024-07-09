import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IRoom, IRoomPlayer } from '@core/domain/Rooms'
import { useAuth } from '@core/framework/hooks/useAuth'
import { useStore } from '@core/framework/hooks/useStore'
import roomsApi from '@core/infra/api/rooms'
import geteway from '@core/infra/gateway'

import RoomTitle from './_components/RoomTitle'
import RoomPlayersPendings from './_components/RoomPlayersPendings'
import RoomPlayersVisiting from './_components/RoomPlayersVisiting'
import RoomPlayers from './_components/RoomPlayers'
import PlayerGameDto from '@core/dto/PlayerGameDto'
import RoomGame from './_components/RoomGame'

export default function RoomPage() {
  const isMounted = useRef(false)

  const [room, setRoom] = useState<Partial<IRoom>>({})

  const { id: currentId } = useParams<{ id: string }>()

  const auth = useAuth()
  const store = useStore()
  const navigate = useNavigate()

  const toBePlayer: boolean = !!(room.playersVisiting && room.players && [...room.playersVisiting!, ...room.players!]?.find(e => e.uid === store.user.uid!))
  const isOwnerRoom: boolean = room.userOwnerId === store.user.uid!

  useEffect(() => {
    auth.isAuthenticated()

    if (isMounted.current) return

    roomsApi(geteway).syncId(currentId!, (data) => {
      if (!data) {
        navigate('/rooms?code=204')
        return
      }

      if (!data.userPlayersIds.includes(store.getUserId())) {
        navigate('/rooms?code=401')
        return
      }

      setRoom(data)
    })

    return () => {
      isMounted.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   console.log('... room.roomLogs', room.roomLogs);
  // }, [room.roomLogs])

  const payloadRoom = (log: string, payload: Partial<IRoom> = {}): Omit<IRoom, 'id'> => {
    let roomLogs = [...room.roomLogs!]

    if (!!log) {
      roomLogs = roomLogs.length < 9
        ? [...room.roomLogs!, log]
        : [...room.roomLogs!, log].slice(1, 11)
    }

    return {
      name: room.name!,
      roomInGame: room.roomInGame!,
      roomLogs, //: [...room.roomLogs!, log].slice(1, 11),
      roomShowCards: room.roomShowCards!,
      players: room.players!,
      playersPending: room.playersPending!,
      playersVisiting: room.playersVisiting!,
      userOwnerId: room.userOwnerId!,
      userPlayersIds: room.userPlayersIds!,
      ...payload,
    }
  }

  /** recusar convite */
  const handleClickRefuseInvite = async (currentPlayer: IRoomPlayer) => {
    try {
      const playersPending: IRoom['playersPending'] = room.playersPending!.filter(el => el.uid !== currentPlayer.uid)
      const userPlayersIds: IRoom['userPlayersIds'] = room.userPlayersIds!.filter(uid => uid !== currentPlayer.uid)

      await roomsApi(geteway).update(room.id!, payloadRoom(
        '',
        { playersPending, userPlayersIds }
      ))

    } catch (error) {
      console.log('... handleClickRefuseInvite error', (error as Error).message);
    }
  }
  /** aceitar convite */
  const handleClickAcceptInvite = async (currentPlayer: IRoomPlayer) => {
    try {
      const playersPending: IRoom['playersPending'] = room.playersPending!.filter(el => el.uid !== currentPlayer.uid)
      const playersVisiting: IRoom['playersVisiting'] = [
        ...room.playersVisiting!,
        {
          uid: currentPlayer.uid,
          displayName: currentPlayer.displayName,
          photoURL: currentPlayer.photoURL
        }
      ]

      await roomsApi(geteway).update(room.id!, payloadRoom(
        '',
        { playersPending, playersVisiting }
      ))

    } catch (error) {
      console.log('... handleClickAcceptInvite error', (error as Error).message);
    }
  }
  /** remover jogador */
  const handleClickRemovePlayer = async (currentPlayer: IRoomPlayer) => {
    try {
      const playersVisiting: IRoom['playersVisiting'] = room.playersVisiting!.filter(el => el.uid !== currentPlayer.uid)
      const players: IRoom['players'] = room.players!.filter(el => el.uid !== currentPlayer.uid)

      await roomsApi(geteway).update(room.id!, payloadRoom(
        '',
        { players, playersVisiting }
      ))

    } catch (error) {
      console.log('... handleClickRemovePlayer error', (error as Error).message);
    }
  }

  /** adiciona jogado ao game */
  const handleClickPlayPlayer = async (currentPlayer: IRoomPlayer) => {
    try {
      const playersVisiting: IRoom['playersVisiting'] = room.playersVisiting!.filter(el => el.uid !== currentPlayer.uid)

      const players: IRoom['players'] = [
        ...room.players!,
        {
          uid: currentPlayer.uid,
          displayName: currentPlayer.displayName,
          photoURL: currentPlayer.photoURL,
        }
      ].map(PlayerGameDto)

      await roomsApi(geteway).update(room.id!, payloadRoom(
        '',
        { players, playersVisiting }
      ))

    } catch (error) {
      console.log('... handleClickEnterGame error', (error as Error).message);
    }
  }
  /** remove jogado ao game */
  const handleClickPausePlayer = async (currentPlayer: IRoomPlayer) => {
    try {
      const players: IRoom['players'] = room.players!.filter(el => el.uid !== currentPlayer.uid)
      const playersVisiting: IRoom['playersVisiting'] = [
        ...room.playersVisiting!,
        {
          uid: currentPlayer.uid,
          displayName: currentPlayer.displayName,
          photoURL: currentPlayer.photoURL
        }
      ]

      await roomsApi(geteway).update(room.id!, payloadRoom(
        '',
        { players, playersVisiting }
      ))

    } catch (error) {
      console.log('... handleClickEnterGame error', (error as Error).message);
    }
  }

  /** torna o usuário um jogador do game */
  const handleClickEnterGame = async (currentPlayer: IRoomPlayer) => {
    try {
      const playersPending: IRoom['playersPending'] = room.playersPending!.filter(el => el.uid !== currentPlayer.uid)
      const playersVisiting: IRoom['playersVisiting'] = [
        ...room.playersVisiting!,
        {
          uid: currentPlayer.uid,
          displayName: currentPlayer.displayName,
          photoURL: currentPlayer.photoURL
        }
      ]

      await roomsApi(geteway).update(room.id!, payloadRoom(
        `o usuário "${store.user.displayName}", se tornou um jogador`,
        { playersPending, playersVisiting })
      )
    } catch (error) {
      console.log('... handleClickEnterGame error', (error as Error).message);
    }
  }
  /** pausa o game */
  const handleClickPauseGame = async () => {
    try {
      await roomsApi(geteway).update(room.id!, payloadRoom(
        '',
        { roomInGame: 0 }
      ))
    } catch (error) {
      console.log('... handleClickPauseGame error', (error as Error).message);
    }
  }
  /** inicia o game */
  const handleClickPlayGame = async () => {
    try {
      await roomsApi(geteway).update(room.id!, payloadRoom(
        '', {
        roomInGame: 1,
        roomLogs: [`o usuário "${store.user.displayName}", decidiu começar o jogo`]
      }
      ))
    } catch (error) {
      console.log('... handleClickPlayGame error', (error as Error).message);
    }
  }
  const handleClickResetRound = async () => {
    try {
      const players = [...room.players!].map(el => ({ ...el, value: '' }))

      await roomsApi(geteway).update(room.id!, payloadRoom(
        `o usuário "${store.user.displayName}", decidiu terminar rodada`,
        { players, roomShowCards: 0 }
      ))
    } catch (error) {
      console.log('... handleClickResetGame error', (error as Error).message);
    }
  }
  const handleClickRunRound = async () => {
    const playersLength = room.players?.length
    const playersLengthWithValue = room.players?.filter(e => !!e.value)?.length

    const isRunRound = playersLength === playersLengthWithValue

    if (!isRunRound) {
      await roomsApi(geteway).update(room.id!, payloadRoom(
        `o usuário "${store.user.displayName}", tentou iníciar a rodada, mas algum jogador ainda não se decidiu!`,
      ))
      return
    }

    try {
      await roomsApi(geteway).update(room.id!, payloadRoom(
        `o usuário "${store.user.displayName}", decidiu iniciar rodada`,
        { roomShowCards: 1 }
      ))

    } catch (error) {
      console.log('... handleClickResetGame error', (error as Error).message);
    }
  }

  const handleChangeValueRound = async ({ uid, value }: { uid: string, value: string }) => {
    try {
      const players = [...room.players!].map(el => el.uid === uid ? ({ ...el, value }) : el)

      await roomsApi(geteway).update(room.id!, payloadRoom(
        `o jogador "${store.user.displayName}", se decidiu`,
        { players }
      ))

    } catch (error) {
      console.log('... handleChangeValueRound error', (error as Error).message);
    }
  }

  return (
    <>
      <RoomTitle
        room={room}
        isOwnerRoom={isOwnerRoom}
        toBePlayer={toBePlayer}
        showCards={!!room.roomShowCards}
        handleEnterGame={() => handleClickEnterGame({
          uid: store.user.uid!,
          displayName: store.user.displayName!,
          photoURL: store.user.photoURL!
        })}
        handleExitGame={() => handleClickRemovePlayer({
          uid: store.user.uid!,
          displayName: store.user.displayName!,
          photoURL: store.user.photoURL!
        })}
        handlePauseGame={() => handleClickPauseGame()}
        handlePlayGame={() => handleClickPlayGame()}
        handleResetRound={() => handleClickResetRound()}
        handleRunRound={() => handleClickRunRound()}
      />

      <RoomPlayersPendings
        isOwnerRoom={isOwnerRoom}
        inGame={!!room.roomInGame}
        players={room?.playersPending || []}
        handleRefuseInvite={handleClickRefuseInvite}
        handleAcceptInvite={handleClickAcceptInvite}
      />

      <RoomPlayersVisiting
        isOwnerRoom={isOwnerRoom}
        inGame={!!room.roomInGame}
        players={room?.playersVisiting || []}
        handleRemovePlayer={handleClickRemovePlayer}
        handlePlayPlayer={handleClickPlayPlayer}
      />

      <RoomPlayers
        isOwnerRoom={isOwnerRoom}
        inGame={!!room.roomInGame}
        players={room?.players || []}
        handleRemovePlayer={handleClickPausePlayer}
      />

      <RoomGame
        inGame={!!room.roomInGame}
        showCards={room.roomShowCards!}
        players={room?.players || []}
        logs={room?.roomLogs || []}
        handleChangeValue={handleChangeValueRound}
      />
    </>
  )
}