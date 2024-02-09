import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "src/dtos/todo.dto";
import { Response } from "express";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get("index")
  @Render("todo/index")
  async index() {
    // return { title: "TODO List", message: "Hello world!" };
    const todos = await this.todoService.findAll();
    return { title: "TODO List", message: "Hello world!", todos };
  }

  @Get(":title")
  fingByTitle(@Param("title") title: string) {
    return this.todoService.findByTitle(title);
  }

  @Get("title/:title")
  @Render("todo/index")
  async todoByTitle(@Param("title") title: string) {
    const todos = await this.todoService.findByTitle(title);
    return { title: "TODO List", message: "Hello world!", todos: [todos] };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() todo: CreateTodoDto) {
    return this.todoService.create(todo);
  }

  @Get("create/new-todo")
  @Render("todo/createTodo")
  async createTodo() {
    // const todos = await this.todoService.create(todo);
    return { title: "TODO List", message: "Hello world!" };
  }

  @Post("create/new-todo")
  @UsePipes(new ValidationPipe())
  getTodo(@Body() todo: CreateTodoDto) {
    // return todo;
    return this.todoService.create(todo);
  }

  @Patch(":title")
  update(@Param("title") title: string, @Body() todo: CreateTodoDto) {
    return this.todoService.update(title, todo);
  }

  @Delete(":title")
  delete(@Param("title") title: string) {
    return this.todoService.delete(title);
  }
}
