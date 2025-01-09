import { createLogger, format, transports } from "winston";

/**
 * Configuration du logger.
 * - Niveau : debug, info, warn, error.
 * - Transports : Console et fichiers pour journalisation.
 */
const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

/**
 * Exporte le logger configuré pour une utilisation dans l'application.
 */
export { logger };
