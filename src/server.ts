import app from './app';
import databaseConnection from './db/dbConnection';

const PORT:number = Number(process.env.PORT) || 3000;

databaseConnection
  .then(() => app.listen(PORT))
  .catch(console.error);