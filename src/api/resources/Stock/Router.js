import express from 'express';
import StockController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .get(authenticate, authorize('admin', 'manager', 'sales-man'), StockController.index);

router
  .route('/:id')
  .get(authenticate, authorize('admin', 'manager', 'sales-man'), StockController.show)

export default router;