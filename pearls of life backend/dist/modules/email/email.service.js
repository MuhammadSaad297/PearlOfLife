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
            const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }
              .content { margin: 20px 0; }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #3498db;
                  color: white !important;
                  text-decoration: none;
                  border-radius: 5px;
                  margin: 10px 0;
              }
              .footer { font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px; }
              .credentials { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Pearls of Life</h2>
              </div>
              <div class="content">
                  <p>Hello, <strong>${keyHolder.first_name} ${keyHolder.last_name}</strong>,</p>
                  <p>You have been registered as a key holder by <strong>${userName}</strong>.</p>
                  
                  <div class="credentials">
                      <p><strong>Your login PIN:</strong> ${keyHolder.pin}</p>
                      <p>Click the button below to login:</p>
                      <a href="${process.env.BASEURL}/auth/keyholder/${keyHolder.token_url}" class="button">Login to Your Account</a>
                  </div>
                  
                  <p>If the button doesn't work, copy and paste this link into your browser:</p>
                  <p>${process.env.BASEURL}/auth/keyholder/${keyHolder.token_url}</p>
              </div>
              <div class="footer">
                  <p><strong>NOTE:</strong> Please do not share these credentials with anyone.</p>
                  <p>© ${new Date().getFullYear()} Pearls of Life. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
            const result = await this.mailerService.sendMail({
                to: keyHolder.email,
                subject: 'Welcome to Pearls of Life - Key Holder Registration',
                html: emailTemplate,
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
        const resetLink = `${process.env.BASEURL}/auth/reset-password/${resetToken}`;
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