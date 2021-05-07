import {EventEmitter} from 'events';

export class EventBus extends EventEmitter {
  public readonly LIST_ADD: string = 'list_add';
  public readonly LIST_INFO: string = 'list_info';
  public readonly LIST_REMOVE: string = 'list_remove';
  public readonly PURCHASE_ADD: string = 'purchase_add';
  public readonly PURCHASE_REMOVE: string = 'purchase_remove';
}
