import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { credentialProvider } from './credentials.provider';

@Module({
  controllers: [CredentialsController],
  providers: [
    CredentialsService,
    ...credentialProvider
  ]
})
export class CredentialsModule {}
