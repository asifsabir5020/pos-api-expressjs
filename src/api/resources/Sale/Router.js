import express from 'express';
import SaleController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authenticate, authorize('admin', 'manager', 'sales-man'),  SaleController.create)
  .get(authenticate, authorize('admin', 'manager', 'sales-man'), SaleController.index);

export default router;