import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

export const port = normalizePort(process.env.PORT || process.env.DEFAULT_PORT);
export const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
