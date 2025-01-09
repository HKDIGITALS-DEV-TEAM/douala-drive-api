import { Article } from "../../data/entity/article";
import { ArticleDTO } from "./articleDTO";

/**
 * Mapper pour convertir une entité Article en ArticleDTO.
 * @param article - Entité Article à convertir.
 * @returns DTO de l'article.
 */
export const toArticleDTO = (article: Article): ArticleDTO => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  category: {
    id: article.category?.id || "Inconnu",
    name: article.category?.name || "Inconnu",
  },
  image: article.image,
  excerpt: article.excerpt,
  status: {
    id: article.status?.id || "Inconnu",
    name: article.status?.name || "Inconnu",
  },
  content: article.content,
  author: {
    id: article.author?.id || "Inconnu",
    name: article.author?.name || "Inconnu",
    email: article.author?.email || "Inconnu",
  },
  tags:
    article.tags?.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })) || [],
  createdAt: article.createdAt,
  updatedAt: article.updatedAt,
});
