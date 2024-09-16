export interface IMemoryAbstract {
  setMemoryName: (name: string) => void;
  get: <T>() => T;
  create: <T>(payload: T) => T;
  update: <T>(payload: T) => T;
  delete: () => void;
}

export interface IMemoryData {
  uid: string;
  displayName: string;
}

export interface IMemoryCreate {
  uid: string;
  displayName: string;
}

export interface IMemoryUpdate {
  uid: string;
  displayName: string;
}
