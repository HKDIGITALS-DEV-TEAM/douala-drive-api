import { NextFunction, Request, Response } from "express";
import { editProfileRequestSchema } from "./editProfileRequestSchema";

/**
 * Type représentant une requête de mise à jour du profil utilisateur.
 */
export type EditProfileRequest = {
  name?: string;
  phone?: string;
  fidelity_points?: number;
};

/**
 * Middleware de validation pour la mise à jour du profil utilisateur.
 */
export const validateEditProfileRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = editProfileRequestSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({
      message: "Données invalides pour la mise à jour du profil.",
      errors: error.details.map((err) => err.message),
    });
    return;
  }
  next();
};
