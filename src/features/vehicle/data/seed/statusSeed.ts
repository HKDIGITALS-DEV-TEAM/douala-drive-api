import { logger } from "@domain/utils/logger";
import { Status } from "../entity/status";

/**
 * Seeder pour insérer les statuts par défaut dans la base de données.
 */
export const seedStatuses = async (): Promise<void> => {
  const statuses = ["Disponible", "Bientôt Disponible", "En location", "En maintenance", "Reservé"];

  for (const statusName of statuses) {
    await Status.findOrCreate({ where: { name: statusName } });
  }

  logger.info("Statuts insérés avec succès.");
};
