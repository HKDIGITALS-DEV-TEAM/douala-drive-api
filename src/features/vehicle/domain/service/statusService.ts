import { Status } from "@features/vehicle/data/entity/status";

export interface StatusService {
  getAllStatuses(): Promise<Status[]>;
  getStatusById(id: string): Promise<Status | null>;
  createOrUpdateStatus(statusData: Partial<Status>): Promise<Status>;
  deleteStatusById(id: string): Promise<void>;
}
