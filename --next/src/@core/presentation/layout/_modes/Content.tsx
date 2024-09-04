import React from 'react'
import { useStore } from '@core/framework/hooks/useStore'

import LayoutInternal from './Internal'
import LayoutAuth from './Auth'

export default function LayoutContent() {
  const store = useStore()

  if (store.initialApp) return null

  return store.auth.logged ? <LayoutInternal /> : <LayoutAuth />
}