"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.config = {
    ENVIRONMENT: process.env.NODE_ENV || 'development',
    HOSTNAME: process.env.HOSTNAME || 'http://localhost',
    PORT: 3000,
    JWT: {
        SECRET: process.env.JWT_SECRET || 'DA_TAFT',
        ACCESS_TOKEN_EXPIRY: (+process.env.ACCESS_TOKEN_EXPIRY_IN_MINS || 30) * 60,
        ALGORITHM: process.env.JWT_ALGORITHM || 'HS256'
    }
};
exports.default = () => exports.config;
//# sourceMappingURL=app.config.js.map