import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as hbs from "hbs";
// @ts-ignore
// import * as hbsUtils from "hbs-utils";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  console.log(join(__dirname, "..", "views"));
  // hbs.registerPartials(join(__dirname, "..", "views/layouts"));

  const config = new DocumentBuilder()
    .setTitle("TODO List")
    .setDescription("The todo API description")
    .setVersion("1.0")
    .addTag("todos")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // hbsUtils(hbs).registerWatchedPartials(join(__dirname, "..", "views/layouts"));
  app.setViewEngine("ejs");

  await app.listen(3000);
}
bootstrap();
