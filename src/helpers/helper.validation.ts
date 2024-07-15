import { Accounts, Products, Categories } from '@prisma/client';
import joi from 'joi';

class Validation {
  static async createAccount(data: Accounts) {
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required()
    });

    return schema.validate(data);
  }

  static async createCategory(data: Categories) {
    const schema = joi.object({
      name: joi.string().required(),
      slug: joi.string().required(),
      image: joi.string().required()
    });

    return schema.validate(data);
  }

  static async createProduct(data: Products) {
    const schema = joi.object({
      name: joi.string().required(),
      slug: joi.string().required(),
      type: joi.string().required(),
      description: joi.string().required(),
      image: joi.string().required(),
      categorySlug: joi.string().required(),
      isFeatured: joi.boolean().optional()
    });

    return schema.validate(data);
  }
}

export default Validation;
