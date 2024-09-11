import React from 'react'

import { PrincipalView } from "src/@core/presentation/views/Principal/View";
import { RoomView } from "src/@core/presentation/views/Room/View";

export const ContentView = ({ value }: { value: string }) => {
  switch (value) {
    case 'principal':
      return <PrincipalView />
    case 'room':
      return <RoomView />;
    default:
      return null
  }
}