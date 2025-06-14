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
exports.ObituaryInfoService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const obituary_info_entity_1 = require("./entities/obituary-info.entity");
const sequelize_1 = require("sequelize");
let ObituaryInfoService = class ObituaryInfoService {
    constructor(obituaryInfoRepository) {
        this.obituaryInfoRepository = obituaryInfoRepository;
    }
    async findAll(pageOptions, user_id) {
        let condition = {
            user_id,
            deleted_on: null,
        };
        if (pageOptions?.year) {
            condition['birth_date'] = {
                [sequelize_1.Op.gte]: new Date(`${+pageOptions.year}-01-01`),
                [sequelize_1.Op.lt]: new Date(`${+pageOptions.year + 1}-01-01`),
            };
        }
        const params = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: obituary_info_entity_1.default.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['list'],
        };
        return await this.obituaryInfoRepository.paginate(params);
    }
    async findOne(id) {
        return await this.obituaryInfoRepository
            .scope(['list'])
            .findOne({
            where: {
                deleted_on: null,
                id,
            },
        });
    }
    async create(input, created_by) {
        return await this.obituaryInfoRepository.create({
            ...input,
            created_by,
        });
    }
    async update(id, input, updated_by) {
        return await this.obituaryInfoRepository.update({
            ...input,
            updated_by,
            updated_on: new Date(),
        }, {
            where: { id },
            returning: true,
        });
    }
    async delete(id, user_id) {
        await this.obituaryInfoRepository.update({
            deleted_on: new Date(),
            deleted_by: user_id,
        }, {
            where: { id },
        });
    }
};
exports.ObituaryInfoService = ObituaryInfoService;
exports.ObituaryInfoService = ObituaryInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TABLES.OBITUARY_INFO)),
    __metadata("design:paramtypes", [Object])
], ObituaryInfoService);
//# sourceMappingURL=obituary-info.service.js.map