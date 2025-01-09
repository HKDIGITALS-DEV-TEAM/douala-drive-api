import { UserRequest } from "@features/auth/presentation/request/userRequest";
import { User } from "../entity/user";

/**
 * Interface DAO pour la gestion des utilisateurs.
 */
export interface UserDAO {
  /**
   * Récupère un utilisateur à partir de son Keycloak ID.
   *
   * @param {string} keycloakId - L'ID Keycloak de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur ou `null` s'il n'existe pas.
   */
  getUserByKeycloakId(keycloakId: string): Promise<User | null>;

  /**
   * Crée un nouvel utilisateur en base de données.
   *
   * @param {UserRequest} user - Les données partielles de l'utilisateur.
   * @returns {Promise<User>} L'utilisateur créé.
   */
  createUser(user: UserRequest): Promise<User>;

  /**
   * Retoune la liste des utilisateurs.
   *
   * @returns {Promise<User[]>} La liste des utilisateurs.
   */
  getAllUsers(): Promise<User[]>;

  /**
   * Récupère un utilisateur à partir de son username.
   *
   * @param {string} username - Le username de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur ou `null` s'il n'existe pas.
   */
  getUserByUsername(username: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  updateById(id: string, data: Partial<User>): Promise<User>;
  deleteById(id: string): Promise<void>;
}
