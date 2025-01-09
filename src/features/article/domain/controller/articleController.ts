import express, { Request, Response, Router } from "express";
import { ExceptionHandler } from "@domain/exceptions/exceptionHandler";
import { logger } from "@domain/utils/logger";
import { upload } from "@domain/utils/upload";
import { ArticleRepository } from "@features/article/data/repository/articleRepository";
import { ArticleDAOImpl } from "@features/article/data/dao/articleDAOImpl";
import { ArticleServiceImpl } from "../service/articleServiceImpl";
import { validateArticleRequest } from "@features/article/presentation/request/articleRequest";

const router: Router = express.Router();

// Initialisation des dépendances
const articleRepository = new ArticleRepository();
const articleDAO = new ArticleDAOImpl(articleRepository);
const articleService = new ArticleServiceImpl(articleDAO);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Création ou modification d'un article
 *     description: Crée ou met à jour un article.
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleRequest'
 *     responses:
 *       201:
 *         description: Article créé ou mis à jour avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post(
  "/",
  validateArticleRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const articleData = req.body;
      logger.info("Requête pour créer ou mettre à jour un article.");
      const article = await articleService.createOrUpdateArticle(articleData);
      logger.info("Article créé ou mis à jour avec succès.");
      res.status(201).json(article);
    } catch (error) {
      logger.error(
        "Erreur lors de la création ou mise à jour de l'article :",
        error
      );
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Suppression d'un article
 *     description: Supprime un article par son identifiant.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de l'article à supprimer.
 *     responses:
 *       200:
 *         description: Article supprimé avec succès.
 *       404:
 *         description: Article introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info(`Requête pour supprimer l'article avec l'ID : ${id}`);
    const article = await articleService.getArticleById(id);

    if (!article) {
      logger.warn(`Article introuvable pour l'ID : ${id}`);
      res.status(404).json({ message: "Article introuvable." });
      return;
    }

    await articleService.deleteArticleById(id);
    logger.info("Article supprimé avec succès.");
    res.status(200).json({ message: "Article supprimé avec succès." });
  } catch (error) {
    logger.error("Erreur lors de la suppression de l'article :", error);
    ExceptionHandler.handle(error, res);
  }
});

// Gestion des fichiers upload
/**
 * @swagger
 * /articles/upload:
 *   post:
 *     summary: Upload d'image pour un article
 *     description: Permet d'uploader une image pour un article.
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploadée avec succès.
 *       400:
 *         description: Erreur de validation des fichiers.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post(
  "/upload",
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "Aucun fichier uploadé." });
        return;
      }

      const host = `${process.env.API_HOSTNAME}/${process.env.API_PREFIX}`;
      const imageUrl = `${host}/images/${req.file.filename}`;
      logger.info(`Image uploadée avec succès : ${req.file.filename}`);
      res.status(200).json({
        message: "Image uploadée avec succès.",
        filename: imageUrl,
      });
    } catch (error) {
      logger.error("Erreur lors de l'upload de l'image :", error);
      ExceptionHandler.handle(error, res);
    }
  }
);

export { router as articleRouter };
