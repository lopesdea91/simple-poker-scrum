import { IUser } from "@core/domain/User";
import { IGeteway } from "../gateway/types";
import { DocumentData } from "firebase/firestore";
import { ICreatePayload, IQueryPayload, IUpdatePayload } from "./users.types";

export default function usersApi(geteway: IGeteway) {
  geteway.setCollection("users");

  const parseData = (payload: DocumentData): IUser | null => {
    const data = payload.data() as IUser;

    if (!data) return null;

    return {
      id: payload.id,
      uid: data.uid,
      displayName: data.displayName,
      photoURL: data.photoURL,
    };
  };

  return {
    getAll: async () => {
      const documents = await geteway.get<IUser[]>([]);
      return documents.length ? documents.map(parseData) : [];
    },
    getId: async (uid: string) => {
      const data = await geteway.getId<DocumentData>(uid);
      return parseData(data);
    },
    query: async (queryDoc: IQueryPayload) => {
      const documents = await geteway.get<IUser[]>(queryDoc);
      return documents.length ? documents.map(parseData) : [];
    },
    create: async (payload: ICreatePayload) => {
      return await geteway.post(payload);
    },
    update: async (uid: string, payload: IUpdatePayload) => {
      return await geteway.put(uid, payload);
    },
    delete: async (uid: string) => {
      return await geteway.delete(uid);
    },
    exist: async (uid: string) => {
      return await geteway.exist("uid", uid);
    },
  };
}
