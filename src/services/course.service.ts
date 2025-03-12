import prisma from '../config/db';

export const getAllCourses = async (
  categoryId?: number,
  teacherId?: number,
  search?: string,
  page: number = 1,
  limit?: number
) => {
  const take = limit ? Number(limit) : undefined;
  const skip = take ? (page - 1) * take : 0;

  const courses = await prisma.course.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(teacherId ? { teacherId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: [
      { isFeatured: 'desc' },
      { publishedAt: 'desc' },
    ],
    skip,
    take,
  });

  const totalCourses = await prisma.course.count({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(teacherId ? { teacherId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
  });

  return {
    courses,
    totalPages: take ? Math.ceil(totalCourses / take) : 1,
    currentPage: page,
    totalCourses,
  };
};

export const getCourseById = async (id: number) => {
  const course = await prisma.course.findUnique({
    where: { id },
    include: { category: true, teacher: true, sections: true },
  });

  if (!course) throw new Error('Course not found');
  return course;
};

export const createCourse = async (title: string, description: string, categoryId: number, teacherId: number, price: number) => {
  return await prisma.course.create({
    data: {
      title,
      description,
      categoryId,
      teacherId,
      price,
      publishedAt: new Date(),
    },
  });
};

export const updateCourse = async (id: number, title?: string, description?: string, categoryId?: number, teacherId?: number, price?: number) => {
  return await prisma.course.update({
    where: { id },
    data: { title, description, categoryId, teacherId, price },
  });
};

export const deleteCourse = async (id: number) => {
  return await prisma.course.delete({
    where: { id },
  });
};
