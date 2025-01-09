import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { logger } from "@domain/utils/logger";

dotenv.config();

/**
 * Instance de Sequelize pour gérer la connexion à la base de données PostgreSQL.
 */
export const sequelize = new Sequelize({
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_NAME}`,
  username: `${process.env.DB_ADMIN_USERNAME}`,
  password: `${process.env.DB_ADMIN_PASSWORD}`,
  dialect: "postgres",
  logging: false,
});

/**
 * Initialise la connexion à la base de données.
 *
 * @throws {Error} Si la connexion échoue.
 */
export async function initializeDB(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info("Connexion à la base de données réussie.");

    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ alter: true }); // Utilise `alter: true` pour ajuster les colonnes si nécessaire
    logger.info("Les modèles ont été synchronisés avec la base de données.");
  } catch (error) {
    logger.error("Erreur de connexion à la base de données :", error);
    throw error;
  }
}
