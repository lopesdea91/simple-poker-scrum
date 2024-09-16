import { DocumentData } from "firebase/firestore";
import { IRoom } from "../domain/Room";

export const RoomParseData = (payload: DocumentData): IRoom | null => {
  const data = payload.data() as IRoom;

  if (!data) return null;

  return {
    id: data.id,
    //  editaveis
    name: data.name,
    //  fixos
    roomInGame: data.roomInGame,
    roomShowCards: data.roomShowCards ?? 0,
    roomLogs: data.roomLogs ?? [],
    timestamp: data.timestamp,
    players: data.players,
    ownerId: data.ownerId,
    // playersPending: data.playersPending,
    // playersVisiting: data.playersVisiting,
    // userPlayersIds: data.userPlayersIds,
  };
};
