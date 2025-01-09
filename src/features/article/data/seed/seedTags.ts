import { logger } from "@domain/utils/logger";
import { Tag } from "../entity/tag";

/**
 * Fonction pour insérer les tags par défaut si elles n'existent pas.
 */
export const seedTags = async (): Promise<void> => {
  const defaultTags = [
    { name: "Conseil" },
    { name: "Aventure" },
    { name: "Astuce" },
  ];

  for (const tag of defaultTags) {
    const existingTag = await Tag.findOne({ where: { name: tag.name } });
    if (!existingTag) {
      await Tag.create(tag);
      logger.info(`Tag ajouté : ${tag.name}`);
    } else {
      logger.warn(`Tag déjà existant : ${tag.name}`);
    }
  }
};
