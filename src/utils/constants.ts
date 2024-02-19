export const jwtConstants = {
  secret:
    "ahldiuzghbvasigeugsdohughiuvgshilugfvho7s8uegblirughvblisugeulidfhboubh",
  // secret: process.env.JWT_SECRET_KEY,
  expiresIn: "1d",
};

import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { Redis } from "ioredis";

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    // const store = new Redis({
    //   // host: "localhost",
    //   host: configService.get<string>("REDIS_HOST"),
    //   port: parseInt(configService.get<string>("REDIS_PORT")!),
    //   // port: 6379,
    // });
    const store = await redisStore({
      socket: {
        // host: "localhost",
        host: configService.get<string>("REDIS_HOST"),
        port: parseInt(configService.get<string>("REDIS_PORT")!),
        // port: 6379,
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
