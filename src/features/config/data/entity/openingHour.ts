import { DataTypes, Model } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";
import { Configuration } from "./configuration";

export class OpeningHour extends Model {
  public id!: string;
  public label!: string;
  public configuration_id!: string;
}

OpeningHour.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
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
  { sequelize, modelName: "OpeningHour" }
);
