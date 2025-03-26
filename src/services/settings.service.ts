import prisma from "../config/db";
import { Prisma } from "@prisma/client";

export const getSettings = async () => {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    throw new Error("Settings not found");
  }

  return settings;
};

export const updateSettings = async (data: Prisma.SettingsUpdateInput) => {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    throw new Error("Settings not found");
  }

  return await prisma.settings.update({
    where: { id: settings.id },
    data,
  });
};