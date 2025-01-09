import express, { Router, Request, Response } from "express";
import { UserServiceImpl } from "../service/userServiceImpl";
import { UserDAOImpl } from "../../data/dao/userDAOImpl";
import { UserRepository } from "../../data/repository/userRepository";
import { ExceptionHandler } from "@domain/exceptions/exceptionHandler";
import { logger } from "@domain/utils/logger";
import { upload } from "@domain/utils/upload";
import { validateEditProfileRequest } from "@features/auth/presentation/request/editProfileRequest";
import path from "path";
import { existsSync } from "fs";

// Instancier les dépendances
const userRepository = new UserRepository();
const userDAO = new UserDAOImpl(userRepository);
const userService = new UserServiceImpl(userDAO);

// Création du contrôleur
const router: Router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste des utilisateurs
 *     description: Retourne la liste de tous les utilisateurs enregistrés.
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDTO'
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Requête pour récupérer tous les utilisateurs.");
    const users = await userService.getAllUsers();
    logger.info("Tous les utilisateurs récupérés avec succès.");
    res.status(200).json(users);
  } catch (error: unknown) {
    logger.error("Erreur lors de la récupération des utilisateurs.");
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Récupérer un utilisateur par username
 *     description: Retourne un utilisateur spécifique à partir de son username.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom d'utilisateur (username) à rechercher.
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/:username", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;
    logger.info(
      `Requête pour récupérer l'utilisateur avec le username : ${username}`
    );
    const user = await userService.getUserByUsername(username);

    if (!user) {
      logger.warn(`Utilisateur introuvable pour le username : ${username}`);
      res.status(404).json({ message: "Utilisateur introuvable." });
      return;
    }

    logger.info(`Utilisateur récupéré avec succès : ${username}`);
    res.status(200).json(user);
  } catch (error: unknown) {
    logger.error(
      `Erreur lors de la récupération de l'utilisateur : ${req.params.username}`
    );
    ExceptionHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Modifier les informations de profil
 *     description: Permet de modifier les informations de profil d'un utilisateur (nom, téléphone, points de fidélité).
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditProfileRequest'
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.patch(
  "/:id",
  validateEditProfileRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedProfile = await userService.updateUserProfile(id, req.body);
      res.status(200).json(updatedProfile);
    } catch (error: unknown) {
      logger.error("Erreur lors de la mise à jour du profil :", error);
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /users/{id}/profile-picture:
 *   post:
 *     summary: Modifier la photo de profil
 *     description: Permet de modifier la photo de profil d'un utilisateur.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo de profil mise à jour avec succès.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post(
  "/:id/profile-picture",
  upload.single("profilePicture"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!req.file) {
        res.status(400).json({ message: "Aucun fichier uploadé." });
        return;
      }

      const host = `${process.env.API_HOSTNAME}/${process.env.API_PREFIX}`;
      const imageUrl = `${host}/images/${req.file.filename}`;

      const updatedUser = await userService.updateUserProfilePicture(
        id,
        imageUrl
      );
      res.status(200).json(updatedUser);
    } catch (error: unknown) {
      logger.error(
        "Erreur lors de la mise à jour de la photo de profil :",
        error
      );
      ExceptionHandler.handle(error, res);
    }
  }
);

/**
 * @swagger
 * /users/profile-picture/{filename}:
 *   get:
 *     summary: Télécharger l'image de profil d'un utilisateur.
 *     description: Récupère l'image de profil d'un utilisateur par son identifiant.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - name: {userId}
 *         in: path
 *         description: le nom de fichier d'image de profil de l'utilisateur.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image de profil récupérée avec succès.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image de profil non trouvée pour cet utilisateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/profile-picture/:filename",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "../../uploads", filename);

      if (!existsSync(filePath)) {
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
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Permet de supprimer un utilisateur par son identifiant.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'utilisateur.
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await userService.deleteUserById(id);
    res.status(200).json({ message: "Compte supprimé avec succès." });
  } catch (error: unknown) {
    logger.error("Erreur lors de la suppression de l'utilisateur :", error);
    ExceptionHandler.handle(error, res);
  }
});

// Exporter le router
export { router as authRouter };
