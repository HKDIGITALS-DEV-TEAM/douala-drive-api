import { Status } from "../entity/status";

export interface StatusDAO {
  findAllStatuses(): Promise<Status[]>;
  findStatusById(id: string): Promise<Status | null>;
  createOrUpdateStatus(status: Partial<Status>): Promise<Status>;
  deleteStatusById(id: string): Promise<void>;
}
