import { Configuration } from "../entity/configuration";

/**
 * Repository Configuration.
 */
export class ConfigurationRepository {
  async findByName(name: string): Promise<Configuration | null> {
    return Configuration.findOne({ where: { name } });
  }

  async findAll(): Promise<Configuration[]> {
    return Configuration.findAll();
  }

  async findById(id: string): Promise<Configuration | null> {
    return Configuration.findByPk(id);
  }

  async createOrUpdate(
    configuration: Partial<Configuration>
  ): Promise<Configuration> {
    const [updatedConfig] = await Configuration.upsert(configuration);
    return updatedConfig;
  }

  async deleteById(id: string): Promise<void> {
    await Configuration.destroy({ where: { id } });
  }
}
