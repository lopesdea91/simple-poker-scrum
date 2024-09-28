import dayjs from "dayjs";
import { DocumentData, where } from "firebase/firestore";

import { IGeteway } from "src/@core/infra/gateway/types";
import { UserParseData } from "src/@core/utils/userParseData";

export const MakeUserOfflineService = (geteway: IGeteway) => async (uid: string) => {
  geteway.setCollection("users");

  /** FIND DOC BY UID */
  const [doc] = await geteway.get<DocumentData[]>(where('uid', '==', uid))

  /** PARSE DOC TO USER_DATA */
  const data = UserParseData(doc)

  /** SET KEY ONLINE=FALSE */
  geteway.put(data!.id, {
    ...data,
    online: false,
    updated_at: dayjs().unix()
  })
}
