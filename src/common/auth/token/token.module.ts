import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import * as fs from 'fs';
import { join } from 'path';
import { TokenService } from './token.service';
import { Token } from './entities/token.entity';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

const PRIVATE_KEY = fs.readFileSync(join(process.cwd(), './certs/ssl.key'));
const PUBLIC_KEY = fs.readFileSync(join(process.cwd(), './certs/ssl.pub'));

@Module({
    imports: [
        TypeOrmModule.forFeature([Token]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (): JwtModuleOptions => ({
                privateKey: PRIVATE_KEY,
                publicKey: PUBLIC_KEY,
                signOptions: {
                    algorithm: 'RS256',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
