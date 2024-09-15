import { useEffect, useRef } from "react"

import { UserListService } from "../services/UserListService"
import { useAppStore } from "../store/appStore"
import geteway from "src/@core/infra/gateway"

export const useInitHook = () => {
  const isMounted = useRef(false)

  const appStore = useAppStore()

  const userListService = UserListService(geteway)


  const handler = async () => {
    appStore.setLoading(true)

    await new Promise((res) => setTimeout(res, 1000))

    await userListService((users) => appStore.setPrincipal({ users }))

    appStore.setLoading(false)
  }

  useEffect(() => {
    handler()

    return () => {
      isMounted.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
