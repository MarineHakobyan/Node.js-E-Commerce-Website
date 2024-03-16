import { env } from 'process';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dbConfig = {
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  logging: env.ORM_LOGGING === 'true',
  entities: [path.resolve(__dirname, '../orm/entities/**/*.entity{.js,.ts}')],
  namingStrategy: new SnakeNamingStrategy(),
} as ConnectionOptions;
