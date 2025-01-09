import { ArticleDTO } from "@features/article/presentation/dto/articleDTO";
import { ArticleRequest } from "@features/article/presentation/request/articleRequest";

export interface ArticleService {
  getAllArticles(): Promise<ArticleDTO[]>;
  getArticleById(id: string): Promise<ArticleDTO | null>;
  getArticleBySlug(slug: string): Promise<ArticleDTO | null>;
  getArticlesByAuthor(authorId: string): Promise<ArticleDTO[]>;
  getArticlesByCategory(categoryId: string): Promise<ArticleDTO[]>;
  getArticlesByTag(tagId: string): Promise<ArticleDTO[]>;
  createOrUpdateArticle(article: ArticleRequest): Promise<ArticleDTO>;
  updateArticleStatus(id: string, statusId: string): Promise<ArticleDTO>;
  deleteArticleById(id: string): Promise<void>;
}
