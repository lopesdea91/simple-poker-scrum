import { IRoomPlayer, IRoomPlayerGame } from "@core/domain/Rooms";

export default function PlayerGameDto(data: IRoomPlayer): IRoomPlayerGame {
  return { ...data, value: "" };
}
