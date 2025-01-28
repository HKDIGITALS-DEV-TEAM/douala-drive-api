/**
 * DTO représentant un véhicule avec sa catégorie et son statut.
 */
export type VehicleDTO = {
  id: string;
  name: string;
  brand: string;
  category: {
    id: string;
    name: string;
  };
  color: string;
  image: string | null;
  price: number;
  status: {
    id: string;
    name: string;
  };
  features: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
