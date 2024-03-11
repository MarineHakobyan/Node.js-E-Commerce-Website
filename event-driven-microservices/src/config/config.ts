import * as process from 'process';

export const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  secret: process.env.JWT_SECRET || 'some_secret_key',
};

export const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
