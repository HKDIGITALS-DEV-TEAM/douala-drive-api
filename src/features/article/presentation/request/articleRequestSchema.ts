import Joi from "joi";

/**
 * Schéma de validation pour un article.
 */
export const articleRequestSchema = Joi.object({
  id: Joi.string().uuid().optional().messages({
    "string.uri": "L'identifiant doit être un UUID valide.",
  }),
  title: Joi.string().required().messages({
    "string.base": "Le titre doit être une chaîne de caractères.",
    "string.empty": "Le titre est requis.",
  }),
  slug: Joi.string().required().messages({
    "string.base": "Le slug doit être une chaîne de caractères.",
    "string.empty": "Le slug est requis.",
  }),
  category_id: Joi.string().required().messages({
    "string.base": "La catégorie doit être un identifiant valide.",
    "string.empty": "La catégorie est requise.",
  }),
  color: Joi.string().optional(),
  image: Joi.string().optional(),
  excerpt: Joi.string().optional(),
  status_id: Joi.string().required().messages({
    "string.base": "Le statut doit être un identifiant valide.",
    "string.empty": "Le statut est requis.",
  }),
  content: Joi.string().required().messages({
    "string.base": "Le contenu doit être une chaîne de caractères.",
    "string.empty": "Le contenu est requis.",
  }),
  author_id: Joi.string().required().messages({
    "string.base": "L'auteur doit être un identifiant valide.",
    "string.empty": "L'auteur est requis.",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
});
