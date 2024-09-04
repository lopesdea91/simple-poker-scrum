import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '@core/framework/hooks/useStore'

export default function LayoutLoading() {
  const store = useStore()

  if (!store.initialApp) return null

  return (
    <>
      <div className='flex items-center justify-center w-screen h-screen'>
        <FontAwesomeIcon icon={faSpinner} className='animate-spin text-2xl text-gray-500' />
      </div>

      {/* 
      <div className="flex items-center justify-center w-screen h-screen">
          <pre className='border-2'>{JSON.stringify(store, null, 2)}</pre>
      </div>
      */}
    </>
  )
}
