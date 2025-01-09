import express, { Request, Response, Router } from "express";
import { ExceptionHandler } from "@domain/exceptions/exceptionHandler";
import { logger } from "@domain/utils/logger";
import { VehicleRepository } from "@features/vehicle/data/repository/vehicleRepository";
import { CategoryDAOImpl } from "@features/vehicle/data/dao/categoryDAOImpl";
import { CategoryRepository } from "@features/vehicle/data/repository/categoryRepository";
import { VehicleDAOImpl } from "@features/vehicle/data/dao/vehicleDAOImpl";
import path from "path";
import fs from "fs";
import { CategoryServiceImpl } from "@features/vehicle/domain/service/categoryServiceImpl";
import { VehicleServiceImpl } from "@features/vehicle/domain/service/vehicleServiceImpl";
import { ArticleRepository } from "@features/article/data/repository/articleRepository";
import { ArticleDAOImpl } from "@features/article/data/dao/articleDAOImpl";
import { ArticleServiceImpl } from "@features/article/domain/service/articleServiceImpl";

const router: Router = express.Router();

// Initialisation des repositories
const vehicleRepository = new VehicleRepository();
const categoryRepository = new CategoryRepository();
const categoryDAO = new CategoryDAOImpl(categoryRepository);
const categoryService = new CategoryServiceImpl(categoryDAO);
const vehicleDAO = new VehicleDAOImpl(vehicleRepository);
const vehicleService = new VehicleServiceImpl(vehicleDAO, categoryDAO);
const articleRepository = new ArticleRepository();
const articleDAO = new ArticleDAOImpl(articleRepository);
const articleService = new ArticleServiceImpl(articleDAO);

/**
 * @swagger
 * /images/{filename}:
 *   get:
 *     summary: Télécharger une image
 *     description: Permet de télécharger une image associée à un article.
 *     tags:
 *       - Images
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom du fichier de l'image.
 *     responses:
 *       200:
 *         description: Image téléchargée avec succès.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Fichier introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/:filename", async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../../../../uploads", filename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "Fichier introuvable." });
      return;
    }

    res.sendFile(filePath);
  } catch (error) {
    logger.error("Erreur lors de l'accès au fichier :", error);
    ExceptionHandler.handle(error, res);
  }
});

export { router as imageRouter };
