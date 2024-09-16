import { IGeteway } from "src/@core/infra/gateway/types";

export const HasUserByUIDService = (geteway: IGeteway) => (uid: string) => {
  geteway.setCollection("users");

  return geteway.exist('uid', uid);
}
