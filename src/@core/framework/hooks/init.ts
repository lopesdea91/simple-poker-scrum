import { useEffect, useRef } from "react"

import { authStateWithGoogle } from "src/@core/framework/lib/firebase"
import { useAppStore } from "src/@core/framework/store/appStore"
import { geteway } from "src/@core/infra/gateway"
import { useMemory } from "src/@core/infra/memory"
import { memoryLocal } from "src/@core/infra/memory/memoryLocal"
import { GetUserService } from "src/@core/services/GetUserService"
import { GetUserByUIDService } from "src/@core/services/GetUserByUIDService"
import { MakeUserOfflineService } from "src/@core/services/MakeUserOfflineService"
import { GetRoomService } from "src/@core/services/GetRoomService"
import { MakeUserOnlineService } from "src/@core/services/MakeUserOnlineService"

export const useInitHook = () => {
  const isMounted = useRef(false)

  const appStore = useAppStore()

  const memory = useMemory(memoryLocal)


  const handler = async () => {
    appStore.setLoading(true)

    await new Promise((res) => setTimeout(res, 1000))

    await authStateWithGoogle(async (userGoogle) => {
      try {
        const isloggedOutWithGoogle = !userGoogle

        if (isloggedOutWithGoogle) {
          throw new Error('unauthenticated')
        }

        const dataLocal = memory.get()

        if (!dataLocal) {
          throw new Error('unauthorized')
        }

        const currentUser = await GetUserByUIDService(geteway)(dataLocal.uid)

        await MakeUserOnlineService(geteway)(currentUser!.uid)

        appStore.setAuth(currentUser!)

      } catch (error) {
        // console.log('... authStateWithGoogle error', (error as Error));
        // console.log('... authStateWithGoogle error', (error as Error).message);
        appStore.setAuth(null)
      }
    });

    await GetUserService(geteway)((users) => {
      appStore.setPrincipal({ users })
    })

    await GetRoomService(geteway)((rooms) => {
      appStore.setPrincipal({ rooms })
    })

    appStore.setLoading(false)
  }

  useEffect(() => {
    if (!isMounted.current) {
      handler()
    }

    return () => {
      isMounted.current = true

      if (appStore.auth?.uid)
        MakeUserOfflineService(geteway)(appStore.auth.uid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
