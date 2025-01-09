import { logger } from "@domain/utils/logger";
import { StatusArticle } from "../entity/statusArticle";

/**
 * Fonction pour insérer les statuts par défaut des articles si elles n'existent pas.
 */
export const seedStatusesArticle = async (): Promise<void> => {
  const defaultStatuses = [{ name: "Publié" }, { name: "Brouillon" }];

  for (const status of defaultStatuses) {
    const existingStatus = await StatusArticle.findOne({
      where: { name: status.name },
    });
    if (!existingStatus) {
      await StatusArticle.create(status);
      logger.info(`Statut ajouté : ${status.name}`);
    } else {
      logger.warn(`Statut déjà existant : ${status.name}`);
    }
  }
};
