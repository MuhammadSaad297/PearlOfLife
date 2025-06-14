import { forwardRef, Module } from '@nestjs/common';
import { KeyHoldersService } from './key-holders.service';
import { KeyHoldersController } from './key-holders.controller';
import { keyHolderProvider } from './key-holders.provider';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'uploads'), // Path to your uploads directory
      serveRoot: '/uploads', // URL prefix to access files
      renderPath: ''
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => EmailModule)
  ],
  providers: [
    KeyHoldersService,
    ...keyHolderProvider
  ],
  controllers: [KeyHoldersController],
  exports: [KeyHoldersService]
})
export class KeyHoldersModule { }
