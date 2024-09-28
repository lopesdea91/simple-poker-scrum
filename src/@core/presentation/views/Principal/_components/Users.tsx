import React, { FC } from 'react'

import { IUser } from 'src/@core/domain/User'
import { cn } from 'src/@core/framework/lib/utils'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { useUsersState } from 'src/@core/framework/store/viewUsersStore'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'
import { UserBabe } from 'src/@core/presentation/ui_base/UserBase'
import { UserSkeleton } from 'src/@core/presentation/ui_shared/Skeleton'

import { useUsersInit } from './Users.hooks'

export const Users: FC = () => {
  const appStore = useAppStore()
  const usersState = useUsersState()

  const users = appStore.principal.users

  useUsersInit()

  return (
    <div className='p-2'>
      <SectionTitle>Usuários:</SectionTitle>

      <UserWrapper>
        {usersState.loading && (<>
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
        </>)}

        {!usersState.loading &&
          users.map(user => (
            <User key={user.uid} {...user} />
          ))}

        {!usersState.loading && users.length === 0 && (
          <span className='text-xs text-gray-600'>Nenhum usuário cadastrado!</span>
        )}
      </UserWrapper>
    </div>
  )
}

const UserWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className='flex flex-col gap-1'>{children}</div>
}

const User: FC<IUser> = ({ uid, id, displayName, photoURL, online, updated_at }) => {
  return (
    <UserBabe.Root className={cn({
      'opacity-50 text-gray-400': !online
    })}>
      <UserBabe.Figure
        title={'Olá, eu sou ' + displayName}
        className={cn({
          'border-green-400': online,
          'border-gray-400': !online,
        })}
      >
        <img src={photoURL} alt={'User ' + displayName} />
      </UserBabe.Figure>

      <span
        className={cn('text-xs', {
          'font-bold': online,
          'font-thin': !online,
        })}
        title={displayName}
      >
        {displayName}
      </span>

      {online
        ? <UserBabe.status />
        : <UserBabe.lastLogin {...{ updated_at }} />}
    </UserBabe.Root>
  )
}