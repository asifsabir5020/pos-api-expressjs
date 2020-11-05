import express from 'express';
import PermissionRouterController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/:id')
  .get(authenticate, authorize('admin'), PermissionRouterController.show)
  .put(authenticate, authorize('admin'), PermissionRouterController.update);

export default router;