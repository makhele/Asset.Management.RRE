import { Configuration } from '../models/configuration';

export class ConfigurationService {
    serverSettings: Configuration;

    constructor(){
        this.serverSettings = new Configuration('https://localhost:5300');
    }

}
