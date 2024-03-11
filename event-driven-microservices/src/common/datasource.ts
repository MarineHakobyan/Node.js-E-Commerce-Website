import { DataSource } from 'typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../orm/entities/userEntity';

export const AppDataSource = new DataSource({
  type: 'postgres', // Replace with your database type (mysql, mariadb, etc.)
  host: 'localhost', // Replace with your database host
  port: 5432, // Replace with your database port (if different)
  username: 'your_username', // Replace with your database username
  password: 'your_password', // Replace with your database password
  database: 'your_database_name', // Replace with your database name
  synchronize: true, // Set to false in production for performance reasons
  logging: false, // Set to true for debugging purposes
  entities: [User], // Add other entities here as needed
  subscribers: [],
  migrations: [],
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'user-db',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});
