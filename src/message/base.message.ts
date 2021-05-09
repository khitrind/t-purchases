import {IMessage} from './i-message';

type BaseMessageParams = {
  chatId: number;
  lang: string;
  text: string;
  fullText: string;
  command: string;
  firstName: string;
  lastName: string;
};

export abstract class BaseMessage implements IMessage {
  public chatId: number;
  public lang: string;
  public text: string;
  public fullText: string;
  public command: string;

  protected firstName: string;
  protected lastName: string;

  protected replyStatus!: string;
  protected replyData: any;

  constructor({
    chatId,
    lang,
    text,
    fullText,
    command,
    firstName,
    lastName,
  }: BaseMessageParams) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.chatId = chatId;
    this.command = command;
    this.text = text;
    this.fullText = fullText;
    this.lang = lang;
  }

  get name(): string {
    const firstName: string = this.firstName || '';
    const lastName: string = this.lastName || '';

    return `${firstName} ${lastName}`.trim();
  }

  public getReplyStatus(): string {
    return this.replyStatus;
  }

  public getReplyData(): any {
    return this.replyData;
  }

  public setStatus(status: string): IMessage {
    this.replyStatus = status;
    return this;
  }

  public withData(data: string): IMessage {
    this.replyData = data;
    return this;
  }

  abstract send(args: any): void;
}
