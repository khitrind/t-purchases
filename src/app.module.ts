import {Module} from '@nestjs/common';
import {PingController} from './ping.controller';
import {TelegramModule} from './telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
