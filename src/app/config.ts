/* tslint:disable */
/*
  "In particular, if there is a variable in your .env file
  which collides with one that already exists in your environment,
  then that variable will be skipped."
  - https://www.npmjs.com/package/dotenv
*/

import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { MODELS } from '@data/index';

const env = process.env;
export const isProduction: boolean = env.NODE_ENV === 'production';
export const isTest: boolean = env.NODE_ENV === 'test' || env.NODE_ENV === 'ci';

export interface DatabaseConfig {
  host: string;
  database: string;
  userName?: string;
  password?: string;
}

export interface RedisConfig {
  host: string;
}
export interface ServerConfig {
  secret: string;
  port: string;
  database: DatabaseConfig;
}

export const serverConfig: ServerConfig = {
  secret: env.SECRET as string,
  port: env.PORT as string,
  database: {
    host: env.POSTGRES_HOST as string,
    database: env.POSTGRES_DATABASE as string,
    userName: env.POSTGRES_USER as string,
    password: env.POSTGRES_PASSWORD as string
  }
};

export const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: 'postgres',
    host: env.POSTGRES_HOST || '',
    port: Number(env.POSTGRES_PORT) || 5432,
    username: env.POSTGRES_USER || '',
    password: env.POSTGRES_PASSWORD || '',
    database: env.POSTGRES_DATABASE || '',
    synchronize: true,
    dropSchema: false,
    logging: false,
    cache: true,
    entities: MODELS,
    migrations: env.NODE_ENV === 'production' ? [] : ['migration/*.ts'],
    subscribers: env.NODE_ENV === 'production' ? ['dist/subscriber/**/*.js'] : ['src/subscriber/**/*.ts'],
    cli: {
      migrationsDir: 'migration'
    }
  },
  {
    name: 'test',
    type: 'postgres',
    host: env.POSTGRES_HOST || '',
    port: Number(env.POSTGRES_PORT) || 5432,
    username: env.POSTGRES_USER || '',
    password: env.POSTGRES_PASSWORD || '',
    database: env.POSTGRES_DATABASE || '',
    synchronize: true,
    dropSchema: true,
    logging: false,
    cache: true,
    entities: MODELS
  }
];
