import { app } from "./app";
import { logger } from "@domain/utils/logger";

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Serveur démarré sur le port ${PORT}`);
  logger.info(
    `Swagger disponible sur ${
      process.env.API_HOSTNAME || "http://localhost:3000"
    }/${process.env.API_PREFIX || "api/v1"}/docs`
  );
});
