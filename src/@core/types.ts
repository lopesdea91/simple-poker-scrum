import { IRoom } from "./domain/Room"
import { IUser } from "./domain/User"

export type IAppView = 'principal' | 'room'

export type IAppStoreAuth = IUser | null

export type IAppStorePrincipal = {
    users: IUser[]
    rooms: IRoom[]
}
export interface IAppStoreData {
    view: IAppView
    loading: boolean
    disabled: boolean
    auth: IAppStoreAuth
    principal: IAppStorePrincipal
}
export interface IAppStoreMethods {
    setAuth: (view: IAppStoreAuth) => void
    setLoading: (value: boolean) => void
    setDisabled: (value: boolean) => void
    setView: (view: IAppView) => void
    setPrincipal: (view: Partial<IAppStorePrincipal>) => void
}
export interface IAppStore extends IAppStoreData, IAppStoreMethods {
}