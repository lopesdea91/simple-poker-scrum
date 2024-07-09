export interface IMemory {
  setMemoryName: (name: string) => void;
  get: <T>() => T;
  create: <T>(payload: T) => T;
  update: <T>(payload: T) => T;
  delete: () => void;
}
