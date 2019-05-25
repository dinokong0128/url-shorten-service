import debugLib from 'debug';
import mongoose from 'mongoose';

import { mongoUri } from '../config';

const debug = debugLib('mangodb');

// Exit application on error
mongoose.connection.on('error', (err) => {
  debug(`MongoDB connection error: ${mongoUri} ${err}`);
  process.exit(-1);
});

export default () => {
  mongoose.connect(mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
