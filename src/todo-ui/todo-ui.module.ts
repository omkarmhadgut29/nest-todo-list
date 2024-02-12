import { Module } from '@nestjs/common';
import { TodoUiController } from './todo-ui.controller';
import { TodoUiService } from './todo-ui.service';

@Module({
  controllers: [TodoUiController],
  providers: [TodoUiService]
})
export class TodoUiModule {}
