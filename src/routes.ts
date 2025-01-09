import express from "express";
import { authRouter } from "@features/auth/domain/controller/authController";
import { configurationRouter } from "@features/config/domain/controller/configurationController";
import { keycloak } from "@domain/utils/keycloakConfig";
import { checkAndCreateUser } from "@domain/middleware/checkAndCreateUser";
import { vehicleRouter } from "@features/vehicle/domain/controller/vehicleController";
import { articleRouter } from "@features/article/domain/controller/articleController";
import { publicRouter } from "@features/public/domain/controller/publicController";
import { imageRouter } from "@features/public/domain/controller/imageController";

// Création du routeur principal
const router = express.Router();

// Routes publiques pour les configurations
router.use("/images", imageRouter);
router.use("/public", publicRouter);
router.use("/configurations", configurationRouter);

// Routes protégées par Keycloak (Rôle : admin)
router.use(
  "/vehicles",
  keycloak.protect("realm:admin"), // Protéger les routes avec le rôle admin
  vehicleRouter
);
router.use(
  "/articles",
  keycloak.protect("realm:admin"), // Protéger les routes avec le rôle admin
  articleRouter
);

// Routes protégées pour l'authentification
router.use(
  "/users",
  keycloak.protect("realm:user"), // Vérifie que le rôle 'user' est attribué
  checkAndCreateUser, // Middleware personnalisé pour gérer les utilisateurs
  authRouter
);

// Export du routeur principal
export { router };
