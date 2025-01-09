import { Article } from "../entity/article";

/**
 * Interface pour le DAO des articles.
 */
export interface ArticleDAO {
  findAll(): Promise<Article[]>;
  findById(id: string): Promise<Article | null>;
  findBySlug(slug: string): Promise<Article | null>;
  findByCategory(categoryId: string): Promise<Article[]>;
  findByTag(tagId: string): Promise<Article[]>;
  createOrUpdate(article: Partial<Article>): Promise<Article>;
  updateStatusById(id: string, statusId: string): Promise<boolean>;
  deleteById(id: string): Promise<void>;
  findByAuthor(authorId: string): Promise<Article[]>;
}
