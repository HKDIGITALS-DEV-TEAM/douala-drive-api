import { StatusArticle } from "../entity/statusArticle";
import { StatusArticleDAO } from "./statusArticleDAO";
import { StatusArticleRepository } from "../repository/statusArticleRepository";

/**
 * Implémentation du DAO pour les catégories d'articles.
 */
export class StatusArticleDAOImpl implements StatusArticleDAO {
  private statusArticleRepository: StatusArticleRepository;

  constructor(statusArticleRepository: StatusArticleRepository) {
    this.statusArticleRepository = statusArticleRepository;
  }

  async findAll(): Promise<StatusArticle[]> {
    return this.statusArticleRepository.findAll();
  }

  async findById(id: string): Promise<StatusArticle | null> {
    return this.statusArticleRepository.findById(id);
  }

  async createOrUpdate(
    category: Partial<StatusArticle>
  ): Promise<StatusArticle> {
    return this.statusArticleRepository.createOrUpdate(category);
  }

  async deleteById(id: string): Promise<void> {
    await this.statusArticleRepository.deleteById(id);
  }
}
