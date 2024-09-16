import { IRoom } from "src/@core/domain/Room";
import { IGeteway } from "src/@core/infra/gateway/types";
import { RoomParseData } from "src/@core/utils/roomParseData";

export const GetRoomService = (geteway: IGeteway) => (callback: (room: IRoom[]) => void) => {
  geteway.setCollection("users");

  return geteway.syncList((docs) => {
    const rooms: IRoom[] = []

    docs.map((doc) => RoomParseData(doc)!)
      .sort((a, b) => a.timestamp > b.timestamp ? 1 : 0)
      .forEach(room => rooms.push(room))

    callback(rooms)
  });
}
