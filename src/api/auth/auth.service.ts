import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserDto } from "src/dtos/user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  async register(user: UserDto): Promise<any> {
    return this.usersService.registerUser(user);
  }
}
