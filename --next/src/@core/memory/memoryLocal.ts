import { IMemory } from "./types";

const MemoryLocal = (): IMemory => {
  let key: string = "";

  return {
    setMemoryName: (payload) => {
      key = payload;
    },
    get: <T>() => {
      const data = window.localStorage.getItem(key);

      return (data ? JSON.parse(data) : null) as T;
    },
    create: <T>(payload: T) => {
      const value = JSON.stringify(payload);
      window.localStorage.setItem(key, value);

      return payload as T;
    },
    update: <T>(payload: T) => {
      const localData = window.localStorage.getItem(key);
      const data = JSON.parse(localData!);
      const mergeData = { ...data, ...payload };

      window.localStorage.setItem(key, JSON.stringify(mergeData));

      return mergeData as T;
    },
    delete: () => {
      window.localStorage.removeItem(key);
    },
  };
};

export const memoryLocal = MemoryLocal();
