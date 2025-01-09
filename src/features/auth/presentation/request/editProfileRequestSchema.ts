import Joi from "joi";

/**
 * Schéma de validation pour la mise à jour du profil utilisateur.
 */
export const editProfileRequestSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  fidelity_points: Joi.number().optional(),
});
