"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
dotenv.config();
exports.DB_CONFIG = {
    dialect: 'mssql',
    host: process.env.DB_HOST || '192.168.100.80',
    port: parseInt(process.env.DB_PORT || '1433', 10),
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || 'bnmbnm',
    database: process.env.DB_NAME || 'PearlsOfLife',
    dialectModule: require('tedious'),
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            requestTimeout: 30000,
            connectTimeout: 30000,
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: (str) => common_1.Logger.debug(str),
};
exports.default = (0, config_1.registerAs)('database', () => exports.DB_CONFIG);
//# sourceMappingURL=db.config.js.map