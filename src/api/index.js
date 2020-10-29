import express from 'express';
import { UserRouter } from './resources/User';
import { ProductCategoryRouter } from './resources/ProductCategory';
import { ProductRouter } from './resources/Product';

export const restRouter = express.Router();
restRouter.use('/auth', UserRouter);
restRouter.use('/product_categories', ProductCategoryRouter);
restRouter.use('/products', ProductRouter);
