import { Article } from "../entity/article";
import { CategoryArticle } from "../entity/categoryArticle";
import { StatusArticle } from "../entity/statusArticle";
import { Tag } from "../entity/tag";
import { User } from "@features/auth/data/entity/user";

/**
 * Repository pour les articles.
 */
export class ArticleRepository {
  /**
   * Récupère tous les articles avec leurs catégories, auteurs et tags associés.
   */
  async findAll(): Promise<Article[]> {
    return Article.findAll({
      include: [
        { model: CategoryArticle, as: "category", attributes: ["id", "name"] },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: StatusArticle, as: "status", attributes: ["id", "name"] },
      ],
    });
  }

  /**
   * Recherche un article par son id.
   * @param id - ID de l'article.
   */
  async findById(id: string): Promise<Article | null> {
    return Article.findOne({
      where: { id },
      include: [
        { model: CategoryArticle, as: "category", attributes: ["id", "name"] },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: StatusArticle, as: "status", attributes: ["id", "name"] },
      ],
    });
  }

  /**
   * Recherche un article par son slug.
   * @param slug - Slug de l'article.
   */
  async findBySlug(slug: string): Promise<Article | null> {
    return Article.findOne({
      where: { slug },
      include: [
        { model: CategoryArticle, as: "category", attributes: ["id", "name"] },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: StatusArticle, as: "status", attributes: ["id", "name"] },
      ],
    });
  }

  /**
   * Récupère les articles d'une catégorie donnée.
   * @param categoryId - Identifiant de la catégorie.
   */
  async findByCategory(categoryId: string): Promise<Article[]> {
    return Article.findAll({
      where: { category_id: categoryId },
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: StatusArticle, as: "status", attributes: ["id", "name"] },
      ],
    });
  }

  /**
   * Récupère les articles associés à un tag donné.
   * @param tagId - Identifiant du tag.
   */
  async findByTag(tagId: string): Promise<Article[]> {
    return Article.findAll({
      include: [
        { model: CategoryArticle, as: "category", attributes: ["id", "name"] },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: StatusArticle, as: "status", attributes: ["id", "name"] },
      ],
    });
  }

  /**
   * Crée ou met à jour un article.
   * @param article - Données de l'article.
   */
  async createOrUpdate(article: Partial<Article>): Promise<Article> {
    const [updatedArticle] = await Article.upsert(article, {
      returning: true,
    });

    // Vérifiez si des tags sont fournis, puis associez-les
    if (article.tags && article.tags.length > 0) {
      await updatedArticle.setTags(article.tags); // Associe les tags à l'article
    }

    return updatedArticle;
  }

  /**
   * Met à jour le statut d'un article.
   * @param id - Identifiant de l'article.
   * @param statusId - Identifiant du nouveau statut.
   */
  async updateStatusById(id: string, statusId: string): Promise<number> {
    const [updatedRows] = await Article.update(
      { status_id: statusId },
      { where: { id } }
    );
    return updatedRows;
  }

  /**
   * Supprime un article par son identifiant.
   * @param id - Identifiant de l'article.
   */
  async deleteById(id: string): Promise<void> {
    await Article.destroy({ where: { id } });
  }

  /**
   * Récupère les articles créés par un utilisateur donné.
   * @param authorId - Identifiant de l'utilisateur.
   */
  async findByAuthor(authorId: string): Promise<Article[]> {
    return Article.findAll({
      where: { author_id: authorId },
      include: [
        { model: CategoryArticle, as: "category", attributes: ["id", "name"] },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        { model: StatusArticle, as: "status", attributes: ["id", "name"] },
      ],
    });
  }
}
