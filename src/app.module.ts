import { Module } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { AppController } from "./app.controller";

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
