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
        subject: 'Welcome to the Pearls of Life!',
        text: `Hello, ${user.first_name} ${user.last_name}! This is a welcome email from Pearls of Life. `,
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
      debugger;
      console.log(keyHolder);
      const result = await this.mailerService.sendMail({
        to: keyHolder.email,
        subject: 'Welcome to the Pearls of Life!',
        text: `Hello, ${keyHolder.first_name} ${keyHolder.last_name}! 
                    You have been registered as key holder by ${userName}, 
                    please click here to login '${process.env.BASEURL ?? 'http://localhost'}:${process.env.PORT ?? 3000}/auth/keyholder/${keyHolder.token_url}'. 
                    Your login PIN will be ${keyHolder.pin}. 
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
      subject: 'Reset Your Password - Pearls of Life',
      html: `
                <h1>Password Reset Request</h1>
                <p>Hello ${user.first_name},</p>
                <p>We received a request to reset your password. Click the link below to set a new password:</p>
                <p><a href="${resetLink}">Reset Password</a></p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>Best regards,<br>Pearls of Life Team</p>
            `,
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
}
