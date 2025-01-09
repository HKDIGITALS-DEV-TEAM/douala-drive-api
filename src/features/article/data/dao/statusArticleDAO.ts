import { StatusArticle } from "../entity/statusArticle";

/**
 * Interface pour le DAO des statuts d'articles.
 */
export interface StatusArticleDAO {
  findAll(): Promise<StatusArticle[]>;
  findById(id: string): Promise<StatusArticle | null>;
  createOrUpdate(status: Partial<StatusArticle>): Promise<StatusArticle>;
  deleteById(id: string): Promise<void>;
}
