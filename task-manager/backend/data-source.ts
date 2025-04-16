import 'reflect-metadata'
const { DataSource } = require('typeorm');
import { configDotenv } from 'dotenv';

configDotenv();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.DB_PSWD,
  database: process.env.DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migration/*.ts'],
  synchronize: false,
  logging: true,
});

module.exports = { AppDataSource };
