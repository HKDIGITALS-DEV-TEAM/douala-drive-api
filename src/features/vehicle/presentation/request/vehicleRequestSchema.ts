import Joi from "joi";

/**
 * Schéma de validation pour un véhicule.
 */
export const vehicleRequestSchema = Joi.object({
  id: Joi.string().uuid().optional().messages({
    "string.uri": "L'identifiant doit être un UUID valide.",
  }),
  name: Joi.string().required().messages({
    "string.base": "Le nom doit être une chaîne de caractères.",
    "string.empty": "Le nom est obligatoire.",
  }),
  brand: Joi.string().required().messages({
    "string.base": "La marque doit être une chaîne de caractères.",
    "string.empty": "La marque est obligatoire.",
  }),
  category_id: Joi.string().uuid().required().messages({
    "string.guid": "L'identifiant de la catégorie doit être un UUID valide.",
    "any.required": "La catégorie est obligatoire.",
  }),
  color: Joi.string().required().messages({
    "string.base": "La couleur doit être une chaîne de caractères.",
    "string.empty": "La couleur est obligatoire.",
  }),
  image: Joi.string().uri().optional().messages({
    "string.uri": "L'image doit être un lien valide.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Le prix doit être un nombre.",
    "number.positive": "Le prix doit être supérieur à zéro.",
    "any.required": "Le prix est obligatoire.",
  }),
  status_id: Joi.string().uuid().required().messages({
    "string.guid": "L'identifiant du statut doit être un UUID valide.",
    "any.required": "Le statut est obligatoire.",
  }),
  features: Joi.string().optional().allow("").messages({
    "string.base": "Les fonctionnalités doivent être une chaîne de caractères.",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "La description doit être une chaîne de caractères.",
  }),
});
