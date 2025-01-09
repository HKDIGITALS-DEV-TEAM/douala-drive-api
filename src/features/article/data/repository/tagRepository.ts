import { Tag } from "../entity/tag";

/**
 * Repository pour les tags.
 */
export class TagRepository {
  /**
   * Récupère tous les tags.
   */
  async findAll(): Promise<Tag[]> {
    return Tag.findAll();
  }

  /**
   * Recherche un tag par son identifiant.
   * @param id - Identifiant du tag.
   */
  async findById(id: string): Promise<Tag | null> {
    return Tag.findByPk(id);
  }

  /**
   * Crée ou met à jour un tag.
   * @param tag - Données du tag.
   */
  async createOrUpdate(tag: Partial<Tag>): Promise<Tag> {
    const [updatedTag] = await Tag.upsert(tag);
    return updatedTag;
  }

  /**
   * Supprime un tag par son identifiant.
   * @param id - Identifiant du tag.
   */
  async deleteById(id: string): Promise<void> {
    await Tag.destroy({ where: { id } });
  }
}
