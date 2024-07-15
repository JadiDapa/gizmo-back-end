import { PrismaClient, Products } from '@prisma/client';

const prisma = new PrismaClient();

class ProductModel {
  async getAll() {
    const products = await prisma.products.findMany({
      include: {
        Categories: true
      }
    });
    return products;
  }

  async getById(slug: string) {
    const product = await prisma.products.findUnique({
      where: {
        slug: slug
      },
      include: {
        Categories: true
      }
    });
    return product;
  }

  async create(data: Products) {
    const product = await prisma.products.create({
      data: data
    });
    return product;
  }

  async update(slug: string, data: Products) {
    const product = await prisma.products.update({
      where: {
        slug: slug
      },
      data: data
    });
    return product;
  }

  async delete(slug: string) {
    const product = await prisma.products.delete({
      where: {
        slug: slug
      }
    });
    return product;
  }
}

export default ProductModel;
