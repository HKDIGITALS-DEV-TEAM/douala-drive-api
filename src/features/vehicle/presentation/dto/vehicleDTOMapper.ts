import { Vehicle } from "@features/vehicle/data/entity/vehicle";
import { VehicleDTO } from "./vehicleDTO";

/**
 * Mapper pour convertir une entité Vehicle en VehicleDTO.
 * @param vehicle - Entité Vehicle à convertir.
 * @returns DTO du véhicule.
 */
export const toVehicleDTO = (vehicle: Vehicle): VehicleDTO => {
  const category = vehicle.getDataValue("category") as {
    id: string;
    name: string;
  } | null;
  const status = vehicle.getDataValue("status") as {
    id: string;
    name: string;
  } | null;

  return {
    id: vehicle.id,
    name: vehicle.name,
    brand: vehicle.brand,
    createdAt: vehicle.createdAt,
    updatedAt: vehicle.updatedAt,
    deletedAt: vehicle.deletedAt,
    category: category
      ? {
          id: category.id,
          name: category.name,
        }
      : { id: vehicle.category_id, name: "Inconnu" }, // Fallback si la catégorie n'est pas chargée
    color: vehicle.color,
    image: vehicle.image,
    video: vehicle.video,
    price: vehicle.price,
    status: status
      ? {
          id: status.id,
          name: status.name,
        }
      : { id: vehicle.status_id, name: "Inconnu" }, // Fallback si le statut n'est pas chargé
    features: vehicle.features,
    description: vehicle.description,
  };
};
