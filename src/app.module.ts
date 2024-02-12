import { Module } from "@nestjs/common";
import { TodoModule } from "./api/todo/todo.module";
// import { AppController } from "./app.controller";
import { TodoUiModule } from "./todo-ui/todo-ui.module";

@Module({
  imports: [TodoModule, TodoUiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
