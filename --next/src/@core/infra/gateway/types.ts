import { DocumentData } from "firebase/firestore";

export interface IGeteway {
  setCollection: (name: string) => void;
  get: <T>(queryData: any) => Promise<T>;
  getId: <T>(id: string) => Promise<T>;
  post: (payload: unknown) => Promise<void>;
  put: (id: string, payload: unknown) => Promise<void>;
  delete: (id: string) => Promise<void>;
  exist: (key: string, value: string) => Promise<boolean>;
  syncId: (id: string, callback: (doc: DocumentData) => void) => () => void;
  syncList: (callback: (doc: DocumentData[]) => void) => () => void;
}
