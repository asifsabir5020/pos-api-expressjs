import express from 'express';
import { DashboardRouter } from './resources/Dashboard';
import { UserRouter } from './resources/User';
import { VendorRouter } from './resources/Vendor';
import { PurchaseRouter } from './resources/Purchase';
import { SaleRouter } from './resources/Sale';
import { StockRouter } from './resources/Stock';
import { CustomerRouter } from './resources/Customer';
import { PermissionRouter } from './resources/Permission';
import { ProductCategoryRouter } from './resources/ProductCategory';
import { ProductRouter } from './resources/Product';



export const restRouter = express.Router();
restRouter.use('/dashboard', DashboardRouter);
restRouter.use('/auth', UserRouter);
restRouter.use('/auth/permissions', PermissionRouter);
restRouter.use('/product_categories', ProductCategoryRouter);
restRouter.use('/products', ProductRouter);
restRouter.use('/vendors', VendorRouter);
restRouter.use('/customers', CustomerRouter);
restRouter.use('/purchases', PurchaseRouter);
restRouter.use('/sales', SaleRouter);
restRouter.use('/stocks', StockRouter);
