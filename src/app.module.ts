import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModuleTsModule } from './@shared/infrastructure/env-config/env-config.module.ts/env-config.module.ts.module';
import { EnvConfigServiceTsService } from './@shared/infrastructure/env-config/env-config.service.ts/env-config.service.ts.service';
import { EnvConfigModule } from './@shared/infrastructure/env-config/env-config.module';

@Module({
  imports: [EnvConfigModuleTsModule, EnvConfigModule],
  controllers: [AppController],
  providers: [AppService, EnvConfigServiceTsService],
})
export class AppModule {}
