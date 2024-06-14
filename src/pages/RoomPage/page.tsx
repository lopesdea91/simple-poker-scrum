import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

export default function RoomPage() {
  const isMounted = useRef(false)
  const { id: currentId } = useParams<{ id: string }>()

  const getData = async () => {
    console.log('... currentId', currentId);
  }

  useEffect(() => {
    if (!isMounted.current)
      getData()

    return () => {
      isMounted.current = true
    }
  }, [])

  return (
    <div>
      RoomPage: {currentId}
    </div>
  )
}
