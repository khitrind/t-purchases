import {Injectable} from '@nestjs/common';

import * as statuses from './statuses';
import {BaseAction} from './base.action';
import {Chat} from '../storage/models/chat';
import {IMessage} from '../message/i-message';

@Injectable()
export class ListInfoAction extends BaseAction {
  setEvent(): void {
    this.event = this.eventBus.LIST_INFO;
  }

  async doAction(chat: Chat, message: IMessage): Promise<IMessage> {
    console.log(111);
    const lists = await this.storageService.findAllLists(chat);
    return message.setStatus(statuses.STATUS_SUCCESS).withData({
      date: lists.map(({name}) => name),
    });
  }
}
