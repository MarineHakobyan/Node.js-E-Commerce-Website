import { env } from "process";

module.exports = {
    type: env.DB_TYPE ,
    host: env.DB_HOST,
    port: Number.parseInt(env.DB_PORT as string, 10),
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.ORM_LOGGING === 'true',
    synchronize: env.ORM_LOGGING === 'true',
    entities: ['.src/orm/entities/**/*.ts'],
    migrations: ['.src/orm/migrations/*.ts'],
    cli: {
        migrationsDir: `./src/orm/migrations`,
        entitiesDir: `./src/orm/entities`
    },
};
