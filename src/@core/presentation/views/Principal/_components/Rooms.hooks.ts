import { useEffect } from 'react'

import { useAppStore } from 'src/@core/framework/store/appStore'
import { useRoomsState } from 'src/@core/framework/store/viewRoomsStore'
import { geteway } from 'src/@core/infra/gateway'
import { GetRoomService } from 'src/@core/services/GetRoomService'

export const useRoomInit = () => {
  /** local */
  const roomsState = useRoomsState()

  /** app */
  const appStore = useAppStore()

  const handler = async () => {
    roomsState.setLoading(true)

    return await GetRoomService(geteway)((rooms) => {
      appStore.setPrincipal({ rooms })
    })
      .finally(() => {
        roomsState.setLoading(false)
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