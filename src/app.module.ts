import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './common/config/config.service';
import { User } from './api/users/entities/user.entity';
import { AuthModule } from './common/auth/auth.module';
import { ApiModule } from './api/api.module';
import { Token } from './common/auth/token/entities/token.entity';
import { Categories } from './api/categories/entities/categories.entity';

const configs = new ConfigService('.env');

const HOST = configs.get('HOST', 'localhost');
const DB_PORT = configs.get('DB_PORT', 3000);
const DB_USERNAME = configs.get('DB_USERNAME', 'root');
const DB_PASSWORD = configs.get('DB_PASSWORD', 'root');
const DATABASE = configs.get('DATABASE', 'admin-page');

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
            entities: [User, Token, Categories],
        }),
        ApiModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
