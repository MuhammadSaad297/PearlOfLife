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
exports.PersonalInfoController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const users_service_1 = require("../users/users.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs = require("fs");
const constants_1 = require("../../common/constants");
const image_upload_service_1 = require("../image-upload/image-upload.service");
const app_utils_1 = require("../../common/utils/app.utils");
const update_user_dto_1 = require("../users/dtos/update-user.dto");
let PersonalInfoController = class PersonalInfoController {
    constructor(usersService, imageUploadService) {
        this.usersService = usersService;
        this.imageUploadService = imageUploadService;
    }
    async getPersonalInfo(user) {
        const userDetails = await this.usersService.getPersonalInfo(user.user_id);
        return userDetails;
    }
    async updatePerosnalInfo(updatePersonalInfo, user) {
        const userDetails = await this.usersService.update(updatePersonalInfo, user.user_id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_UPDATED_SUCCESSFULLY, userDetails);
    }
    async uploadProfilePic(file, user, res) {
        if (!file) {
            throw new common_1.BadRequestException('File upload failed');
        }
        await this.imageUploadService.removeImageDetails(user.user_id, constants_1.FILE_CATEGORIES.PROFILE_PIC);
        const imagepath = `${constants_1.PROFILE_PIC_BASE_PATH}/${user.user_id}/${file.originalname}`;
        const imageDetails = await this.imageUploadService.addImageDetails(file, user.user_id, constants_1.FILE_CATEGORIES.PROFILE_PIC, imagepath);
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalname}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        return res.sendFile(imageDetails.image_path, { root: './' });
    }
    async getProfilePic(user, res) {
        const imageDetails = await this.imageUploadService.getImageDetails(user.user_id, constants_1.FILE_CATEGORIES.PROFILE_PIC);
        res.setHeader('Content-Disposition', `attachment; filename="${imageDetails && imageDetails.image_file_name && 'default-user-image.png'}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        return res.sendFile(imageDetails?.image_path ?? './uploads/default/default-user-image.png', { root: './' });
    }
};
exports.PersonalInfoController = PersonalInfoController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonalInfoController.prototype, "getPersonalInfo", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], PersonalInfoController.prototype, "updatePerosnalInfo", null);
__decorate([
    (0, common_1.Post)('/upload-profile-pic'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const user = req?.user;
                const userFolder = `${constants_1.PROFILE_PIC_BASE_PATH}/${user?.user_id}`;
                if (!fs.existsSync(userFolder)) {
                    fs.mkdirSync(userFolder, { recursive: true });
                }
                callback(null, userFolder);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PersonalInfoController.prototype, "uploadProfilePic", null);
__decorate([
    (0, common_1.Get)('/profile-pic'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PersonalInfoController.prototype, "getProfilePic", null);
exports.PersonalInfoController = PersonalInfoController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    (0, common_1.Controller)('personal-info'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        image_upload_service_1.ImageUploadService])
], PersonalInfoController);
//# sourceMappingURL=personal-info.controller.js.map