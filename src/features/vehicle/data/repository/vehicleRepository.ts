import { Vehicle } from "../entity/vehicle";
import { Op } from "sequelize";

/**
 * Repository pour les véhicules.
 */
export class VehicleRepository {
  async findAll(): Promise<Vehicle[]> {
    return Vehicle.findAll({ include: ["category", "status"] });
  }

  async findByNameOrBrand(nameOrBrand: string): Promise<Vehicle[]> {
    return Vehicle.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${nameOrBrand}%` } },
          { brand: { [Op.like]: `%${nameOrBrand}%` } },
        ],
      },
      include: ["category", "status"],
    });
  }

  async findByCategory(categoryId: string): Promise<Vehicle[]> {
    return Vehicle.findAll({
      where: { category_id: categoryId },
      include: ["category", "status"],
    });
  }

  async findById(id: string): Promise<Vehicle | null> {
    return Vehicle.findByPk(id, { include: ["category", "status"] });
  }

  async createOrUpdate(vehicle: Partial<Vehicle>): Promise<Vehicle> {
    const [updatedVehicle] = await Vehicle.upsert(vehicle, {
      returning: true,
    });
    return updatedVehicle;
  }

  async deleteById(id: string): Promise<void> {
    await Vehicle.destroy({ where: { id } });
  }

  /**
   * Met à jour le statut d'un véhicule à partir de son ID.
   * @param id - L'identifiant du véhicule.
   * @param statusId - L'identifiant du nouveau statut.
   * @returns Le véhicule mis à jour ou null si non trouvé.
   */
  async updateStatusById(
    id: string,
    statusId: string
  ): Promise<Vehicle | null> {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return null;

    vehicle.status_id = statusId;
    await vehicle.save();
    return vehicle;
  }
}
