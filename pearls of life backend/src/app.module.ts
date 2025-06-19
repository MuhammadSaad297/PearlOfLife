import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { DataBaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';
import { AuthModule } from './modules/auth/auth.module';
import { CredentialsModule } from './modules/credentials/credentials.module';
import { PersonalInfoModule } from './modules/personal-info/personal-info.module';
import { ImageUploadModule } from './modules/image-upload/image-upload.module';
import { KeyHoldersModule } from './modules/key-holders/key-holders.module';
import { ProxyMiddleware } from './middleware/proxy.middlewre';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { MemoriesModule } from './modules/memories/memories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObituaryInfoModule } from './modules/obituary-info/obituary-info.module';

@Module({
  imports: [
    ConfigModule,
    DataBaseModule,
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'SAAD',
    //   username: 'sa',
    //   password: 'bnmbnm',
    //   database: 'PearlsOfLife', // replace this with your actual DB name
    //   options: {
    //     encrypt: false, // disable encryption for local dev
    //     enableArithAbort: true,
    //     instanceName: 'SQLEXPRESS', // this is essential!
    //   },
    //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //   synchronize: false, // or true if you're still prototyping
    // }),

    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => NotesModule),
    forwardRef(() => PersonalInfoModule),
    forwardRef(() => CredentialsModule),
    forwardRef(() => ImageUploadModule),
    forwardRef(() => KeyHoldersModule),
    forwardRef(() => MemoriesModule),
    forwardRef(() => ObituaryInfoModule),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ProxyMiddleware).forRoutes('*'); // Apply to all routes
//   }
// }
