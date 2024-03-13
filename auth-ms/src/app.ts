import {Request, Response} from "express-serve-static-core";
import { createConnection } from 'typeorm';
import express, {NextFunction} from 'express';
import dotenv from 'dotenv';

dotenv.config()
require('express-async-errors');

import { ormConfig } from './config/ormConfig';
import { appConfig } from './config/appConfig';
import {
    AuthRouter,
    UserRouter,
    ProductRouter,
} from './routes';

const app = express();
app.use(express.json());

createConnection(ormConfig)
    .then(() => console.log('Connected to database'))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

app.use(UserRouter);
app.use(AuthRouter);
app.use(ProductRouter);


app.use((err:Error, req:Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('Internal server error');
});

app.listen(appConfig.port, () => {
    console.log(`Now running on port ${appConfig.port}`);
});
