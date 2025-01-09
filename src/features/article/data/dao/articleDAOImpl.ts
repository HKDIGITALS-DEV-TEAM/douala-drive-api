import { Article } from "../entity/article";
import { ArticleDAO } from "./articleDAO";
import { ArticleRepository } from "../repository/articleRepository";

/**
 * Implémentation du DAO pour les articles.
 */
export class ArticleDAOImpl implements ArticleDAO {
  private articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }

  async findById(id: string): Promise<Article | null> {
    return this.articleRepository.findById(id);
  }

  async findBySlug(slug: string): Promise<Article | null> {
    return this.articleRepository.findBySlug(slug);
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    return this.articleRepository.findByCategory(categoryId);
  }

  async findByTag(tagId: string): Promise<Article[]> {
    return this.articleRepository.findByTag(tagId);
  }

  async createOrUpdate(article: Partial<Article>): Promise<Article> {
    return this.articleRepository.createOrUpdate(article);
  }

  async updateStatusById(id: string, statusId: string): Promise<boolean> {
    const updatedRows = await this.articleRepository.updateStatusById(
      id,
      statusId
    );
    return updatedRows > 0;
  }

  async deleteById(id: string): Promise<void> {
    await this.articleRepository.deleteById(id);
  }

  /**
   * Récupère les articles créés par un utilisateur donné.
   * @param authorId - Identifiant de l'utilisateur.
   */
  async findByAuthor(authorId: string): Promise<Article[]> {
    return this.articleRepository.findByAuthor(authorId);
  }
}
