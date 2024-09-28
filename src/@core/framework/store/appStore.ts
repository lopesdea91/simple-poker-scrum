import { create } from 'zustand'

import { IAppStore, IAppStoreData } from 'src/@core/types'

const appDataInitial: IAppStoreData = {
  loading: true,
  disabled: false,
  auth: null,
  view: 'principal',
  principal: {
    rooms: [],
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
  setDisabled: (disabled) => {
    set(store => ({ ...store, disabled }))
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