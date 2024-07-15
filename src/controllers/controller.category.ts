import CategoryModel from '../models/model.category';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Categories } from '@prisma/client';
import Validation from '../helpers/helper.validation';

const category = new CategoryModel();

class CategoryController {
  static async getAllCategories(req: any, res: any) {
    try {
      const result = await category.getAll();
      return SuccessResponse.DataFound(req, res, 'Categories found', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async getCategoryBySlug(req: { params: { categorySlug: string } }, res: any) {
    try {
      const categorySlug = req.params.categorySlug;
      const result = await category.getBySlug(categorySlug);
      return SuccessResponse.DataFound(req, res, 'A Category found', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async createCategory(
    req: {
      body: Categories;
      file: Express.Multer.File;
    },
    res: any
  ) {
    try {
      const imageFile = req.file.filename;
      const data = { ...req.body, image: imageFile };
      const { error } = await Validation.createCategory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await category.create(data);
      return SuccessResponse.DataFound(req, res, 'New Category Created', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async updateCategory(
    req: { params: { categorySlug: string }; body: Categories; file: Express.Multer.File },
    res: any
  ) {
    try {
      const categorySlug = req.params.categorySlug;
      const imageFile = req.file?.filename;
      const data = req.body;
      if (imageFile) {
        data.image = imageFile;
      }
      const { error } = await Validation.createCategory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await category.update(categorySlug, data);
      return SuccessResponse.DataFound(req, res, 'Existing Category Updated', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async deleteCategory(req: { params: { categorySlug: string } }, res: any) {
    try {
      const categorySlug = req.params.categorySlug;
      const result = await category.delete(categorySlug);
      return SuccessResponse.DataFound(req, res, 'Category Deleted', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }
}

export default CategoryController;
