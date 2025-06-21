import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import Users from '../users/entities/users.entity';
import { LoginDto } from './dtos/login.dto';
import { SuccessMessageResponse } from 'src/common/utils/app.utils';
import {
  generateRandomAlphanumeric,
  MESSAGE,
  X_ACCESS_TOKEN,
} from 'src/common/constants';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { JwtHelper } from 'src/common/helpers/jwt-helper';
import { EmailService } from '../email/email.service';
import { KeyHoldersService } from '../key-holders/key-holders.service';
import { KeyHolderLoginDto } from './dtos/keyholder-login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtHelper: JwtHelper,
    private readonly emailService: EmailService,
    private readonly keyHolderService: KeyHoldersService,
  ) {}

  @Post('register')
  async register(@Body() input: RegisterDto): Promise<ResponseMessageOutput> {
    const isUserExists = await this.usersService.findOneByEmail(input.email);
    if (isUserExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'User already exists with this email.',
          error: 'User already registered - Forebidden',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.usersService.create(input);
    this.emailService.sendRegistrationEmail(user);
    return SuccessMessageResponse(MESSAGE.ENTITLEMENTS.USER_REGISTERED, user);
  }

  @Post('login')
  async login(@Body() input: LoginDto, @Req() request: any): Promise<Users> {
    const user = await this.usersService.validateUserCredentials(input);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password.',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.jwtHelper.generateToken(user.id, false, user.role);
    request.res.setHeader(X_ACCESS_TOKEN, token.access_token);
    return user;
  }

  @Get('keyholder/:token_URL')
  async findKeyHolderByTokenURL(
    @Param('token_URL') token_URL: string,
  ): Promise<ResponseMessageOutput> {
    const keyHolder = await this.keyHolderService.findOneByTokenURL(token_URL);
    if (!keyHolder)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Link has been faulty or expired.',
          error: 'Link Broken or Expired - Forebidden',
        },
        HttpStatus.FORBIDDEN,
      );
    else
      return SuccessMessageResponse(MESSAGE.ENTITLEMENTS.KEYHOLDER_REGISTERED);
  }

  @Post('keyholder')
  async loginViaKeyHolder(
    @Body() input: KeyHolderLoginDto,
    @Req() request: any,
  ): Promise<any> {
    const keyHolder = await this.keyHolderService.findOneByTokenAndPin(input);
    if (!keyHolder) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Invalid PIN.',
          error: 'Invalid PIN - Forebidden',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.usersService.findOne(keyHolder?.user_id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'User does not exist.',
          error: 'User does not exist - Forebidden',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const token = this.jwtHelper.generateToken(user.id, true);
    request.res.setHeader(X_ACCESS_TOKEN, token.access_token);
    return user;
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() input: ForgotPasswordDto,
  ): Promise<ResponseMessageOutput> {
    const user = await this.usersService.findOneByEmail(input.email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'No user found with this email address.',
          error: 'User Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Generate reset token
    const resetToken = generateRandomAlphanumeric(32);
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Update user with reset token
    await this.usersService.updateResetToken(
      user.id,
      resetToken,
      resetTokenExpiry,
    );

    // Send reset email
    await this.emailService.sendPasswordResetEmail(user, resetToken);

    return SuccessMessageResponse(
      MESSAGE.ENTITLEMENTS.PASSWORD_RESET_EMAIL_SENT,
    );
  }
}
