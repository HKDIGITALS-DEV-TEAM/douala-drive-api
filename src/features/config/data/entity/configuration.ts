import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";

export class Configuration extends Model {
  public id!: string;
  public name!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
}

Configuration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Configuration" }
);
