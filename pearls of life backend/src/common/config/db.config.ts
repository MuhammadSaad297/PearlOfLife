// import { registerAs } from '@nestjs/config';
// import { Logger } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// dotenv.config();

// export const DB_CONFIG = {
//   // dialect: process.env.P_DB_DIALECT,
//   // user: process.env.P_DB_USER,
//   // host: process.env.P_DB_HOST,
//   // database: process.env.P_DB_NAME,
//   // password: process.env.P_DB_PASSWORD,
//   // port: process.env.P_DB_PORT,
//   ssl: true,

//   //LIVE Data
//   // user: 'initialmock343ds_ash',
//   // host: '/var/run/postgresql',
//   // database: 'initialmock343ds_pearls_of_life',
//   // password: 'iGH)%4oE1qTCL14YaQqzDi$6',
//   // port: process.env.P_DB_PORT,

//   // username: process.env.DB_USERNAME,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_NAME,
//   // host: process.env.DB_HOST,
//   // port: process.env.DB_PORT,
//   // dialect: process.env.DB_DIALECT,

//   username: process.env.DB_USERNAME || 'ashfaq',
//   password: process.env.DB_PASSWORD || 'sql2019',
//   database: process.env.DB_NAME || 'PearlsOfLife',
//   host: 'SAAD\\SQLEXPRESS', // Using the full instance name as host
//   dialect: 'mssql',
//   dialectOptions: {
//     options: {
//       encrypt: false,
//       trustServerCertificate: true,
//       enableArithAbort: true,
//     },
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },

//   // options:{
//   //     cryptoCredentialsDetails: {
//   //         minVersion: 'TLSv1'
//   //     }
//   // },
//   logging: (str) => {
//     Logger.debug(str);
//   },
// };

// export default registerAs('database', () => DB_CONFIG);
import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export const DB_CONFIG = {
  dialect: 'mssql',
  database: process.env.DB_NAME,
  dialectModule: require('tedious'),

  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
      encrypt: false,
      trustServerCertificate: true,
      integratedSecurity: true,
      trustedConnection: true,
      enableArithAbort: true,
      instanceName: 'SQLEXPRESS',
      server: '192.168.100.80',
      port: 1433,
      database: process.env.DB_NAME,
      requestTimeout: 30000,
      connectTimeout: 30000,
      rowCollectionOnRequestCompletion: true,
    },
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // Increased from 30000 to 60000
    idle: 30000, // Increased from 10000 to 30000
  },
};

export default registerAs('database', () => DB_CONFIG);
