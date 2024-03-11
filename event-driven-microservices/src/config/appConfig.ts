export const appConfig = {
    port: process.env.PORT || 3000,
    secret: process.env.JWT_SECRET || 'some_secret_key',
};