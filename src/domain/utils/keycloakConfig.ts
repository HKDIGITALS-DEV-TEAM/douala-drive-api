import Keycloak from "keycloak-connect";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

// Configuration de stockage en mémoire pour les sessions.
const memoryStore = new session.MemoryStore();

/**
 * Configuration explicite pour le client Keycloak.
 */
const keycloakConfig: any = {
  clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
  bearerOnly: true,
  serverUrl: `${process.env.KEYCLOAK_SERVER_URL}`,
  realm: `${process.env.KEYCLOAK_REALM}`,
  credentials: {
    secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
  },
};

/**
 * Instance Keycloak pour gérer l'authentification et l'autorisation.
 */
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

export { keycloak, memoryStore };
