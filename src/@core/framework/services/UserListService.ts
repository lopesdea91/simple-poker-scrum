import { IUser } from "src/@core/domain/User";
import { IGeteway } from "src/@core/infra/gateway/types";
import { UserParseData } from "src/@core/utils/userParseData";

export const UserListService = (geteway: IGeteway) => (callback: (room: IUser[]) => void) => {
  geteway.setCollection("users");

  return geteway.syncList((docs) => {
    const usersOnline: IUser[] = []
    const usersOffOnline: IUser[] = []

    docs.map((doc) => UserParseData(doc)!)
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
      .forEach(user => {
        user.online
          ? usersOnline.push(user)
          : usersOffOnline.push(user)
      })

    callback([...usersOnline, ...usersOffOnline])
  });
}
