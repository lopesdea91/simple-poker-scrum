import { IRoom } from "./domain/Room"
import { IUser } from "./domain/User"

export type IAppView = 'principal' | 'room'

export type IAppStoreAuth = IUser | null

export type IAppStorePrincipal = {
    users: IUser[]
    myRooms: IRoom[]
}
export interface IAppStoreData {
    view: IAppView
    loading: boolean
    auth: IAppStoreAuth
    principal: IAppStorePrincipal
}
export interface IAppStoreMethods {
    setView: (view: IAppView) => void
    setAuth: (view: IAppStoreAuth) => void
    setLoading: (loading: boolean) => void
    setPrincipal: (view: Partial<IAppStorePrincipal>) => void
}
export interface IAppStore extends IAppStoreData, IAppStoreMethods {
}