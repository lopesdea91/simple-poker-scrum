import { IUser } from "@core/domain/User";
import { User } from "firebase/auth";

interface UserDtoPayload extends User {
  id: string;
}
export default function UserDto(payload: Partial<UserDtoPayload>): IUser {
  const { id, uid, displayName, photoURL } = payload;

  return {
    id: id ?? "",
    uid: uid ?? "",
    displayName: displayName ?? "",
    photoURL: photoURL ?? "",
  };
}
