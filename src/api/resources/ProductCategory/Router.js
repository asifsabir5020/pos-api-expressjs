import express from 'express';
import ProductCategoryController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from './../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authenticate, ProductCategoryController.create)
  .get(authenticate, ProductCategoryController.index);

router
  .route('/:id')
  .get(authenticate, ProductCategoryController.show)
  .delete(authenticate,authorize('admin'), ProductCategoryController.delete)
  .put(authenticate, ProductCategoryController.update);

export default router;