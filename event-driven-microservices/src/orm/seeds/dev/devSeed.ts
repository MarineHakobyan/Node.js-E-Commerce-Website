// import { env } from 'process';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
//
// export default [
//     {
//         name: 'migration',
//         type: env.DB_TYPE,
//         host: env.DB_HOST,
//         port: env.DB_PORT,
//         database: env.DB_NAME,
//         username: env.DB_USER,
//         password: env.DB_PASSWORD,
//         logging: env.ORM_LOGGING === 'true',
//         migrations: [`./src/orm/migrations/**/*{.ts,.js}`],
//         entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
//         cli: {
//             migrationsDir: `./src/orm/migrations`,
//             entitiesDir: `./src/orm/entities/**/*.entity{.ts, .js}`,
//         },
//         namingStrategy: new SnakeNamingStrategy(),
//     },
//     {
//         name: 'seed',
//         type: env.DB_TYPE,
//         host: env.DB_HOST,
//         port: env.DB_PORT,
//         database: env.DB_NAME,
//         username: env.DB_USER,
//         password: env.DB_PASSWORD,
//         logging: env.ORM_LOGGING === 'true',
//         migrations: [`./src/orm/seeds/prod/**/*.seed{.ts,.js}`],
//         entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
//         cli: {
//             migrationsDir: `./src/orm/seeds/prod`,
//         },
//         namingStrategy: new SnakeNamingStrategy(),
//     },
//     {
//         name: 'seed:dev',
//         type: env.DB_TYPE,
//         host: env.DB_HOST,
//         port: env.DB_PORT,
//         database: env.DB_NAME,
//         username: env.DB_USER,
//         password: env.DB_PASSWORD,
//         logging: env.ORM_LOGGING === 'true',
//         migrations: [`./src/orm/seeds/dev/**/*.seed{.ts,.js}`],
//         entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
//         cli: {
//             migrationsDir: `./src/orm/seeds/dev`,
//         },
//         namingStrategy: new SnakeNamingStrategy(),
//     },
// ];