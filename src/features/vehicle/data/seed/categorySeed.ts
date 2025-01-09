import { logger } from "@domain/utils/logger";
import { Category } from "../entity/category";

/**
 * Seeder pour insérer les catégories par défaut dans la base de données.
 */
export const seedCategories = async (): Promise<void> => {
  const categories = ["SUV", "Berline", "Pick-up"];

  for (const categoryName of categories) {
    await Category.findOrCreate({ where: { name: categoryName } });
  }

  logger.info("Catégories insérées avec succès.");
};
