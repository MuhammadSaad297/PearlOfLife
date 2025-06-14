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
exports.MemoriesController = void 0;
const common_1 = require("@nestjs/common");
const filter_memory_folders_dto_1 = require("./dtos/filter-memory-folders.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const memories_service_1 = require("./memories.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const create_memory_folder_dto_1 = require("./dtos/create-memory-folder.dto");
const app_utils_1 = require("../../common/utils/app.utils");
const constants_1 = require("../../common/constants");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs = require("fs");
const path = require("path");
const image_upload_service_1 = require("../image-upload/image-upload.service");
const filter_memories_dto_1 = require("./dtos/filter-memories.dto");
let MemoriesController = class MemoriesController {
    constructor(memoriesService, imageUploadService) {
        this.memoriesService = memoriesService;
        this.imageUploadService = imageUploadService;
    }
    findAll(filterMemoryFoldersDto, user) {
        return this.memoriesService.findAllFolders(filterMemoryFoldersDto, user.user_id);
    }
    async createFolder(createMemoryFoldersDto, user) {
        const isExists = await this.memoriesService.findFolderByName(createMemoryFoldersDto?.folder_name, createMemoryFoldersDto?.user_id ?? user.user_id);
        if (isExists) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'Folder already exists with this name.',
                error: 'Folder already exists - Forebidden'
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const folderDetails = {
            folder_name: createMemoryFoldersDto?.folder_name,
            user_id: createMemoryFoldersDto?.user_id ?? user?.user_id
        };
        const memoryFolder = await this.memoriesService.createFolder(folderDetails, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_CREATED_SUCCESSFULLY, memoryFolder);
    }
    async createMemory(file, user, req, body) {
        let parsedBody = JSON.parse(body);
        parsedBody.user_id = user.user_id;
        if (file) {
            const finalFolder = `${constants_1.MEMORIES_BASE_PATH}/${user.user_id}/${parsedBody.folder_id}`;
            if (!fs.existsSync(finalFolder)) {
                fs.mkdirSync(finalFolder, { recursive: true });
            }
            const targetPath = path.join(finalFolder, file.filename);
            fs.renameSync(file.path, targetPath);
            const filePath = `${constants_1.MEMORIES_BASE_PATH}/${user.user_id}/${parsedBody.folder_id}/${file.originalname}`;
            const imageDetails = await this.imageUploadService.addImageDetails(file, user.user_id, constants_1.FILE_CATEGORIES.MEMORIES, filePath);
            const memory = await this.memoriesService.createMemory({
                folder_id: parsedBody.folder_id,
                user_id: parsedBody.user_id || user.user_id,
                image_details_id: imageDetails.id,
                description: parsedBody.description || null,
                memory_date: parsedBody.date || null
            }, user.user_id);
            return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_CREATED_SUCCESSFULLY, memory);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'Invalid Request',
                error: 'Invalid Request - Forebidden'
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async findMemoriesByFolder(filterMemoriesDto, user) {
        const memories = await this.memoriesService.findMemoriesByFolder(filterMemoriesDto, user.user_id);
        if (!memories) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        return memories;
    }
};
exports.MemoriesController = MemoriesController;
__decorate([
    (0, common_1.Get)('folders'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_memory_folders_dto_1.FilterMemoryFoldersDto, Object]),
    __metadata("design:returntype", void 0)
], MemoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('folders'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_memory_folder_dto_1.CreateMemoryFoldersDto, Object]),
    __metadata("design:returntype", Promise)
], MemoriesController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const user = req?.user;
                const userFolder = `${constants_1.MEMORIES_BASE_PATH}/${user?.user_id}`;
                if (!fs.existsSync(userFolder)) {
                    fs.mkdirSync(userFolder, { recursive: true });
                }
                callback(null, userFolder);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MemoriesController.prototype, "createMemory", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_memories_dto_1.FilterMemoriesDto, Object]),
    __metadata("design:returntype", Promise)
], MemoriesController.prototype, "findMemoriesByFolder", null);
exports.MemoriesController = MemoriesController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    (0, common_1.Controller)('memories'),
    __metadata("design:paramtypes", [memories_service_1.MemoriesService,
        image_upload_service_1.ImageUploadService])
], MemoriesController);
//# sourceMappingURL=memories.controller.js.map