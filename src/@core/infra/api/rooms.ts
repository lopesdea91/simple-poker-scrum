import { DocumentData } from "firebase/firestore";

import { IRoom } from "@core/domain/Rooms";

import { IGeteway } from "../gateway/types";
import { ICreatePayload, IUpdatePayload } from "./rooms.types";
import { parseCreatePayload, parseUpdatePayload } from "./rooms.utils";
import { IQueryPayload } from "./users.types";

export default function roomsApi(geteway: IGeteway) {
  geteway.setCollection("rooms");

  const parseData = (payload: DocumentData): IRoom | null => {
    const { id } = payload;
    const data = payload.data() as IRoom;

    if (!data) return null;

    return {
      id,
      name: data.name,
      roomInGame: data.roomInGame,
      roomShowCards: data.roomShowCards ?? 0,
      roomLogs: data.roomLogs ?? [],
      players: data.players,
      playersPending: data.playersPending,
      playersVisiting: data.playersVisiting,
      userOwnerId: data.userOwnerId,
      userPlayersIds: data.userPlayersIds,
    };
  };

  return {
    getAll: async () => {
      const documents = await geteway.get<IRoom[]>([]);
      const dataParsed = !!documents.length ? documents.map(parseData) : [];
      return dataParsed as IRoom[];
    },
    getId: async (id: string) => {
      const document = await geteway.getId<IRoom>(id);
      return parseData(document);
    },
    query: async (queryDoc: IQueryPayload) => {
      const documents = await geteway.get<IRoom[]>(queryDoc);
      return documents.length ? documents.map(parseData) : [];
    },
    create: async (payload: ICreatePayload) => {
      return await geteway.post(parseCreatePayload(payload));
    },
    update: async (uid: string, payload: IUpdatePayload) => {
      return await geteway.put(uid, parseUpdatePayload(payload));
    },
    delete: async (uid: string) => {
      return await geteway.delete(uid);
    },
    syncId: async (id: string, callback: (room: IRoom) => void) => {
      return geteway.syncId(id, (doc: DocumentData) =>
        callback(parseData(doc)!)
      );
    },
    syncList: async (callback: (room: IRoom[]) => void) => {
      return geteway.syncList((docs) =>
        callback(docs.map((doc) => parseData(doc)!))
      );
    },
  };
}
