import { Provider } from "@nestjs/common";
import { TABLES } from "src/common/constants";
import MemoryFolders from "./entities/memory-folders.entity";
import Memories from "./entities/memories.entity";

export const memoryFolderProvider: Provider[] = [
    {
        provide: TABLES.MEMORY_FOLDERS,
        useValue: MemoryFolders
    },
    {
        provide: TABLES.MEMORIES,
        useValue: Memories
    }
]