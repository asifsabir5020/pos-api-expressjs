import express from 'express';
import CustomerController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authenticate,authorize('admin', 'manager', 'sales-man'), CustomerController.create)
  .get(authenticate,authorize('admin', 'manager','sales-man'), CustomerController.index);

router
  .route('/:id')
  .get(authenticate,authorize('admin', 'manager','sales-man'), CustomerController.show)
  .delete(authenticate,authorize('admin', 'manager','sales-man'), CustomerController.delete)
  .put(authenticate,authorize('admin', 'manager','sales-man'), CustomerController.update);

export default router;