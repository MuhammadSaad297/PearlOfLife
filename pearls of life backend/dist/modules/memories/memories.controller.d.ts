import { FilterMemoryFoldersDto } from './dtos/filter-memory-folders.dto';
import { MemoriesService } from './memories.service';
import { CreateMemoryFoldersDto } from './dtos/create-memory-folder.dto';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { FilterMemoriesDto } from './dtos/filter-memories.dto';
export declare class MemoriesController {
    private readonly memoriesService;
    private readonly imageUploadService;
    constructor(memoriesService: MemoriesService, imageUploadService: ImageUploadService);
    findAll(filterMemoryFoldersDto: FilterMemoryFoldersDto, user: any): Promise<import("../../common/dtos/paginate.dto").PaginateDto<import("./entities/memory-folders.entity").default>>;
    createFolder(createMemoryFoldersDto: CreateMemoryFoldersDto, user: any): Promise<ResponseMessageOutput<any>>;
    createMemory(file: Express.Multer.File, user: any, req: any, body: any): Promise<ResponseMessageOutput>;
    findMemoriesByFolder(filterMemoriesDto: FilterMemoriesDto, user: any): Promise<import("../../common/providers/paginated-model.provider").PaginatedResult<import("./entities/memories.entity").default>>;
}
