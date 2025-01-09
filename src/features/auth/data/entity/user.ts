import { DataTypes, Model } from "sequelize";
import { sequelize } from "@domain/utils/dbConnexionConfig";

/**
 * Modèle représentant un utilisateur.
 */
export class User extends Model {
  public id!: string;
  public keycloak_id!: string;
  public email!: string;
  public name!: string;
  public phone!: string | null;
  public fidelity_points!: number;
  public role!: string;
  public profilePicture!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    keycloak_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    fidelity_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
