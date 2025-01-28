import { DataTypes, Model } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";
import { Category } from "./category";
import { Status } from "./status";

/**
 * Modèle représentant un véhicule.
 */
export class Vehicle extends Model {
  public id!: string;
  public name!: string;
  public brand!: string;
  public category_id!: string;
  public color!: string;
  public image!: string | null;
  public video!: string | null;
  public price!: number;
  public status_id!: string;
  public features!: string | null;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    features: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Vehicle",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// Relations
Vehicle.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Vehicle.belongsTo(Status, { foreignKey: "status_id", as: "status" });
