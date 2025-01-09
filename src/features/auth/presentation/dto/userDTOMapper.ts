import { User } from "@features/auth/data/entity/user";
import { UserDTO } from "./userDTO";

/**
 * Mapper pour convertir un utilisateur en DTO.
 *
 * @param {User} user - L'entité utilisateur.
 * @returns {UserDTO} Le DTO utilisateur.
 */
export const toUserDTO = (user: User): UserDTO => ({
  id: user.id,
  email: user.email,
  name: user.name,
  phone: user.phone,
  fidelity_points: user.fidelity_points,
  role: user.role,
  profilePicture: user.profilePicture,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  deletedAt: user.deletedAt,
});
