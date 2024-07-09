export interface IRoomPlayer {
  uid: string;
  displayName: string;
  photoURL: string;
}
export interface IRoomPlayerGame extends IRoomPlayer {
  value: string;
}

export interface IRoom {
  id: string;
  name: string;
  roomInGame: 1 | 0;
  roomShowCards: 1 | 0;
  roomLogs: string[];
  players: IRoomPlayerGame[];       // usuários jogando
  playersPending: IRoomPlayer[];    // usuários esperando para entrar na sala
  playersVisiting: IRoomPlayer[];   // usuários já disponivel na sala
  userOwnerId: string;              // usuário criados da sala
  userPlayersIds: string[];         // usuários com acesso a sala
}
