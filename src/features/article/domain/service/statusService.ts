import { StatusArticle } from "@features/article/data/entity/statusArticle";

export interface StatusArticleService {
  getAllStatuses(): Promise<StatusArticle[]>;
  getStatusById(id: string): Promise<StatusArticle | null>;
  createOrUpdateStatus(
    status: Partial<StatusArticle>
  ): Promise<StatusArticle>;
  deleteStatusById(id: string): Promise<void>;
}
