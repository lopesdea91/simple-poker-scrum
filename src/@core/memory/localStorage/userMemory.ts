import { IMemory } from "@core/memory/types";

import { ICreateMemory, IUpdateMemory } from "./useMemory.types";
import { IUserMemory } from "@core/domain/UserMemory";

export default function userMemory(memory: IMemory) {
  memory.setMemoryName("user-data");

  return {
    has: (): boolean => {
      return !!memory.get();
    },
    get: (): IUserMemory => {
      return memory.get<IUserMemory>();
    },
    create: (payload: ICreateMemory): IUserMemory => {
      return memory.create<IUserMemory>(payload);
    },
    update: (payload: IUpdateMemory): IUserMemory => {
      return memory.update<IUserMemory>(payload);
    },
    delete: (): void => {
      return memory.delete();
    },
  };
}
