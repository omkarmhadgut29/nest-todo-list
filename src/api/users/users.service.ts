import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { pool } from "src/database/connection";
import { generateUUID } from "src/utils/generateId";
import { User } from "src/utils/types";

@Injectable()
export class UsersService {
  async findOne(
    username: string,
  ): Promise<(User & { id: string }) | undefined> {
    const connection = await pool.getConnection();

    try {
      const [todo] = await connection.query(
        `Select * from user where username = "${username}"`,
      );

      if (!todo || !todo[0]) {
        throw new NotFoundException("User not found...");
      }
      console.log(process.env.JWT_SECRET_KEY);
      console.log("first");
      return todo[0];
    } finally {
      connection.release();
    }
    // return this.users.find(user => user.username === username);
  }

  async registerUser(user: User) {
    const connection = await pool.getConnection();
    try {
      const [isUserExists] = await connection.query(
        `Select * from user where username = "${user.username}"`,
      );

      if (isUserExists && isUserExists[0]?.username === user.username) {
        throw new ConflictException("User with username already exists");
      }

      let id = generateUUID();

      let [isIdExists] = await connection.query(
        `Select * from user where id = "${id}"`,
      );

      while (isIdExists && isIdExists[0]?.id === id) {
        [isIdExists] = await connection.query(
          `Select * from user where id = "${id}"`,
        );
      }

      await connection.query(
        "INSERT INTO user (id, username, fullname, password, email) VALUES (?, ?, ?, ?, ?)",
        [id, user.username, user.fullname, user.password, user.email],
      );

      return { message: "User Registed successfully..." };
    } finally {
      connection.release();
    }
  }
}
