import { CategoryArticle } from "../entity/categoryArticle";

/**
 * Interface pour le DAO des catégories d'articles.
 */
export interface CategoryArticleDAO {
  findAll(): Promise<CategoryArticle[]>;
  findById(id: string): Promise<CategoryArticle | null>;
  createOrUpdate(category: Partial<CategoryArticle>): Promise<CategoryArticle>;
  deleteById(id: string): Promise<void>;
}
