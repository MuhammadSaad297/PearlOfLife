import { MailerService } from '@nestjs-modules/mailer';
import Users from '../users/entities/users.entity';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendRegistrationEmail(user: any): Promise<string | false>;
    sendKeyHolderRegistrationEmail(keyHolder: any, userName: string): Promise<string | false>;
    sendPasswordResetEmail(user: Users, resetToken: string): Promise<void>;
}
