import { where } from "firebase/firestore"
import { IUser } from "../domain/User"
import { IGeteway } from "../infra/gateway/types"
import { IAppStoreAuth } from "../types"
import { IRoom } from "../domain/Room"

type IPayload = IAppStoreAuth

export const DeleteUserService = (geteway: IGeteway) => async (payload: IPayload) => {

  /** DELETE ROOM BY USER */
  geteway.setCollection("rooms");
  (await geteway.get<IRoom[]>(where('ownerId', '==', payload?.id)))
    .forEach(async doc => {
      await geteway.delete(doc.id)
    })

  /** DELETE USER */
  geteway.setCollection("users");
  (await geteway.get<IUser[]>(where('uid', '==', payload?.uid)))
    .forEach(async doc => {
      await geteway.delete(doc.id)
    })
}
