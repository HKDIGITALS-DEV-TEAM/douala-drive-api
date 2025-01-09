/**
 * DTO pour représenter une configuration avec ses éléments associés.
 */
export type ConfigurationDTO = {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    openingHours: {
      id: string;
      label: string;
    }[];
    rates: {
      id: string;
      title: string;
      icon: string;
      excerpt: string;
      price: string;
      description: string;
    }[];
  };
  