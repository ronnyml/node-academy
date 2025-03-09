import prisma from '../config/db';

export const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategory = async (categoryId: number) => {
  if (isNaN(categoryId)) {
    throw new Error('Invalid category ID');
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};

export const createCategory = async (name: string, description?: string) => {
  return await prisma.category.create({
    data: { name, description },
  });
};

export const updateCategory = async (id: number, name?: string, description?: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name, description },
  });
};

export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};
