import { EditProfileRequest } from "@features/auth/presentation/request/editProfileRequest";
import { UserDTO } from "../../presentation/dto/userDTO";
import { UserRequest } from "@features/auth/presentation/request/userRequest";

/**
 * Interface pour les services liés à l'utilisateur.
 */
export interface UserService {
  /**
   * Récupère un utilisateur à partir de son Keycloak ID.
   *
   * @param {string} keycloakId - L'ID Keycloak de l'utilisateur.
   * @returns {Promise<UserDTO | null>} Le DTO utilisateur ou `null` s'il n'existe pas.
   */
  getUserByKeycloakId(keycloakId: string): Promise<UserDTO | null>;

  /**
   * Crée un nouvel utilisateur.
   *
   * @param {UserRequest} user - Les données de l'utilisateur.
   * @returns {Promise<UserDTO>} Le DTO utilisateur créé.
   */
  createUser(user: UserRequest): Promise<UserDTO>;

  /**
   * Retoune la liste des utilisateurs.
   *
   * @returns {Promise<UserDTO[]>} La liste des DTO utilisateurs.
   */
  getAllUsers(): Promise<UserDTO[]>;

  /**
   * Récupère un utilisateur à partir de son username.
   *
   * @param {string} username - Le username de l'utilisateur.
   * @returns {Promise<UserDTO | null>} Le DTO utilisateur ou `null` s'il n'existe pas.
   */
  getUserByUsername(username: string): Promise<UserDTO | null>;
  updateUserProfile(id: string, data: EditProfileRequest): Promise<UserDTO>;
  updateUserProfilePicture(id: string, filename: string): Promise<UserDTO>;
  deleteUserById(id: string): Promise<void>;
}
