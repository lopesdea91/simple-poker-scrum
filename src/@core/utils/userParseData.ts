import { DocumentData } from "firebase/firestore";
import { IUser } from "../domain/User";

export const UserParseData = (payload: DocumentData): IUser | null => {
  const data = payload.data() as IUser;

  if (!data) return null;

  return {
    id: payload.id,
    uid: data.uid,
    displayName: data.displayName,
    photoURL: data.photoURL,
    online: !!data?.online
  };
};
