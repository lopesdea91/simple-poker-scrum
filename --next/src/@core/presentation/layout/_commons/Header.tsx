import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeAlt, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

import { cn } from '@core/framework/utils'
import { useStore } from '@core/framework/hooks/useStore'
import { useAuth } from '@core/framework/hooks/useAuth'
import { Link } from '@core/presentation/ui/link'
import { Button } from '@core/presentation/ui/button'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Header({ className, ...props }: HeaderProps) {
  const store = useStore()
  const auth = useAuth()

  const navigate = useNavigate()

  const handleClickSignOut = async () => {
    try {
      navigate('/')
      auth.signOut()
    } catch (error) {
      console.log('... handleClickSignOut error', (error as Error).message);
    }
  }

  return (
    <div
      {...props}
      className={cn(
        className,
        'rounded shadow shadow-gray-200',
        'min-h-10 mb-5 p-4',
        'flex items-center',
      )}
    >
      <div className="flex items-center gap-3 mr-auto">
        <img
          className='block w-10 h-10 rounded-full border-[2px] border-gray-600 shadow-md'
          src={store.user?.photoURL}
          title={store.user?.displayName}
          alt={store.user?.displayName}
        />
        <span
          className='inline-block text-xs font-thin leading-5'
          title={`${store.user?.displayName} é seu nome mesmo?`}
        >
          {store.user?.displayName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link to='/rooms' variant={'ghost'} className='min-w-8 p-0'>
          <FontAwesomeIcon icon={faHomeAlt} className='text-[14px]' />
        </Link>

        <Link to='/user-settings' variant={'ghost'} className='min-w-8 p-0'>
          <FontAwesomeIcon icon={faUser} className='text-[14px]' />
        </Link>

        <Button onClick={handleClickSignOut} variant={'ghost'} className='min-w-8 p-0'>
          <FontAwesomeIcon icon={faRightFromBracket} className='text-[14px]' />
        </Button>
      </div>
    </div>
  )
}
