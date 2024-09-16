import { IMemoryAbstract, IMemoryData, IMemoryCreate, IMemoryUpdate } from './_types'

export const useMemory = (memory: IMemoryAbstract) => {
  memory.setMemoryName('user-data')

  return {
    has: (): boolean => {
      return !!memory.get();
    },
    get: (): IMemoryData | null => {
      return memory.get<IMemoryData>();
    },
    create: ({ uid, displayName }: IMemoryCreate): IMemoryData => {
      return memory.create<IMemoryData>({ uid, displayName });
    },
    update: ({ uid, displayName }: IMemoryUpdate): IMemoryData => {
      return memory.update<IMemoryData>({ uid, displayName });
    },
    delete: (): void => {
      return memory.delete();
    },
  };
}
