import { Category } from "../entity/category";

/**
 * Repository pour les catégories.
 */
export class CategoryRepository {
  async findAll(): Promise<Category[]> {
    return Category.findAll();
  }

  async findById(id: string): Promise<Category | null> {
    return Category.findByPk(id);
  }

  async createOrUpdate(category: Partial<Category>): Promise<Category> {
    const [updatedCategory] = await Category.upsert(category);
    return updatedCategory;
  }

  async deleteById(id: string): Promise<void> {
    await Category.destroy({ where: { id } });
  }
}
