import { StatusArticleDAO } from "@features/article/data/dao/statusArticleDAO";
import { StatusArticleService } from "./statusService";
import { StatusArticle } from "@features/article/data/entity/statusArticle";

export class StatusArticleServiceImpl implements StatusArticleService {
  private statusDAO: StatusArticleDAO;

  constructor(statusDAO: StatusArticleDAO) {
    this.statusDAO = statusDAO;
  }

  async getAllStatuses(): Promise<StatusArticle[]> {
    return this.statusDAO.findAll();
  }

  async getStatusById(id: string): Promise<StatusArticle | null> {
    return this.statusDAO.findById(id);
  }

  async createOrUpdateStatus(
    status: Partial<StatusArticle>
  ): Promise<StatusArticle> {
    return this.statusDAO.createOrUpdate(status);
  }

  async deleteStatusById(id: string): Promise<void> {
    await this.statusDAO.deleteById(id);
  }
}
