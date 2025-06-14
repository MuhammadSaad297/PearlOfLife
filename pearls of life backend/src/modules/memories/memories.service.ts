import { Inject, Injectable } from '@nestjs/common';
import { PaginatedOptions } from 'src/common/providers/paginated-model.provider';
import { FilterMemoryFoldersDto } from './dtos/filter-memory-folders.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import MemoryFolders from './entities/memory-folders.entity';
import { TABLES } from 'src/common/constants';
import { CreateMemoryFoldersDto } from './dtos/create-memory-folder.dto';
import Memories from './entities/memories.entity';
import { CreateMemoryDto } from './dtos/create-memory.dto';
import { FilterMemoriesDto } from './dtos/filter-memories.dto';

@Injectable()
export class MemoriesService {

    constructor(
        @Inject(TABLES.MEMORY_FOLDERS)
        private readonly memoryFoldersRepository: typeof MemoryFolders,
        @Inject(TABLES.MEMORIES)
        private readonly memoriesRepository: typeof Memories
    ) { }

    async findAllFolders(
        pageOptions: FilterMemoryFoldersDto,
        user_id: string
    ): Promise<PaginateDto<MemoryFolders>> {

        let condition = {
            user_id,
            deleted_on: null
        };

        const params: PaginatedOptions = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: MemoryFolders.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['list']
        }
        const memoryFolders = await this.memoryFoldersRepository.paginate(params);
        return memoryFolders;
    }

    // async findFolderById(id: string): Promise<MemoryFolders> {
    //     const memoryFolder = await this.memoryFoldersRepository
    //         .scope(['list'])
    //         .findOne<MemoryFolders>({
    //             where: {
    //                 deleted_on: null,
    //                 id
    //             }
    //         });
    //     return memoryFolder;
    // }

    async findFolderByName(folder_name: string, user_id: string): Promise<MemoryFolders> {
        const memoryFolder = await this.memoryFoldersRepository
            .scope(['list'])
            .findOne<MemoryFolders>({
                where: {
                    deleted_on: null,
                    folder_name,
                    user_id
                }
            });
        return memoryFolder;
    }

    async createFolder(input: CreateMemoryFoldersDto, created_by: string): Promise<MemoryFolders> {
        console.log({ input })
        const memoryFolder = await this.memoryFoldersRepository.create<MemoryFolders>({ ...input, created_by });
        return memoryFolder;
    }

    async createMemory(input: CreateMemoryDto, created_by: string): Promise<Memories> {
        const memory = await this.memoriesRepository.create<Memories>({ ...input, created_by });
        return memory;
    }

    async findMemoriesByFolder(pageOptions: FilterMemoriesDto, user_id: string) {

        let condition = {
            user_id,
            deleted_on: null
        };

        if (pageOptions?.folder_id) {
            condition['folder_id'] = pageOptions.folder_id;
        }

        const params: PaginatedOptions = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: Memories.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['full360']
        }
        const memoryFolders = await this.memoriesRepository.paginate(params);
        return memoryFolders;
    }

    // async updateKeyHolderImage(id, image_path, updated_by) {
    //     const keyHolder = await this.keyHoldersRepository.update({
    //         image_path: image_path,
    //         updated_on: new Date(),
    //         updated_by: updated_by
    //     }, {
    //         where: {
    //             id
    //         },
    //         returning: true
    //     });
    //     return keyHolder?.[1]?.[0]?.dataValues;
    // }

}
