import { User } from "../entity/user";
import { UserDAO } from "./userDAO";
import { UserRepository } from "../repository/userRepository";

/**
 * Implémentation de l'interface DAO pour les utilisateurs.
 */
export class UserDAOImpl implements UserDAO {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Récupère un utilisateur à partir de son Keycloak ID.
   *
   * @param {string} keycloakId - L'ID Keycloak de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur ou `null` s'il n'existe pas.
   */
  async getUserByKeycloakId(keycloakId: string): Promise<User | null> {
    return this.userRepository.findByKeycloakId(keycloakId);
  }

  /**
   * Crée un nouvel utilisateur en base de données.
   *
   * @param {Partial<User>} user - Les données partielles de l'utilisateur.
   * @returns {Promise<User>} L'utilisateur créé.
   */
  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }

  /**
   * Retoune la liste des utilisateurs.
   *
   * @returns {Promise<User[]>} La liste des utilisateurs.
   */
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * Récupère un utilisateur à partir de son username.
   *
   * @param {string} username - Le username de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur ou `null` s'il n'existe pas.
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateById(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    return user.update(data);
  }

  async deleteById(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    await user.destroy();
  }
}
