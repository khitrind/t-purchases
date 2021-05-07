import { cleanEnv, str, bool, port, host } from 'envalid';

export class ConfigService {
  private readonly envConfig: Record<string, any>;

  constructor() {
    this.envConfig = cleanEnv(process.env, {
      PORT: port({ default: 3000 }),
      TELEGRAM_BOT_TOKEN: str(),
      TELEGRAM_USE_PROXY: bool({ default: false }),
      TELEGRAM_PROXY_HOST: host(),
      TELEGRAM_PROXY_PORT: port(),
      TELEGRAM_PROXY_LOGIN: str(),
      TELEGRAM_PROXY_PASSWORD: str(),
    });
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
