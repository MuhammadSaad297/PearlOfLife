import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import app from './app.config';
import database from './db.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: false,
      load: [app, database],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
