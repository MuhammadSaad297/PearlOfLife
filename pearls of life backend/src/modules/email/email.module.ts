import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
// import nodemailer from 'nodemailer';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async() => {
        const testAccount = await nodemailer.createTestAccount();
        return {
          transport: {
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth:{
              user: testAccount.user,
              pass: testAccount.pass
            }
          },
          defaults: {
            from: '"DEV Environment" <no-reply@pol.local>'
          }
        };
      }
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
