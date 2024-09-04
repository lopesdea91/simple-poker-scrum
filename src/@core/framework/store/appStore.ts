import { create } from 'zustand'

interface IAppStoreData {
}
interface IAppStoreMethods {
}
interface IAppStore extends IAppStoreData, IAppStoreMethods {
}

const appDataInitial: IAppStoreData = {
    bears: 0,
}

export const useAppStore = create<IAppStore>()((set) => ({
}))