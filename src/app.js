import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from './documentation/swagger.json';
import { connect } from './config/db';
import { restRouter } from './api';

const app = express();
const PORT = process.env.PORT || 3006;

connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(cors({origin: 'http://localhost:3000'}));

app.use('/api', restRouter);
app.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
