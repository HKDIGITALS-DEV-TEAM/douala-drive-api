import { StatusArticle } from "../entity/statusArticle";

/**
 * Repository pour les statuts d'articles.
 */
export class StatusArticleRepository {
  /**
   * Récupère toutes les statuts d'articles.
   */
  async findAll(): Promise<StatusArticle[]> {
    return StatusArticle.findAll();
  }

  /**
   * Recherche un statut par son identifiant.
   * @param id - Identifiant du statut.
   */
  async findById(id: string): Promise<StatusArticle | null> {
    return StatusArticle.findByPk(id);
  }

  /**
   * Crée ou met à jour un statut d'article.
   * @param category - Données du statut.
   */
  async createOrUpdate(
    category: Partial<StatusArticle>
  ): Promise<StatusArticle> {
    const [updatedCategory] = await StatusArticle.upsert(category);
    return updatedCategory;
  }

  /**
   * Supprime un statut par son identifiant.
   * @param id - Identifiant du statut.
   */
  async deleteById(id: string): Promise<void> {
    await StatusArticle.destroy({ where: { id } });
  }
}
