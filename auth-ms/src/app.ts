import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRoute';
import {AppDataSource} from "./common/datasource";
import ormConfig from "./config/ormConfig";

const app = express();
app.use(express.json());

async function connectDb() {
    AppDataSource.initialize()
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => console.error('Error connecting to database:', error))
}

 connectDb()

app.use('/api/auth', authRouter);

app.listen(3000, () => console.log('Server listening on port 3000'));

