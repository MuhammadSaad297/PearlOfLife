import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataBaseModule } from 'src/core/database/database.module';
import { SubscriptionPlan } from './entities/Subscription-Plan.entity';
import { UserSubscription } from './entities/user-subscription.entity';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { SubscriptionService } from './subsription.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DataBaseModule,
    SequelizeModule.forFeature([SubscriptionPlan, UserSubscription]),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        dialect: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'bnmbnm',
        database: 'PearlsOfLife',
        models: [SubscriptionPlan, UserSubscription],
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            instanceName: 'SQLEXPRESS',
          },
        },
      }),
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, SubscriptionService],
  exports: [PaymentsService, SubscriptionService],
})
export class PaymentsModule {}
