"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoriesService = void 0;
const common_1 = require("@nestjs/common");
const memory_folders_entity_1 = require("./entities/memory-folders.entity");
const constants_1 = require("../../common/constants");
const memories_entity_1 = require("./entities/memories.entity");
let MemoriesService = class MemoriesService {
    constructor(memoryFoldersRepository, memoriesRepository) {
        this.memoryFoldersRepository = memoryFoldersRepository;
        this.memoriesRepository = memoriesRepository;
    }
    async findAllFolders(pageOptions, user_id) {
        let condition = {
            user_id,
            deleted_on: null
        };
        const params = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: memory_folders_entity_1.default.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['list']
        };
        const memoryFolders = await this.memoryFoldersRepository.paginate(params);
        return memoryFolders;
    }
    async findFolderByName(folder_name, user_id) {
        const memoryFolder = await this.memoryFoldersRepository
            .scope(['list'])
            .findOne({
            where: {
                deleted_on: null,
                folder_name,
                user_id
            }
        });
        return memoryFolder;
    }
    async createFolder(input, created_by) {
        console.log({ input });
        const memoryFolder = await this.memoryFoldersRepository.create({ ...input, created_by });
        return memoryFolder;
    }
    async createMemory(input, created_by) {
        const memory = await this.memoriesRepository.create({ ...input, created_by });
        return memory;
    }
    async findMemoriesByFolder(pageOptions, user_id) {
        let condition = {
            user_id,
            deleted_on: null
        };
        if (pageOptions?.folder_id) {
            condition['folder_id'] = pageOptions.folder_id;
        }
        const params = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: memories_entity_1.default.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['full360']
        };
        const memoryFolders = await this.memoriesRepository.paginate(params);
        return memoryFolders;
    }
};
exports.MemoriesService = MemoriesService;
exports.MemoriesService = MemoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TABLES.MEMORY_FOLDERS)),
    __param(1, (0, common_1.Inject)(constants_1.TABLES.MEMORIES)),
    __metadata("design:paramtypes", [Object, Object])
], MemoriesService);
//# sourceMappingURL=memories.service.js.map