import { Request, Response } from "express";
import {
  getSettings,
  updateSettings,
} from "../services/settings.service";
import { asyncHandler } from "../utils/async-handler.util";
import { NotFoundError } from "../types/error.types";

export const getSettingsHandler = asyncHandler(async (req: Request, res: Response) => {
  const settings = await getSettings();
  if (!settings) {
    throw new NotFoundError("Settings");
  }

  res.json({
    success: true,
    data: settings,
  });
});

export const updateSettingsHandler = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    website,
    themeColor,
    logoUrl,
    defaultLanguage,
    timezone,
    featuresEnabled
  } = req.body;

  const settings = await updateSettings({
    name,
    email,
    website,
    themeColor,
    logoUrl,
    defaultLanguage,
    timezone,
    featuresEnabled,
  });

  if (!settings) {
    throw new NotFoundError("Settings");
  }

  res.json({
    success: true,
    data: settings,
  });
});