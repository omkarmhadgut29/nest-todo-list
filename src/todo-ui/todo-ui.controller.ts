import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { TodoUiService } from "./todo-ui.service";

// @Controller('todo-ui')
@Controller("")
export class TodoUiController {
  constructor(private readonly todoUiService: TodoUiService) {}

  @Get()
  @Render("index")
  index() {
    return { title: "TODO List" };
  }

  @Get("add-todo")
  @Render("addTodo")
  addTodo() {
    return { title: "TODO List" };
  }

  @Get("update-todo")
  @Render("addTodo")
  updateTodo() {
    return { title: "TODO List" };
  }

  // @Post("add-todo")
  // addTodoPost(@Body() data: { title: string; description: string }) {
  //   console.log("first");
  //   if (
  //     [data?.title, data?.description].some(
  //       (field) => !field || field?.trim() === "",
  //     )
  //   ) {
  //     location.reload();
  //   }

  //   return { title: "TODO List", data };
  // }
}
