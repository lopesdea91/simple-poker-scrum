import React, { FC, ReactNode } from 'react'

import { IUser } from 'src/@core/domain/User'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { cn } from 'src/@core/framework/lib/utils'
import { SectionTitle } from 'src/@core/presentation/ui/SectionTitle'
import { Skeleton } from 'src/@core/presentation/ui/skeleton'

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
      </UserWrapper>
    </div>
  )
}

const UserWrapper: FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className='flex flex-col gap-1'>{children}</div>
}
const UserBabe = {
  Root: (props: { children: ReactNode }) =>
    <div
      data-animate="animate-content"
      className="flex items-center gap-2 shadow p-2 mb-2"
      {...props}
    />,
  Figure: ({ className, ...props }: { children: ReactNode, title?: string, className?: string }) =>
    <div
      className={cn(className, "border-[2px] w-[32px] h-[32px] rounded-full overflow-hidden flex [&_*]:m-auto")}
      {...props}
    />,
}

const User: FC<IUser> = ({ uid, id, displayName, photoURL, online }) => {
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
      <span className={cn('text-xs', {
        'font-bold': online,
        'font-thin': !online,
      })}
        title={displayName}
      >{displayName}</span>
    </UserBabe.Root>
  )
}
const UserSkeleton: FC = () => {
  return (
    <UserBabe.Root>
      <UserBabe.Figure className='border-none'>
        <Skeleton className='w-[32px] h-[32px]' />
      </UserBabe.Figure>
      <Skeleton className='min-w-[100px] h-4' />
    </UserBabe.Root>
  )
}