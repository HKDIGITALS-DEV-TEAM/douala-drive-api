import express, { Router, Request, Response } from "express";
import { ConfigurationServiceImpl } from "../service/configurationServiceImpl";
import { ConfigurationDAOImpl } from "../../data/dao/configurationDAOImpl";
import { ExceptionHandler } from "@domain/exceptions/exceptionHandler";
import { ConfigurationRequest } from "../../presentation/request/configurationRequest";
import { logger } from "@domain/utils/logger";
import { ConfigurationRepository } from "@features/config/data/repository/configurationRepository";
import { OpeningHourRepository } from "@features/config/data/repository/openingHour";
import { RateRepository } from "@features/config/data/repository/rateRepository";

// Initialisation des dépendances
const configurationRepository = new ConfigurationRepository();
const openingHourRepository = new OpeningHourRepository();
const rateRepository = new RateRepository();
const configurationDAO = new ConfigurationDAOImpl(
  configurationRepository,
  openingHourRepository,
  rateRepository
);
const configurationService = new ConfigurationServiceImpl(configurationDAO);

// Création du contrôleur
const router: Router = express.Router();

/**
 * @swagger
 * /configurations:
 *   get:
 *     summary: Récupère toutes les configurations
 *     description: Retourne toutes les configurations avec leurs openingHours et rates associés.
 *     tags:
 *       - Configurations
 *     responses:
 *       200:
 *         description: Liste des configurations récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConfigurationDTO'
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Requête pour récupérer toutes les configurations.");
    const configurations = await configurationService.getAllConfigurations();
    logger.info("Configurations récupérées avec succès.");
    res.status(200).json(configurations);
  } catch (error) {
    logger.error("Erreur lors de la récupération des configurations :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /configurations/{name}:
 *   get:
 *     summary: Récupère une configuration par son nom
 *     description: Retourne une configuration spécifique avec ses openingHours et rates associés.
 *     tags:
 *       - Configurations
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom de la configuration.
 *     responses:
 *       200:
 *         description: Configuration récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfigurationDTO'
 *       404:
 *         description: Configuration introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/:name", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    logger.info(
      `Requête pour récupérer la configuration avec le nom : ${name}`
    );
    const configuration = await configurationService.getConfigurationByName(
      name
    );

    if (!configuration) {
      logger.warn(`Configuration introuvable pour le nom : ${name}`);
      res.status(404).json({ message: "Configuration introuvable." });
      return;
    }

    logger.info(`Configuration récupérée avec succès : ${name}`);
    res.status(200).json(configuration);
  } catch (error) {
    logger.error("Erreur lors de la récupération de la configuration :", error);
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /configurations:
 *   post:
 *     summary: Crée ou met à jour une configuration
 *     description: Crée ou met à jour une configuration avec ses openingHours et rates associés.
 *     tags:
 *       - Configurations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigurationRequest'
 *     responses:
 *       201:
 *         description: Configuration créée ou mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfigurationDTO'
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const request: ConfigurationRequest = req.body;
    logger.info("Requête pour créer ou mettre à jour une configuration.");
    const configuration =
      await configurationService.createOrUpdateConfiguration(request);
    logger.info("Configuration créée ou mise à jour avec succès.");
    res.status(201).json(configuration);
  } catch (error) {
    logger.error(
      "Erreur lors de la création ou mise à jour de la configuration :",
      error
    );
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /configurations/{id}:
 *   delete:
 *     summary: Supprime une configuration
 *     description: Supprime une configuration spécifique ainsi que ses openingHours et rates associés.
 *     tags:
 *       - Configurations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la configuration.
 *     responses:
 *       200:
 *         description: Configuration supprimée avec succès.
 *       404:
 *         description: Configuration introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info(`Requête pour supprimer la configuration avec l'ID : ${id}`);
    await configurationService.deleteConfiguration(id);
    logger.info("Configuration supprimée avec succès.");
    res.status(200).json({ message: "Configuration supprimée avec succès." });
  } catch (error) {
    logger.error("Erreur lors de la suppression de la configuration :", error);
    ExceptionHandler.handle(error, res);
  }
});

// Exporter le router
export { router as configurationRouter };
