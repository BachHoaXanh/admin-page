import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');
const port = Number(process.env.PORT) || 3000;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(port);
}
bootstrap().then(() => logger.log(`Bach Hoa Xanh bootstrapped on port ${port}.`));
