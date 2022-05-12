import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
import device from '../entities/deviceEntity'
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    device
  ],
  synchronize: true,
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;