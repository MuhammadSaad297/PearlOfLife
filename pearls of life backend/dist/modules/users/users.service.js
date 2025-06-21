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
exports.UsersService = void 0;
const constants_1 = require("../../common/constants");
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./entities/users.entity");
const constants_2 = require("../../common/constants");
let UsersService = class UsersService {
    constructor(usersRepository, userPlansRepository) {
        this.usersRepository = usersRepository;
        this.userPlansRepository = userPlansRepository;
    }
    async validateUserCredentials(loginDto) {
        const user = await this.usersRepository.findOne({
            where: {
                email: loginDto.email,
                hashed_password: loginDto.hashed_password,
            },
        });
        return user;
    }
    async create(input) {
        const rndmNo = (0, constants_2.generateRandom4Digit)();
        return await this.usersRepository.create({
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            username: `${input.first_name}_${rndmNo}`,
            hashed_password: input.hashed_password,
            phone_number: input?.phone_number || null,
            date_of_birth: input?.date_of_birth || null,
        });
    }
    async findAll() {
        return await this.usersRepository.findAll();
    }
    async findOne(id) {
        const user = await this.usersRepository.scope(['list']).findOne({
            where: { id },
        });
        return user;
    }
    async update(input, id, updated_by = null) {
        const user = await this.usersRepository.update({
            ...input,
            updated_on: new Date(),
            updated_by: updated_by || id,
        }, {
            where: {
                id,
            },
            returning: true,
        });
        return user?.[1]?.[0]?.dataValues;
    }
    async findOneByEmail(email) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        return user;
    }
    async getPersonalInfo(id) {
        const user = await this.usersRepository
            .scope(['personal_info'])
            .findOne({
            where: { id },
        });
        return user;
    }
    async findPlanByUser(user_id) {
        const user_plan = await this.userPlansRepository
            .scope(['full360'])
            .findOne({
            where: { user_id },
        });
        return user_plan;
    }
    async updateResetToken(userId, resetToken, resetTokenExpiry) {
        await this.usersRepository.update({
            reset_token: resetToken,
            reset_token_expiry: resetTokenExpiry,
        }, {
            where: { id: userId },
        });
    }
    async findAllUsers(page = 1, limit = 10) {
        return await this.usersRepository.findAndCountAll({
            where: {
                role: 'user',
                deleted_on: null,
            },
            limit,
            offset: (page - 1) * limit,
            attributes: [...users_entity_1.default.attributes(), 'role'],
        });
    }
    async updateUserRole(userId, role) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        await this.usersRepository.update({ role }, { where: { id: userId } });
        return this.findOne(userId);
    }
    async deleteUser(userId, deletedBy) {
        return await this.usersRepository.update({
            deleted_on: new Date(),
            deleted_by: deletedBy,
        }, {
            where: { id: userId },
        });
    }
    async blockUser(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        await this.usersRepository.update({ is_active: false }, { where: { id: userId } });
        return this.findOne(userId);
    }
    async unblockUser(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        await this.usersRepository.update({ is_active: true }, { where: { id: userId } });
        return this.findOne(userId);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TABLES.USERS)),
    __param(1, (0, common_1.Inject)(constants_1.TABLES.USERPLANS)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map