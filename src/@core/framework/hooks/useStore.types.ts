import { IUser } from "@core/domain/User";

export interface IStoreData {
  initialApp: boolean;
  loading: boolean;
  auth: {
    logged: boolean;
  };
  user: Partial<IUser>;
}
export interface IStore extends IStoreData {
  setData: (args: Partial<IStoreData>) => void;
  resetData: () => void;
}
