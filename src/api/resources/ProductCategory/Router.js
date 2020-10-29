import express from 'express';
import ProductCategoryController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .post(ProductCategoryController.create)
  .get(authenticate, ProductCategoryController.index);

router
  .route('/:id')
  .get(ProductCategoryController.show)
  .delete(ProductCategoryController.delete)
  .put(ProductCategoryController.update);

export default router;