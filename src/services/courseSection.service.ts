import prisma from '../config/db';

export const getAllCourseSections = async (
  courseId?: number,
  search?: string,
  page: number = 1,
  limit?: number
) => {
  const whereCondition: any = {
    ...(courseId ? { courseId } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const take = limit ? Number(limit) : undefined;
  const skip = limit ? (page - 1) * take! : undefined;

  const sections = await prisma.courseSection.findMany({
    where: whereCondition,
    orderBy: { orderIndex: "asc" },
    skip,
    take,
  });

  const totalSections = await prisma.courseSection.count({ where: whereCondition });

  return {
    sections,
    totalPages: limit ? Math.ceil(totalSections / take!) : 1,
    currentPage: page,
    totalSections,
  };
};

export const getCourseSection = async (sectionId: number) => {
  if (isNaN(sectionId)) {
    throw new Error('Invalid section ID');
  }

  const section = await prisma.courseSection.findUnique({
    where: { id: sectionId },
  });

  if (!section) {
    throw new Error('Section not found');
  }

  return section;
};

export const createCourseSection = async (courseId: number, title: string, description?: string) => {
  const lastSection = await prisma.courseSection.findFirst({
    where: { courseId },
    orderBy: { orderIndex: 'desc' },
  });

  const newOrderIndex = lastSection ? lastSection.orderIndex + 1 : 1;

  return await prisma.courseSection.create({
    data: { courseId, title, description, orderIndex: newOrderIndex },
  });
};

export const updateCourseSection = async (id: number, title?: string, description?: string) => {
  return await prisma.courseSection.update({
    where: { id },
    data: { title, description },
  });
};

export const deleteCourseSection = async (id: number) => {
  return await prisma.courseSection.delete({
    where: { id },
  });
};
