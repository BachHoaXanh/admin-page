import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.enableCors();
    app.setGlobalPrefix('/api');

    await app.listen(port);
}
bootstrap().then(() => logger.log('Bach Hoa Xanh bootstrapped.'));
