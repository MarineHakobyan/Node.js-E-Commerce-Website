import { createConnection } from 'typeorm';
import express from 'express';
import {createUserRouter} from "./routes/createUser";
import {fetchUsersRouter} from "./routes/fetchUser";
import {updateUserRouter} from "./routes/updateUser";
import {deleteUserRouter} from "./routes/deleteUser";
import {createProductRouter} from "./routes/createProduct";
import {fetchProductsRouter} from "./routes/fetchProducts";
import {updateProductRouter} from "./routes/updateProduct";
import {deleteProductRouter} from "./routes/deleteProduct";
import {ormConfig} from "./config/config";


const app = express();

const main = async () => {
    try {
        await createConnection(ormConfig);
        console.log('Connected to database');

        app.use(express.json());

        // TODO: separate and extract
        app.use(createUserRouter);
        app.use(fetchUsersRouter);
        app.use(updateUserRouter);
        app.use(deleteUserRouter);

        app.use(createProductRouter);
        app.use(fetchProductsRouter);
        app.use(updateProductRouter);
        app.use(deleteProductRouter);

        app.listen(8080, () => {
            console.log('Now running on port 8080');
        });
    } catch (error) {
        console.error(error);
        throw new Error('Unable to connect to db');
    }
};

main();
