import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {

    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        if (!fs.existsSync(filePath)) {
            throw new Error('Missing .env file');
        }

        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    /**
     * Return config value
     * @param {string} key
     * @param {any} defaultValue
     */
    get(key: string, defaultValue: any = false): any {
        return this.envConfig[key] || defaultValue;
    }

}
