import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";
import { Article } from "./article";

/**
 * Modèle représentant un tag.
 */
export class Tag extends Model {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Tag",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
