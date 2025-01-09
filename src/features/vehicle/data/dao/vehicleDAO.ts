import { Vehicle } from "../entity/vehicle";

export interface VehicleDAO {
  findAllVehicles(): Promise<Vehicle[]>;
  findVehicleByNameOrBrand(nameOrBrand: string): Promise<Vehicle[]>;
  findVehiclesByCategory(categoryId: string): Promise<Vehicle[]>;
  findVehicleById(id: string): Promise<Vehicle | null>;
  createOrUpdateVehicle(vehicle: Partial<Vehicle>): Promise<Vehicle>;
  deleteVehicleById(id: string): Promise<void>;
  updateVehicleStatus(id: string, statusId: string): Promise<Vehicle | null>;

}
