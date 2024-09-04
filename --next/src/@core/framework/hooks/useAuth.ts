import {
  signInWithGoogle,
  signOutWithGoogle,
} from "@core/framework/lib/firebase";
import { useNavigate } from "react-router-dom";

import UserDto from "@core/dto/UserDto";
import { useStore } from "@core/framework/hooks/useStore";

export const useAuth = () => {
  const store = useStore();
  const navigate = useNavigate();

  const signIn = async () => {
    const result = await signInWithGoogle();

    store.setData({
      auth: { logged: true },
      user: UserDto(result.user),
      initialApp: false,
      loading: false,
    });
  };

  const signOut = async () => {
    await signOutWithGoogle();

    store.setData({
      auth: { logged: false },
      user: UserDto({}),
      initialApp: false,
      loading: false,
    });
  };

  const isAuthenticated = () => {
    if (!store.auth.logged) {
      navigate("/");
      store.resetData();
    }
  };

  return { signIn, signOut, isAuthenticated };
};
