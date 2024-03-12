import {Request, Response} from "express-serve-static-core";
import { createConnection } from 'typeorm';
import express, {NextFunction} from 'express';
import dotenv from 'dotenv';

dotenv.config()
require('express-async-errors');

import { ormConfig } from './config/ormConfig';
import { appConfig } from './config/appConfig';
import {
    createProductRouter,
    fetchProductsRouter,
    updateProductRouter,
    deleteProductRouter,
    UserRouter,
    AuthRouter
} from './routes';

dotenv.config();

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

//: TODO: add to single router
app.use(createProductRouter);
app.use(fetchProductsRouter);
app.use(updateProductRouter);
app.use(deleteProductRouter);

app.use((err:Error, req:Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('Internal server error');

    next(err);
});

app.listen(appConfig.port, () => {
    console.log(`Now running on port ${appConfig.port}`);
});
