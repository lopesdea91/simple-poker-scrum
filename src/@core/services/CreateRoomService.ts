import { where } from "firebase/firestore";
import dayjs from "dayjs";

import { IRoom } from "src/@core/domain/Room";
import { IGeteway } from "src/@core/infra/gateway/types";
import { RoomParseData } from "src/@core/utils/roomParseData";
import { sleep } from "../utils/sleep";

type IPayload = Omit<IRoom, 'id' | 'roomInGame' | 'roomShowCards' | 'players' | 'roomLogs' | 'timestamp'> & {}

export const CreateRoomService = (geteway: IGeteway) => async (payload: IPayload) => {
  geteway.setCollection("rooms");

  const timestamp = dayjs().unix()
  const id_temp = `${payload.name}-${payload.ownerId}-${timestamp}`

  /** PAYLOAD CREATE */
  const body: IRoom = {
    ...payload,
    id: id_temp,
    roomInGame: 0,
    roomShowCards: 0,
    players: [],
    roomLogs: [],
    timestamp: timestamp
  }


  /** CREATE */
  await geteway.post(body)


  /** UPDATE ID */
  const [currentDoc] = (
    await geteway.get<IRoom[]>(where('id', '==', id_temp))
  ).map(RoomParseData)

  await geteway.put(currentDoc!.id, { ...payload, id: currentDoc!.id });

  
  /** RETURN PAYLOAD WITH FULL DATA */
  return currentDoc
}
