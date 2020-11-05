import express from 'express';
import VendorController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/')
  .post(authenticate,authorize('admin', 'manager'), VendorController.create)
  .get(authenticate,authorize('admin', 'manager'), VendorController.index);

router
  .route('/:id')
  .get(authenticate,authorize('admin', 'manager'), VendorController.show)
  .delete(authenticate,authorize('admin', 'manager'), VendorController.delete)
  .put(authenticate,authorize('admin', 'manager'), VendorController.update);

export default router;