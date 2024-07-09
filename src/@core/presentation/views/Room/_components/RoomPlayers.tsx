import { IRoomPlayer } from '@core/domain/Rooms'
import { cn } from '@core/framework/utils'
import AppSection from '@core/presentation/shared/AppSection'
import AppTitle from '@core/presentation/shared/AppTitle'
import { FC } from 'react'
import { UserCard } from '../../../shared/UserCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface Eventsprops {
  handleRemovePlayer: (p: IRoomPlayer) => void
}
interface RoomPlayersProps extends Eventsprops {
  isOwnerRoom: boolean
  inGame: boolean
  players: IRoomPlayer[]
}
const RoomPlayers: FC<RoomPlayersProps> = ({ inGame, players, ...rest }) => {
  return (
    <AppSection className={cn(
      'duration-300',
      inGame || players.length === 0 ? 'overflow-hidden h-0 py-0 md:py-0 shadow-none mb-0' : ''
    )}>
      <AppTitle>Jogadores:</AppTitle>
      <RoomContent players={players} {...rest} />
    </AppSection>
  )
}

export default RoomPlayers

interface RoomContentProps extends Eventsprops {
  isOwnerRoom: boolean
  players: IRoomPlayer[]
}
const RoomContent: FC<RoomContentProps> = ({ isOwnerRoom, players, ...props }) => {
  return (
    <UserCard.List>
      {players.map(player => (
        <UserCard.Root key={player.displayName} className='py-2 min-h-24 flex flex-col items-center justify-center gap-1'>

          <UserCard.Photo
            photoURL={player.photoURL}
            alt={`player: ${player.displayName}`}
            title={`player: ${player.displayName}`} />

          {isOwnerRoom && (
            <UserCard.Actions className="w-full">
              <UserCard.Action
                className='flex-1 flex h-6 bg-red-100'
                title="remover player"
                onClick={() => props.handleRemovePlayer(player)}
              >
                <FontAwesomeIcon icon={faXmark} className='m-auto text-md text-gray-700' />
              </UserCard.Action>
            </UserCard.Actions>
          )}
        </UserCard.Root>
      ))}
    </UserCard.List>
  )
}