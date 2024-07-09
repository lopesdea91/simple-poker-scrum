import { FC } from 'react'

import { IRoom, IRoomPlayerGame } from '@core/domain/Rooms'
import { cn } from '@core/framework/utils'
import { UserCard } from '../../../shared/UserCard'
import { useStore } from '@core/framework/hooks/useStore'

interface Eventsprops {
  handleChangeValue: (args: { uid: string, value: string }) => Promise<void>
}
interface RoomGameProps extends Eventsprops {
  inGame: boolean
  showCards: IRoom['roomShowCards']
  players: IRoomPlayerGame[]
  logs: string[]
}

const RoomGame: FC<RoomGameProps> = ({ inGame, showCards, players, logs, handleChangeValue }) => {
  const store = useStore()

  return (
    <div className={cn(
      'duration-300 ',
      !inGame ? 'overflow-hidden h-0 py-0 md:py-0 shadow-none' : ''
    )}>
      <div className="flex flex-wrap gap-2 mb-5">
        {players.map(player => (
          <Player
            key={player.uid}
            userId={store.getUserId()}
            player={player}
            showCards={showCards}
            handleChangeValue={value => handleChangeValue({ uid: player.uid, value })}
          />
        ))}
      </div>

      <div className='flex flex-col gap-1'>
        {logs?.map((log, i) =>
          <span key={i} className='text-gray-400 font-thin italic text-xs'>{log}</span>
        )}
      </div>
    </div>
  )
}

export default RoomGame

interface PlayersProps {
  userId: string
  player: IRoomPlayerGame
  showCards: IRoom['roomShowCards']
  handleChangeValue: (value: string) => Promise<void>
}
const Player: FC<PlayersProps> = ({ userId, player: { displayName, photoURL, uid, value }, showCards, handleChangeValue }) => {

  return (
    <div>
      <UserCard.Root>
        <UserCard.Photo
          photoURL={photoURL}
          alt={`player: ${displayName}`}
          title={`player: ${displayName}`} />

        {JSON.stringify(!showCards)}
        {JSON.stringify(userId === uid)}

        <div className='mt-2'>
          {showCards
            ? <span className='block w-full text-center text-2xl font-bold leading-8 h-8'>{value}</span>
            : null}

          {!showCards && userId !== uid
            ? <span className='block w-full text-center text-lg font-semibold leading-8 h-8 text-gray-400'>?</span>
            : null}

          {!showCards && userId === uid
            ? <input
              defaultValue={value}
              onChange={(e) => handleChangeValue(e.target.value)}
              className='border-[1px] block w-full text-center text-sm font-bold leading-8 h-8 rounded' />
            : null}
        </div>
      </UserCard.Root>
    </div>
  )
}