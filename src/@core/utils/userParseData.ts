import { DocumentData } from "firebase/firestore";
import { IUser } from "../domain/User";
import dayjs from "dayjs";

export const UserParseData = (payload: DocumentData): IUser | null => {
  const data = payload.data() as IUser;

  if (!data) return null;

  return {
    id: payload.id,
    uid: data.uid,
    displayName: data.displayName,
    photoURL: data.photoURL,
    online: !!data?.online,
    updated_at: data?.updated_at ?? dayjs().unix(),
  };
};
