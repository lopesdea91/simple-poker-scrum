import { useEffect } from 'react'

import { useAppStore } from 'src/@core/framework/store/appStore'
import { useUsersState } from 'src/@core/framework/store/viewUsersStore'
import { geteway } from 'src/@core/infra/gateway'
import { GetUserService } from 'src/@core/services/GetUserService'

export const useUsersInit = () => {
  /** local */
  const usersState = useUsersState()

  /** app */
  const appStore = useAppStore()

  const handler = async () => {
    usersState.setLoading(true)

    return await GetUserService(geteway)((users) => {
      appStore.setPrincipal({ users })
    }).finally(() => {
      usersState.setLoading(false)
    })
  }

  useEffect(() => {
    let res: Function;

    (async () => res = await handler())()

    return () => {
      res()
    }
  }, [])
}