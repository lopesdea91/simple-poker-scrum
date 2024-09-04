import { where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { useStore } from '@core/framework/hooks/useStore'
import usersApi from '@core/infra/api/users'
import geteway from '@core/infra/gateway'
import userMemory from '@core/memory/localStorage/userMemory'
import { memoryLocal } from '@core/memory/memoryLocal'
import { Button } from '@core/presentation/ui/button'

export default function ButtonContinueWithUser() {
  const store = useStore();
  const navigate = useNavigate()

  const dataLocal = userMemory(memoryLocal).get()
  const firstName = dataLocal.displayName.split(" ")?.[0]

  const handleClick = async () => {
    try {
      const resultUsers = await usersApi(geteway).query(
        where('uid', '==', dataLocal.uid)
      )

      if (!resultUsers) return

      const [userData] = resultUsers

      if (!userData) return

      userMemory(memoryLocal).create({
        uid: userData.uid,
        displayName: userData.displayName
      })

      store.setData({
        auth: { logged: true },
        user: userData!,
        initialApp: false,
        loading: false
      })

      navigate('/rooms')

    } catch (error) {
      alert((error as Error).message)
    }
  }

  return !!firstName
    ? (
      <Button
        onClick={handleClick}>
        Continuar como {firstName}
      </Button>
    )
    : null
}
