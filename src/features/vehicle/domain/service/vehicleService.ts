import { VehicleDTO } from "@features/vehicle/presentation/dto/vehicleDTO";
import { VehicleRequest } from "@features/vehicle/presentation/request/vehicleRequest";

export interface VehicleService {
  getAllVehicles(): Promise<VehicleDTO[]>;
  getVehiclesByNameOrBrand(nameOrBrand: string): Promise<VehicleDTO[]>;
  getVehiclesByCategory(categoryName: string): Promise<VehicleDTO[]>;
  getVehicleById(id: string): Promise<VehicleDTO | null>;
  createOrUpdateVehicle(vehicleData: VehicleRequest): Promise<VehicleDTO>;
  deleteVehicleById(id: string): Promise<void>;
  updateVehicleStatus(id: string, statusId: string): Promise<VehicleDTO>;
}
