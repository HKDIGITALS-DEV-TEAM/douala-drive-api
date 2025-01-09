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
import { StatusRepository } from "@features/vehicle/data/repository/statusRepository";
import { StatusDAOImpl } from "@features/vehicle/data/dao/statusDAOImpl";
import { StatusServiceImpl } from "@features/vehicle/domain/service/statusServiceImpl";
import { CategoryArticleRepository } from "@features/article/data/repository/categoryArticleRepository";
import { CategoryArticleDAOImpl } from "@features/article/data/dao/categoryArticleDAOImpl";
import { CategoryArticleServiceImpl } from "@features/article/domain/service/categoryServiceImpl";
import { StatusArticleRepository } from "@features/article/data/repository/statusArticleRepository";
import { StatusArticleDAOImpl } from "@features/article/data/dao/statusArticleDAOImpl";
import { StatusArticleServiceImpl } from "@features/article/domain/service/statusServiceImpl";

const router: Router = express.Router();

// Initialisation des repositories
const vehicleRepository = new VehicleRepository();
const statusRepository = new StatusRepository();
const statusDAO = new StatusDAOImpl(statusRepository);
const statusService = new StatusServiceImpl(statusDAO);
const categoryRepository = new CategoryRepository();
const categoryDAO = new CategoryDAOImpl(categoryRepository);
const categoryService = new CategoryServiceImpl(categoryDAO);
const vehicleDAO = new VehicleDAOImpl(vehicleRepository);
const vehicleService = new VehicleServiceImpl(vehicleDAO, categoryDAO);
const articleRepository = new ArticleRepository();
const articleDAO = new ArticleDAOImpl(articleRepository);
const articleService = new ArticleServiceImpl(articleDAO);
const categoryArticleRepository = new CategoryArticleRepository();
const categoryArticleDAO = new CategoryArticleDAOImpl(
  categoryArticleRepository
);
const categoryArticleService = new CategoryArticleServiceImpl(
  categoryArticleDAO
);
const statusArticleRepository = new StatusArticleRepository();
const statusArticleDAO = new StatusArticleDAOImpl(statusArticleRepository);
const statusArticleService = new StatusArticleServiceImpl(statusArticleDAO);

/**
 * @swagger
 * /public/vehicles:
 *   get:
 *     summary: Liste des véhicules
 *     description: Retourne la liste de tous les véhicules avec leurs catégories et statuts.
 *     tags:
 *       - Véhicules
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VehicleDTO'
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/vehicles", async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Requête pour récupérer tous les véhicules.");
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    logger.error("Erreur lors de la récupération des véhicules :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /public/vehicles/{nameOrBrand}:
 *   get:
 *     summary: Recherche de véhicules
 *     description: Retourne une liste de véhicules en fonction de leur nom ou de leur marque.
 *     tags:
 *       - Véhicules
 *     parameters:
 *       - in: path
 *         name: nameOrBrand
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom ou marque du véhicule à rechercher.
 *     responses:
 *       200:
 *         description: Résultats de la recherche.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VehicleDTO'
 *       404:
 *         description: Aucun véhicule trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/vehicles/:nameOrBrand",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { nameOrBrand } = req.params;
      logger.info(
        `Requête pour rechercher des véhicules par nom ou marque : ${nameOrBrand}`
      );
      const vehicles = await vehicleService.getVehiclesByNameOrBrand(
        nameOrBrand
      );

      if (vehicles.length === 0) {
        logger.warn(`Aucun véhicule trouvé pour : ${nameOrBrand}`);
        res.status(404).json({ message: "Aucun véhicule trouvé." });
        return;
      }

      res.status(200).json(vehicles);
    } catch (error) {
      logger.error("Erreur lors de la recherche de véhicules :", error);
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /public/vehicles/category/{categoryName}:
 *   get:
 *     summary: Liste des véhicules par catégorie
 *     description: Retourne une liste de véhicules en fonction du nom de leur catégorie.
 *     tags:
 *       - Véhicules
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la catégorie.
 *     responses:
 *       200:
 *         description: Liste des véhicules pour la catégorie spécifiée.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VehicleDTO'
 *       404:
 *         description: Aucun véhicule trouvé pour la catégorie spécifiée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/vehicles/category/:categoryName",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { categoryName } = req.params;
      logger.info(
        `Requête pour récupérer les véhicules de la catégorie : ${categoryName}`
      );

      // Trouver la catégorie par son nom
      const category = await categoryService.getAllCategories();
      const matchedCategory = category.find((cat) => cat.name === categoryName);

      if (!matchedCategory) {
        logger.warn(`Catégorie introuvable : ${categoryName}`);
        res.status(404).json({ message: "Catégorie introuvable." });
        return;
      }

      // Récupérer les véhicules associés à cette catégorie
      const vehicles = await vehicleService.getVehiclesByCategory(
        matchedCategory.id
      );

      if (vehicles.length === 0) {
        logger.warn(
          `Aucun véhicule trouvé pour la catégorie : ${categoryName}`
        );
        res
          .status(404)
          .json({ message: "Aucun véhicule trouvé pour cette catégorie." });
        return;
      }

      logger.info(`Véhicules récupérés pour la catégorie : ${categoryName}`);
      res.status(200).json(vehicles);
    } catch (error) {
      logger.error(
        "Erreur lors de la récupération des véhicules par catégorie :",
        error
      );
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /public/vehicles/image/{filename}:
 *   get:
 *     summary: Télécharger une image
 *     description: Permet de télécharger une image associée à un article.
 *     tags:
 *       - Véhicules
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
router.get(
  "/vehicles/image/:filename",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ message: "Fichier introuvable." });
        return;
      }

      res.sendFile(filePath);
    } catch (error) {
      logger.error("Erreur lors de l'accès au fichier :", error);
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /public/articles:
 *   get:
 *     summary: Liste des articles
 *     description: Retourne la liste de tous les articles avec leurs catégories, tags et auteurs associés.
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArticleDTO'
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/articles", async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Requête pour récupérer tous les articles.");
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    logger.error("Erreur lors de la récupération des articles :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /public/articles/{slug}:
 *   get:
 *     summary: Recherche d'un article
 *     description: Retourne un article en fonction de son slug.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug de l'article.
 *     responses:
 *       200:
 *         description: Article trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleDTO'
 *       404:
 *         description: Article introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/articles/:slug",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;
      logger.info(`Requête pour récupérer l'article avec le slug : ${slug}`);
      const article = await articleService.getArticleBySlug(slug);

      if (!article) {
        logger.warn(`Article introuvable pour le slug : ${slug}`);
        res.status(404).json({ message: "Article introuvable." });
        return;
      }

      res.status(200).json(article);
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'article :", error);
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /public/articles/user/{userId}:
 *   get:
 *     summary: Liste des articles par utilisateur
 *     description: Retourne une liste d'articles créés par un utilisateur donné.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'utilisateur.
 *     responses:
 *       200:
 *         description: Liste des articles récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArticleDTO'
 *       404:
 *         description: Aucun article trouvé pour cet utilisateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/articles/user/:userId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      logger.info(
        `Requête pour récupérer les articles de l'utilisateur : ${userId}`
      );
      const articles = await articleService.getArticlesByAuthor(userId);

      if (articles.length === 0) {
        logger.warn(`Aucun article trouvé pour l'utilisateur : ${userId}`);
        res
          .status(404)
          .json({ message: "Aucun article trouvé pour cet utilisateur." });
        return;
      }

      res.status(200).json(articles);
    } catch (error) {
      logger.error(
        "Erreur lors de la récupération des articles par utilisateur :",
        error
      );
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /public/articles/image/{filename}:
 *   get:
 *     summary: Télécharger une image
 *     description: Permet de télécharger une image associée à un article.
 *     tags:
 *       - Articles
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
router.get(
  "/articles/image/:filename",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ message: "Fichier introuvable." });
        return;
      }

      res.sendFile(filePath);
    } catch (error) {
      logger.error("Erreur lors de l'accès au fichier :", error);
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /public/categories/vehicles:
 *   get:
 *     summary: Récupérer la liste des catégories
 *     description: Retourne toutes les catégories disponibles pour les véhicules.
 *     tags:
 *       - Véhicules
 *     responses:
 *       200:
 *         description: Liste des catégories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identifiant unique de la catégorie.
 *                   name:
 *                     type: string
 *                     description: Nom de la catégorie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/categories/vehicles", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    logger.error("Erreur lors de la récupération des catégories :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /public/statuses/vehicles:
 *   get:
 *     summary: Récupérer la liste des statuts
 *     description: Retourne tous les statuts disponibles pour les véhicules.
 *     tags:
 *       - Véhicules
 *     responses:
 *       200:
 *         description: Liste des statuts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identifiant unique du statut.
 *                   name:
 *                     type: string
 *                     description: Nom du statut.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/statuses/vehicles", async (req, res) => {
  try {
    const statuses = await statusService.getAllStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    logger.error("Erreur lors de la récupération des statuts :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /public/categories/articles:
 *   get:
 *     summary: Récupérer la liste des catégories d'articles
 *     description: Retourne toutes les catégories disponibles pour les articles.
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Liste des catégories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identifiant unique de la catégorie.
 *                   name:
 *                     type: string
 *                     description: Nom de la catégorie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/categories/articles", async (req, res) => {
  try {
    const categories = await categoryArticleService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    logger.error("Erreur lors de la récupération des catégories :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /public/statuses/articles:
 *   get:
 *     summary: Récupérer la liste des statuts d'articles
 *     description: Retourne tous les statuts disponibles pour les articles.
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Liste des statuts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identifiant unique du statut.
 *                   name:
 *                     type: string
 *                     description: Nom du statut.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/statuses/articles", async (req, res) => {
  try {
    const statuses = await statusArticleService.getAllStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    logger.error("Erreur lors de la récupération des statuts :", error);
    ExceptionHandler.handle(error, res);
  }
});

export { router as publicRouter };
