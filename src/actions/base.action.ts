import {Injectable, Logger} from '@nestjs/common';
import {IMessage} from '../message/i-message';
import {ConfigService} from '../common/config.service';
import {EventBus} from '../common/event-bus.service';

import {StorageService} from '../storage/storage.service';
import {Chat} from '../storage/models/chat';

@Injectable()
export abstract class BaseAction {
  protected readonly eventBus: EventBus;
  protected readonly config: ConfigService;
  protected readonly logger: Logger;
  protected readonly storageService: StorageService;

  protected event!: string;

  constructor(
    config: ConfigService,
    eventBus: EventBus,
    logger: Logger,

    storageService: StorageService,
  ) {
    this.config = config;
    this.logger = logger;

    this.eventBus = eventBus;
    this.storageService = storageService;

    this.setEvent();

    this.logger.log(`subscribe on "${this.event}" event`);
    this.eventBus.on(this.event, this.handleEvent.bind(this));
  }

  abstract setEvent(): void;

  abstract doAction(chat: Chat, message: IMessage): Promise<IMessage>;

  private async handleEvent(message: IMessage) {
    try {
      this.logger.log(`"${this.event}" event received`);

      const chatId: number = message.chatId;
      const chat: Chat = await this.storageService.ensureChat(chatId);
      message = await this.doAction(chat, message);
      message.send(message.getReplyData());
    } catch (error) {
      this.logger.error(error);
      message.send(error.message);
    }
  }
}
