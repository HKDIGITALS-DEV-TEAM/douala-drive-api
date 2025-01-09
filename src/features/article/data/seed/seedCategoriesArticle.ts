import { logger } from "@domain/utils/logger";
import { CategoryArticle } from "../entity/categoryArticle";

/**
 * Fonction pour insérer les catégories d'articles par défaut si elles n'existent pas.
 */
export const seedCategoriesArticle = async (): Promise<void> => {
  const defaultCategories = [
    { name: "Conseils" },
    { name: "Guide" },
    { name: "Voyage" },
  ];

  for (const category of defaultCategories) {
    const existingCategory = await CategoryArticle.findOne({
      where: { name: category.name },
    });
    if (!existingCategory) {
      await CategoryArticle.create(category);
      logger.info(`Catégorie ajoutée : ${category.name}`);
    } else {
      logger.warn(`Catégorie déjà existante : ${category.name}`);
    }
  }
};
