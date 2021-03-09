import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from './common/config/config.service';

const configs = new ConfigService('.env');

const bodyParser = require('body-parser');

const logger = new Logger('Bootstrap');
const port = configs.get('PORT', 3000);

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Limit size body
    app.use(bodyParser.json({ limit: '10mb', extended: true }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.use('/public', express.static(join(__dirname, '..', 'upload')));

    const options = new DocumentBuilder().addBearerAuth()
        .setTitle('Ecommerce API')
        .setDescription('APIs Description')
        .setVersion('1.0')
        .setContact('Thanh Le (lengoctienthanh@gmail.com)',
            'https://www.facebook.com/profile.php?id=100004568401585',
            'lengoctienthanh@gmail.com')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(port);
}
bootstrap().then(() => logger.log(`Ecommerce bootstrapped on port ${port}.`));
