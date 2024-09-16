import { where } from "firebase/firestore";
import { IUser } from "src/@core/domain/User";
import { IGeteway } from "src/@core/infra/gateway/types";
import { UserParseData } from "src/@core/utils/userParseData";

type IPayload = Omit<IUser, 'id' | 'online'> & {}

export const CreateUserService = (geteway: IGeteway) => async (payload: IPayload) => {
  geteway.setCollection("users");

  /** PAYLOAD CREATE */
  const body: IUser = {
    ...payload,
    id: '',
    online: true,
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
