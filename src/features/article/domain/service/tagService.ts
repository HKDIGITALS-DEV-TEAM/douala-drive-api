import { Tag } from "@features/article/data/entity/tag";

export interface TagService {
  getAllTags(): Promise<Tag[]>;
  getTagById(id: string): Promise<Tag | null>;
  createOrUpdateTag(tag: Partial<Tag>): Promise<Tag>;
  deleteTagById(id: string): Promise<void>;
}
