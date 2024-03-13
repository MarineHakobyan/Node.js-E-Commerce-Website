import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import { errorHandler } from './error-handler';
import logger from './logger';
import { ormConfig } from './config/ormConfig';
import { appConfig } from './config/appConfig';
import { AuthRouter, UserRouter, ProductRouter } from './routes';

dotenv.config();
require('express-async-errors');

const app = express();
app.use(express.json());

createConnection(ormConfig)
    .then(() => logger.info('Connected to database'))
    .catch((error) => {
        logger.error('Failed to connect to the database', { error });
        process.exit(1);
    });

app.use(UserRouter);
app.use(AuthRouter);
app.use(ProductRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(appConfig.port, () => {
    logger.info(`Now running on port ${appConfig.port}`);
});
