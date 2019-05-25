import express from 'express';
import path from 'path';
import logger from 'morgan';
import indexRouter from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/html', express.static(path.join(__dirname, '../html')));

app.use('/', indexRouter);

export default app;
