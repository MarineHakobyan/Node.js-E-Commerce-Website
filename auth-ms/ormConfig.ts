import { env } from "process";
import path from "path";

module.exports = {
    type: env.DB_TYPE ,
    host: env.DB_HOST,
    port: Number.parseInt(env.DB_PORT as string, 10),
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.ORM_LOGGING === 'true',
    synchronize: env.ORM_LOGGING === 'true',
    entities: [path.resolve(__dirname, '../orm/entities/**/*.entity{.js,.ts}')],
    migrations: ['dist/migration/**/*.js'],
    cli: {
        migrationsDir: `./src/orm/seeds/prod`,
    },
}