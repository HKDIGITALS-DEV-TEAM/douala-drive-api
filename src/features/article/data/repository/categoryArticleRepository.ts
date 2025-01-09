import { CategoryArticle } from "../entity/categoryArticle";

/**
 * Repository pour les catégories d'articles.
 */
export class CategoryArticleRepository {
  /**
   * Récupère toutes les catégories d'articles.
   */
  async findAll(): Promise<CategoryArticle[]> {
    return CategoryArticle.findAll();
  }

  /**
   * Recherche une catégorie par son identifiant.
   * @param id - Identifiant de la catégorie.
   */
  async findById(id: string): Promise<CategoryArticle | null> {
    return CategoryArticle.findByPk(id);
  }

  /**
   * Crée ou met à jour une catégorie d'article.
   * @param category - Données de la catégorie.
   */
  async createOrUpdate(
    category: Partial<CategoryArticle>
  ): Promise<CategoryArticle> {
    const [updatedCategory] = await CategoryArticle.upsert(category);
    return updatedCategory;
  }

  /**
   * Supprime une catégorie par son identifiant.
   * @param id - Identifiant de la catégorie.
   */
  async deleteById(id: string): Promise<void> {
    await CategoryArticle.destroy({ where: { id } });
  }
}
