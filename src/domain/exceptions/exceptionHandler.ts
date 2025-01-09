import { Response } from "express";
import { logger } from "@domain/utils/logger";

/**
 * Gestionnaire centralisé des exceptions pour l'API.
 */
export class ExceptionHandler {
  /**
   * Traite une erreur et envoie une réponse appropriée au client.
   *
   * @param {unknown} error - L'erreur capturée.
   * @param {Response} res - L'objet réponse HTTP.
   * @returns {Response} La réponse HTTP avec le statut et le message d'erreur.
   */
  static handle(error: unknown, res: Response): Response {
    if (error instanceof Error) {
      logger.error(`Erreur capturée : ${error.message}`);
      if (error.message.includes("Token invalide")) {
        return res
          .status(401)
          .json({ message: "Token invalide. Veuillez vous reconnecter." });
      }
      if (error.message.includes("Rôle utilisateur non valide")) {
        return res
          .status(403)
          .json({ message: "Accès interdit. Aucun rôle valide trouvé." });
      }
      if (error.message.includes("Token manquant")) {
        return res
          .status(401)
          .json({ message: "Token d'authentification manquant." });
      }
      return res
        .status(500)
        .json({ message: "Une erreur inattendue est survenue." });
    } else {
      logger.error("Erreur inconnue capturée : ", error);
      return res
        .status(500)
        .json({ message: "Une erreur inconnue est survenue." });
    }
  }
}
