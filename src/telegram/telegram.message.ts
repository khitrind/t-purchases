import {BaseMessage} from '../message/base.message';
import {IMessage} from '../message/i-message';

export class TelegramMessage extends BaseMessage implements IMessage {
  private ctx: any;

  constructor(ctx: any) {
    const {message} = ctx.update;
    super({
      chatId: message.chat.id,
      firstName: message.from.first_name,
      lastName: message.from.last_name,
      lang: message.from.language_code,
      text: message.text,
      fullText: message.text,
      command: ctx.command,
    });
    this.ctx = ctx;
  }

  public send(args: any): Promise<any> {
    return this.ctx.replyWithHTML(args);
  }
}
