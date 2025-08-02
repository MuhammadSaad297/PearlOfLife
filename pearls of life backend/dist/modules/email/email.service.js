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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendRegistrationEmail(user) {
        try {
            const result = await this.mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to the Pearls of Lyfe!',
                text: `Hello, ${user.first_name} ${user.last_name}! This is a welcome email from Pearls of Lyfe. `,
            });
            console.log('Preview URL:', nodemailer.getTestMessageUrl(result));
            return nodemailer.getTestMessageUrl(result);
        }
        catch (error) {
            console.error(`Failed to send email: ${error.message}`);
            throw error;
        }
    }
    async sendKeyHolderRegistrationEmail(keyHolder, userName) {
        try {
            console.log(keyHolder);
            const result = await this.mailerService.sendMail({
                to: keyHolder.email,
                subject: 'Welcome to the Pearls of Lyfe!',
                text: `Hello, ${keyHolder.first_name} ${keyHolder.last_name}! 
                    You have been registered as key holder by ${userName}, 
                     please click here to login '${process.env.BASEURL}/auth/keyholder/${keyHolder.token_url}'
                    Your login PIN will be ${keyHolder.pin}
                    NOTE! Please do not share these credentials`,
            });
            console.log('Preview URL:', nodemailer.getTestMessageUrl(result));
            return nodemailer.getTestMessageUrl(result);
        }
        catch (error) {
            console.error(`Failed to send email: ${error.message}`);
            throw error;
        }
    }
    async sendPasswordResetEmail(user, resetToken) {
        const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: 'Reset Your Password - Pearls of Lyfe',
            html: `
                <h1>Password Reset Request</h1>
                <p>Hello ${user.first_name},</p>
                <p>We received a request to reset your password. Click the link below to set a new password:</p>
                <p><a href="${resetLink}">Reset Password</a></p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>Best regards,<br>Pearls of Lyfe Team</p>
            `,
        };
        try {
            await this.mailerService.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }
    async sendEmail(options) {
        try {
            const result = await this.mailerService.sendMail({
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                template: options.template,
                context: options.context,
            });
            const previewUrl = nodemailer.getTestMessageUrl(result);
            if (previewUrl) {
                console.log('Preview URL:', previewUrl);
            }
        }
        catch (error) {
            console.error(`Failed to send email to ${options.to}:`, error);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map