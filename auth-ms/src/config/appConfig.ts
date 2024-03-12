import { env } from 'process';

export const appConfig = {
  port: env.PORT || 3000,
  host: env.HOST || 'localhost',
  secret: env.SECRET || 'very_long_secret11234567',
};
