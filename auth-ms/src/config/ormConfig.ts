import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

export const datasourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_ENV !== 'production',
  logging: true,
  subscribers: [],
  migrations: [`./src/orm/seeds/dev/**/*.seed{.ts,.js}`],
  entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
};

export default datasourceOptions