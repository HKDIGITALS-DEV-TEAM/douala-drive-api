/**
 * Représente une requête pour créer un utilisateur.
 */
export type UserRequest = {
  keycloak_id: string;
  email: string;
  name: string;
  phone?: string | null;
  fidelity_points: number;
  role: string;
};
