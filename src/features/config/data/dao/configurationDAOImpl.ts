import { Configuration } from "../entity/configuration";
import { OpeningHour } from "../entity/openingHour";
import { Rate } from "../entity/rate";
import { ConfigurationRepository } from "../repository/configurationRepository";
import { OpeningHourRepository } from "../repository/openingHour";
import { RateRepository } from "../repository/rateRepository";
import { ConfigurationDAO } from "./configurationDAO";

export class ConfigurationDAOImpl implements ConfigurationDAO {
  private configurationRepository: ConfigurationRepository;
  private openingHourRepository: OpeningHourRepository;
  private rateRepository: RateRepository;

  constructor(
    configurationRepository: ConfigurationRepository,
    openingHourRepository: OpeningHourRepository,
    rateRepository: RateRepository
  ) {
    this.configurationRepository = configurationRepository;
    this.openingHourRepository = openingHourRepository;
    this.rateRepository = rateRepository;
  }
  
  async getConfigurationByName(name: string) {
    const configuration = await this.configurationRepository.findByName(name);
    if (!configuration) return null;

    const openingHours = await this.openingHourRepository.findByConfigurationId(
      configuration.id
    );
    const rates = await this.rateRepository.findByConfigurationId(
      configuration.id
    );

    return { configuration, openingHours, rates };
  }

  async getAllConfigurations() {
    const configurations = await this.configurationRepository.findAll();
    const results = [];

    for (const configuration of configurations) {
      const openingHours =
        await this.openingHourRepository.findByConfigurationId(
          configuration.id
        );
      const rates = await this.rateRepository.findByConfigurationId(
        configuration.id
      );
      results.push({ configuration, openingHours, rates });
    }

    return results;
  }

  async createOrUpdateConfiguration(
    configuration: Partial<Configuration>,
    openingHours: Partial<OpeningHour>[],
    rates: Partial<Rate>[]
  ) {
    const newConfig = await this.configurationRepository.createOrUpdate(
      configuration
    );
    await this.openingHourRepository.createOrUpdate(
      openingHours.map((hour) => ({ ...hour, configuration_id: newConfig.id }))
    );
    await this.rateRepository.createOrUpdate(
      rates.map((rate) => ({ ...rate, configuration_id: newConfig.id }))
    );

    return newConfig;
  }

  async deleteConfiguration(id: string) {
    await this.openingHourRepository.deleteByConfigurationId(id);
    await this.rateRepository.deleteByConfigurationId(id);
    await this.configurationRepository.deleteById(id);
  }
}
