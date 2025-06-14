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
exports.ImageUploadService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const path_1 = require("path");
let ImageUploadService = class ImageUploadService {
    constructor(imageCategoryRepository, imageDetailsRepository, imageFoldersRepository) {
        this.imageCategoryRepository = imageCategoryRepository;
        this.imageDetailsRepository = imageDetailsRepository;
        this.imageFoldersRepository = imageFoldersRepository;
    }
    async getImageCategoryByName(name) {
        const imageCategory = await this.imageCategoryRepository.findOne({
            where: {
                name: name
            }
        });
        return imageCategory;
    }
    async removeImageDetails(user_id, category_name) {
        const imageCategory = await this.getImageCategoryByName(category_name);
        await this.imageDetailsRepository.update({
            updated_on: new Date(),
            updated_by: user_id,
            deleted_on: new Date(),
            deleted_by: user_id
        }, {
            where: {
                user_id: user_id,
                image_category_id: imageCategory.id
            },
            returning: true
        });
    }
    async addImageDetails(file, user_id, category_name, image_path) {
        const imageCategory = await this.getImageCategoryByName(category_name);
        const payload = {
            user_id: user_id,
            image_category_id: imageCategory.id,
            image_path: image_path,
            image_file_name: file.originalname,
            image_ext: (0, path_1.extname)(file.originalname),
            created_by: user_id,
        };
        const imageDetails = await this.imageDetailsRepository.create(payload);
        return imageDetails;
    }
    async getImageDetails(user_id, category_name) {
        const imageCategory = await this.getImageCategoryByName(category_name);
        const imageDetails = await this.imageDetailsRepository.findOne({
            where: {
                user_id: user_id,
                image_category_id: imageCategory.id,
                deleted_on: null
            }
        });
        return imageDetails;
    }
};
exports.ImageUploadService = ImageUploadService;
exports.ImageUploadService = ImageUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TABLES.IMAGE_CATEGORIES)),
    __param(1, (0, common_1.Inject)(constants_1.TABLES.IMAGE_DETAILS)),
    __param(2, (0, common_1.Inject)(constants_1.TABLES.IMAGE_FOLDERS)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ImageUploadService);
//# sourceMappingURL=image-upload.service.js.map