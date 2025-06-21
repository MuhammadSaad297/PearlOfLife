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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dtos/login.dto");
const app_utils_1 = require("../../common/utils/app.utils");
const constants_1 = require("../../common/constants");
const register_dto_1 = require("./dtos/register.dto");
const users_service_1 = require("../users/users.service");
const jwt_helper_1 = require("../../common/helpers/jwt-helper");
const email_service_1 = require("../email/email.service");
const key_holders_service_1 = require("../key-holders/key-holders.service");
const keyholder_login_dto_1 = require("./dtos/keyholder-login.dto");
const forgot_password_dto_1 = require("./dtos/forgot-password.dto");
let AuthController = class AuthController {
    constructor(usersService, jwtHelper, emailService, keyHolderService) {
        this.usersService = usersService;
        this.jwtHelper = jwtHelper;
        this.emailService = emailService;
        this.keyHolderService = keyHolderService;
    }
    async register(input) {
        const isUserExists = await this.usersService.findOneByEmail(input.email);
        if (isUserExists) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'User already exists with this email.',
                error: 'User already registered - Forebidden',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.usersService.create(input);
        this.emailService.sendRegistrationEmail(user);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.ENTITLEMENTS.USER_REGISTERED, user);
    }
    async login(input, request) {
        const user = await this.usersService.validateUserCredentials(input);
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Invalid email or password.',
                error: 'Unauthorized',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = this.jwtHelper.generateToken(user.id, false, user.role);
        request.res.setHeader(constants_1.X_ACCESS_TOKEN, token.access_token);
        return user;
    }
    async findKeyHolderByTokenURL(token_URL) {
        const keyHolder = await this.keyHolderService.findOneByTokenURL(token_URL);
        if (!keyHolder)
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'Link has been faulty or expired.',
                error: 'Link Broken or Expired - Forebidden',
            }, common_1.HttpStatus.FORBIDDEN);
        else
            return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.ENTITLEMENTS.KEYHOLDER_REGISTERED);
    }
    async loginViaKeyHolder(input, request) {
        const keyHolder = await this.keyHolderService.findOneByTokenAndPin(input);
        if (!keyHolder) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'Invalid PIN.',
                error: 'Invalid PIN - Forebidden',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.usersService.findOne(keyHolder?.user_id);
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'User does not exist.',
                error: 'User does not exist - Forebidden',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const token = this.jwtHelper.generateToken(user.id, true);
        request.res.setHeader(constants_1.X_ACCESS_TOKEN, token.access_token);
        return user;
    }
    async forgotPassword(input) {
        const user = await this.usersService.findOneByEmail(input.email);
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'No user found with this email address.',
                error: 'User Not Found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const resetToken = (0, constants_1.generateRandomAlphanumeric)(32);
        const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await this.usersService.updateResetToken(user.id, resetToken, resetTokenExpiry);
        await this.emailService.sendPasswordResetEmail(user, resetToken);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.ENTITLEMENTS.PASSWORD_RESET_EMAIL_SENT);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('keyholder/:token_URL'),
    __param(0, (0, common_1.Param)('token_URL')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findKeyHolderByTokenURL", null);
__decorate([
    (0, common_1.Post)('keyholder'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [keyholder_login_dto_1.KeyHolderLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginViaKeyHolder", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_helper_1.JwtHelper,
        email_service_1.EmailService,
        key_holders_service_1.KeyHoldersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map