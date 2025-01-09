import { NextFunction, Request, Response } from "express";
import { articleRequestSchema } from "./articleRequestSchema";

/**
 * Type représentant une requête de création ou de modification d'un article.
 */
export type ArticleRequest = {
  id?: string | undefined;
  title: string;
  slug: string;
  category_id: string;
  image?: string;
  excerpt?: string;
  status_id: string;
  content: string;
  author_id: string;
  tags?: string[];
};

/**
 * Middleware de validation pour un article.
 */
export const validateArticleRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = articleRequestSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({
      message: "Données invalides pour l'article.",
      errors: error.details.map((err) => err.message),
    });
    return;
  }
  next();
};
