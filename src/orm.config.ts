import { DataSourceOptions } from 'typeorm';

export const OrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'fintechdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.listener{.ts,.js}'],
  synchronize: false,
};
