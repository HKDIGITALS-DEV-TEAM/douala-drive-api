/**
 * Requête pour la création ou modification d'une configuration.
 */
export type ConfigurationRequest = {
  id: string | undefined;
  name: string;
  address: string;
  phone: string;
  email: string;
  openingHours: { label: string }[];
  rates: {
    title: string;
    icon: string;
    excerpt: string;
    price: string;
    description: string;
  }[];
};
