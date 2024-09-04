import { create } from "zustand";
import { IStore, IStoreData } from "./useStore.types";

const storeData: IStoreData = {
  initialApp: true,
  loading: false,
  auth: {
    logged: false,
  },
  user: {},
};
const Store = create<IStore>((set) => ({
  ...storeData,
  setData: (args) => set((state) => ({ ...state, ...args })),
  resetData: () => {
    set((state) => ({
      ...state,
      ...storeData,
      initialApp: true,
    }));
  },
}));
export const useStore = () => {
  const store = Store();

  // auth
  const setLogged = (logged: IStoreData["auth"]["logged"]) => {
    store.setData({ ...store, auth: { logged } });
  };

  // initialApp
  const setInitialApp = (initialApp: IStoreData["initialApp"]) => {
    store.setData({ ...store, initialApp });
  };

  // loading
  const setLoading = (loading: IStoreData["loading"]) => {
    store.setData({ ...store, loading });
  };

  // user
  const setUserData = (user: IStoreData["user"]) => {
    store.setData({ ...store, user });
  };
  const getUserId = (): string => {
    return store.user.uid!;
  };

  return {
    ...store,
    // auth
    setLogged,
    // initialApp
    setInitialApp,
    // loading
    setLoading,
    // user
    setUserData,
    getUserId,
  };
};
