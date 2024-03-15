import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
require('express-async-errors');

import logger from './logger';
import { AuthRouter, UserRouter, ProductRouter } from './routes';
import { errorHandler } from './error-handler';
import { appConfig } from './config';
import {handleAsync} from "./common/helpers";
import {UserRegistrationDto} from "./dtos";


const app = express();
app.use(express.json());

console.dir({AuthRouter}, {depth: null})
app.use(UserRouter);
app.use(AuthRouter);
app.use(ProductRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(appConfig.port, appConfig.host, () => {
    logger.info(`Now running on ${appConfig.protocol}${appConfig.host}:${appConfig.port}`);
});

