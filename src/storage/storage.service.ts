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

  public async ensureChat(chatId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({chatId});

    if (chat) {
      return chat;
    }

    const newChat = new Chat();
    newChat.chatId = chatId;

    return this.chatRepository.save(newChat);
  }

  public addNewList(
    chat: Chat,
    {date, name}: Pick<List, 'date' | 'name'>,
  ): Promise<List> {
    const list = new List();
    list.chat = chat;
    list.date = date;
    list.name = name;

    return this.listRepository.save(list);
  }

  public findAllLists(chat: Chat): Promise<List[]> {
    return this.listRepository.find({where: {chat}});
  }

  public getList(chat: Chat, name: string) {
    return this.listRepository.findOne({where: {chat, name}});
  }

  public addPurchase(chat: Chat, list: List, name: string) {
    const purchase = new Purchase();
    purchase.name = name;
    purchase.list = list;
    return this.purchaseRepository.save(purchase);
  }
}
