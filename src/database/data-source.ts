import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Product } from '../products/entities/product.entity';

config();

const migrationsPath = join(
  process.cwd(),
  'src',
  'database/migrations/*.{ts,js}',
);

export const dataSource = new DataSource({
  type: process.env.DB_TYPE as PostgresConnectionOptions['type'],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.ENVIRONMENT === 'development',
  logging: false,
  entities: [Product],
  migrations: [migrationsPath],
});
