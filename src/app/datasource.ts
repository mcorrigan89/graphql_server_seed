import { connectionOptions } from '@config';
import { DataSource } from 'typeorm';

const datasource = new DataSource(connectionOptions[0]);

export { datasource };
