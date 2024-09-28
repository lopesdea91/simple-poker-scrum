import { where } from "firebase/firestore";
import dayjs from "dayjs";

import { IRoom } from "src/@core/domain/Room";
import { IGeteway } from "src/@core/infra/gateway/types";
import { RoomParseData } from "src/@core/utils/roomParseData";

type IPayload = Omit<IRoom, 'timestamp'> & {}

export const UpdateRoomService = (geteway: IGeteway) => async (payload: IPayload) => {
  geteway.setCollection("rooms");

  /** PAYLOAD UPDATE */
  const body: IRoom = {
    ...payload,
    timestamp: dayjs().unix()
  }
  

  /** UPDATE ID */
  const [currentDoc] = (
    await geteway.get<IRoom[]>(where('id', '==', body.id))
  ).map(RoomParseData)

  await geteway.put(currentDoc!.id, { ...body });


  /** RETURN PAYLOAD WITH FULL DATA */
  return currentDoc
}
