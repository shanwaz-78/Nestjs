import 'reflect-metadata';
const { DataSource } = require('typeorm');
import { configDotenv } from 'dotenv';

configDotenv();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT) ?? 3306,
  username: process.env.USERNAME,
  password: process.env.PSWD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
  logging: true,
});

module.exports = { AppDataSource };
