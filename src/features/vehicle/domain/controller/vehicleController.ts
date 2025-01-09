import express, { Request, Response, Router } from "express";
import { ExceptionHandler } from "@domain/exceptions/exceptionHandler";
import { logger } from "@domain/utils/logger";
import { VehicleServiceImpl } from "../service/vehicleServiceImpl";
import { VehicleRepository } from "@features/vehicle/data/repository/vehicleRepository";
import { CategoryDAOImpl } from "@features/vehicle/data/dao/categoryDAOImpl";
import { CategoryRepository } from "@features/vehicle/data/repository/categoryRepository";
import { VehicleDAOImpl } from "@features/vehicle/data/dao/vehicleDAOImpl";
import { validateVehicleRequest } from "@features/vehicle/presentation/request/vehicleRequest";
import { upload } from "@domain/utils/upload";

const router: Router = express.Router();

// Initialisation des repositories
const vehicleRepository = new VehicleRepository();
const categoryRepository = new CategoryRepository();
const categoryDAO = new CategoryDAOImpl(categoryRepository);
const vehicleDAO = new VehicleDAOImpl(vehicleRepository);
const vehicleService = new VehicleServiceImpl(vehicleDAO, categoryDAO);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Création ou modification d'un véhicule
 *     description: Crée ou met à jour un véhicule.
 *     tags:
 *       - Véhicules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleRequest'
 *     responses:
 *       201:
 *         description: Véhicule créé ou mis à jour avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post(
  "/",
  validateVehicleRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicleData = req.body;
      logger.info("Requête pour créer ou mettre à jour un véhicule.");
      const vehicle = await vehicleService.createOrUpdateVehicle(vehicleData);
      logger.info("Véhicule créé ou mis à jour avec succès.");
      res.status(201).json(vehicle);
    } catch (error) {
      logger.error(
        "Erreur lors de la création ou mise à jour du véhicule :",
        error
      );
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Suppression d'un véhicule
 *     description: Supprime un véhicule par son ID.
 *     tags:
 *       - Véhicules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du véhicule à supprimer.
 *     responses:
 *       200:
 *         description: Véhicule supprimé avec succès.
 *       404:
 *         description: Véhicule introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info(`Requête pour supprimer le véhicule avec l'ID : ${id}`);
    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) {
      logger.warn(`Véhicule introuvable pour l'ID : ${id}`);
      res.status(404).json({ message: "Véhicule introuvable." });
      return;
    }

    await vehicleService.deleteVehicleById(id);
    logger.info("Véhicule supprimé avec succès.");
    res.status(200).json({ message: "Véhicule supprimé avec succès." });
  } catch (error) {
    logger.error("Erreur lors de la suppression du véhicule :", error);
    ExceptionHandler.handle(error, res);
  }
});

// Gestion des fichiers upload
/**
 * @swagger
 * /vehicles/upload:
 *   post:
 *     summary: Upload d'image pour un véhicule
 *     description: Permet d'uploader une image pour un véhicule.
 *     tags:
 *       - Véhicules
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
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        throw new Error("Aucun fichier uploadé.");
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

/**
 * @swagger
 * /vehicles/{id}/status:
 *   patch:
 *     summary: Modification du statut d'un véhicule
 *     description: Modifie le statut d'un véhicule à partir de son ID et du nouveau statut passé dans le corps de la requête.
 *     tags:
 *       - Véhicules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant du véhicule à modifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_id:
 *                 type: string
 *                 description: L'identifiant du nouveau statut.
 *     responses:
 *       200:
 *         description: Statut modifié avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleDTO'
 *       400:
 *         description: Données invalides ou statut non trouvé.
 *       404:
 *         description: Véhicule introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.patch(
  "/:id/status",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status_id: statusId } = req.body;

      if (!statusId) {
        res.status(400).json({ message: "Le champ 'status_id' est requis." });
        return;
      }

      logger.info(
        `Requête pour modifier le statut du véhicule avec ID : ${id}`
      );
      const updatedVehicle = await vehicleService.updateVehicleStatus(
        id,
        statusId
      );

      res.status(200).json(updatedVehicle);
    } catch (error) {
      logger.error(
        "Erreur lors de la modification du statut du véhicule :",
        error
      );
      ExceptionHandler.handle(error, res);
    }
  }
);

export { router as vehicleRouter };
