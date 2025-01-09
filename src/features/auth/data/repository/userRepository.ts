import { User } from "../entity/user";

/**
 * Repository pour gérer les opérations liées aux utilisateurs.
 */
export class UserRepository {
  /**
   * Récupère un utilisateur par son Keycloak ID.
   *
   * @param {string} keycloakId - L'ID Keycloak de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur ou `null` s'il n'existe pas.
   */
  async findByKeycloakId(keycloakId: string): Promise<User | null> {
    return User.findOne({ where: { keycloak_id: keycloakId } });
  }

  /**
   * Crée un nouvel utilisateur en base de données.
   *
   * @param {Partial<User>} userData - Les données de l'utilisateur.
   * @returns {Promise<User>} L'utilisateur créé.
   */
  async create(userData: Partial<User>): Promise<User> {
    return User.create(userData);
  }

  /**
   * Récupère tous les utilisateurs.
   *
   * @returns {Promise<User[]>} La liste des utilisateurs.
   */
  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  /**
   * Récupère un utilisateur à partir de son nom d'utilisateur.
   *
   * @param {string} username - Le nom d'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur ou `null` s'il n'existe pas.
   */
  async findByUsername(username: string): Promise<User | null> {
    return User.findOne({ where: { name: username } });
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }
}
