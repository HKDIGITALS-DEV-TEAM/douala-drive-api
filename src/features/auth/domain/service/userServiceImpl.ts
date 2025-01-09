import { UserRequest } from "@features/auth/presentation/request/userRequest";
import { UserService } from "./userService";
import { UserDAO } from "@features/auth/data/dao/userDAO";
import { UserDTO } from "@features/auth/presentation/dto/userDTO";
import { toUserDTO } from "@features/auth/presentation/dto/userDTOMapper";
import { EditProfileRequest } from "@features/auth/presentation/request/editProfileRequest";

/**
 * Implémentation du service utilisateur.
 */
export class UserServiceImpl implements UserService {
  private userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }

  /**
   * Récupère un utilisateur par son Keycloak ID et retourne un DTO.
   *
   * @param {string} keycloakId - L'ID Keycloak de l'utilisateur.
   * @returns {Promise<UserDTO | null>} Le DTO utilisateur ou `null` s'il n'existe pas.
   */
  async getUserByKeycloakId(keycloakId: string): Promise<UserDTO | null> {
    const user = await this.userDAO.getUserByKeycloakId(keycloakId);
    return user ? toUserDTO(user) : null;
  }

  /**
   * Crée un nouvel utilisateur et retourne un DTO.
   *
   * @param {UserRequest} user - Les données de l'utilisateur.
   * @returns {Promise<UserDTO>} Le DTO utilisateur créé.
   */
  async createUser(user: UserRequest): Promise<UserDTO> {
    const newUser = await this.userDAO.createUser(user);
    return toUserDTO(newUser);
  }

  /**
   * Retoune la liste des utilisateurs.
   *
   * @returns {Promise<UserDTO[]>} La liste des DTO utilisateurs.
   */
  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userDAO.getAllUsers();
    return users.map(toUserDTO);
  }

  /**
   * Récupère un utilisateur à partir de son username.
   *
   * @param {string} username - Le username de l'utilisateur.
   * @returns {Promise<UserDTO | null>} Le DTO utilisateur ou `null` s'il n'existe pas.
   */
  async getUserByUsername(username: string): Promise<UserDTO | null> {
    const user = await this.userDAO.getUserByUsername(username);
    return user ? toUserDTO(user) : null;
  }

  async updateUserProfile(
    id: string,
    data: EditProfileRequest
  ): Promise<UserDTO> {
    const user = await this.userDAO.getUserById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    const updatedUser = await this.userDAO.updateById(id, data);
    return toUserDTO(updatedUser);
  }

  async updateUserProfilePicture(
    id: string,
    filename: string
  ): Promise<UserDTO> {
    const user = await this.userDAO.getUserById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    const updatedUser = await this.userDAO.updateById(id, {
      profilePicture: filename,
    });
    return toUserDTO(updatedUser);
  }

  async deleteUserById(id: string): Promise<void> {
    const user = await this.userDAO.getUserById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    await this.userDAO.deleteById(id);
  }
}
