import { Status } from "../entity/status";
import { StatusRepository } from "../repository/statusRepository";
import { StatusDAO } from "./statusDAO";

export class StatusDAOImpl implements StatusDAO {
  private statusRepository: StatusRepository;

  constructor(statusRepository: StatusRepository) {
    this.statusRepository = statusRepository;
  }

  async findAllStatuses(): Promise<Status[]> {
    return this.statusRepository.findAll();
  }

  async findStatusById(id: string): Promise<Status | null> {
    return this.statusRepository.findById(id);
  }

  async createOrUpdateStatus(status: Partial<Status>): Promise<Status> {
    return await this.statusRepository.createOrUpdate(status);
  }

  async deleteStatusById(id: string): Promise<void> {
    await this.statusRepository.deleteById(id);
  }
}
