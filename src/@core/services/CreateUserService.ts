import { where } from "firebase/firestore";
import { IUser } from "src/@core/domain/User";
import { IGeteway } from "src/@core/infra/gateway/types";
import { UserParseData } from "src/@core/utils/userParseData";
import dayjs from "dayjs";

type IPayload = Omit<IUser, 'id' | 'online' | 'updated_at'> & {}

export const CreateUserService = (geteway: IGeteway) => async (payload: IPayload) => {
  geteway.setCollection("users");

  /** PAYLOAD CREATE */
  const body: IUser = {
    ...payload,
    id: '',
    online: true,
    updated_at: dayjs().unix()
  }

  /** CREATE */
  await geteway.post(body)

  /** UPDATE ID */
  const [currentDoc] = (
    await geteway.get<IUser[]>(where('uid', '==', body.uid))
  ).map(UserParseData)

  geteway.put(currentDoc!.id, { ...payload, id: currentDoc!.id });


  /** RETURN PAYLOAD WITH FULL DATA */
  return currentDoc
}
