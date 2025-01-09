import { DataTypes, Model } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";
import { Configuration } from "./configuration";

export class Rate extends Model {
  public id!: string;
  public title!: string;
  public icon!: string;
  public excerpt!: string;
  public price!: string;
  public description!: string;
  public configuration_id!: string;
}

Rate.init(
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
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    configuration_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Configuration,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Rate" }
);
