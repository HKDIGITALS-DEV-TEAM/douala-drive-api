import { Configuration } from "../entity/configuration";
import { OpeningHour } from "../entity/openingHour";
import { Rate } from "../entity/rate";

export interface ConfigurationDAO {
  getConfigurationByName(name: string): Promise<{
    configuration: Configuration;
    openingHours: OpeningHour[];
    rates: Rate[];
  } | null>;

  getAllConfigurations(): Promise<
    {
      configuration: Configuration;
      openingHours: OpeningHour[];
      rates: Rate[];
    }[]
  >;

  createOrUpdateConfiguration(
    configuration: Partial<Configuration>,
    openingHours: Partial<OpeningHour>[],
    rates: Partial<Rate>[]
  ): Promise<Configuration>;

  deleteConfiguration(id: string): Promise<void>;
}
