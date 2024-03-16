import express, { Request, Response, NextFunction } from 'express';
import amqp from 'amqplib/callback_api';
import dotenv from 'dotenv';
dotenv.config();
require('express-async-errors');

import logger from './logger';
import { AuthRouter, UserRouter } from './routes';
import { errorHandler } from './error-handler';
import { appConfig } from './config';
import {RabbitMessage} from "./common/interfaces/amqp.interfaces";


const app = express();
app.use(express.json());

const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

amqp.connect(rabbitUrl, (err, connection) => {
    if (err) {
        console.error('Error connecting to RabbitMQ:', err);
        return;
    }

    connection.createChannel((err, channel) => {
        if (err) {
            console.error('Error creating channel:', err);
            return;
        }

        const queue = 'user_queue';

        channel.assertQueue(queue, { durable: true });

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const rabbitMessage: RabbitMessage = JSON.parse(msg.content.toString());
                console.log({rabbitMessage,raw:msg.content.toString()})
                const { method, url, body } = rabbitMessage;

                let router;
                switch (url) {
                    case '/user':
                        router = UserRouter;
                        break;
                    case '/auth/login':
                        router = AuthRouter;
                        break;

                    default:
                        console.log('Unknown URL:', url);
                        return;
                }

                const req: Request = {
                    method,
                    url,
                    body,
                } as Request;
                const res: Response = {} as Response;
                const next: NextFunction = () => {};
                router(req, res, next);
            }
        });
    });
});

app.use(UserRouter);
app.use(AuthRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(appConfig.port, appConfig.host, () => {
    logger.info(`Now running on ${appConfig.protocol}${appConfig.host}:${appConfig.port}`);
});

