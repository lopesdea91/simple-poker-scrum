import { UserCredential } from "firebase/auth";
import { IUserProvider } from "../domain/UserProvider";

export const UserProviderParseData = (payload: UserCredential['user']): IUserProvider => {
  return {
    uid: payload.uid,
    displayName: payload.displayName ?? '',
    photoURL: payload.photoURL ?? ''
  };
};
