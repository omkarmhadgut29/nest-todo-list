import { Module } from "@nestjs/common";
import { TodoModule } from "./api/todo/todo.module";
// import { AppController } from "./app.controller";
import { TodoUiModule } from "./todo-ui/todo-ui.module";
import { AuthModule } from "./api/auth/auth.module";
import { UsersModule } from "./api/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
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
    TodoModule,
    TodoUiModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
