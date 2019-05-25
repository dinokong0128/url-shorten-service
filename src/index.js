import server from './server';
import connectMongoDB from './mongodb';
import { port } from '../config';

/**
 * Create MongoDB connection
 */

connectMongoDB();

server.listen(port);
