import express from 'express';
import authRouter from './routes/authRoute';
import { DataSource } from 'typeorm';
import ormConfig from './config/ormConfig';

const app = express();
app.use(express.json());

const connection = new DataSource(ormConfig);
connection.initialize()
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('Error connecting to database:', error));

app.use('/api/auth', authRouter);

app.listen(3000, () => console.log('Server listening on port 3000'));

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await connection.destroy();
    process.exit(0);
});
