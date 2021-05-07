import { Telegraf } from 'telegraf';
import TelegrafContext from 'telegraf/typings/context';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '../common/config.service';
import { EventBus } from '../common/event-bus.service';
import { TelegramMessage } from './telegram.message';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor(config: ConfigService, eventBus: EventBus) {
    const botToken: string = config.get('TELEGRAM_BOT_TOKEN');

    this.bot = new Telegraf(botToken);

    this.getCommandEventMapping(eventBus).forEach(([command, event]) => {
      this.bot.command(
        command,
        (ctx: TelegrafContext & { command?: string }) => {
          ctx.command = command;
          eventBus.emit(event, new TelegramMessage(ctx));
        },
      );
    });
  }

  public async launch(): Promise<void> {
    this.bot.launch();
  }

  /**
   * Returns mapping structure that links commands and corresponded events
   */
  private getCommandEventMapping(eventBus: EventBus): [string, string][] {
    return [
      ['list_add', eventBus.LIST_ADD],
      ['list_remove', eventBus.LIST_REMOVE],
      ['info', eventBus.LIST_INFO],
      ['add', eventBus.PURCHASE_ADD],
      ['remove', eventBus.PURCHASE_REMOVE],
    ];
  }
}
