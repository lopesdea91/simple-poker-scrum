import {
  ICreateData,
  ICreatePayload,
  IUpdateData,
  IUpdatePayload,
} from "./rooms.types";

export const parseCreatePayload = (payload: ICreatePayload): ICreateData => ({
  name: payload.name,
  roomInGame: 0,
  roomShowCards: 0,
  roomLogs: [],
  players: [],
  playersPending: [],
  playersVisiting: [],
  userOwnerId: payload.userOwnerId,
  userPlayersIds: [payload.userOwnerId],
});

export const parseUpdatePayload = (payload: IUpdatePayload): IUpdateData => ({
  name: payload.name,
  roomInGame: payload.roomInGame,
  roomLogs: payload.roomLogs,
  roomShowCards: payload.roomShowCards,
  players: payload.players,
  playersPending: payload.playersPending,
  playersVisiting: payload.playersVisiting,
  userOwnerId: payload.userOwnerId,
  userPlayersIds: payload.userPlayersIds,
});
