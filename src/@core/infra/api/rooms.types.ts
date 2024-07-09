import { IRoom } from "@core/domain/Rooms";
import { QueryCompositeFilterConstraint, QueryFieldFilterConstraint } from "firebase/firestore";

export type IQueryPayload =
  | QueryCompositeFilterConstraint
  | QueryFieldFilterConstraint;

export type ICreatePayload = {
  name: IRoom["name"];
  // roomInGame: IRoom["roomInGame"];
  // players: IRoom["players"];
  // playersPending: IRoom["playersPending"];
  // playersVisiting: IRoom["playersVisiting"];
  userOwnerId: IRoom["userOwnerId"];
  // userPlayersIds: IRoom["userPlayersIds"];
};

export type ICreateData = Omit<IRoom, "id">;

export type IUpdatePayload = {
  name: IRoom["name"];
  roomInGame: IRoom["roomInGame"];
  roomLogs: IRoom["roomLogs"];
  roomShowCards: IRoom["roomShowCards"];
  players: IRoom["players"];
  playersPending: IRoom["playersPending"];
  playersVisiting: IRoom["playersVisiting"];
  userOwnerId: IRoom["userOwnerId"];
  userPlayersIds: IRoom["userPlayersIds"];
};

export type IUpdateData = Omit<IRoom, "id">;
