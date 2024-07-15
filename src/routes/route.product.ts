import { Router } from 'express';
import ProductController from '../controllers/controller.product';
import upload from '../middleware/file-upload.middleware';
import { authCheck } from '../helpers/helper.authorization';

const ProductRouter = Router();

ProductRouter.get('/products', ProductController.getAllProducts);
ProductRouter.get('/products/:productSlug', ProductController.getProductBySlug);
ProductRouter.post(
  '/products/create',
  authCheck,
  upload.single('image'),
  ProductController.createProduct
);
ProductRouter.put(
  '/products/:productSlug',
  authCheck,
  upload.single('image'),
  ProductController.updateProduct
);
ProductRouter.delete('/products/:productSlug', authCheck, ProductController.deleteProduct);

export default ProductRouter;
