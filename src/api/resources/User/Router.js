import express from 'express';
import UserController from './Controller';

const router = express.Router();

router
  .route('/register')
  .post(UserController.register);

router
  .route('/login')
  .post(UserController.login)

// router
//   .route('/:id')
//   .get(ProductCategoryController.show)
//   .delete(ProductCategoryController.delete)
//   .put(ProductCategoryController.update);

export default router;