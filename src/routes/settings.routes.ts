import express from "express";
import {
  getSettingsHandler,
  updateSettingsHandler,
} from "../controllers/settings.controller";

const router = express.Router();

/**
 * @swagger
 * /settings:
 *   get:
 *     tags: [Settings]
 *     summary: Get settings
 *     description: Retrieves the application settings
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: Settings details
 *         schema:
 *           $ref: "#/definitions/Settings" # Updated reference
 */
router.get("/", getSettingsHandler);

/**
 * @swagger
 * /settings:
 *   put:
 *     tags: [Settings]
 *     summary: Update settings
 *     description: Updates the application settings (single row)
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             website:
 *               type: string
 *             themeColor:
 *               type: string
 *             logoUrl:
 *               type: string
 *             defaultLanguage:
 *               type: string
 *             timezone:
 *               type: string
 *             featuresEnabled:
 *               type: object
 *     responses:
 *       200:
 *         description: Updated settings
 *         schema:
 *           $ref: "#/definitions/Settings" # Updated reference
 */
router.put("/", updateSettingsHandler);

export default router;