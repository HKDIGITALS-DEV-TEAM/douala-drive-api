import { Tag } from "@features/article/data/entity/tag";
import { ArticleService } from "./articleService";
import { ArticleDAO } from "@features/article/data/dao/articleDAO";
import { ArticleDTO } from "@features/article/presentation/dto/articleDTO";
import { toArticleDTO } from "@features/article/presentation/dto/articleDTOMapper";
import { ArticleRequest } from "@features/article/presentation/request/articleRequest";

/**
 * Implémentation du service pour les articles.
 */
export class ArticleServiceImpl implements ArticleService {
  private articleDAO: ArticleDAO;

  constructor(articleDAO: ArticleDAO) {
    this.articleDAO = articleDAO;
  }

  async getAllArticles(): Promise<ArticleDTO[]> {
    const articles = await this.articleDAO.findAll();
    return articles.map(toArticleDTO);
  }

  async getArticleById(id: string): Promise<ArticleDTO | null> {
    const article = await this.articleDAO.findById(id);
    return article ? toArticleDTO(article) : null;
  }

  async getArticleBySlug(slug: string): Promise<ArticleDTO | null> {
    const article = await this.articleDAO.findBySlug(slug);
    return article ? toArticleDTO(article) : null;
  }

  async getArticlesByAuthor(authorId: string): Promise<ArticleDTO[]> {
    const articles = await this.articleDAO.findByAuthor(authorId);
    return articles.map(toArticleDTO);
  }

  async getArticlesByCategory(categoryId: string): Promise<ArticleDTO[]> {
    const articles = await this.articleDAO.findByCategory(categoryId);
    return articles.map(toArticleDTO);
  }

  async getArticlesByTag(tagId: string): Promise<ArticleDTO[]> {
    const articles = await this.articleDAO.findByTag(tagId);
    return articles.map(toArticleDTO);
  }

  async createOrUpdateArticle(article: ArticleRequest): Promise<ArticleDTO> {
    // Récupération des tags sous forme d'instances de Tag
    let tagInstances: Tag[] = [];
    if (article.tags && article.tags.length > 0) {
      tagInstances = await Tag.findAll({
        where: {
          id: article.tags, // Trouve tous les tags correspondant aux IDs donnés
        },
      });

      // Vérifier si tous les tags existent
      if (tagInstances.length !== article.tags.length) {
        throw new Error("Certains tags fournis n'existent pas.");
      }
    }

    // Préparation des données pour l'enregistrement
    const savedArticle = await this.articleDAO.createOrUpdate({
      ...article,
      tags: tagInstances, // Passe les instances de Tag au DAO
    });

    return toArticleDTO(savedArticle);
  }

  async updateArticleStatus(id: string, statusId: string): Promise<ArticleDTO> {
    const updated = await this.articleDAO.updateStatusById(id, statusId);

    if (!updated) {
      throw new Error("Impossible de mettre à jour le statut de l'article.");
    }

    const article = await this.articleDAO.findById(id);
    if (!article) {
      throw new Error("Article introuvable après mise à jour.");
    }

    return toArticleDTO(article);
  }

  async deleteArticleById(id: string): Promise<void> {
    await this.articleDAO.deleteById(id);
  }
}
