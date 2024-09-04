import { cn } from '@core/framework/utils'
import React, { FC, ReactNode } from 'react'

interface RoomListProps {
  children: ReactNode
  className?: string
  loading?: ReactNode
  message?: ReactNode
}
export const RoomList: FC<RoomListProps> = ({ loading, message, children, className }) => {
  if (loading) {
    return <div {...{ className }}>{loading}</div>
  }
  if (message) {
    return <div {...{ className }}>{message}</div>
  }
  return (
    <div className={cn('md:grid grid-cols-2 lg:grid-cols-3 gap-2', className)}>
      {children}
    </div>
  )
}
