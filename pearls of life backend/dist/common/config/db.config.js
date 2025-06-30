"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = void 0;
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
exports.DB_CONFIG = {
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
        acquire: 30000,
        idle: 10000,
    },
};
exports.default = (0, config_1.registerAs)('database', () => exports.DB_CONFIG);
//# sourceMappingURL=db.config.js.map