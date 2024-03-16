import { env } from 'process';

export const appConfig = {
  port: env.PORT ? parseInt(env.PORT) : 3001,
  host: env.HOST || 'localhost',
  protocol: env.APP_PROTOCOL || 'http://',
  amqpUrl: env.AMQP_URL || 'amqp://guest:guest@localhost',
};
