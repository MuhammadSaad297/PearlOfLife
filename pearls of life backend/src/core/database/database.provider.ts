// import { join } from 'path';
// import { Sequelize } from 'sequelize-typescript';
// import * as connection from './database.config';
// import { ConfigService } from '@nestjs/config';
// import Users from 'src/modules/users/entities/users.entity';
// // import Users from "src/modules/users/entities/users.entity";

// export const databaseProvider = [
//   {
//     //  provide: 'SEQUELIZE',
//     // useFactory: async (configService: ConfigService) => {
//     //     const sequelize = new Sequelize({
//     //         ...((connection[configService.get('ENVIRONMENT')] as any) || {}),
//     //         models: [join(__dirname,'../../','/modules/**/*.entity.js')]
//     //     });
//     //     return sequelize;
//     // },
//     inject: [ConfigService],
//     provide: 'SEQUELIZE',
//     useFactory: async () => {
//       const sequelize = new Sequelize({
//         dialect: 'mssql',
//         host: 'SAADSQLEXPRESS',
//         port: 1433,
//         username: 'sa',
//         password: 'bnmbnm',
//         database: 'PearlsOfLife',
//       });
//       sequelize.addModels([Users]);
//       await sequelize.sync();
//       return sequelize;
//     },
//   },
// ];

import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

// Import all entities
import Users from '../../modules/users/entities/users.entity';
import UserPlans from '../../modules/users/entities/user-plans.entity';
import Notes from '../../modules/notes/entities/notes.entity';
import MemoryFolders from '../../modules/memories/entities/memory-folders.entity';
import Memories from '../../modules/memories/entities/memories.entity';
import KeyHolders from '../../modules/key-holders/entities/key-holders.entity';
import ImageFolder from '../../modules/image-upload/entities/image-folder.entity';
import ImageDetails from '../../modules/image-upload/entities/image-details.entity';
import ImageCategories from '../../modules/image-upload/entities/image-categories.entity';
import Credentials from '../../modules/credentials/entities/credentials.entity';
import ObituaryInfo from 'src/modules/obituary-info/entities/obituary-info.entity';
import { SubscriptionPlan } from 'src/modules/payment/entities/Subscription-Plan.entity';
import { UserSubscription } from 'src/modules/payment/entities/user-subscription.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const host = configService.get('DB_HOST', 'localhost');
      const database = configService.get('DB_NAME', 'PearlsOfLife');
      const username = configService.get('DB_USERNAME', 'pearlsuser');
      const password = configService.get('DB_PASSWORD', '@Pearl123');
      const dialect = configService.get('DB_DIALECT', 'mssql');
      const port = parseInt(configService.get('DB_PORT', '1433'));

      console.log('Database connection config:', {
        host,
        database,
        username,
        port,
        dialect,
        password,
      });

      // Create Sequelize instance
      // const sequelize = new Sequelize({
      //   host: '192.168.100.80',
      //   port: 1433,
      //   database: 'PearlsOfLife',
      //   username: 'sa',
      //   password: 'pakistan1@',
      //   dialect: 'mssql',
      //   dialectOptions: {
      //     options: {
      //       encrypt: false,
      //       trustServerCertificate: true,
      //       enableArithAbort: true,
      //       // instanceName: 'SQLEXPRESS',
      //       connectTimeout: 30000, // Increased from default 15000ms to 30000ms
      //       requestTimeout: 30000, // Increased request timeout
      //     },
      //   },
      //   pool: {
      //     max: 5,
      //     min: 0,
      //     acquire: 60000, // Increased from 30000 to 60000
      //     idle: 30000, // Increased from 10000 to 30000
      //   },
      //   logging: console.log,
      // });
      const sequelize = new Sequelize({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 1433,
        database: process.env.DB_NAME || 'PearlsOfLife',
        username: process.env.DB_USERNAME || 'sa',
        password: process.env.DB_PASSWORD || 'your_secure_password',
        dialect: 'mssql',

        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            connectTimeout: 30000,
            requestTimeout: 30000,
          },
        },

        pool: {
          max: 5,
          min: 0,
          acquire: 60000,
          idle: 30000,
        },

        logging: process.env.NODE_ENV === 'development' ? console.log : false,
      });

      // Add models in sequence
      try {
        await sequelize.authenticate();
        console.log('✓ Database connection established successfully');

        // Add models explicitly in the correct order
        sequelize.addModels([
          Users,
          UserPlans,
          Notes,
          MemoryFolders,
          Memories,
          KeyHolders,
          ImageFolder,
          ImageDetails,
          ImageCategories,
          Credentials,
          ObituaryInfo,
          SubscriptionPlan,
          UserSubscription,
        ]);

        // Sync without force to preserve data
        await sequelize.sync({ force: false });
        console.log('✓ All models synchronized');

        return sequelize;
      } catch (error) {
        console.error(
          '✗ Database connection or model initialization failed:',
          error,
        );
        throw error;
      }
    },
    inject: [ConfigService],
  },
];
