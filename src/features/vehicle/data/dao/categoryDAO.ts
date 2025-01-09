import { Category } from "../entity/category";

export interface CategoryDAO {
  findAllCategories(): Promise<Category[]>;
  findCategoryById(id: string): Promise<Category | null>;
  createOrUpdateCategory(category: Partial<Category>): Promise<Category>;
  deleteCategoryById(id: string): Promise<void>;
}
