import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { ConfigModule } from "@nestjs/config";
import {
  CacheInterceptor,
  CacheModule,
  CacheModuleOptions,
} from "@nestjs/cache-manager";
import { RedisOptions } from "src/utils/constants";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { Redis } from "ioredis";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `development.env`,
      isGlobal: true,
      // load: [configuration],
      expandVariables: true,
    }),
    // CacheModule.register(Redis),
    CacheModule.registerAsync(RedisOptions),
    CacheModule.register({
      ttl: 5,
      max: 10,
    }),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: APP_INTERCEPTOR, // Binding the interceptor globally
      useClass: CacheInterceptor,
    },
  ],
})
export class TodoModule {}
