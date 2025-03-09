import prisma from '../config/db';
import { hashPassword } from "../utils/hash";

export const createUser = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  roleId?: number
) => {
  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      roleId,
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const getAllUsers = async (
  email?: string,
  firstName?: string,
  lastName?: string,
  roleId?: number,
  page: number = 1,
  limit?: number
) => {
  const whereCondition: any = {
    ...(email ? { email: { contains: email, mode: "insensitive" } } : {}),
    ...(firstName ? { firstName: { contains: firstName, mode: "insensitive" } } : {}),
    ...(lastName ? { lastName: { contains: lastName, mode: "insensitive" } } : {}),
    ...(roleId ? { roleId } : {}),
  };

  const take = limit ? Number(limit) : undefined;
  const skip = limit ? (page - 1) * take! : undefined;

  const users = await prisma.user.findMany({
    where: whereCondition,
    orderBy: { id: "asc" },
    skip,
    take,
  });

  const totalUsers = await prisma.user.count({ where: whereCondition });

  return {
    users,
    totalPages: limit ? Math.ceil(totalUsers / take!) : 1,
    currentPage: page,
    totalUsers,
  };
};

export const updateUser = async (
  id: number,
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  roleId?: number
) => {
  let updatedData: any = {
    ...(email && { email }),
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(roleId !== undefined && { roleId }),
  };

  if (password) {
    updatedData.passwordHash = await hashPassword(password);
  }

  return await prisma.user.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
