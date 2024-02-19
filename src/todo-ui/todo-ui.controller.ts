import { Body, Controller, Get, Param, Post, Render } from "@nestjs/common";
import { TodoUiService } from "./todo-ui.service";
import { CreateTodoDto } from "src/dtos/todo.dto";
import { CreateTodoType } from "src/utils/types";
import { ApiTags } from "@nestjs/swagger";

// @Controller('todo-ui')
@Controller("")
@ApiTags("UI")
export class TodoUiController {
  constructor(private readonly todoUiService: TodoUiService) {}

  @Get()
  @Render("index")
  index() {
    const data = { title: "TODO List" };
    return { data };
  }

  @Get("add-todo")
  @Render("addTodo")
  addTodo() {
    return { data: { title: "Add TODO List" } };
  }

  @Post("update/:id")
  @Render("addTodo")
  updateTodo(@Param("id") id: string, @Body() todo: CreateTodoType) {
    // fetch(`http://localhost:3000/api/todo/${id}`)
    // .then((response) => response.json())
    // .then((todo) => {

    // })
    console.log(todo);
    return { data: { todo, title: "Update TODO" } };
  }

  @Get("register")
  @Render("register")
  registerUser() {
    return { data: { title: "Register User" } };
  }

  @Get("login")
  @Render("login")
  loginUser() {
    return { data: { title: "Login User" } };
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
