import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

const logger = new Logger('AppConfig');
dotenv.config();

logger.debug('Loading PayPal configuration', {
  clientIdExists: !!process.env.PAYPAL_CLIENT_ID,
  clientSecretExists: !!process.env.PAYPAL_CLIENT_SECRET,
  nodeEnv: process.env.NODE_ENV,
});

export const config = {
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  HOSTNAME: process.env.HOSTNAME || 'http://localhost',
  PORT: 3000,
  JWT: {
    SECRET: process.env.JWT_SECRET || 'DA_TAFT',
    ACCESS_TOKEN_EXPIRY: (+process.env.ACCESS_TOKEN_EXPIRY_IN_MINS || 30) * 60,
    ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
  },
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
};
export default () => config;
