import {cleanEnv, str, port} from 'envalid';

export class ConfigService {
  private readonly envConfig: Record<string, any>;

  constructor() {
    this.envConfig = cleanEnv(process.env, {
      PORT: port({default: 3000}),
      TELEGRAM_BOT_TOKEN: str(),
    });
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
