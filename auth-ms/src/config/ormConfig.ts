import { ConnectionOptions } from 'typeorm';
import { env } from 'process';

export const datasourceOptions: ConnectionOptions = {
  type: env.DB_TYPE as any,
  host: env.DB_HOST,
  port: Number.parseInt(env.DB_PORT as string, 10),
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  synchronize: env.ORM_SYNCHRONIZE === 'true',
  logging: env.ORM_LOGGING === 'true',
  entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
  cli: {
    migrationsDir: `./src/orm/seeds/dev`,
  },
};
