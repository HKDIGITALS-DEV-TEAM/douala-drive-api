import { Configuration } from "@features/config/data/entity/configuration";
import { ConfigurationDTO } from "./configurationDTO";
import { OpeningHour } from "@features/config/data/entity/openingHour";
import { Rate } from "@features/config/data/entity/rate";

/**
 * Mapper pour convertir les entités vers un DTO Configuration.
 */
export const toConfigurationDTO = (
  configuration: Configuration,
  openingHours: OpeningHour[],
  rates: Rate[]
): ConfigurationDTO => ({
  id: configuration.id,
  name: configuration.name,
  address: configuration.address,
  phone: configuration.phone,
  email: configuration.email,
  openingHours: openingHours.map((hour) => ({
    id: hour.id,
    label: hour.label,
  })),
  rates: rates.map((rate) => ({
    id: rate.id,
    title: rate.title,
    icon: rate.icon,
    excerpt: rate.excerpt,
    price: rate.price,
    description: rate.description,
  })),
});
