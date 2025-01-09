import { Vehicle } from "../entity/vehicle";
import { VehicleRepository } from "../repository/vehicleRepository";
import { VehicleDAO } from "./vehicleDAO";

export class VehicleDAOImpl implements VehicleDAO {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async findAllVehicles(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }

  async findVehicleByNameOrBrand(nameOrBrand: string): Promise<Vehicle[]> {
    return this.vehicleRepository.findByNameOrBrand(nameOrBrand);
  }

  async findVehiclesByCategory(categoryId: string): Promise<Vehicle[]> {
    return this.vehicleRepository.findByCategory(categoryId);
  }

  async findVehicleById(id: string): Promise<Vehicle | null> {
    return this.vehicleRepository.findById(id);
  }

  async createOrUpdateVehicle(vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return await this.vehicleRepository.createOrUpdate(vehicle);
  }

  async deleteVehicleById(id: string): Promise<void> {
    await this.vehicleRepository.deleteById(id);
  }

  async updateVehicleStatus(
    id: string,
    statusId: string
  ): Promise<Vehicle | null> {
    return this.vehicleRepository.updateStatusById(id, statusId);
  }
}
