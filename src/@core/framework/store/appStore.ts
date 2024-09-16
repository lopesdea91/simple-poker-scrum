import { create } from 'zustand'

import { IAppStore, IAppStoreData } from 'src/@core/types'

const appDataInitial: IAppStoreData = {
  view: 'principal',
  loading: true,
  auth: null,
  principal: {
    myRooms: [],
    users: []
  }
}

export const useAppStore = create<IAppStore>()((set) => ({
  ...appDataInitial,
  setView: (view) => {
    set(store => ({ ...store, view }))
  },
  setAuth: (auth) => {
    set(store => ({ ...store, auth }))
  },
  setLoading: (loading) => {
    set(store => ({ ...store, loading }))
  },
  setPrincipal: (principal) => {
    set(store => ({
      ...store,
      principal: {
        ...store.principal,
        ...principal
      }
    }))
  }
}))