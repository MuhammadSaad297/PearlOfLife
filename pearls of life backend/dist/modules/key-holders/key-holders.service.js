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
exports.KeyHoldersService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const key_holders_entity_1 = require("./entities/key-holders.entity");
let KeyHoldersService = class KeyHoldersService {
    constructor(keyHoldersRepository) {
        this.keyHoldersRepository = keyHoldersRepository;
    }
    async findAll(pageOptions, user_id) {
        let condition = {
            user_id,
            deleted_on: null
        };
        const params = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: key_holders_entity_1.default.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['list']
        };
        const keyHolders = await this.keyHoldersRepository.paginate(params);
        return keyHolders;
    }
    async create(input, created_by) {
        const token_url = (0, constants_1.generateRandomAlphanumeric)(constants_1.TOKEN_URL_LENGTH);
        const pin = (0, constants_1.generateRandomAlphanumeric)(constants_1.TOKEN_PIN_LENGTH);
        const keyHolder = await this.keyHoldersRepository.create({ ...input, created_by, token_url, pin });
        return keyHolder;
    }
    async updateKeyHolderImage(id, image_path, updated_by) {
        const keyHolder = await this.keyHoldersRepository.update({
            image_path: image_path,
            updated_on: new Date(),
            updated_by: updated_by
        }, {
            where: {
                id
            },
            returning: true
        });
        return keyHolder?.[1]?.[0]?.dataValues;
    }
    async findOne(id) {
        const keyHolder = await this.keyHoldersRepository
            .scope(['list'])
            .findOne({
            where: {
                deleted_on: null,
                id
            }
        });
        return keyHolder;
    }
    async findOneByTokenURL(token_url) {
        const keyHolder = await this.keyHoldersRepository
            .scope(['list'])
            .findOne({
            where: {
                deleted_on: null,
                token_url
            }
        });
        return keyHolder;
    }
    async findOneByTokenAndPin(creds) {
        const keyHolder = await this.keyHoldersRepository
            .scope(['list'])
            .findOne({
            where: {
                deleted_on: null,
                token_url: creds.token_url,
                pin: creds.pin
            }
        });
        return keyHolder;
    }
    async delete(id, user_id) {
        await this.keyHoldersRepository.update({
            deleted_on: new Date(),
            deleted_by: user_id
        }, {
            where: {
                id
            }
        });
    }
};
exports.KeyHoldersService = KeyHoldersService;
exports.KeyHoldersService = KeyHoldersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TABLES.KEY_HOLDERS)),
    __metadata("design:paramtypes", [Object])
], KeyHoldersService);
//# sourceMappingURL=key-holders.service.js.map