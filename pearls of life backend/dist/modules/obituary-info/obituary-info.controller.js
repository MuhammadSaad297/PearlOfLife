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
exports.ObituaryInfoController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const auth_guard_1 = require("../../common/guards/auth.guard");
const app_utils_1 = require("../../common/utils/app.utils");
const create_obituary_info_dto_1 = require("./dtos/create-obituary-info.dto");
const filter_obituary_info_dto_1 = require("./dtos/filter-obituary-info.dto");
const obituary_info_service_1 = require("./obituary-info.service");
let ObituaryInfoController = class ObituaryInfoController {
    constructor(obituaryInfoService) {
        this.obituaryInfoService = obituaryInfoService;
    }
    findAll(filterObituaryInfoDto, user) {
        return this.obituaryInfoService.findAll(filterObituaryInfoDto, user.user_id);
    }
    async findOne(id) {
        const obituaryInfo = await this.obituaryInfoService.findOne(id);
        if (!obituaryInfo) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        return obituaryInfo;
    }
    async create(createObituaryInfoDto, user) {
        const obituaryInfo = await this.obituaryInfoService.create({ ...createObituaryInfoDto, user_id: user.user_id }, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_CREATED_SUCCESSFULLY, obituaryInfo);
    }
    async update(id, updateObituaryInfoDto, user) {
        const isExists = await this.obituaryInfoService.findOne(id);
        if (!isExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        const [, [updatedObituaryInfo]] = await this.obituaryInfoService.update(id, updateObituaryInfoDto, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_UPDATED_SUCCESSFULLY, updatedObituaryInfo);
    }
    async delete(id, user) {
        const isExists = await this.obituaryInfoService.findOne(id);
        if (!isExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        await this.obituaryInfoService.delete(id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_DELETED_SUCCESSFULLY);
    }
};
exports.ObituaryInfoController = ObituaryInfoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_obituary_info_dto_1.FilterObituaryInfoDto, Object]),
    __metadata("design:returntype", void 0)
], ObituaryInfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObituaryInfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_obituary_info_dto_1.CreateObituaryInfoDto, Object]),
    __metadata("design:returntype", Promise)
], ObituaryInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ObituaryInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ObituaryInfoController.prototype, "delete", null);
exports.ObituaryInfoController = ObituaryInfoController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    (0, common_1.Controller)('obituary-info'),
    __metadata("design:paramtypes", [obituary_info_service_1.ObituaryInfoService])
], ObituaryInfoController);
//# sourceMappingURL=obituary-info.controller.js.map