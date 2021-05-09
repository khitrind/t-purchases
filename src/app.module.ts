import {Module} from '@nestjs/common';
import {ActionsModule} from './actions/actions.module';
import {PingController} from './ping.controller';
import {TelegramModule} from './telegram/telegram.module';

@Module({
  imports: [TelegramModule, ActionsModule],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
