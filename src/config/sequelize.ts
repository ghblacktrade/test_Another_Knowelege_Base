import * as connection from '../sequelize.json';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from './config';
import { SequelizeOptions } from 'sequelize-typescript';

const connectionOptions: Partial<SequelizeOptions> = {
  ...(config.general.isDevmode
    ? connection.development
    : connection.production),
  dialect: 'postgres',
};

export const sequelizeConfig: SequelizeModuleOptions = {
  ...connectionOptions,
  autoLoadModels: true,
  pool: {
    max: config.db.poolMaxConn,
    idle: 30000,
    acquire: 60000,
  },
  synchronize: false,
};
