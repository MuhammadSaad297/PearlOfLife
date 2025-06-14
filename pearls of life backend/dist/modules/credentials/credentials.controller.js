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
exports.CredentialsController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const credentials_service_1 = require("./credentials.service");
const filter_credentials_dto_1 = require("./dtos/filter-credentials.dto");
const create_credentials_dto_1 = require("./dtos/create-credentials.dto");
const constants_1 = require("../../common/constants");
const app_utils_1 = require("../../common/utils/app.utils");
const update_credentials_dto_1 = require("./dtos/update-credentials.dto");
const auth_guard_1 = require("../../common/guards/auth.guard");
let CredentialsController = class CredentialsController {
    constructor(credentialsService) {
        this.credentialsService = credentialsService;
    }
    findAll(filterCredentialsDto, user) {
        return this.credentialsService.findAll(filterCredentialsDto, user.user_id);
    }
    findAllByUserId(filterCredentialsDto, user_id) {
        return this.credentialsService.findAll(filterCredentialsDto, user_id);
    }
    async create(input, user) {
        if (!input?.user_id) {
            input['user_id'] = user.user_id;
        }
        const creds = await this.credentialsService.create(input, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_CREATED_SUCCESSFULLY, creds);
    }
    async update(id, input, user) {
        const isRecordExists = await this.credentialsService.findOne(id);
        if (!isRecordExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        const creds = await this.credentialsService.update(input, id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_UPDATED_SUCCESSFULLY, creds);
    }
    async delete(id, user) {
        const isRecordExists = await this.credentialsService.findOne(id);
        if (!isRecordExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        await this.credentialsService.delete(id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_DELETED_SUCCESSFULLY, null);
    }
};
exports.CredentialsController = CredentialsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_credentials_dto_1.FilterCredentialsDto, Object]),
    __metadata("design:returntype", void 0)
], CredentialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:user_id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_credentials_dto_1.FilterCredentialsDto, String]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credentials_dto_1.CreateCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_credentials_dto_1.UpdateCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "delete", null);
exports.CredentialsController = CredentialsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    (0, common_1.Controller)('credentials'),
    __metadata("design:paramtypes", [credentials_service_1.CredentialsService])
], CredentialsController);
//# sourceMappingURL=credentials.controller.js.map