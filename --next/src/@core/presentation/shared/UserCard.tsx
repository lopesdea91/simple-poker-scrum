import { IRoomPlayer } from '@core/domain/Rooms'
import { cn } from '@core/framework/utils'
import { FC, ReactNode } from 'react'

interface UserCardListProps {
  children: ReactNode
}
const UserCardList: FC<UserCardListProps> = ({ children }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {children}
    </div>
  )
}

interface UserCardRootProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }
const UserCardRoot: FC<UserCardRootProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'px-2 pt-2 pb-1 shadow-lg w-28 border-[1px] border-gray-100',
      className
    )}>
      {children}
    </div>
  )
}

interface UserCardPhotoProps {
  photoURL: IRoomPlayer['photoURL']
  alt: string
  title?: string
  className?: string
}
const UserCardPhoto: FC<UserCardPhotoProps> = ({ photoURL, alt, className, ...rest }) => {
  return (
    <img
      {...rest}
      src={photoURL}
      alt={alt}
      className={cn('block border-2 border-gray-500 object-cover object-center w-16 h-16 rounded-3xl mx-auto', className)}
    />
  )
}

interface UserCardDisplayNameProps {
  displayName: IRoomPlayer['displayName']
}
const UserCardDisplayName: FC<UserCardDisplayNameProps> = ({ displayName }) => {
  return (
    <p className='text-[10px] text-center truncate leading-6'>{displayName.split(' ')[0]}</p>
  )
}

interface UserCardActionsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }
const UserCardActions: FC<UserCardActionsProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {children}
    </div>
  )
}
interface UserCardActionProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }
const UserCardAction: FC<UserCardActionProps> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={cn('flex-1 flex h-6 bg-red-100', className)}
    // title="recusar player"
    // onClick={() => handleClickRefuseInvite(player)}
    >
      {children}
      {/* <FontAwesomeIcon icon={faXmark} className='m-auto text-md text-gray-700' /> */}
    </button>
  )
}

const UserCard = {
  List: UserCardList,
  Root: UserCardRoot,
  Photo: UserCardPhoto,
  DisplayName: UserCardDisplayName,
  Actions: UserCardActions,
  Action: UserCardAction,
}
export { UserCard }

