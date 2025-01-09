import { Category } from "@features/vehicle/data/entity/category";

export interface CategoryService {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  createOrUpdateCategory(categoryData: Partial<Category>): Promise<Category>;
  deleteCategoryById(id: string): Promise<void>;
}
