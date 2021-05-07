import {Module, Logger} from '@nestjs/common';
import {ConfigService} from './config.service';
import {EventBus} from './event-bus.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
    {
      provide: EventBus,
      useValue: new EventBus(),
    },
    {
      provide: Logger,
      useValue: new Logger(),
    },
  ],
  exports: [ConfigService, EventBus, Logger],
})
export class CommonModule {}
