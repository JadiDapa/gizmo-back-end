import { Router } from 'express';
import CategoryController from '../controllers/controller.category';
import upload from '../middleware/file-upload.middleware';
import { authCheck } from '../helpers/helper.authorization';

const CategoryRouter = Router();

CategoryRouter.get('/categories', CategoryController.getAllCategories);
CategoryRouter.get('/categories/:categorySlug', CategoryController.getCategoryBySlug);
CategoryRouter.post(
  '/categories/create',
  authCheck,
  upload.single('image'),
  CategoryController.createCategory
);
CategoryRouter.put(
  '/categories/:categorySlug',
  authCheck,
  upload.single('image'),
  CategoryController.updateCategory
);
CategoryRouter.delete('/categories/:categorySlug', authCheck, CategoryController.deleteCategory);

export default CategoryRouter;
