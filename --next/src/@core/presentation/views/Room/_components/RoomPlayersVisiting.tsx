import { IRoomPlayer } from '@core/domain/Rooms'
import { cn } from '@core/framework/utils'
import AppSection from '@core/presentation/shared/AppSection'
import AppTitle from '@core/presentation/shared/AppTitle'
import { FC } from 'react'
import { UserCard } from '../../../shared/UserCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

interface Eventsprops {
  handleRemovePlayer: (p: IRoomPlayer) => void
  handlePlayPlayer: (p: IRoomPlayer) => void
}
interface RoomPlayersVisitingProps extends Eventsprops {
  isOwnerRoom: boolean
  inGame: boolean
  players: IRoomPlayer[]
}
const RoomPlayersVisiting: FC<RoomPlayersVisitingProps> = ({ inGame, ...rest }) => {
  return (
    <AppSection className={cn(
      'duration-300',
      inGame ? 'overflow-hidden h-0 py-0 md:py-0 shadow-none mb-0' : ''
    )}>
      <AppTitle>Disponíveis:</AppTitle>
      <RoomContent {...rest} />
    </AppSection>
  )
}

export default RoomPlayersVisiting

interface RoomContentProps extends Eventsprops {
  isOwnerRoom: boolean
  players: IRoomPlayer[]
}
const RoomContent: FC<RoomContentProps> = ({ isOwnerRoom, players, ...props }) => {
  if (players.length === 0)
    return <p>Sem jogadores ...</p>

  return (
    <UserCard.List>
      {players.map(player => (
        <UserCard.Root key={player.displayName}>

          <UserCard.Photo
            photoURL={player.photoURL}
            alt={`player: ${player.displayName}`}
            title={`player: ${player.displayName}`} />

          <UserCard.DisplayName displayName={player.displayName} />

          {isOwnerRoom && (
            <UserCard.Actions>
              <UserCard.Action
                className='flex-1 flex h-6 bg-red-100'
                title="remover player"
                onClick={() => props.handleRemovePlayer(player)}
              >
                <FontAwesomeIcon icon={faXmark} className='m-auto text-md text-gray-700' />
              </UserCard.Action>

              <UserCard.Action
                className='flex-1 flex h-6 bg-red-100'
                title="Jogar"
                onClick={() => props.handlePlayPlayer(player)}
              >
                <FontAwesomeIcon icon={faCheck} className='m-auto text-md text-gray-700' />
              </UserCard.Action>
            </UserCard.Actions>
          )}
        </UserCard.Root>
      ))}
    </UserCard.List>
  )
}