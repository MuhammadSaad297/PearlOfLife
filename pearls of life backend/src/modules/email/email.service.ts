import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Users from '../users/entities/users.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRegistrationEmail(user: any) {
    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to the Pearls of Lyfe!',
        text: `Hello, ${user.first_name} ${user.last_name}! This is a welcome email from Pearls of Lyfe. `,
      });
      console.log('Preview URL:', nodemailer.getTestMessageUrl(result));
      return nodemailer.getTestMessageUrl(result);
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      throw error;
    }

    // console.log('Preview URL:', nodemailer.getTestMessageUrl(result));
    // return {
    //   message: 'Email sent successfully',
    //   previewUrl: nodemailer.getTestMessageUrl(result),
    // };
  }

  async sendKeyHolderRegistrationEmail(keyHolder: any, userName: string) {
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
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      throw error;
    }
  }

  async sendPasswordResetEmail(user: Users, resetToken: string): Promise<void> {
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
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
  async sendEmail(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    template?: string;
    context?: Record<string, any>;
  }): Promise<void> {
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
    } catch (error) {
      console.error(`Failed to send email to ${options.to}:`, error);
      throw error;
    }
  }
}
