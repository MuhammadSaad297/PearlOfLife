import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  HOSTNAME: process.env.HOSTNAME || 'http://localhost',
  PORT: 3000,
  JWT: {
    SECRET: process.env.JWT_SECRET || 'DA_TAFT',
    ACCESS_TOKEN_EXPIRY: (+process.env.ACCESS_TOKEN_EXPIRY_IN_MINS || 30) * 60,
    ALGORITHM: process.env.JWT_ALGORITHM || 'HS256'
  }
}
export default () => config;