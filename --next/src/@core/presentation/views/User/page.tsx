import { useAuth } from '@core/framework/hooks/useAuth'
import React, { useEffect } from 'react'

export default function UserPage() {
  const auth = useAuth()

  useEffect(() => {
    auth.isAuthenticated()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      UserPage
    </div>
  )
}
