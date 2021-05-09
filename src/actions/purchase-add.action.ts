import {Injectable} from '@nestjs/common';
import {Composer, Markup, Scenes, session, Telegraf} from 'telegraf';

import * as statuses from './statuses';
import {BaseAction} from './base.action';
import {Chat} from '../storage/models/chat';
import {IMessage} from '../message/i-message';
import {getCurrentDate} from 'src/common/utils';

@Injectable()
export class PurchaseAddAction extends BaseAction {
  setEvent(): void {
    this.event = this.eventBus.PURCHASE_ADD;
  }

  async doAction(chat: Chat, message: IMessage): Promise<IMessage> {
    const [listName, purchaseName] = this.getMessageData(message.text);
    const list = await this.storageService.getList(chat, listName);

    if (!list) {
      this.logger.warn(
        `No active list with name ${list} for chat with id=${chat.id} were found`,
      );
      return message.setStatus(statuses.STATUS_NO_EVENT);
    }

    const purchase = await this.storageService.addPurchase(
      chat,
      list,
      purchaseName,
    );

    return message
      .setStatus(statuses.STATUS_SUCCESS)
      .withData({text: `Purchase ${purchase.name} added to ${list.name}`});
  }

  private getMessageData(text: string) {
    return text.replace(`/${this.event}`, '').trimStart().split(' ');
  }
}
