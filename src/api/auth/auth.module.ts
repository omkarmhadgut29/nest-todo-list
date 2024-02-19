import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/utils/constants";
import { ConfigModule } from "@nestjs/config";

console.log("jwtConstants.secret");
console.log(jwtConstants.secret);

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `development.env`,
      isGlobal: true,
      // load: [configuration],
      expandVariables: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "24hr" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
