import { OpeningHour } from "../entity/openingHour";

/**
 * Repository OpeningHour.
 */
export class OpeningHourRepository {
  async findByConfigurationId(configurationId: string): Promise<OpeningHour[]> {
    return OpeningHour.findAll({
      where: { configuration_id: configurationId },
    });
  }

  async createOrUpdate(openingHours: Partial<OpeningHour>[]): Promise<void> {
    await OpeningHour.bulkCreate(openingHours, {
      updateOnDuplicate: ["label"],
    });
  }

  async deleteByConfigurationId(configurationId: string): Promise<void> {
    await OpeningHour.destroy({ where: { configuration_id: configurationId } });
  }
}
