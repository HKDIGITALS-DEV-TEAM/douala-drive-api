import { DataTypes, Model, Association } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";
import { CategoryArticle } from "./categoryArticle";
import { Tag } from "./tag";
import { User } from "@features/auth/data/entity/user";
import { StatusArticle } from "./statusArticle"; // Import du modèle StatusArticle

/**
 * Modèle représentant un article.
 */
export class Article extends Model {
  public id!: string;
  public title!: string;
  public slug!: string;
  public category_id!: string;
  public image!: string | null;
  public excerpt!: string | null;
  public status_id!: string;
  public content!: string;
  public author_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  // Méthodes Sequelize générées pour les relations
  public setTags!: (tags: Tag[]) => Promise<void>; // Méthode générée pour associer les tags
  public getTags!: () => Promise<Tag[]>; // Méthode générée pour récupérer les tags

  // Relations
  public category?: CategoryArticle;
  public tags?: Tag[];
  public author?: User;
  public status?: StatusArticle; // Relation avec le statut

  public static associations: {
    category: Association<Article, CategoryArticle>;
    tags: Association<Article, Tag>;
    author: Association<Article, User>;
    status: Association<Article, StatusArticle>;
  };
}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Article",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// Relations
Article.belongsTo(CategoryArticle, {
  foreignKey: "category_id",
  as: "category",
});
Article.belongsToMany(Tag, { through: "ArticleTags", as: "tags" });
Article.belongsTo(User, { foreignKey: "author_id", as: "author" });
Article.belongsTo(StatusArticle, { foreignKey: "status_id", as: "status" }); // Relation avec Status
