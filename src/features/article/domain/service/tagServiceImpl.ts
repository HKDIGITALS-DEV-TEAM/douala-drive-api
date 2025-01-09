import { TagDAO } from "@features/article/data/dao/tagDAO";
import { TagService } from "./tagService";
import { Tag } from "@features/article/data/entity/tag";

export class TagServiceImpl implements TagService {
  private tagDAO: TagDAO;

  constructor(tagDAO: TagDAO) {
    this.tagDAO = tagDAO;
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagDAO.findAll();
  }

  async getTagById(id: string): Promise<Tag | null> {
    return this.tagDAO.findById(id);
  }

  async createOrUpdateTag(tag: Partial<Tag>): Promise<Tag> {
    return this.tagDAO.createOrUpdate(tag);
  }

  async deleteTagById(id: string): Promise<void> {
    await this.tagDAO.deleteById(id);
  }
}
