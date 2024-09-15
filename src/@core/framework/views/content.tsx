import React, { FC } from 'react'

import { PrincipalView } from "src/@core/presentation/views/Principal/View";
import { RoomView } from "src/@core/presentation/views/Room/View";
import { useAppStore } from '../store/appStore';

export const ContentView: FC = () => {
  const appStore = useAppStore()

  return (
    <>
      {appStore.view === 'principal' && (
        <PrincipalView data-animate="animate-content" />
      )}
      {appStore.view === 'room' && (
        <RoomView data-animate="animate-content" />
      )}
    </>
  )
}