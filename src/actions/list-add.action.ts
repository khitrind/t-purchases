import {Injectable} from '@nestjs/common';

import * as statuses from './statuses';
import {BaseAction} from './base.action';
import {Chat} from '../storage/models/chat';
import {IMessage} from '../message/i-message';
import {getCurrentDate} from 'src/common/utils';

@Injectable()
export class ListAddAction extends BaseAction {
  setEvent(): void {
    this.event = this.eventBus.LIST_ADD;
  }

  async doAction(chat: Chat, message: IMessage): Promise<IMessage> {
    const list = await this.storageService.addNewList(chat, {
      date: getCurrentDate(),
      name: this.parseListName(message.text),
    });
    return message.setStatus(statuses.STATUS_SUCCESS).withData({
      date: list.date,
    });
  }

  private parseListName(text: string) {
    console.log(text);
    return text.replace(`/${this.event}`, '').trim();
  }
}
