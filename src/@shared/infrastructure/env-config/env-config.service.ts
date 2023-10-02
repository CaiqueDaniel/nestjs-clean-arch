import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private nestConfigService: ConfigService) {}

  getPortApp(): number {
    return Number(this.nestConfigService.get<number>('PORT'));
  }

  getNodeEnv(): string {
    return this.nestConfigService.get('NODE_ENV');
  }
}
