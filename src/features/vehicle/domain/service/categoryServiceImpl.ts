import { CategoryService } from "./categoryService";
import { Category } from "../../data/entity/category";
import { CategoryDAO } from "@features/vehicle/data/dao/categoryDAO";

export class CategoryServiceImpl implements CategoryService {
  private categoryDAO: CategoryDAO;

  constructor(categoryDAO: CategoryDAO) {
    this.categoryDAO = categoryDAO;
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryDAO.findAllCategories();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categoryDAO.findCategoryById(id);
  }

  async createOrUpdateCategory(
    categoryData: Partial<Category>
  ): Promise<Category> {
    return this.categoryDAO.createOrUpdateCategory(categoryData);
  }

  async deleteCategoryById(id: string): Promise<void> {
    await this.categoryDAO.deleteCategoryById(id);
  }
}
