import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from './documentation/swagger.json';
import { connect } from './config/db';
import { restRouter } from './api';

const app = express();
let PORT = process.env.PORT || 8000;

connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  PORT = 8080;
  app.use(logger('dev'));
}

app.use(cors({origin: 'http://localhost:3000'}));

app.use('/api/v1', restRouter);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
