import { Request, Response, NextFunction } from "express";
import { vehicleRequestSchema } from "./vehicleRequestSchema";
import { logger } from "@domain/utils/logger";

/**
 * Format attendu pour la création ou la modification d'un véhicule.
 */
export type VehicleRequest = {
  id?: string | undefined;
  name: string;
  brand: string;
  category_id: string;
  color: string;
  image?: string; // Peut être un lien ou un chemin local
  video?: string;
  price: number;
  status_id: string;
  features?: string; // Optionnel
  description?: string; // Optionnel
};

/**
 * Middleware pour valider les données de requête pour un véhicule.
 */
export const validateVehicleRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.info(req.body);
  const { error } = vehicleRequestSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({
      message: "Données de requête invalides.",
      errors: error.details.map((err) => err.message),
    });
    return; // Arrête l'exécution pour éviter d'appeler `next()`
  }
  next(); // Passe au middleware suivant si la validation réussit
};
