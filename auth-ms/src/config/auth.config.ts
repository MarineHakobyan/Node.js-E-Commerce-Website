import { env } from 'process';

export default {
  jwtSecret: env.AUTH_JWT_SECRET,
  jwtExpiration: env.AUTH_JWT_TOKEN_EXPIRES_IN,
};
