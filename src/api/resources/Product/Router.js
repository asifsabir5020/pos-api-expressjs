import express from 'express';
import ProductController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, ProductController.create)
  .get(authenticate, ProductController.index);

router
  .route('/:id')
  .get(authenticate, ProductController.show)
  .delete(authenticate, ProductController.delete)
  .put(authenticate, ProductController.update);

export default router;