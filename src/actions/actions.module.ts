import {Module} from '@nestjs/common';
import {CommonModule} from '../common/common.module';
import {StorageModule} from '../storage/storage.module';
import {ListAddAction} from './list-add.action';

@Module({
  imports: [CommonModule, StorageModule],
  providers: [ListAddAction],
  exports: [],
})
export class ActionsModule {}
