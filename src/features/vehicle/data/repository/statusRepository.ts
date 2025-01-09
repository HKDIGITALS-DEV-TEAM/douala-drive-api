import { Status } from "../entity/status";

/**
 * Repository pour les statuts.
 */
export class StatusRepository {
  async findAll(): Promise<Status[]> {
    return Status.findAll();
  }

  async findById(id: string): Promise<Status | null> {
    return Status.findByPk(id);
  }

  async createOrUpdate(status: Partial<Status>): Promise<Status> {
    const [updatedStatus] = await Status.upsert(status);
    return updatedStatus;
  }

  async deleteById(id: string): Promise<void> {
    await Status.destroy({ where: { id } });
  }
}
