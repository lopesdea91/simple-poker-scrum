import { useStore } from 'hooks/useStore'
import React from 'react'
import FormAuth from './_components/FormAuth'

export default function LoginPage() {
  const store = useStore()

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <FormAuth />
      <button onClick={() => store.setLogged(!store.logged)}>{JSON.stringify(store.logged)}</button>
    </div>
  )
}
