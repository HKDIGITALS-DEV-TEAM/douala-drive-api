/**
 * DTO pour représenter un article.
 */
export interface ArticleDTO {
  id: string;
  title: string;
  slug: string;
  category: {
    id: string;
    name: string;
  };
  image: string | null;
  excerpt: string | null;
  status: {
    id: string;
    name: string;
  };
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
