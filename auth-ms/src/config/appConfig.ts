import { env } from 'process';

export const appConfig = {
  port: env.PORT ? parseInt(env.PORT) : 3000,
  host: env.HOST || 'localhost',
  protocol :env.APP_PROTOCOL || 'http://',
  secret: env.SECRET || 'very_long_secret11234567',
};
