import { Tag } from "../entity/tag";

/**
 * Interface pour le DAO des tags.
 */
export interface TagDAO {
  findAll(): Promise<Tag[]>;
  findById(id: string): Promise<Tag | null>;
  createOrUpdate(tag: Partial<Tag>): Promise<Tag>;
  deleteById(id: string): Promise<void>;
}
