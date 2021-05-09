import {Module} from '@nestjs/common';
import {CommonModule} from '../common/common.module';
import {StorageModule} from '../storage/storage.module';
import {ListAddAction} from './list-add.action';
import {ListInfoAction} from './list-info.action';
import {PurchaseAddAction} from './purchase-add.action';

@Module({
  imports: [CommonModule, StorageModule],
  providers: [ListAddAction, ListInfoAction, PurchaseAddAction],
  exports: [],
})
export class ActionsModule {}
