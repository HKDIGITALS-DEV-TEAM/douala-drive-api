import { ExceptionHandler } from "@domain/exceptions/exceptionHandler";
import { UserDAOImpl } from "@features/auth/data/dao/userDAOImpl";
import { UserRepository } from "@features/auth/data/repository/userRepository";
import { UserServiceImpl } from "@features/auth/domain/service/userServiceImpl";
import { UserRequest } from "@features/auth/presentation/request/userRequest";
import { logger } from "@domain/utils/logger";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Middleware pour vérifier et créer un utilisateur.
 *
 * @param {Request} req - La requête HTTP.
 * @param {Response} res - La réponse HTTP.
 * @param {NextFunction} next - Fonction pour passer au middleware suivant.
 * @returns {Promise<void>}
 */
export const checkAndCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Vérification de la présence d'un token dans les en-têtes.
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    logger.warn("Tentative d'accès sans token.");
    res.status(401).json({ message: "Token manquant dans les en-têtes." });
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    // Décodage du token JWT pour extraire les informations utilisateur.
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      throw new Error("Token invalide.");
    }

    const payload = decoded.payload as JwtPayload;
    const kid = decoded.header?.kid as string | undefined;

    if (!kid) {
      throw new Error("Clé du token (kid) manquante.");
    }

    const { preferred_username, given_name, family_name, email, realm_access } = payload;

    // Vérifications des informations critiques.
    if (!realm_access || !realm_access.roles) {
      throw new Error("Rôles utilisateur introuvables dans le token.");
    }

    // Extraction des rôles valides en excluant certains rôles par défaut.
    const roles = realm_access.roles.filter(
      (role: string) =>
        ![
          "offline_access",
          "uma_authorization",
          "default-roles-douala-drive",
        ].includes(role)
    );

    if (!roles.length) {
      throw new Error("Aucun rôle utilisateur valide trouvé.");
    }

    const userService = new UserServiceImpl(
      new UserDAOImpl(new UserRepository())
    );

    // Vérification de l'existence de l'utilisateur en base de données.
    const user = await userService.getUserByKeycloakId(kid);

    if (!user) {
      // Création d'un nouvel utilisateur si non existant.
      const newUserRequest: UserRequest = {
        keycloak_id: kid,
        email: email as string, // Garantir que l'email est une chaîne
        name: preferred_username || `${given_name} ${family_name}` || "Utilisateur inconnu",
        phone: null,
        fidelity_points: 0,
        role: roles[0], // Premier rôle valide trouvé
      };

      const newUser = await userService.createUser(newUserRequest);
      logger.info(`Nouvel utilisateur créé : ${newUser.id}`);
    }

    logger.info(`Utilisateur existant vérifié : ${kid}`);
    next(); // Passe au middleware suivant si tout est OK.
  } catch (error: unknown) {
    logger.error("Erreur dans le middleware checkAndCreateUser.");
    ExceptionHandler.handle(error, res);
  }
};
