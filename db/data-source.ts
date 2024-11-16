import { DataSource } from 'typeorm';
import { User } from '../src/users/user.entity';
import { Role } from '../src/roles/role.entity';
import { config } from 'dotenv';

import { UsersData1731716069417 } from './migrations/1731716069417-UsersData';
import { RolesData1731716186965 } from './migrations/1731716186965-RolesData';
import { SoilTypeData1731772118902 } from './migrations/1731772118902-SoilTypeData';

config();

// To create migration typeorm migration:create path/name
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Обычно для продакшн-среды
  logging: true,
  migrations: [
    UsersData1731716069417,
    RolesData1731716186965,
    SoilTypeData1731772118902,
  ], // Укажите миграции
  entities: [User, Role],
  // subscribers: [],
});
