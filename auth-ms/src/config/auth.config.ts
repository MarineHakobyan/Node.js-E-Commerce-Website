import { env } from 'process';

export const authConfig = {
  jwtSecret: env.AUTH_JWT_SECRET as string,
  jwtExpiration: env.AUTH_JWT_TOKEN_EXPIRES_IN as string,
};
