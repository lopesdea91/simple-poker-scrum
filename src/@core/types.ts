import { IUser } from "./domain/User"

export type IAppView = 'principal' | 'room'
export type IAppStorePrincipal = {
    users: IUser[]
}
export interface IAppStoreData {
    view: IAppView
    loading: boolean
    principal: IAppStorePrincipal
}
export interface IAppStoreMethods {
    setView: (view: IAppView) => void
    setLoading: (loading: boolean) => void
    setPrincipal: (view: Partial<IAppStorePrincipal>) => void
}
export interface IAppStore extends IAppStoreData, IAppStoreMethods {
}