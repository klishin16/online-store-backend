import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ValidationPipe} from "./pipes/validation.pipe";
import {Logger} from "@nestjs/common";


const logger = new Logger("Main", true)
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, )

    const config = new DocumentBuilder()
        .setTitle('Customizable Internet Shop Backend')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('git: @klishin16')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.enableCors({
        allowedHeaders: "*",
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        credentials: true,
    })
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => logger.debug(`Server started on port = ${PORT}`))
}

start().then(() => logger.log("Server was started successfully!"))
