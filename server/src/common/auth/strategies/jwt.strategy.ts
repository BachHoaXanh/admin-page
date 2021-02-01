import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { TokenRequest } from '../token/dto/token.request';

const PUBLIC_KEY = fs.readFileSync(join(process.cwd(), './certs/ssl.pub'));

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: PUBLIC_KEY,
            subject: 'auth_token',
            audience: 'User',
            algorithm: ['RS256'],
        });
    }

    async validate(payload: TokenRequest) {
        return payload;
    }

}
