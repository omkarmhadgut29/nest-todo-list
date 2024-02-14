import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Render,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "src/dtos/todo.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@Controller("api/todo")
@ApiTags("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(":id")
  fingByTitle(@Param("id") id: string) {
    return this.todoService.findByTitle(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() todo: CreateTodoDto) {
    return this.todoService.create(todo);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() todo: CreateTodoDto) {
    return this.todoService.update(id, todo);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.todoService.delete(id);
  }
}
