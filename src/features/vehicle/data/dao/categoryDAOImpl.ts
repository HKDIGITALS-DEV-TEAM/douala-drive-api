import { Category } from "../entity/category";
import { CategoryRepository } from "../repository/categoryRepository";
import { CategoryDAO } from "./categoryDAO";

export class CategoryDAOImpl implements CategoryDAO {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  
  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async createOrUpdateCategory(category: Partial<Category>): Promise<Category> {
    return await this.categoryRepository.createOrUpdate(category);
  }

  async deleteCategoryById(id: string): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }
}
