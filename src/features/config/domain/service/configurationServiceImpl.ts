import { ConfigurationService } from "./configurationService";
import { ConfigurationDAO } from "../../data/dao/configurationDAO";
import { ConfigurationDTO } from "../../presentation/dto/configurationDTO";
import { ConfigurationRequest } from "../../presentation/request/configurationRequest";
import { toConfigurationDTO } from "../../presentation/dto/configurationDTOMapper";

export class ConfigurationServiceImpl implements ConfigurationService {
  private configurationDAO: ConfigurationDAO;

  constructor(configurationDAO: ConfigurationDAO) {
    this.configurationDAO = configurationDAO;
  }

  async getConfigurationByName(name: string): Promise<ConfigurationDTO | null> {
    const result = await this.configurationDAO.getConfigurationByName(name);
    if (!result) return null;
    return toConfigurationDTO(
      result.configuration,
      result.openingHours,
      result.rates
    );
  }

  async getAllConfigurations(): Promise<ConfigurationDTO[]> {
    const results = await this.configurationDAO.getAllConfigurations();
    return results.map((result) =>
      toConfigurationDTO(
        result.configuration,
        result.openingHours,
        result.rates
      )
    );
  }

  async createOrUpdateConfiguration(
    request: ConfigurationRequest
  ): Promise<ConfigurationDTO | null> {
    const configuration = {
      id: request.id || undefined,
      name: request.name,
      address: request.address,
      phone: request.phone,
      email: request.email,
    };

    const openingHours = request.openingHours.map((hour) => ({
      label: hour.label,
      configuration_id: configuration.id,
    }));

    const rates = request.rates.map((rate) => ({
      title: rate.title,
      icon: rate.icon,
      excerpt: rate.excerpt,
      price: rate.price,
      description: rate.description,
      configuration_id: configuration.id,
    }));

    const newConfig = await this.configurationDAO.createOrUpdateConfiguration(
      configuration,
      openingHours,
      rates
    );

    return this.getConfigurationByName(newConfig.name);
  }

  async deleteConfiguration(id: string): Promise<void> {
    await this.configurationDAO.deleteConfiguration(id);
  }
}
