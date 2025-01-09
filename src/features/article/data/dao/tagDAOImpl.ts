import { Tag } from "../entity/tag";
import { TagDAO } from "./tagDAO";
import { TagRepository } from "../repository/tagRepository";

/**
 * Implémentation du DAO pour les tags.
 */
export class TagDAOImpl implements TagDAO {
  private tagRepository: TagRepository;

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }

  async findById(id: string): Promise<Tag | null> {
    return this.tagRepository.findById(id);
  }

  async createOrUpdate(tag: Partial<Tag>): Promise<Tag> {
    return this.tagRepository.createOrUpdate(tag);
  }

  async deleteById(id: string): Promise<void> {
    await this.tagRepository.deleteById(id);
  }
}
