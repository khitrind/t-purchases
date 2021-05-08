import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection, Repository, UpdateResult} from 'typeorm';

import {Chat} from './models/chat';
import {List} from './models/list';
import {Purchase} from './models/purchase';

@Injectable()
export class StorageService {
  private chatRepository: Repository<Chat>;
  private listRepository: Repository<List>;
  private purchaseRepository: Repository<Purchase>;

  constructor(@InjectConnection() private readonly dbConnection: Connection) {
    this.chatRepository = this.dbConnection.getRepository(Chat);
    this.listRepository = this.dbConnection.getRepository(List);
    this.purchaseRepository = this.dbConnection.getRepository(Purchase);
  }

  public get connection() {
    return this.dbConnection;
  }

  /**
   * Finds chat for given chatId
   * If chat is not exists then creates it and returns it
   * @param {number} chatId
   * @returns {Promise<Chat>}
   * @memberOf StorageService
   */
  public async ensureChat(chatId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({chatId});

    if (chat) {
      return chat;
    }

    const newChat = new Chat();
    newChat.chatId = chatId;

    return this.chatRepository.save(newChat);
  }

  /**
   * Creates new active event and append it to chat
   * @param {Chat} chat
   * @param {Date} date
   * @returns {Promise<Event>}
   * @memberOf StorageService
   */
  public addNewList(
    chat: Chat,
    {date, name}: Pick<List, 'date' | 'name'>,
  ): Promise<List> {
    const list = new List();
    list.chat = chat;
    list.active = true;
    list.date = date;
    list.name = name;

    return this.listRepository.save(list);
  }
}
