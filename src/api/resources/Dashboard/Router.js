import express from 'express';
import DashboardController from './Controller';
import { authenticate } from '../../../common/middlewares/authenticate';

const router = express.Router();

router
  .route('/')
  .get(authenticate, DashboardController.index);

export default router;