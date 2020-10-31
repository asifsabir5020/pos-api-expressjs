import express from 'express';
import UserController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';
import { authorize } from '../../../common/middlewares/authorize';

const router = express.Router();

router
  .route('/register')
  .post(authenticate, authorize('admin'), UserController.register);

router
  .route('/login')
  .post(UserController.login);

router
  .route('/users')
  .get(authenticate, authorize('admin'), UserController.index);

router
  .route('/register/:id')
  .put(authenticate, authorize('admin'), UserController.update);

export default router;