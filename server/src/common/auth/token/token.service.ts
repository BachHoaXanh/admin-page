import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { TokenRequest } from './dto/token.request';
import { Token } from './entities/token.entity';
import { SignOptionsTokenInterface, TokenInterface, VerifyOptionsTokenInterface } from './interfaces/token.interface';

const PUBLIC_KEY = fs.readFileSync(join(process.cwd(), './certs/ssl.pub'));
const PRIVATE_KEY = fs.readFileSync(join(process.cwd(), './certs/ssl.key'));

const tokenPayload = (body: TokenRequest) => ({
    ownerId: body.ownerId,
});

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(Token)
        private tokens: Repository<Token>,
    ) {}

    /**
     * Generate new JWT
     *
     * @param payload
     * @param signOptions
     * @return token: string
     */
    async sign(payload, signOptions): Promise<string> {
        return jwt.sign(payload, PRIVATE_KEY, signOptions);
    }

    /**
     * Decode JWT
     *
     * @param token
     */
    async decode(token): Promise<any> {
        return jwt.decode(token);
    }

    /**
     * Verify JWT
     *
     * @param token
     * @param verifyOptions
     */
    async verify(token, verifyOptions: VerifyOptionsTokenInterface): Promise<any> {
        try {
            return jwt.verify(token, PUBLIC_KEY, verifyOptions);
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }

    /**
     * Create New Token
     *
     * @param body
     * @param signOptions
     * @return TokenInterface
     */
    async create(body: TokenRequest, signOptions?: SignOptionsTokenInterface): Promise<TokenInterface> {
        const token = await this.sign(tokenPayload(body), signOptions);

        return this.tokens.save(this.tokens.create({ ...body, token }));
    }

    /**
     * Remove token
     *
     * @param token
     * @return
     */
    async remove(token: string) {
        return this.tokens.delete({ token });
    }

}
