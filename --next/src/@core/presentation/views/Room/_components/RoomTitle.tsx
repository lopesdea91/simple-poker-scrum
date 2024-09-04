import { FC, useEffect, useRef, useState } from 'react'
import { faEye, faEyeSlash, faPause, faPlay, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRoom } from '@core/domain/Rooms'
import { cn } from '@core/framework/utils'
import { Button } from '@core/presentation/ui/button'

interface RoomTitleProps {
  room: Partial<IRoom>
  isOwnerRoom: boolean
  toBePlayer: boolean
  showCards: boolean
  handleEnterGame: () => void
  handleExitGame: () => void
  handlePauseGame: () => void
  handlePlayGame: () => void
  handleResetRound: () => void
  handleRunRound: () => void
}
const RoomTitle: FC<RoomTitleProps> = ({ room, isOwnerRoom, toBePlayer, ...props }) => {
  const [disabled, setDisabled] = useState(false)
  const time = useRef<NodeJS.Timeout>()

  const initCount = () => {
    time.current = setTimeout(() => {
      setDisabled(false)
      clearTimeout(time.current)
    }, 3000)
  }

  useEffect(() => {
    if (!!room.roomShowCards) {
      setDisabled(true)
      initCount()
    }

    return () => {
      clearTimeout(time.current)
    }
  }, [room.roomShowCards])

  return (
    <div className='flex items-center mb-3'>
      <p>
        <span className='font-bold'>Sala:</span> {room?.name}
      </p>

      <div className={cn(
        "ml-auto flex gap-1 duration-300",
      )}>
        <RoomTitleButtonResetRun
          {...props}
          disabled={disabled}
          inGame={!!room.roomInGame}
        />

        <RoomTitleButtonEnterExit
          {...props}
          inGame={!!room.roomInGame}
          hideContent={!!room.roomInGame || !isOwnerRoom}
          toBePlayer={toBePlayer}
        />

        <RoomTitleButtonPlayPause
          {...props}
          disabled={disabled}
          inGame={!!room.roomInGame}
          hideContent={!!room.players?.length}
        />
      </div>
    </div >
  )
}
export default RoomTitle

interface RoomTitleButtonResetRunProps {
  disabled: boolean
  inGame: boolean
  showCards: boolean
  handleResetRound: () => void
  handleRunRound: () => void
}
const RoomTitleButtonResetRun: FC<RoomTitleButtonResetRunProps> = ({ disabled, inGame, showCards, ...props }) => {
  if (!inGame) return null
  return (
    <Button
      variant="outline"
      className='border-none hover:bg-transparent w-10 h-8'
      title={showCards ? 'Reset rodada' : 'Iníciar rodada'}
      onClick={() => showCards ? props.handleResetRound() : props.handleRunRound()}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={showCards ? faEyeSlash : faEye} className='text-lg text-gray-700' />
    </Button>
  )
}

interface RoomTitleButtonEnterExitProps {
  hideContent: boolean
  toBePlayer: boolean
  inGame: boolean
  handleExitGame: () => void
  handleEnterGame: () => void
}
const RoomTitleButtonEnterExit: FC<RoomTitleButtonEnterExitProps> = ({
  hideContent, toBePlayer, inGame, ...props
}) => {
  if (hideContent) return null

  return toBePlayer ? (
    <Button
      variant="outline"
      className='border-none hover:bg-transparent w-10 h-8'
      disabled={inGame}
      title='Sair do jogo'
      onClick={props.handleExitGame}
    >
      <FontAwesomeIcon icon={faUserXmark} className='text-lg text-gray-700' />
    </Button>
  ) : (
    <Button
      variant="outline"
      className='border-none hover:bg-transparent w-10 h-8'
      disabled={inGame}
      title='Entrar no jogo'
      onClick={props.handleEnterGame}
    >
      <FontAwesomeIcon icon={faUserPlus} className='text-lg text-gray-700' />
    </Button>
  )
}
interface RoomTitleButtonPlayPauseProps {
  disabled: boolean
  hideContent: boolean
  inGame: boolean
  handlePauseGame: () => void
  handlePlayGame: () => void
}
const RoomTitleButtonPlayPause: FC<RoomTitleButtonPlayPauseProps> = ({
  disabled, hideContent, inGame, ...props
}) => {
  if (!hideContent) return null

  return inGame ? (
    <Button
      variant="outline"
      className='border-none hover:bg-transparent w-10 h-8'
      title='Pausar o jogo'
      onClick={props.handlePauseGame}
      disabled={disabled}
      >
      <FontAwesomeIcon icon={faPause} className='text-lg text-gray-700' />
    </Button>
  ) : (
    <Button
      variant="outline"
      className='border-none hover:bg-transparent w-10 h-8'
      title='Iniciar o jogo'
      onClick={props.handlePlayGame}
      disabled={disabled}
      >
      <FontAwesomeIcon icon={faPlay} className='text-lg text-gray-700' />
    </Button>
  )
}