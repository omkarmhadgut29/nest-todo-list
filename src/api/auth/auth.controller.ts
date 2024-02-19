import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "src/dtos/user.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    //   signIn(@Body() signInDto: UserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  signUp(@Body() user: UserDto) {
    //   signIn(@Body() signUpDto: Record<string, any>) {
    return this.authService.register(user);
  }
}
