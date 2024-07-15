import ProductModel from '../models/model.product';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Products } from '@prisma/client';
import Validation from '../helpers/helper.validation';

const product = new ProductModel();

class ProductController {
  static async getAllProducts(req: any, res: any) {
    try {
      const result = await product.getAll();
      return SuccessResponse.DataFound(req, res, 'Products found', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async getProductBySlug(req: { params: { productSlug: string } }, res: any) {
    try {
      const productSlug = req.params.productSlug;
      const result = await product.getById(productSlug);
      return SuccessResponse.DataFound(req, res, 'A Product found', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async createProduct(
    req: {
      body: Products;
      file: Express.Multer.File;
    },
    res: any
  ) {
    try {
      const imageFile = req.file.filename;
      const data = { ...req.body, image: imageFile };
      const { error } = await Validation.createProduct(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await product.create(data);
      return SuccessResponse.DataFound(req, res, 'New Product Created', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async updateProduct(
    req: { params: { productSlug: string }; body: Products; file: Express.Multer.File },
    res: any
  ) {
    try {
      const productSlug = req.params.productSlug;
      const imageFile = req.file?.filename;
      const data = req.body;
      if (imageFile) {
        data.image = imageFile;
      }
      const { error } = await Validation.createProduct(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await product.update(productSlug, data);
      return SuccessResponse.DataFound(req, res, 'Existing Product Updated', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }

  static async deleteProduct(req: { params: { productSlug: string } }, res: any) {
    try {
      const productSlug = req.params.productSlug;
      const result = await product.delete(productSlug);
      return SuccessResponse.DataFound(req, res, 'Product Deleted', result);
    } catch (error) {
      return ErrorResponse.InternalServer(req, res, (error as Error).message);
    }
  }
}

export default ProductController;
