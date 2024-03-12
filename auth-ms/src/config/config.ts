import { env } from 'process';
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";

export const ormConfig = {
  name: 'seed',
  type: env.DB_TYPE as ConnectionOptions['type'],
  host: env.DB_HOST,
  port: Number.parseInt(env.DB_PORT as string, 10),
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  logging: env.ORM_LOGGING === 'true',
  migrations: [`./src/orm/seeds/prod/**/*.seed{.ts,.js}`],
  entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
  cli: {
    migrationsDir: `./src/orm/seeds/prod`,
  },
} as ConnectionOptions;
