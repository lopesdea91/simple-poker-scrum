import { create } from 'zustand'

interface ILocalStoreData {
  loading: boolean
}
interface ILocalStore extends ILocalStoreData {
  setLoading: (value: boolean) => void
}
const localData: ILocalStoreData = {
  loading: false
}
export const useRoomsState = create<ILocalStore>()((set) => ({
  ...localData,
  setLoading: (loading) => {
    set(store => ({ ...store, loading }))
  },
}))
