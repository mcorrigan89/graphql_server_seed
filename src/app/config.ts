/* tslint:disable */
/*
  "In particular, if there is a variable in your .env file
  which collides with one that already exists in your environment,
  then that variable will be skipped."
  - https://www.npmjs.com/package/dotenv
*/

import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { MODELS } from '@data/index';
import path from 'path';
import fs from 'fs';

const env = process.env;
export const isProduction: boolean = env.NODE_ENV === 'production';
export const isTest: boolean = env.NODE_ENV === 'test' || env.NODE_ENV === 'ci';
const root = path.resolve('.');

const serverKey = fs.readFileSync(root + '/localhost-key.pem');
const serverCert = fs.readFileSync(root + '/localhost.pem');

if (isTest) {
  dotenv.config({ path: root + '/.env.test' });
} else {
  dotenv.config({ path: root + '/.env' });
}

export const dbConnectionName = () => {
  return isTest ? 'test' : 'default';
};

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
  port: number;
  serverCert: Buffer;
  serverKey: Buffer;
  database: DatabaseConfig;
  redis: {
    host: string;
    port: string;
  };
}

export const serverConfig: ServerConfig = {
  secret: env.SECRET as string,
  port: Number(env.PORT as string),
  serverCert,
  serverKey,
  database: {
    host: env.POSTGRES_HOST as string,
    database: env.POSTGRES_DATABASE as string,
    userName: env.POSTGRES_USER as string,
    password: env.POSTGRES_PASSWORD as string
  },
  redis: {
    host: env.REDIS_HOST as string,
    port: env.REDIS_PORT as string
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
    dropSchema: false,
    logging: false,
    cache: true,
    entities: MODELS
  }
];
