import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './common/config/config.service';
import { User } from './api/users/entities/users.entity';
import { AuthModule } from './common/auth/auth.module';
import { ApiModule } from './api/api.module';
import { Token } from './common/auth/token/entities/token.entity';
import { Categories } from './api/categories/entities/categories.entity';
import { Products } from './api/products/entities/products.entity';
import { MailModule } from './common/mailer/mail.module';
import { Orders } from './api/orders/entities/orders.entity';
import { Information } from './api/information/entities/information.entity';

const configs = new ConfigService('.env');

const HOST = configs.get('HOST', 'localhost');
const DB_PORT = configs.get('DB_PORT', 3306);
const DB_USERNAME = configs.get('DB_USERNAME', 'root');
const DB_PASSWORD = configs.get('DB_PASSWORD', 'root');
const DATABASE = configs.get('DATABASE', 'admin-page');

// Config Email
const USER = configs.get('USER');
const PASS = configs.get('PASS');

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DATABASE,
            synchronize: true,
            entities: [User, Token, Categories, Products, Orders, Information],
        }),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: USER,
                    pass: PASS,
                },
                secure: false,
            },
            defaults: {
                from: `"nest-modules" <${USER}>`,
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'upload'),
        }),
        ApiModule,
        AuthModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
