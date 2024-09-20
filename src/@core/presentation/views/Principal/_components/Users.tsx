import React, { FC, ReactNode } from 'react'

import { IUser } from 'src/@core/domain/User'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { cn } from 'src/@core/framework/lib/utils'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'
import { UserBabe } from 'src/@core/presentation/ui_base/UserBase'
import { UserSkeleton } from 'src/@core/presentation/ui_shared/Skeleton'

export const Users: FC<{ users: IUser[] }> = ({ users }) => {
  const appStore = useAppStore()
  return (
    <div className='p-2'>
      <SectionTitle>Usuários:</SectionTitle>

      <UserWrapper>
        {appStore.loading && (<>
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
        </>)}

        {!appStore.loading &&
          users.map(user => (
            <User key={user.uid} {...user} />
          ))}

        {!appStore.loading && users.length === 0 && (
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
    <UserBabe.Root>
      <UserBabe.Figure
        title={'Olá, eu sou ' + displayName}
        className={cn({
          'border-green-400': online,
          'border-gray-400 opacity-50': !online,
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

      {!online && <UserBabe.lastLogin {...{ updated_at }} />}
    </UserBabe.Root>
  )
}