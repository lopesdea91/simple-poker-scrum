import { create } from "zustand";

interface IStoreData {
  logged: boolean;
  user: {
    name: string;
    image_path: string;
  };
}
interface IStore extends IStoreData {
  setData: (p: IStoreData) => void;
}
const storeData: IStoreData = {
  logged: false,
  user: {
    name: "",
    image_path: "",
  },
};
const useStoreCore = create<IStore>((set) => ({
  ...storeData,
  setData: (args) => set((state) => ({ ...state, ...args })),
}));

export const useStore = () => {
  const storeCore = useStoreCore();

  function setLogged(logged: IStoreData["logged"]) {
    storeCore.setData({ ...storeCore, logged });
  }
  function setUser(user: IStoreData["user"]) {
    storeCore.setData({ ...storeCore, user });
  }

  return {
    logged: storeCore.logged,
    setLogged,
    user: storeCore.user,
    setUser,
  };
};
