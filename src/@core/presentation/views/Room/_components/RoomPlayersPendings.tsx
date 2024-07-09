import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import { IRoomPlayer } from '@core/domain/Rooms'
import { cn } from '@core/framework/utils'
import AppSection from '@core/presentation/shared/AppSection'
import AppTitle from '@core/presentation/shared/AppTitle'

import { UserCard } from '../../../shared/UserCard'

interface Eventsprops {
  handleRefuseInvite: (p: IRoomPlayer) => void
  handleAcceptInvite: (p: IRoomPlayer) => void
}
interface RoomPlayersPendingsProps extends Eventsprops {
  isOwnerRoom: boolean
  inGame: boolean
  players: IRoomPlayer[]
}
const RoomPlayersPendings: FC<RoomPlayersPendingsProps> = ({ isOwnerRoom, inGame, ...rest }) => {
  if (!isOwnerRoom) return null

  return (
    <AppSection className={cn(
      'duration-300',
      inGame ? 'overflow-hidden h-0 py-0 md:py-0 shadow-none mb-0' : ''
    )}>
      <AppTitle>Convites</AppTitle>
      <RoomContent {...rest} />
    </AppSection>
  )
}

export default RoomPlayersPendings

interface RoomContentProps extends Eventsprops {
  players: IRoomPlayer[]
}
const RoomContent: FC<RoomContentProps> = ({ players, handleRefuseInvite, handleAcceptInvite }) => {
  if (players.length === 0)
    return <p>Sem convites ...</p>

  return (
    <UserCard.List>
      {players.map(player => (
        <UserCard.Root key={player.displayName}>

          <UserCard.Photo
            photoURL={player.photoURL}
            alt={`player: ${player.displayName}`}
            title={`player: ${player.displayName}`} />

          <UserCard.DisplayName displayName={player.displayName} />

          <UserCard.Actions>
            <UserCard.Action
              className='flex-1 flex h-6 bg-red-100'
              title="recusar player"
              onClick={() => handleRefuseInvite(player)}
            >
              <FontAwesomeIcon icon={faXmark} className='m-auto text-md text-gray-700' />
            </UserCard.Action>

            <UserCard.Action
              className='flex-1 flex h-6 bg-red-100'
              title="recusar player"
              onClick={() => handleAcceptInvite(player)}
            >
              <FontAwesomeIcon icon={faCheck} className='m-auto text-md text-gray-700' />
            </UserCard.Action>
          </UserCard.Actions>
        </UserCard.Root>
      ))}
    </UserCard.List>
  )
}