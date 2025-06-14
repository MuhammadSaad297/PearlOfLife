import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProvider
  ],
  exports: [UsersService]
})
export class UsersModule {}
