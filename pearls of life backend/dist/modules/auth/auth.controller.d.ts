import Users from '../users/entities/users.entity';
import { LoginDto } from './dtos/login.dto';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { JwtHelper } from 'src/common/helpers/jwt-helper';
import { EmailService } from '../email/email.service';
import { KeyHoldersService } from '../key-holders/key-holders.service';
import { KeyHolderLoginDto } from './dtos/keyholder-login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
export declare class AuthController {
    private readonly usersService;
    private readonly jwtHelper;
    private readonly emailService;
    private readonly keyHolderService;
    constructor(usersService: UsersService, jwtHelper: JwtHelper, emailService: EmailService, keyHolderService: KeyHoldersService);
    register(input: RegisterDto): Promise<ResponseMessageOutput>;
    login(input: LoginDto, request: any): Promise<Users>;
    findKeyHolderByTokenURL(token_URL: string): Promise<ResponseMessageOutput>;
    loginViaKeyHolder(input: KeyHolderLoginDto, request: any): Promise<any>;
    forgotPassword(input: ForgotPasswordDto): Promise<ResponseMessageOutput>;
    sendEmail(body: {
        email: string;
    }): Promise<ResponseMessageOutput>;
}
