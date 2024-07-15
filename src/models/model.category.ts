import { PrismaClient, Categories } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryModel {
  async getAll() {
    const categories = await prisma.categories.findMany({
      include: {
        Products: true
      }
    });
    return categories;
  }

  async getBySlug(slug: string) {
    const category = await prisma.categories.findUnique({
      where: {
        slug: slug
      },
      include: {
        Products: true
      }
    });
    return category;
  }

  async create(data: Categories) {
    const category = await prisma.categories.create({
      data: data
    });
    return category;
  }

  async update(slug: string, data: Categories) {
    const category = await prisma.categories.update({
      where: {
        slug: slug
      },
      data: data
    });
    return category;
  }

  async delete(slug: string) {
    const category = await prisma.categories.delete({
      where: {
        slug: slug
      }
    });
    return category;
  }
}

export default CategoryModel;
