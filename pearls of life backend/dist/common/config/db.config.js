"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = void 0;
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
exports.DB_CONFIG = {
    dialect: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'PearlsOfLife',
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || 'your_secure_password',
    port: parseInt(process.env.DB_PORT) || 1433,
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
};
exports.default = (0, config_1.registerAs)('database', () => exports.DB_CONFIG);
//# sourceMappingURL=db.config.js.map