import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import device from '../entities/deviceEntity'

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    device
  ],
  synchronize: true,
  logging: true,
  extra: {
    ssl: true
  }
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;