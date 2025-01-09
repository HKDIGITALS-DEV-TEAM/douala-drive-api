import { StatusService } from "./statusService";
import { Status } from "../../data/entity/status";
import { StatusDAO } from "@features/vehicle/data/dao/statusDAO";

export class StatusServiceImpl implements StatusService {
  private statusDAO: StatusDAO;

  constructor(statusDAO: StatusDAO) {
    this.statusDAO = statusDAO;
  }

  async getAllStatuses(): Promise<Status[]> {
    return this.statusDAO.findAllStatuses();
  }

  async getStatusById(id: string): Promise<Status | null> {
    return this.statusDAO.findStatusById(id);
  }

  async createOrUpdateStatus(statusData: Partial<Status>): Promise<Status> {
    return this.statusDAO.createOrUpdateStatus(statusData);
  }

  async deleteStatusById(id: string): Promise<void> {
    await this.statusDAO.deleteStatusById(id);
  }
}
