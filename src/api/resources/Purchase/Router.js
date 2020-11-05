import express from 'express';
import PurchaseController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authenticate, authorize('admin', 'manager'),  PurchaseController.create)
  .get(authenticate, PurchaseController.index);

router
  .route('/:id')
  .get(authenticate, authorize('admin', 'manager'),  PurchaseController.show)
  .delete(authenticate, authorize('admin', 'manager'),  PurchaseController.delete)
  .put(authenticate, authorize('admin', 'manager'),  PurchaseController.update);

export default router;