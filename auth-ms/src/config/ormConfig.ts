import { env } from 'process';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

export const ormConfig = {
  type: env.DB_TYPE as ConnectionOptions['type'],
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT as string, 10),
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  logging: env.ORM_LOGGING === 'true',
  synchronize: env.APP_ENV !== 'production',
  entities: [path.resolve(__dirname, '../orm/entities/**/*.entity{.js,.ts}')],
  migrations: ['.src/orm/migrations/*.ts'],
  cli: {
    migrationsDir: `./src/orm/migrations`,
    entitiesDir: `./src/orm/entities`,
  },
} as ConnectionOptions;
