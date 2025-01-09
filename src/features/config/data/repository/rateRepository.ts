import { Rate } from "../entity/rate";

/**
 * Repository Rate.
 */
export class RateRepository {
  async findByConfigurationId(configurationId: string): Promise<Rate[]> {
    return Rate.findAll({ where: { configuration_id: configurationId } });
  }

  async createOrUpdate(rates: Partial<Rate>[]): Promise<void> {
    await Rate.bulkCreate(rates, {
      updateOnDuplicate: ["title", "icon", "excerpt", "price", "description"],
    });
  }

  async deleteByConfigurationId(configurationId: string): Promise<void> {
    await Rate.destroy({ where: { configuration_id: configurationId } });
  }
}
