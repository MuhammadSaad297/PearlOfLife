import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SubscriptionPlan } from './models/subscription-plan.model';
import { UserSubscription } from './models/user-subscription.model';
import { SubscriptionService } from './subscription.service';
import { DataBaseModule } from 'src/core/database/database.module';

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
