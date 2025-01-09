import { CategoryArticleDAO } from "@features/article/data/dao/categoryArticleDAO";
import { CategoryArticleService } from "./categoryService";
import { CategoryArticle } from "@features/article/data/entity/categoryArticle";

export class CategoryArticleServiceImpl implements CategoryArticleService {
  private categoryDAO: CategoryArticleDAO;

  constructor(categoryDAO: CategoryArticleDAO) {
    this.categoryDAO = categoryDAO;
  }

  async getAllCategories(): Promise<CategoryArticle[]> {
    return this.categoryDAO.findAll();
  }

  async getCategoryById(id: string): Promise<CategoryArticle | null> {
    return this.categoryDAO.findById(id);
  }

  async createOrUpdateCategory(category: Partial<CategoryArticle>): Promise<CategoryArticle> {
    return this.categoryDAO.createOrUpdate(category);
  }

  async deleteCategoryById(id: string): Promise<void> {
    await this.categoryDAO.deleteById(id);
  }
}
