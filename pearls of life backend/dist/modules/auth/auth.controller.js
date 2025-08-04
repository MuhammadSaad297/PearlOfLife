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
const auth_guard_1 = require("./auth.guard");
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
const change_password_dto_1 = require("./dtos/change-password.dto");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
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
    async sendEmail(body) {
        try {
            if (!body.email || !body.email.includes('@')) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Invalid email format',
                    error: 'Validation Error',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.emailService.sendEmail({
                to: body.email,
                subject: 'Share the Pearls of Lyfe Experience!',
                text: `Hi there!

      I've been enjoying my experience with Pearls of Lyfe and thought you might love it too!

      Pearls of Lyfe offers [brief description of what makes your service special]. As a special bonus, when you sign up through this referral, you'll get [mention any referral bonus or benefit].

      I'd love for you to join me in this wonderful community. Let me know what you think!

      Warm regards,
      [Your Name/Sender's Name]

      P.S. If you have any questions about Pearls of Lyfe, I'd be happy to help!`,
                html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Hi there!</h2>

          <p>I've been enjoying my experience with <strong>Pearls of Lyfe</strong> and thought you might love it too!</p>

           <p>I wanted to share something truly special with you - <strong>Pearls of Lyfe</strong>, a meaningful way to preserve your legacy and connect with loved ones, today and beyond.</p>

        <p>Pearls of Lyfe is a secure digital legacy platform where you can:</p>
        <ul style="line-height: 1.6;">
          <li>Store important personal information and memories</li>
          <li>Designate trusted key holders who can access your information</li>
          <li>Create heartfelt messages, videos, and notes for loved ones</li>
          <li>Ensure your wishes are known when you're no longer here</li>
        </ul>

          <p style="text-align: center; margin: 25px 0;">
            <a href="${'http://56.228.6.77/'}"
               style="background-color: #3498db; color: white; padding: 12px 25px;
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              Join Pearls of Lyfe
            </a>
          </p>

          <p>I'd love for you to join me in this wonderful community. Let me know what you think!</p>
          <p>This isn't just another website - it's a gift of peace of mind for you and your family. I'd be honored if you joined me in creating something truly meaningful.</p>

          <p>Warm regards,<br>
          [POML Wendy]</p>

          <p style="font-size: 0.9em; color: #7f8c8d;">
            <em>P.S. If you have any questions about Pearls of Lyfe, I'd be happy to help!</em>
          </p>
        </div>`,
            });
            return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.ENTITLEMENTS.EMAIL_SENT);
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to send email',
                error: 'Email Sending Error',
                details: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resetPassword(input) {
        console.log('Reset password request received with token:', input.token);
        const user = await this.usersService.findOneByResetToken(input.token);
        console.log('User found:', user ? 'Yes' : 'No');
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid or expired reset token.',
                error: 'Invalid Token',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.reset_token_expiry &&
            new Date(user.reset_token_expiry) < new Date()) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Reset token has expired.',
                error: 'Token Expired',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.usersService.updatePassword(user.id, input.password);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.ENTITLEMENTS.PASSWORD_RESET_SUCCESS);
    }
    async changePassword(input, request) {
        const userId = request.user.user_id;
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found.',
                error: 'Not Found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const isValidPassword = await this.usersService.validatePassword(input.oldPassword, user.hashed_password);
        if (!isValidPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Current password is incorrect.',
                error: 'Invalid Password',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.usersService.updatePassword(userId, input.newPassword);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.ENTITLEMENTS.PASSWORD_CHANGE_SUCCESS);
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
__decorate([
    (0, common_1.Post)('send-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_helper_1.JwtHelper,
        email_service_1.EmailService,
        key_holders_service_1.KeyHoldersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map