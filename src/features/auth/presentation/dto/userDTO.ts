/**
 * Représentation simplifiée d'un utilisateur pour les réponses API.
 */
export type UserDTO = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  fidelity_points: number;
  role: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
