import { CategoryArticle } from "../entity/categoryArticle";
import { CategoryArticleDAO } from "./categoryArticleDAO";
import { CategoryArticleRepository } from "../repository/categoryArticleRepository";

/**
 * Implémentation du DAO pour les catégories d'articles.
 */
export class CategoryArticleDAOImpl implements CategoryArticleDAO {
  private categoryRepository: CategoryArticleRepository;

  constructor(categoryRepository: CategoryArticleRepository) {
    this.categoryRepository = categoryRepository;
  }

  async findAll(): Promise<CategoryArticle[]> {
    return this.categoryRepository.findAll();
  }

  async findById(id: string): Promise<CategoryArticle | null> {
    return this.categoryRepository.findById(id);
  }

  async createOrUpdate(
    category: Partial<CategoryArticle>
  ): Promise<CategoryArticle> {
    return this.categoryRepository.createOrUpdate(category);
  }

  async deleteById(id: string): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }
}
