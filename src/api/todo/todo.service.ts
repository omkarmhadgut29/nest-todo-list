import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from "@nestjs/common";
import { pool, pool2 } from "src/database/connection";
import { generateUUID } from "src/utils/generateId";
import { CreateTodoType } from "src/utils/types";

@Injectable()
export class TodoService {
  async findAll() {
    console.log("service");
    // const connection = await pool(process).getConnection();

    // const connection = await pool().getConnection();
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query("Select * From todos");
      return rows;
    } finally {
      connection.release();
    }
  }

  async findByTitle(id: string) {
    const connection = await pool.getConnection();

    try {
      const [todo] = await connection.query(
        `Select * from todos where id = "${id}"`,
      );

      if (!todo || !todo[0]) {
        throw new NotFoundException("Todo not found...");
      }
      return todo[0];
    } finally {
      connection.release();
    }
  }

  async create(todo: CreateTodoType) {
    const connection = await pool.getConnection();
    try {
      const [isTodoExists] = await connection.query(
        `Select * from todos where title = "${todo.title}"`,
      );

      if (isTodoExists && isTodoExists[0]?.title === todo.title) {
        throw new ConflictException("Todo with title already exists");
      }

      let id = generateUUID();

      let [isIdExists] = await connection.query(
        `Select * from todos where id = "${id}"`,
      );

      while (isIdExists && isIdExists[0]?.id === id) {
        [isIdExists] = await connection.query(
          `Select * from todos where id = "${id}"`,
        );
      }

      await connection.query(
        "INSERT INTO todos (id, title, description) VALUES (?, ?, ?)",
        [id, todo.title, todo.description],
      );

      return { message: "Data added successfully..." };
    } finally {
      connection.release();
    }
  }

  async update(id: string, todo: CreateTodoType) {
    const connection = await pool.getConnection();

    try {
      const [isTodoExists] = await connection.query(
        `Select * from todos where id = "${id}"`,
      );

      if (!isTodoExists || !isTodoExists[0]) {
        throw new NotFoundException("Todo not found...");
      }

      const updatedTodo = await connection.query(
        `Update todos Set title = "${todo.title}", description = "${todo.description}" where id = "${id}"`,
      );

      return { message: "Todo Updated successfully.", updatedTodo };
    } finally {
      connection.release();
    }
  }

  async delete(id: string) {
    const connection = await pool.getConnection();

    try {
      const [todo] = await connection.query(
        `Select * from todos where id = "${id}"`,
      );

      if (!todo || !todo[0]) {
        throw new NotFoundException("Todo not found...");
      }

      await connection.query(`Delete From todos where id = "${id}"`);

      return { message: "Todo deleted successfully." };
    } finally {
      connection.release();
    }
  }
}
