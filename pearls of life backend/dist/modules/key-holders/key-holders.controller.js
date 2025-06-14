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
exports.KeyHoldersController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const auth_guard_1 = require("../../common/guards/auth.guard");
const key_holders_service_1 = require("./key-holders.service");
const filter_key_holders_dto_1 = require("./dtos/filter-key-holders.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs = require("fs");
const path = require("path");
const constants_1 = require("../../common/constants");
const app_utils_1 = require("../../common/utils/app.utils");
const email_service_1 = require("../email/email.service");
const users_service_1 = require("../users/users.service");
let KeyHoldersController = class KeyHoldersController {
    constructor(keyHoldersService, userService, emailService) {
        this.keyHoldersService = keyHoldersService;
        this.userService = userService;
        this.emailService = emailService;
    }
    findAll(filterKeyHoldersDto, user) {
        return this.keyHoldersService.findAll(filterKeyHoldersDto, user.user_id);
    }
    findAllByUserId(filterKeyHoldersDto, user_id, user) {
        return this.keyHoldersService.findAll(filterKeyHoldersDto, user_id);
    }
    async create(file, user, req, body) {
        let parsedBody = JSON.parse(body);
        parsedBody.user_id = user.user_id;
        const keyHolder = await this.keyHoldersService.create(parsedBody, user.user_id);
        const userDetails = await this.userService.findOne(user.user_id);
        this.emailService.sendKeyHolderRegistrationEmail(keyHolder, `${userDetails?.first_name} ${userDetails?.last_name}`);
        if (file) {
            const finalFolder = `${constants_1.KEY_HOLDERS_BASE_PATH}/${user?.user_id}/${keyHolder.id}`;
            if (!fs.existsSync(finalFolder)) {
                fs.mkdirSync(finalFolder, { recursive: true });
            }
            const targetPath = path.join(finalFolder, file.filename);
            fs.renameSync(file.path, targetPath);
            const filePath = `${constants_1.KEY_HOLDERS_BASE_PATH}/${user.user_id}/${keyHolder.id}/${file.originalname}`;
            await this.keyHoldersService.updateKeyHolderImage(keyHolder.id, filePath, user.user_id);
            keyHolder['image_path'] = filePath;
        }
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_CREATED_SUCCESSFULLY, keyHolder);
    }
    async findOne(id) {
        const keyHolder = await this.keyHoldersService.findOne(id);
        if (!keyHolder) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        return keyHolder;
    }
    async delete(id, user) {
        const isExists = await this.keyHoldersService.findOne(id);
        if (!isExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        this.keyHoldersService.delete(id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_DELETED_SUCCESSFULLY);
    }
};
exports.KeyHoldersController = KeyHoldersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_key_holders_dto_1.FilterKeyHoldersDto, Object]),
    __metadata("design:returntype", void 0)
], KeyHoldersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:user_id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_key_holders_dto_1.FilterKeyHoldersDto, String, Object]),
    __metadata("design:returntype", Promise)
], KeyHoldersController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './temp',
            filename: (req, file, callback) => {
                callback(null, file?.originalname);
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
], KeyHoldersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeyHoldersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KeyHoldersController.prototype, "delete", null);
exports.KeyHoldersController = KeyHoldersController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    (0, common_1.Controller)('key-holders'),
    __metadata("design:paramtypes", [key_holders_service_1.KeyHoldersService,
        users_service_1.UsersService,
        email_service_1.EmailService])
], KeyHoldersController);
//# sourceMappingURL=key-holders.controller.js.map