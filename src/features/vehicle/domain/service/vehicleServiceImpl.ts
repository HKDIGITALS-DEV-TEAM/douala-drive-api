import { VehicleDAO } from "@features/vehicle/data/dao/vehicleDAO";
import { VehicleService } from "./vehicleService";
import { CategoryDAO } from "@features/vehicle/data/dao/categoryDAO";
import { VehicleDTO } from "@features/vehicle/presentation/dto/vehicleDTO";
import { toVehicleDTO } from "@features/vehicle/presentation/dto/vehicleDTOMapper";
import { VehicleRequest } from "@features/vehicle/presentation/request/vehicleRequest";

export class VehicleServiceImpl implements VehicleService {
  private vehicleDAO: VehicleDAO;
  private categoryDAO: CategoryDAO;

  constructor(vehicleDAO: VehicleDAO, categoryDAO: CategoryDAO) {
    this.vehicleDAO = vehicleDAO;
    this.categoryDAO = categoryDAO;
  }

  async getAllVehicles(): Promise<VehicleDTO[]> {
    const vehicles = await this.vehicleDAO.findAllVehicles();
    return vehicles.map(toVehicleDTO);
  }

  async getVehiclesByNameOrBrand(nameOrBrand: string): Promise<VehicleDTO[]> {
    const vehicles = await this.vehicleDAO.findVehicleByNameOrBrand(
      nameOrBrand
    );
    return vehicles.map(toVehicleDTO);
  }

  async getVehiclesByCategory(categoryName: string): Promise<VehicleDTO[]> {
    const categories = await this.categoryDAO.findAllCategories();
    const matchedCategory = categories.find((cat) => cat.name === categoryName);

    if (!matchedCategory) {
      throw new Error(`Catégorie introuvable : ${categoryName}`);
    }

    const vehicles = await this.vehicleDAO.findVehiclesByCategory(
      matchedCategory.id
    );
    return vehicles.map(toVehicleDTO);
  }

  async getVehicleById(id: string): Promise<VehicleDTO | null> {
    const vehicle = await this.vehicleDAO.findVehicleById(id);
    return vehicle ? toVehicleDTO(vehicle) : null;
  }

  async createOrUpdateVehicle(
    vehicleData: VehicleRequest
  ): Promise<VehicleDTO> {
    const vehicle = await this.vehicleDAO.createOrUpdateVehicle({
      ...vehicleData,
    });
    return toVehicleDTO(vehicle);
  }

  async deleteVehicleById(id: string): Promise<void> {
    await this.vehicleDAO.deleteVehicleById(id);
  }

  async updateVehicleStatus(id: string, statusId: string): Promise<VehicleDTO> {
    const vehicle = await this.vehicleDAO.updateVehicleStatus(id, statusId);

    if (!vehicle) {
      throw new Error("Véhicule introuvable ou statut invalide.");
    }

    return toVehicleDTO(vehicle);
  }
}
