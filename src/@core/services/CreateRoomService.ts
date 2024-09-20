import { where } from "firebase/firestore";
import dayjs from "dayjs";

import { IRoom } from "src/@core/domain/Room";
import { IGeteway } from "src/@core/infra/gateway/types";
import { RoomParseData } from "src/@core/utils/roomParseData";

type IPayload = Omit<IRoom, 'id' | 'roomInGame' | 'roomShowCards' | 'players' | 'roomLogs' | 'timestamp'> & {}

export const CreateRoomService = (geteway: IGeteway) => async (payload: IPayload) => {
  geteway.setCollection("rooms");

  /** PAYLOAD CREATE */
  const body: IRoom = {
    ...payload,
    id: '',
    roomInGame: 0,
    roomShowCards: 0,
    players: [],
    roomLogs: [],
    timestamp: dayjs().unix()
  }

  /** CREATE */
  await geteway.post(body)

  /** UPDATE ID */
  const [currentDoc] = (
    await geteway.get<IRoom[]>(where('name', '==', body.name))
  ).map(RoomParseData)

  geteway.put(currentDoc!.id, { ...payload, id: currentDoc!.id });

  /** RETURN PAYLOAD WITH FULL DATA */
  return currentDoc
}
