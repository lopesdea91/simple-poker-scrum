import { where } from "firebase/firestore";
import { IUser } from "src/@core/domain/User";
import { IGeteway } from "src/@core/infra/gateway/types";
import { UserParseData } from "src/@core/utils/userParseData";

export const GetUserByUIDService = (geteway: IGeteway) => async (uid: string) => {
  geteway.setCollection("users");

  const docs = await geteway.get<IUser[]>(where('uid', '==', uid));

  const [doc] = docs.map(UserParseData)

  return doc
}
