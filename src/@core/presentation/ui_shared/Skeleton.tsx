import React, { FC } from "react"
import { UserBabe } from "../ui_base/UserBase"
import { Skeleton } from "../ui/skeleton"
import { RoomBase } from "../ui_base/RoomBase"

export const UserSkeleton: FC = () => {
  return (
    <UserBabe.Root>
      <UserBabe.Figure className='border-none'>
        <Skeleton className='w-[32px] h-[32px]' />
      </UserBabe.Figure>
      <Skeleton className='min-w-[100px] h-4' />
    </UserBabe.Root>
  )
}

export const RoomSkeleton: FC = () => {
  return (
    <RoomBase.Root className="hover:border-gray-200 hover:shadow-md cursor-default">
      <RoomBase.Owner>
        <Skeleton className='w-[64px] h-[12px]' />
      </RoomBase.Owner>
      <RoomBase.Title>
        <Skeleton className='w-[128px] h-[32px]' />
      </RoomBase.Title>
    </RoomBase.Root>
  )
}