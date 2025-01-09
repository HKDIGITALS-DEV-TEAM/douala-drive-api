import { CategoryArticle } from "@features/article/data/entity/categoryArticle";

export interface CategoryArticleService {
  getAllCategories(): Promise<CategoryArticle[]>;
  getCategoryById(id: string): Promise<CategoryArticle | null>;
  createOrUpdateCategory(
    category: Partial<CategoryArticle>
  ): Promise<CategoryArticle>;
  deleteCategoryById(id: string): Promise<void>;
}
