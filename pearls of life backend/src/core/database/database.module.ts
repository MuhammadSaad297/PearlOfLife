import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      autoLoadModels: true,
      synchronize: true, // Only in development
    }),
  ],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DataBaseModule {}
