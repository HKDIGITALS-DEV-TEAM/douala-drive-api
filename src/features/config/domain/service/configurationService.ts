import { ConfigurationDTO } from "../../presentation/dto/configurationDTO";
import { ConfigurationRequest } from "../../presentation/request/configurationRequest";

export interface ConfigurationService {
  getConfigurationByName(name: string): Promise<ConfigurationDTO | null>;
  getAllConfigurations(): Promise<ConfigurationDTO[]>;
  createOrUpdateConfiguration(
    request: ConfigurationRequest
  ): Promise<ConfigurationDTO | null>;
  deleteConfiguration(id: string): Promise<void>;
}
