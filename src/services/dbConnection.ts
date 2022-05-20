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
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;