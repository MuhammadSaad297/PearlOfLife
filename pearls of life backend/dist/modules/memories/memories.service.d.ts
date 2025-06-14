import { FilterMemoryFoldersDto } from './dtos/filter-memory-folders.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import MemoryFolders from './entities/memory-folders.entity';
import { CreateMemoryFoldersDto } from './dtos/create-memory-folder.dto';
import Memories from './entities/memories.entity';
import { CreateMemoryDto } from './dtos/create-memory.dto';
import { FilterMemoriesDto } from './dtos/filter-memories.dto';
export declare class MemoriesService {
    private readonly memoryFoldersRepository;
    private readonly memoriesRepository;
    constructor(memoryFoldersRepository: typeof MemoryFolders, memoriesRepository: typeof Memories);
    findAllFolders(pageOptions: FilterMemoryFoldersDto, user_id: string): Promise<PaginateDto<MemoryFolders>>;
    findFolderByName(folder_name: string, user_id: string): Promise<MemoryFolders>;
    createFolder(input: CreateMemoryFoldersDto, created_by: string): Promise<MemoryFolders>;
    createMemory(input: CreateMemoryDto, created_by: string): Promise<Memories>;
    findMemoriesByFolder(pageOptions: FilterMemoriesDto, user_id: string): Promise<import("src/common/providers/paginated-model.provider").PaginatedResult<Memories>>;
}
