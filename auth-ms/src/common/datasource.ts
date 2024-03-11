import { DataSource } from 'typeorm';
import datasourceOptions from "../config/ormConfig";

export const AppDataSource = new DataSource(datasourceOptions);
