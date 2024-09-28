import React, { forwardRef, ReactNode, useImperativeHandle, useState } from 'react'

import { useAppStore } from '../framework/store/appStore'
import { useMemory } from '../infra/memory'
import { memoryLocal } from '../infra/memory/memoryLocal'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/Sheet'

interface SheetsProfileProps {
  children: ReactNode
}
interface SheetsProfileMethod {
  open: () => void
  close: () => void
}

export const SheetsProfile = forwardRef<SheetsProfileMethod, SheetsProfileProps>(({ children }, ref) => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const [modalOpen, setModalOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setModalOpen(true),
    close: () => setModalOpen(false),
  }))

  return (
    <Sheet open={modalOpen} onOpenChange={setModalOpen}>
      <SheetTrigger asChild>
        <button
          type='button'
          disabled={appStore.loading}
          title='Minha conta'
          className='hover:opacity-75 duration-150 border-b border-gray-400 px-1'
        >
          {appStore.auth?.displayName ?? ''}
        </button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className='hidden'>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  )
})
